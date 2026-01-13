import React, { useEffect, useState } from "react";
import {
  Heart,
  Smile,
  Brain,
  Clock,
  Leaf,
  Flame,
  Home,
  Play,
} from "lucide-react";

type Game =
  | "menu"
  | "breathing"
  | "mood"
  | "gratitude"
  | "focus"
  | "garden"
  | "stress";

const MentalHealthMiniGames: React.FC = () => {
  const [game, setGame] = useState<Game>("menu");
  const [message, setMessage] = useState("");

  /* ---------- BREATHING ---------- */
  const [phase, setPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");

  /* ---------- MOOD ---------- */
  const moods = ["Happy", "Sad", "Angry", "Anxious"];
  const emojis: Record<string, string> = {
    Happy: "😊",
    Sad: "😢",
    Angry: "😡",
    Anxious: "😰",
  };
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  /* ---------- GRATITUDE ---------- */
  const [gratitude, setGratitude] = useState(0);

  /* ---------- FOCUS ---------- */
  const [time, setTime] = useState(30);
  const [running, setRunning] = useState(false);

  /* ---------- GARDEN ---------- */
  const [calm, setCalm] = useState(0);
  const [stress, setStress] = useState(0);

  /* ---------- HELPERS ---------- */
  const respond = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 1200);
  };

  const goHome = () => {
    setGame("menu");
    setMessage("");
    setRunning(false);
    setTime(30);
  };

  /* ---------- EFFECTS ---------- */
  useEffect(() => {
    if (game !== "breathing") return;
    const phases: any = ["Inhale", "Hold", "Exhale"];
    const i = setInterval(() => {
      setPhase(p => phases[(phases.indexOf(p) + 1) % 3]);
    }, 4000);
    return () => clearInterval(i);
  }, [game]);

  useEffect(() => {
    if (game !== "focus" || !running) return;
    if (time === 0) {
      setRunning(false);
      respond("Great focus! 🎯");
      return;
    }
    const t = setInterval(() => setTime(v => v - 1), 1000);
    return () => clearInterval(t);
  }, [running, time, game]);

  /* ---------- MOOD GAME ---------- */
  const startMood = () => {
    setScore(0);
    nextMood();
  };

  const nextMood = () => {
    setCurrentMood(moods[Math.floor(Math.random() * moods.length)]);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">

        {/* GLOBAL MESSAGE */}
        {message && (
          <p className="mb-4 font-bold text-purple-600">{message}</p>
        )}

        {/* MENU */}
        {game === "menu" && (
          <>
            <h1 className="text-4xl font-black mb-6">🧠 Mental Health Games</h1>

            <MenuBtn icon={<Heart />} text="Breathing Rhythm" onClick={() => setGame("breathing")} />
            <MenuBtn icon={<Smile />} text="Mood Match" onClick={() => { setGame("mood"); startMood(); }} />
            <MenuBtn icon={<Brain />} text="Gratitude Tap" onClick={() => setGame("gratitude")} />
            <MenuBtn icon={<Clock />} text="Focus Timer" onClick={() => setGame("focus")} />
            <MenuBtn icon={<Leaf />} text="Mind Garden" onClick={() => setGame("garden")} />
            <MenuBtn icon={<Flame />} text="Stress Release" onClick={() => setGame("stress")} />
          </>
        )}

        {/* BREATHING */}
        {game === "breathing" && (
          <>
            <Back onClick={goHome} />
            <h2 className="title">Breathing Rhythm</h2>
            <div className="text-6xl my-6">💙</div>
            <p className="text-3xl font-bold">{phase}</p>
            <p className="text-gray-600 mt-2">
              {phase === "Inhale"
                ? "Breathe in slowly 🌬️"
                : phase === "Hold"
                ? "Hold and relax 🧘"
                : "Release the stress 😌"}
            </p>
          </>
        )}

        {/* MOOD MATCH */}
        {game === "mood" && currentMood && (
          <>
            <Back onClick={goHome} />
            <h2 className="title">Mood Match</h2>
            <div className="text-7xl mb-4">{emojis[currentMood]}</div>

            <div className="grid grid-cols-2 gap-3">
              {moods.map(m => (
                <button
                  key={m}
                  onClick={() => {
                    if (m === currentMood) {
                      setScore(s => s + 10);
                      setFeedback("correct");
                      respond("Correct! 🎉");
                    } else {
                      setFeedback("wrong");
                      respond("Try again 💭");
                    }
                    setTimeout(nextMood, 600);
                  }}
                  className="btn"
                >
                  {m}
                </button>
              ))}
            </div>

            <p className="mt-4 font-bold">Score: {score}</p>
            {feedback && (
              <p className={`mt-2 font-bold ${feedback === "correct" ? "text-green-600" : "text-red-500"}`}>
                {feedback === "correct" ? "Nice job!" : "Oops!"}
              </p>
            )}
          </>
        )}

        {/* GRATITUDE */}
        {game === "gratitude" && (
          <>
            <Back onClick={goHome} />
            <h2 className="title">Gratitude Tap</h2>
            <button
              onClick={() => {
                setGratitude(g => g + 1);
                respond("Gratitude grows happiness 💛");
              }}
              className="gratitude"
            >
              ✨
            </button>
            <p className="mt-4 font-bold">Count: {gratitude}</p>
          </>
        )}

        {/* FOCUS */}
        {game === "focus" && (
          <>
            <Back onClick={goHome} />
            <h2 className="title">Focus Timer</h2>
            <div className="text-6xl font-black my-6">{time}s</div>
            <button onClick={() => setRunning(true)} className="btn">
              <Play /> Start
            </button>
          </>
        )}

        {/* MIND GARDEN */}
        {game === "garden" && (
          <>
            <Back onClick={goHome} />
            <h2 className="title">Mind Garden</h2>
            <p className="mb-3 font-semibold text-gray-600">
              {calm > stress ? "Your mind feels calm 🌸" : stress > calm ? "Take a breath 🌧️" : "Balanced 🌱"}
            </p>
            <div className="text-3xl mb-4">
              {"🌸".repeat(Math.floor(calm / 2))}
              {"🌾".repeat(Math.floor(stress / 2))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => { setCalm(c => c + 1); respond("Calm added 🌸"); }} className="green">
                Calm
              </button>
              <button onClick={() => { setStress(s => s + 1); respond("Stress noticed 🌧️"); }} className="red">
                Stress
              </button>
            </div>
          </>
        )}

        {/* STRESS RELEASE */}
        {game === "stress" && (
          <>
            <Back onClick={goHome} />
            <h2 className="title">Stress Release</h2>
            <button
              onClick={() => {
                setStress(0);
                respond("Stress released 😌");
              }}
              className="stress"
            >
              💥 TAP TO RELEASE
            </button>
          </>
        )}
      </div>

      {/* STYLES */}
      <style>{`
        .btn{padding:14px;border-radius:14px;font-weight:bold;background:#8b5cf6;color:white}
        .title{font-size:2rem;font-weight:800;margin-bottom:12px}
        .gratitude{width:120px;height:120px;border-radius:50%;background:#fde047;font-size:48px}
        .green{background:#dcfce7;padding:14px;border-radius:14px}
        .red{background:#fee2e2;padding:14px;border-radius:14px}
        .stress{padding:20px;background:#fecaca;border-radius:16px;font-weight:bold}
      `}</style>
    </div>
  );
};

const MenuBtn = ({ text, icon, onClick }: any) => (
  <button onClick={onClick} className="btn w-full mb-3 flex justify-center gap-2">
    {icon} {text}
  </button>
);

const Back = ({ onClick }: any) => (
  <button onClick={onClick} className="flex gap-2 mb-4 text-gray-600">
    <Home /> Back
  </button>
);

export default MentalHealthMiniGames;
