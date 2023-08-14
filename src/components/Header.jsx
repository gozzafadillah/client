import { Button, Card } from "@mui/material";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Header = () => {
  const roomid = uuidv4();
  return (
    <Card sx={{ marginTop: 5, backgroundColor: "gray" }} raised>
      <Link to="/">
        <Button sx={{ color: "white" }} variant="text">
          Home
        </Button>
      </Link>
      <Link to="/chats">
        <Button sx={{ color: "white" }} variant="text">
          Chats
        </Button>
      </Link>
      <Link to={"/room/" + roomid}>
        <Button sx={{ color: "white" }} variant="text">
          Room1
        </Button>
      </Link>
    </Card>
  );
};

export default Header;
