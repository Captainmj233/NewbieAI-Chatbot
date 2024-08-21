"use client"

import { useState } from 'react';
import { Box, Button, Stack, TextField, AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClearIcon from '@mui/icons-material/Clear'; 

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the NewbieAI chatbot. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const sendMessage = async () => {
    setMessage('');  // Clear the input field
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },  // Add the user's message to the chat
      { role: 'assistant', content: '' },  // Add a placeholder for the assistant's response
    ]);

    // Send the message to the server
    const response = fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();  // Get a reader to read the response body
      const decoder = new TextDecoder();  // Create a decoder to decode the response text

      let result = '';
      // Function to process the text from the response
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true });  // Decode the text
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];  // Get the last message (assistant's placeholder)
          let otherMessages = messages.slice(0, messages.length - 1);  // Get all other messages
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },  // Append the decoded text to the assistant's message
          ];
        });
        return reader.read().then(processText);  // Continue reading the next chunk of the response
      });
    });
  };

  const clearMessages = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi! I'm the NewbieAI chatbot. How can I help you today?",
      },
    ]);
    setMessage(''); // Clear the input field
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Box flexGrow={1} sx={{ padding: 1 }}>
            <strong style={{ border: '2px solid', borderColor: 'divider', padding: '4px 8px' }}>
              NewbieAI Chatbot
            </strong>
          </Box>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {/* Chat */}
      <Stack
        direction="column"
        flexGrow={1}
        overflow="auto"
        p={2}
        spacing={2}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent={
              message.role === 'assistant' ? 'flex-start' : 'flex-end'
            }
            alignItems="center"
          >
            {message.role === 'assistant' && (
              <SmartToyIcon style={{ marginRight: 8 }} /> // Add chatbot icon
            )}
            <Box
              bgcolor={
                message.role === 'assistant'
                  ? 'primary.main'
                  : 'secondary.main'
              }
              color="white"
              borderRadius={0}
              p={3}
              maxWidth="70%"
              sx={{ wordWrap: 'break-word' }}
              dangerouslySetInnerHTML={{ __html: message.content }} // Render HTML content
            />
          </Box>
        ))}
      </Stack>
      <Stack direction="row" spacing={2} p={2} alignItems="center">
        <TextField
          label="Message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }} // Send message on Enter key press
        />
        <Button variant="contained" onClick={sendMessage}>
          <SendIcon />
        </Button>
        <Button variant="contained" color="secondary" onClick={clearMessages}>
          <ClearIcon />
        </Button>
      </Stack>
    </Box>
  );
}