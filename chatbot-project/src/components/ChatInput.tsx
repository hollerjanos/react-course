import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import type { ChatMessageType } from '../types';
import './ChatInput.css';

type ChatInputProps = {
  chatMessages: ChatMessageType[];
  setChatMessages: (chatMessages: ChatMessageType[]) => void;
}

export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") return;

    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];

    setChatMessages(newChatMessages);

    setInputText("");

    setChatMessages([
      ...newChatMessages,
      {
        message: (
          <img
            className="loading-spinner"
            src="https://supersimple.dev/images/loading-spinner.gif"
            alt="Loading..."
          />
        ),
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    setIsLoading(false);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size={30}
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button
        className="send-button"
        onClick={sendMessage}
      >Send</button>
      <button
        className="clear-button"
        onClick={clearMessages}
      >Clear</button>
    </div>
  );
}
