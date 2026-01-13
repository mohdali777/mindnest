import { Book, Brain, CloudRain, Coffee, Heart, Music, Sun, Wind } from "lucide-react";
import {
  Star,
  Smile,
  ThumbsUp,
  Meh,
  Moon,
  AlertTriangle,
  Frown,
  Zap,
} from "lucide-react";
  const Welnesstips = [
    {
      id: 1,
      category: 'mindfulness',
      icon: Brain,
      title: 'Practice Deep Breathing',
      subtitle: '5 minutes daily',
      description: 'Deep breathing activates your parasympathetic nervous system, which signals your body to relax. This practice reduces cortisol levels, lowers heart rate, and can provide immediate stress relief. Regular practice rewires your stress response over time.',
      actionSteps: ['Find a comfortable seated position', 'Place one hand on chest, one on belly', 'Inhale slowly through nose for 4 counts', 'Hold breath gently for 4 counts', 'Exhale through mouth for 6 counts', 'Repeat for 5-10 cycles', 'Notice the calm feeling in your body'],
      difficulty: 'Easy',
      impact: 'High'
    },
    {
      id: 2,
      category: 'physical',
      icon: Heart,
      title: 'Morning Movement',
      subtitle: '10-15 minutes',
      description: 'Exercise releases endorphins and serotonin, natural mood elevators that can reduce symptoms of depression and anxiety. Morning activity also regulates your sleep-wake cycle, improves energy levels, and enhances cognitive function throughout the day.',
      actionSteps: ['Set alarm 15 minutes earlier', 'Start with gentle full-body stretches', 'Do 5 minutes of cardio (jumping jacks, jogging in place)', 'Try yoga sun salutations or tai chi', 'End with deep breathing', 'Drink a full glass of water', 'Notice increased alertness and positivity'],
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      id: 3,
      category: 'mindfulness',
      icon: Music,
      title: 'Mindful Music Listening',
      subtitle: '15 minutes',
      description: 'Music therapy has been shown to reduce anxiety by up to 65%. Listening mindfully engages your brain in a meditative state, reducing rumination and negative thought patterns. It activates the reward centers in your brain, releasing dopamine.',
      actionSteps: ['Choose instrumental, classical, or nature sounds', 'Use headphones for immersion', 'Sit or lie down comfortably', 'Close your eyes and focus on each instrument', 'Notice how music affects your emotions', 'Let thoughts pass without judgment', 'Continue for full 15 minutes without interruption'],
      difficulty: 'Easy',
      impact: 'Medium'
    },
    {
      id: 4,
      category: 'lifestyle',
      icon: Coffee,
      title: 'Limit Caffeine Intake',
      subtitle: 'Daily habit',
      description: 'Caffeine stimulates cortisol and adrenaline production, which can amplify anxiety symptoms. It has a half-life of 5-6 hours, meaning afternoon caffeine disrupts sleep quality. Better sleep directly improves mood regulation and emotional resilience.',
      actionSteps: ['Track all caffeine sources (coffee, tea, soda, chocolate)', 'Set a 2 PM cutoff for caffeinated drinks', 'Gradually reduce daily amount by 25% weekly', 'Replace with herbal tea or warm lemon water', 'Notice sleep quality improvements after 1 week', 'Monitor anxiety and energy levels', 'Maintain hydration with 8 glasses of water daily'],
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      id: 5,
      category: 'relaxation',
      icon: Book,
      title: 'Evening Reading Ritual',
      subtitle: '20 minutes before bed',
      description: 'Reading reduces stress by 68% according to research, more than listening to music or drinking tea. It lowers heart rate and muscle tension. Physical books avoid blue light exposure that suppresses melatonin, helping you fall asleep faster and sleep deeper.',
      actionSteps: ['Choose fiction, poetry, or uplifting non-fiction', 'Set up cozy reading nook with soft lighting', 'Turn off all screens 30 minutes before reading', 'Read at same time nightly to build habit', 'Avoid suspenseful or work-related material', 'Stop when feeling drowsy', 'Keep book on nightstand for consistency'],
      difficulty: 'Easy',
      impact: 'Medium'
    },
    {
      id: 6,
      category: 'mindfulness',
      icon: CloudRain,
      title: 'Gratitude Journaling',
      subtitle: '5 minutes daily',
      description: 'Gratitude practice rewires neural pathways, increasing activity in brain regions associated with dopamine production. Studies show it reduces depression by 35% and improves overall life satisfaction. It shifts focus from what\'s lacking to what\'s abundant in your life.',
      actionSteps: ['Keep dedicated gratitude journal', 'Write at same time each day (morning or evening)', 'List 3-5 specific things you\'re grateful for', 'Include why each matters to you', 'Be detailed (not just "family" but "mom\'s encouraging text")', 'Reread entries when feeling down', 'Notice patterns of positivity over weeks'],
      difficulty: 'Easy',
      impact: 'High'
    },
    {
      id: 7,
      category: 'physical',
      icon: Sun,
      title: 'Morning Sunlight Exposure',
      subtitle: '15-30 minutes',
      description: 'Natural sunlight regulates circadian rhythm by suppressing melatonin and boosting serotonin production. It improves vitamin D levels, which are linked to mood regulation. Morning light exposure can reduce seasonal affective disorder symptoms by 50%.',
      actionSteps: ['Go outside within 1 hour of waking', 'Spend 15-30 minutes in natural light', 'Avoid sunglasses for first 10 minutes (if safe)', 'Combine with morning walk or coffee outside', 'Face general direction of sun', 'Do this even on cloudy days', 'Notice improved sleep quality that night'],
      difficulty: 'Easy',
      impact: 'High'
    },
    {
      id: 8,
      category: 'relaxation',
      icon: Wind,
      title: 'Progressive Muscle Relaxation',
      subtitle: '10-15 minutes',
      description: 'This technique systematically releases physical tension stored in muscles from chronic stress. It teaches your body the difference between tension and relaxation, improving body awareness. Regular practice reduces insomnia, headaches, and anxiety symptoms.',
      actionSteps: ['Lie down in quiet, comfortable space', 'Start with toes - tense for 5 seconds', 'Release and notice relaxation for 10 seconds', 'Move to calves, thighs, buttocks, stomach', 'Continue to hands, arms, shoulders, neck, face', 'Tense muscle groups individually', 'End with full body scan and deep breathing'],
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      id: 9,
      category: 'lifestyle',
      icon: Coffee,
      title: 'Hydration Tracking',
      subtitle: 'Throughout the day',
      description: 'Even mild dehydration (1-2% body water loss) impairs mood, concentration, and increases anxiety. Your brain is 73% water and requires proper hydration for neurotransmitter production. Adequate water intake improves cognitive performance by 14%.',
      actionSteps: ['Calculate your need (body weight in lbs ÷ 2 = ounces daily)', 'Start day with 16oz of water upon waking', 'Set hourly phone reminders to drink', 'Use marked water bottle to track intake', 'Drink before meals and after bathroom breaks', 'Increase during exercise or heat', 'Notice improved energy and mental clarity'],
      difficulty: 'Easy',
      impact: 'Medium'
    },
    {
      id: 10,
      category: 'mindfulness',
      icon: Brain,
      title: 'Body Scan Meditation',
      subtitle: '10-20 minutes',
      description: 'Body scan meditation increases interoceptive awareness - your ability to sense internal body signals. This practice reduces anxiety by grounding you in present moment and interrupting worry cycles. It activates the prefrontal cortex, improving emotional regulation.',
      actionSteps: ['Lie down or sit comfortably', 'Close eyes and take 3 deep breaths', 'Focus attention on top of head', 'Slowly scan down through face, neck, shoulders', 'Notice sensations without judgment', 'Continue through torso, arms, legs, feet', 'Return attention to breath when mind wanders', 'End with gratitude for your body'],
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      id: 11,
      category: 'physical',
      icon: Heart,
      title: 'Nature Walks',
      subtitle: '20-30 minutes, 3x weekly',
      description: 'Walking in nature reduces rumination and negative thought patterns. It lowers cortisol by 16% and blood pressure significantly. Nature exposure activates the parasympathetic nervous system and increases feel-good neurotransmitters while reducing stress hormones.',
      actionSteps: ['Find local park, trail, or green space', 'Leave phone on airplane mode or at home', 'Walk at comfortable pace, no rushing', 'Engage all senses - notice sounds, smells, sights', 'Touch tree bark, leaves, or grass', 'Practice mindful observation of surroundings', 'Sit quietly for 5 minutes in nature', 'Return to routine feeling refreshed'],
      difficulty: 'Easy',
      impact: 'High'
    },
    {
      id: 12,
      category: 'lifestyle',
      icon: Sun,
      title: 'Digital Sunset',
      subtitle: '1 hour before bed',
      description: 'Blue light from screens suppresses melatonin production by 50%, disrupting sleep quality. Poor sleep is the number one predictor of next-day anxiety and depression. Creating a screen-free buffer improves sleep onset by 30 minutes and sleep quality significantly.',
      actionSteps: ['Set alarm for 1 hour before target bedtime', 'Put phone in another room or drawer', 'Turn off TV, computer, tablet', 'Use alarm clock instead of phone', 'Read, journal, or listen to calm music', 'Prepare for next day to reduce morning stress', 'Notice easier time falling asleep'],
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      id: 13,
      category: 'relaxation',
      icon: Wind,
      title: 'Aromatherapy Practice',
      subtitle: '10-15 minutes',
      description: 'Essential oils like lavender and chamomile have been clinically proven to reduce anxiety scores by 45%. Scent molecules directly access the limbic system (emotion center) faster than any other sense, providing rapid mood shifts and stress relief.',
      actionSteps: ['Choose calming essential oils (lavender, chamomile, bergamot)', 'Use diffuser or apply diluted oil to wrists', 'Take 5 slow, deep breaths inhaling the scent', 'Pair with meditation or relaxation practice', 'Use same scent consistently for sleep association', 'Create routine around aromatherapy time', 'Notice calming effects within minutes'],
      difficulty: 'Easy',
      impact: 'Medium'
    },
    {
      id: 14,
      category: 'mindfulness',
      icon: Brain,
      title: 'Loving-Kindness Meditation',
      subtitle: '10 minutes daily',
      description: 'This practice increases positive emotions, self-compassion, and social connection while decreasing self-criticism and negative self-talk. It activates brain regions associated with empathy and emotional processing, reducing symptoms of depression and boosting resilience.',
      actionSteps: ['Sit comfortably and close your eyes', 'Start with yourself: "May I be happy, healthy, safe, at peace"', 'Visualize someone you love, repeat phrases for them', 'Extend to neutral person, then difficult person', 'Finally extend to all beings everywhere', 'Notice warmth and compassion growing', 'Practice daily, especially when self-critical'],
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      id: 15,
      category: 'physical',
      icon: Heart,
      title: 'Proper Sleep Schedule',
      subtitle: '7-9 hours nightly',
      description: 'Consistent sleep schedule regulates every system in your body. Sleep deprivation increases anxiety by 30% and risk of depression by 40%. Quality sleep allows emotional processing, memory consolidation, and restoration of neurotransmitter balance.',
      actionSteps: ['Calculate wake time and count back 8 hours', 'Set same bedtime and wake time daily (including weekends)', 'Create 30-minute wind-down routine', 'Keep bedroom cool (65-68°F), dark, and quiet', 'Avoid large meals, alcohol, exercise 3 hours before bed', 'Use bedroom only for sleep and intimacy', 'Notice mood improvements after 1 week of consistency'],
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      id: 16,
      category: 'lifestyle',
      icon: Coffee,
      title: 'Meal Timing & Regularity',
      subtitle: '3 balanced meals daily',
      description: 'Irregular eating patterns cause blood sugar fluctuations that trigger anxiety and mood swings. Regular meals stabilize glucose and insulin, supporting steady neurotransmitter production. Skipping meals drops blood sugar, increasing cortisol and irritability.',
      actionSteps: ['Eat within 1 hour of waking', 'Space meals 4-5 hours apart', 'Include protein, healthy fat, complex carbs each meal', 'Avoid going more than 5 hours without eating', 'Prepare healthy snacks for between meals', 'Notice energy stability throughout day', 'Track mood in relation to eating patterns'],
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      id: 17,
      category: 'relaxation',
      icon: Book,
      title: 'Creative Expression',
      subtitle: '20-30 minutes, 2-3x weekly',
      description: 'Art therapy reduces cortisol by 25% in just 45 minutes. Creative activities activate the brain\'s reward center, providing a natural mood boost. Expression through art, music, or writing provides emotional release and helps process difficult feelings non-verbally.',
      actionSteps: ['Choose activity: drawing, painting, music, crafts, writing', 'Set no expectations or judgment about outcome', 'Focus on process and experience, not result', 'Let emotions guide your creative choices', 'Create for at least 20 minutes uninterrupted', 'Notice feelings before and after', 'Keep supplies accessible for spontaneous sessions'],
      difficulty: 'Easy',
      impact: 'Medium'
    },
    {
      id: 18,
      category: 'mindfulness',
      icon: CloudRain,
      title: 'Mindful Eating',
      subtitle: 'At least 1 meal daily',
      description: 'Eating mindfully improves digestion, reduces stress-eating, and increases satisfaction from meals. It activates the parasympathetic nervous system, enhancing nutrient absorption. This practice breaks the cycle of emotional eating and promotes healthier relationship with food.',
      actionSteps: ['Eat without screens or distractions', 'Take 3 deep breaths before first bite', 'Notice colors, textures, and aromas', 'Chew each bite 20-30 times', 'Put utensils down between bites', 'Notice hunger and fullness signals', 'Express gratitude for your meal', 'Stop eating when 80% full'],
      difficulty: 'Medium',
      impact: 'Medium'
    },
    {
      id: 19,
      category: 'physical',
      icon: Heart,
      title: 'Cold Exposure Therapy',
      subtitle: '30 seconds to 2 minutes',
      description: 'Cold showers increase endorphins and norepinephrine by 250%, providing natural mood elevation and increased alertness. Regular cold exposure builds stress resilience by training your nervous system to remain calm under physiological stress, reducing overall anxiety.',
      actionSteps: ['Start with warm shower as normal', 'Turn to cold for last 30 seconds', 'Focus on calm, controlled breathing', 'Gradually increase duration to 2 minutes', 'Do this 3-5 times weekly', 'Notice improved mood and energy immediately after', 'Track stress resilience improvements over weeks'],
      difficulty: 'Hard',
      impact: 'High'
    },
    {
      id: 20,
      category: 'lifestyle',
      icon: Sun,
      title: 'Social Connection',
      subtitle: '30 minutes, multiple times weekly',
      description: 'Meaningful social interaction releases oxytocin, reducing cortisol and anxiety. Loneliness increases depression risk by 30% and mortality by 26%. Quality connections provide emotional support, perspective, and activate brain regions associated with safety and belonging.',
      actionSteps: ['Schedule regular calls or meetings with friends/family', 'Prioritize in-person interactions when possible', 'Practice active listening without phone distractions', 'Join community group or class aligned with interests', 'Reach out to one person weekly', 'Share vulnerabilities to deepen connections', 'Notice improved mood after social time'],
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      id: 21,
      category: 'relaxation',
      icon: Wind,
      title: 'Guided Visualization',
      subtitle: '10-15 minutes',
      description: 'Visualization activates the same brain regions as actual experiences, creating real physiological relaxation responses. It reduces anxiety by redirecting attention from worries to peaceful mental imagery, lowering heart rate and blood pressure while promoting calm.',
      actionSteps: ['Find quiet space and get comfortable', 'Close eyes and take deep breaths', 'Imagine peaceful place in vivid detail', 'Engage all senses in visualization', 'Notice sounds, smells, temperature, textures', 'Stay in scene for 10-15 minutes', 'Use same peaceful place regularly', 'Return when feeling stressed during day'],
      difficulty: 'Easy',
      impact: 'Medium'
    },
    {
      id: 22,
      category: 'mindfulness',
      icon: Brain,
      title: 'Thought Journaling',
      subtitle: '10 minutes when needed',
      description: 'Writing down anxious thoughts externalizes them, reducing their power. Journaling helps identify cognitive distortions and negative patterns. Studies show expressive writing reduces intrusive thoughts by 40% and improves emotional processing and problem-solving abilities.',
      actionSteps: ['When anxious, grab journal immediately', 'Write stream-of-consciousness for 5 minutes', 'Identify the core worry or fear', 'Challenge thoughts: Is this fact or feeling?', 'Write alternative, balanced perspective', 'Rate anxiety before and after (1-10 scale)', 'Notice patterns over time to identify triggers'],
      difficulty: 'Easy',
      impact: 'High'
    },
  ];

  export default Welnesstips



  



export const moodsUpdated = [
  {
    id: "amazing",
    label: "Amazing",
    emoji: "🤩",
    icon: Star,
    color: "from-yellow-400 to-orange-400",
  },
  {
    id: "happy",
    label: "Happy",
    emoji: "😊",
    icon: Smile,
    color: "from-green-400 to-emerald-400",
  },
  {
    id: "good",
    label: "Good",
    emoji: "🙂",
    icon: ThumbsUp,
    color: "from-lime-400 to-green-400",
  },
  {
    id: "neutral",
    label: "Neutral",
    emoji: "😐",
    icon: Meh,
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: "tired",
    label: "Tired",
    emoji: "😴",
    icon: Moon,
    color: "from-indigo-400 to-purple-400",
  },
  {
    id: "anxious",
    label: "Anxious",
    emoji: "😰",
    icon: AlertTriangle,
    color: "from-orange-400 to-red-400",
  },
  {
    id: "sad",
    label: "Sad",
    emoji: "😢",
    icon: Frown,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "stressed",
    label: "Stressed",
    emoji: "😫",
    icon: Zap,
    color: "from-red-400 to-pink-400",
  },
];
