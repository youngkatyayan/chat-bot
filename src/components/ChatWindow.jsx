import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, receiveMessage } from '../features/chat/chatSlice.js';
import { Box, TextField, IconButton, Typography, Paper, List, ListItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatWindow = () => {
  const dispatch = useDispatch();
  const { messages, currentUser } = useSelector((state) => state.chat);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const simulateChatbotResponse = (userMessage) => {
    setTimeout(() => {
      let response = 'I didn’t understand that. Can you clarify?';
      if (userMessage.toLowerCase().includes('hello')) {
        response = 'Hello! How can I assist you today?';
      } else if (userMessage.toLowerCase().includes('help')) {
        response = 'Sure! What do you need help with?';
      } else if (userMessage.toLowerCase().includes('thanks')) {
        response = 'You’re welcome! 😊';
      }
      else{
        response = 'Related have no text 😊'; 
      }

      dispatch(receiveMessage({ text: response, user: 'Chatbot' }));
    }, 1500); 
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      dispatch(sendMessage({ text: inputMessage }));
      simulateChatbotResponse(inputMessage); 
      setInputMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{display: 'flex',flexDirection: 'column',height: '95vh',padding: 2,maxWidth: '600px',margin: 'auto',bgcolor: '#f0f2f5',boxShadow:'1px 1px 2px 3px #ddd'
      }}
    >
      <Paper sx={{ flex: 1, overflowY: 'auto', padding: 2, mb: 2 }}>
        <List>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent: message.user === currentUser ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%',
                  padding: 1,
                  borderRadius: 2,
                  bgcolor: message.user === currentUser ? 'primary.main' : 'grey.600',
                  color: message.user === currentUser ? 'white' : 'black',
                  boxShadow: 1,
                }}
              >
                <Typography variant="body1">{message.text}</Typography>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', textAlign: 'right', marginTop: '4px', fontSize: '0.7em' }}
                >
                  {message.timestamp}
                </Typography>
              </Box>
            </ListItem>
          ))}
          <div ref={chatEndRef} />
        </List>
      </Paper>

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        sx={{ display: 'flex', gap: 1 }}
      >
        <TextField fullWidth variant="outlined" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={handleKeyPress} placeholder="Type your message..."
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatWindow;
