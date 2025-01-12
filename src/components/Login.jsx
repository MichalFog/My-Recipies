import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../Store/UserSlice";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
const Login = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user_Slice);

  const UserLogin = () => {
    if(Email&&Name){
      dispatch(createUser({ name: Name, email: Email }));
    }
    else
    alert("יש למלא את כל השדות")
  };

  const Logout = () => {
    dispatch(createUser({ name: "", email: "" }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundImage: "url('/דף בית 5.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "50px",
      }}
    >
      {user.name && user.email ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5px)",
            width: "400px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            שלום, {user.name}!
          </Typography>
          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={Logout}
              sx={{ mt: 2 }}
            >
             ליציאה מהחשבון<p> </p><LogoutIcon/> 
            </Button>
          </Link>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5px)",
            width: "400px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            התחברות
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} style={{ width: "100%" }}>
            <TextField
              label="שם"
              variant="outlined"
              fullWidth
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              label="מייל"
              variant="outlined"
              type="email"
              fullWidth
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
            />
            <Link to="/">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={UserLogin}
                sx={{ mt: 2 }}
              >
                התחברות
              </Button>
            </Link>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default Login;
