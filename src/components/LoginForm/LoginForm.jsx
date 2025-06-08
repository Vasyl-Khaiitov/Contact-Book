import * as React from 'react';
import {
  Button,
  FormControl,
  Checkbox,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  Alert,
  IconButton,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

function CustomEmailField() {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  );
}

function CustomPasswordField() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

function CustomButton() {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      Log In
    </Button>
  );
}

function SignUpLink() {
  return (
    <Link href="/" variant="body2">
      Sign up
    </Link>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2">
      Forgot password?
    </Link>
  );
}

function Title() {
  return <h2 style={{ marginBottom: 8 }}>Login</h2>;
}

function Subtitle({ hasError }) {
  if (!hasError) return null;
  return (
    <Alert sx={{ mb: 2, px: 1, py: 0.25, width: '100%' }} severity="warning">
      We are investigating an ongoing outage.
    </Alert>
  );
}

function RememberMeCheckbox() {
  const theme = useTheme();
  return (
    <FormControlLabel
      label="Remember me"
      control={
        <Checkbox
          name="remember"
          value="true"
          color="primary"
          sx={{ padding: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
        />
      }
      slotProps={{
        typography: {
          color: 'textSecondary',
          fontSize: theme.typography.pxToRem(14),
        },
      }}
    />
  );
}

export default function SlotsSignIn() {
  const [hasError, setHasError] = useState(false);
  const theme = useTheme();

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={(provider, formData) => {
          if (!formData.get('email') || !formData.get('password')) {
            setHasError(true);
          } else {
            setHasError(false);
            alert(
              `Logging in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}, and checkbox value: ${formData.get('remember')}`,
            );
          }
        }}
        slots={{
          title: Title,
          subtitle: () => <Subtitle hasError={hasError} />,
          emailField: CustomEmailField,
          passwordField: CustomPasswordField,
          submitButton: CustomButton,
          signUpLink: SignUpLink,
          rememberMe: RememberMeCheckbox,
          forgotPasswordLink: ForgotPasswordLink,
        }}
        slotProps={{ form: { noValidate: false } }}
        providers={providers}
      />
    </AppProvider>
  );
}

// import * as React from 'react';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { SignInPage } from '@toolpad/core/SignInPage';
// import { useTheme } from '@mui/material/styles';
// import toast, { Toaster } from 'react-hot-toast';
// import { useDispatch } from 'react-redux';
// import { login } from '../../redux/auth/operations';

// export default function CredentialsSignInPage() {
//   // preview-start
//   const providers = [{ id: 'credentials', name: 'Email and Password' }];
//   // preview-end
//   const dispatch = useDispatch();

//   const signIn = async (formData) => {
//     try {
//       await dispatch(login(formData)).unwrap();
//       toast.success('Login successful!');
//     } catch (error) {
//       toast.error('Login failed: ' + error.message);
//     }
//   };
//   const theme = useTheme();
//   return (
//     // preview-start
//     <AppProvider theme={theme}>
//       <SignInPage
//         signIn={signIn}
//         providers={providers}
//         slotProps={{
//           emailField: { autoFocus: false },
//           form: { noValidate: false },
//         }}
//       />
//       <Toaster position="top-right" />
//     </AppProvider>
//     // preview-end
//   );
// }
