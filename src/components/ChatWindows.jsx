import { useEffect, useState, useRef } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const ChatWindows = () => {
  const { socket } = useOutletContext();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!socket) return;
    socket.on("message-from-server", (data) => {
      setChat((prev) => [...prev, { message: data.message, received: true }]);
    });
    socket.on("typing-from-server", () => setTyping(true));
    socket.on("typing-stopped-from-server", () => setTyping(false));
  }, [socket]);

  useEffect(() => {
    // Scroll to the bottom when new messages arrive
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chat]);

  const handleForm = (e) => {
    e.preventDefault();
    socket.emit("send-message", { message });
    setChat((prev) => [...prev, { message, received: false }]);
    setMessage("");
  };

  const handleInput = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
    socket.emit("started-typing");
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        socket.emit("stopped-typing");
      }, 375)
    );
  };
  return (
    <>
      <Box
        ref={chatContainerRef}
        sx={{
          marginBottom: "70px",
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)", // Center the chat container
          width: "90%", // Adjust the width based on your layout
          padding: "10px",
          borderRadius: "10px", // Add rounded corners to the chat container
        }}
      >
        {chat.map((data, index) => (
          <Typography
            key={index}
            sx={{
              marginY: 1,
              padding: "8px 12px", // Add padding to each chat message
              borderRadius: "8px", // Add rounded corners to each chat message
              background: data.received ? "#DCF8C6" : "#E5E5EA", // Background color for received and sent messages
              alignSelf: data.received ? "flex-start" : "flex-end", // Align received messages to the left, sent messages to the right
              textAlign: data.received ? "left" : "right",
            }}
          >
            {data.message}
          </Typography>
        ))}
        {typing && (
          <Box
            sx={{
              marginY: 1,
              padding: "8px 12px",
              borderRadius: "8px",
              background: "#ffffff",
              alignSelf: "flex-end", // Align received messages to the right
            }}
          >
            <InputLabel
              sx={{ fontSize: "20px" }}
              shrink
              htmlFor="boostrap-input"
            >
              Typing...
            </InputLabel>
          </Box>
        )}
        {/* Placeholder for received messages */}
      </Box>
      <Box
        component="form"
        onSubmit={handleForm}
        sx={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderTop: "1px solid #ccc",
          background: "#fff",
        }}
      >
        <img
          src="https://via.placeholder.com/50" // Replace with the URL of the profile picture
          alt="Profile"
          style={{ borderRadius: "50%", marginRight: "10px" }}
        />
        <TextField
          size="small"
          label="Write a message"
          variant="outlined"
          id="boostrap-input"
          value={message}
          onChange={handleInput}
          sx={{ flex: "1", marginRight: "10px" }}
        />
        <Button variant="contained" type="submit" sx={{ flexShrink: "0" }}>
          Send
        </Button>
      </Box>
    </>
  );
};

export default ChatWindows;
