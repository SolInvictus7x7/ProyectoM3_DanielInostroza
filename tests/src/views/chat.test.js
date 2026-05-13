import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderChat } from '../../../src/views/chat.js';

// Mock global fetch
global.fetch = vi.fn();

//test fetch API
describe('Frontend Logic: src/views/chat.js', () => {
  beforeEach(() => {
    // Setup a clean DOM before each test
    document.body.innerHTML = '<div id="app"></div>';
    renderChat();
    vi.clearAllMocks();
  });

  it('should show an error message if the API fetch fails', async () => {
    const input = document.querySelector('#user-input');
    const button = document.querySelector('#send-btn');
    const chatWindow = document.querySelector('#chat-window');

    input.value = 'Help';
    
    fetch.mockRejectedValue(new Error('Network error'));

    await button.click();

    expect(chatWindow.innerHTML).toContain('Mis mensajeros han sido interceptados');
  });
});

function limitHistory(history, limit = 8) {
    return history.slice(-limit);
}


//Test no más de 8 mensajes
describe('History Management', () => {
  it('should never return more than 8 messages', () => {
    const longHistory = Array(20).fill({ text: 'test' });
    const result = limitHistory(longHistory, 8);
    
    expect(result.length).toBe(8);
  });

  it('should return all messages if history is shorter than the limit', () => {
    const shortHistory = [{ text: '1' }, { text: '2' }];
    const result = limitHistory(shortHistory, 8);
    
    expect(result.length).toBe(2);
  });
});