import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { model: modelName, system, messages } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: system
    });

    const limitedMessages = messages.slice(-8); 

    const lastMessage = limitedMessages[limitedMessages.length - 1].text;

    const historyData = limitedMessages
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
        input_tokens: response.usageMetadata?.promptTokenCount || 0, 
        output_tokens: response.usageMetadata?.candidatesTokenCount || 0
      }
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Error generating response' });
  }
}