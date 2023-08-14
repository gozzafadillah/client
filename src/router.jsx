import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ChatWindows from "./components/ChatWindows";
import Room from "./Room";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/chats",
        element: <ChatWindows />,
      },
      {
        path: "/room/:roomId",
        element: <Room />,
      },
    ],
  },
]);

export default router;
