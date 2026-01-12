import crypto from "crypto"
export default class GenaratorFunctions{
  static generateSectionId = (userId: string): string => {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(4).toString("hex");

  return `chat_${userId}_${timestamp}_${random}`;
};
}