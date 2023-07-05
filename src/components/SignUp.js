import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import validator from 'validator';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

    const [errors, setErrors] = React.useState({});
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const user = useSelector(state => state.user);
    const isLoggedIn = Object.keys(user).length !== 0;
    const navigate = useNavigate()

    React.useEffect(() => {
        if(isLoggedIn) {
            console.log('reached');
            navigate('/');
        }
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {};
    const newErrors = {...errors};
    for(let [name, value] of data) {
        formData[name] = value;
        validate(name, value, newErrors);
    }
    if(Object.keys(newErrors).length !== 0) {
        setErrors(newErrors);
        return;
    }
    // formData["role"] = ["admin"];

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };

    const SignUp = async () => {
      console.log('enterting');
      try {
        const response = await fetch('http://localhost:8080/api/auth/signup', requestOptions);
        const jsonData = await response.json();
        console.log(jsonData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    SignUp();

    setOpenSuccess(true);
    // localStorage.setItem(formData.email, JSON.stringify(formData));
  };

  const validateComponent = (event) => {
    const newErrors = validate(event.currentTarget.name, event.currentTarget.value, {...errors});
    setErrors(newErrors);
  }

  const validate = (name, value, newErrors) => {
    let error = '';
    if(!value) {
        error = 'Value required!'
    } else {
        switch(name) {
            case 'email':
                if(!validator.isEmail(value)) {
                    error = 'Please enter a proper Email ID'
                }
                break;
            case 'password':
                if(value.length < 8) {
                    error = 'Password should have atleast 8 characters'
                }
                break;
            case 'confirmPassword':
                if(document.getElementById('password').value !== value) {
                    error = "Doesn't match with password"
                }
                break;
            case 'contactNumber':
                if(!validator.isMobilePhone(value)) {
                    error = 'Please enter a proper contact number'
                }
            break;
        }
    }
    if(error === '') {
        delete newErrors[name]
    } else {
        newErrors[name] = error;
    }
    return newErrors;
  }

    React.useEffect(() => {
        if(openSuccess) {
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    }, [openSuccess]);

  return (
    <ThemeProvider theme={theme}>
      <Snackbar open={openSuccess} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          User signed up successfully!
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={"First Name"}
                  onChange={validateComponent}
                  error={errors.hasOwnProperty('firstName')}
                  helperText={errors.firstName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={validateComponent}
                  error={errors.hasOwnProperty('lastName')}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={validateComponent}
                  error={errors.hasOwnProperty('email')}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={validateComponent}
                  error={errors.hasOwnProperty('password')}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  onChange={validateComponent}
                  error={errors.hasOwnProperty('confirmPassword')}
                  helperText={errors.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contactNumber"
                  label="Contact Number"
                  type="phone"
                  id="contactNumber"
                  autoComplete="phone"
                  onChange={validateComponent}
                  error={errors.hasOwnProperty('contactNumber')}
                  helperText={errors.contactNumber}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}