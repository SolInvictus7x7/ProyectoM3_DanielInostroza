import { describe, it, expect, vi } from 'vitest';

// Mock de gemini API
vi.mock('@google/generative-ai', () => {
  class MockGoogleGenerativeAI {
    getGenerativeModel() {
      return {
        startChat: () => ({
          sendMessage: async () => ({
            response: {
              text: () => 'Hacia la victoria!',
              usageMetadata: { promptTokenCount: 50, candidatesTokenCount: 20 }
            }
          })
        })
      };
    }
  }

  return {
    GoogleGenerativeAI: MockGoogleGenerativeAI
  };
});

import handler from '../../api/chat.js';

describe('API Handler: api/chat.js', () => {
  //Testea si no recibe POST
  it('should return 405 if the request method is not POST', async () => {
    const req = { method: 'GET' };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    
    await handler(req, res);
    
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' });
  });


  //Testea si no recibe status 200
  it('should return 200 and the AI reply with usage data', async () => {
    const req = {
      method: 'POST',
      body: {
        model: 'gemini-2.5-flash',
        system: 'Test System',
        messages: [{ sender: 'user', text: 'Hola Alejandro' }]
      }
    };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      reply: 'Hacia la victoria!',
      usage: { input_tokens: 50, output_tokens: 20 }
    }));
  });
});