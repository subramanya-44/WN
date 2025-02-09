import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useAppSelector } from '../hooks';
import Network from '../services/Network';

const ChatContainer = styled.div`
  .file-message {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .chat-input-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

interface IChatMessage {
  content: string;
  metadata?: {
    type: string;
    fileData: string;
    fileName: string;
  };
}

export default function ChatBox() {
  const [showFilesOnly, setShowFilesOnly] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const network = Network.getInstance();
const messages = useAppSelector((state) => state.chat.chatMessages.map(msg => msg.chatMessage));

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) return;
      network.sendFile({
        fileName: file.name,
        fileData: reader.result.toString(),
        fileType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileDownload = (fileData: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileData;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      network.addChatMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <ChatContainer>
      <div className="messages">
        {messages
          .filter((msg: IChatMessage) => !showFilesOnly || msg?.metadata?.type === 'file')
          .map((message: IChatMessage, index) => (
            <div key={index}>
              {message.metadata?.type === 'file' ? (
                <div 
                  className="file-message"
                  onClick={() => handleFileDownload(message.metadata!.fileData, message.metadata!.fileName)}
                >
                  <FileDownloadIcon />
                  <span>{message.metadata.fileName}</span>
                </div>
              ) : (
                <span>{message.content}</span>
              )}
            </div>
          ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-input-container">
        <TextField 
          placeholder="Type a message..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <IconButton onClick={() => setShowFilesOnly(!showFilesOnly)}>
          <AttachFileIcon color={showFilesOnly ? 'primary' : 'inherit'} />
        </IconButton>
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileSelect} />
        <IconButton onClick={() => fileInputRef.current?.click()}>
          <AttachFileIcon />
        </IconButton>
      </form>
    </ChatContainer>
  );
}
