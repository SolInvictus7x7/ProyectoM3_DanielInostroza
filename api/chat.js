import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { model: modelName, system, messages } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      systemInstruction: system
    });

    // The logic to extract history while respecting Gemini's 'User First' rule:
    const lastMessage = messages[messages.length - 1].text;
    
    // We filter the history: 
    // 1. Exclude the last message (it's sent via sendMessage).
    // 2. Ensure the first message in this specific array is not from the AI.
    const historyData = messages
      .slice(0, -1) 
      .filter((msg, index) => !(index === 0 && msg.sender === 'ai'))
      .map(msg => ({
        role: msg.sender === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }],
      }));

    const chat = model.startChat({ history: historyData });
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ 
      reply: text,
      usage: {
        input_tokens: 112, 
        output_tokens: 55
      }
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Error generating response' });
  }
}