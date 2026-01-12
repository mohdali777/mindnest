import { GoogleGenerativeAI, GenerativeModel, ChatSession, Content } from "@google/generative-ai";
import { injectable } from "tsyringe";
import ENV from "../Config/env";
import AppError from "../Error/Error";

@injectable()
export default class AI {
private genAI: GoogleGenerativeAI;
private model: GenerativeModel;

constructor() {
if (!ENV.GEMINI_API_KEY) {
throw new AppError("something went wrong",404);
}
this.genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
this.model = this.genAI.getGenerativeModel({
model: "gemini-2.5-flash", 
});
}

UpdateSystemInstructions(Instructions:string){
this.model = this.genAI.getGenerativeModel({
model: "gemini-2.5-flash", 
systemInstruction:Instructions
});
}

async askGemini(message: string, mood: string = "happy", history: any[] = []): Promise<string> {
try {
    console.log(mood);
    
const systemInstruction = this.buildSystemPrompt(mood);
this.UpdateSystemInstructions(systemInstruction)
const chat: ChatSession = this.model.startChat({
history: history,
generationConfig: {
maxOutputTokens: 500,
},
});


const result = await chat.sendMessage(message);
return result.response.text();

} catch (error) {
    console.log(error);
    
throw new AppError("something went wrong",404)
}
}

private buildSystemPrompt(mood: string): string {
return `You are a mental-health-safe AI assistant focused EXCLUSIVELY on emotional support and mood tracking.

STRICT TOPIC CONTROL:
- Your ONLY purpose is to help the user with their moods, emotions, and mental well-being.
- If the user asks about other topics (politics, coding, sports, general facts, math, etc.), politely decline and steer the conversation back to their emotional state.
- Example refusal: "I'm here to support your emotional well-being. I can't help with [topic], but how are you feeling right now?"

SAFETY RULES:
- Never insult the user or encourage self-harm.
- Current user mood: ${mood}.
- Behavior: ${this.moodPrompt(mood)}

Respond naturally and use the chat history to provide context only for emotional support.`;
}

private moodPrompt(mood: string): string {
const moods: Record<string, string> = {
sad: "Be very supportive, empathetic, and gentle.",
happy: "Be cheerful, energetic, and positive.",
angry: "Be calm, patient, and de-escalating.",
anxious: "Be reassuring, slow, and comforting.",
neutral: "Be friendly, neutral, and supportive.",

};
return moods[mood] || "Be friendly, neutral, and supportive.";
}
}