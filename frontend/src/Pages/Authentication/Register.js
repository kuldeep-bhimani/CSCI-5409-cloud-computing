import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import FormControlLabel from "@mui/material/FormControlLabel";
//import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useNavigate, useLocation } from "react-router-dom";
// UserPool
import UserPool from "../../UserPool/UserPool";

// important for cloud
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

const theme = createTheme();

export default function Register() {
  const [birthdate, setBirthdate] = useState(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);
  // Navigator
  const navigate = useNavigate();

  //location
  const location = useLocation();
  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, birthdate);
    // Setting attribute
    const nameAttribute = new CognitoUserAttribute({
      Name: "name",
      Value: name,
    });
    // const birthdateAttribute = new CognitoUserAttribute({
    //   Name: "birthdate",
    //   Value: birthdate,
    // });

    // registering user to AWS Cognito
    const cognitoUser = UserPool.signUp(
      email,
      password,
      [nameAttribute],
      null,
      (err, data) => {
        if (err) {
          console.log("Error:", err);
        }
        if (data) {
          console.log("Data:", typeof data.user);
          setUserData(data.user);
          localStorage.setItem("username", data.user.username);
          navigate("/login");
        }
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Birth Date"
                  renderInput={(params) => <TextField {...params} />}
                  value={birthdate}
                  onChange={(date) => {
                    setBirthdate(date);
                  }}
                  margin="normal"
                />
              </LocalizationProvider>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
