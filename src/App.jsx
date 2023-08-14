import { Container } from "@mui/material";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);
  return (
    <Container>
      <Header />
      <Outlet context={{ socket }} />
    </Container>
  );
}

export default App;
