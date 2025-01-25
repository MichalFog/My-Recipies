import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../Store/UserSlice";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user_Slice);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data.name && data.email) {
      dispatch(createUser({ name: data.name, email: data.email }));
      navigate('/');  
    } else {
      alert("יש למלא את כל השדות");
    }
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
              ליציאה מהחשבון <LogoutIcon />
            </Button>
          </Link>
        </Box>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <TextField
              {...register("name", { required: true })}
              label="שם"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              label="מייל"
              variant="outlined"
              type="email"
              fullWidth
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
            >
              התחברות
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default Login;
