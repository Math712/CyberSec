import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as userActions from "../../actions/User";
import * as loginFromActions from "../../actions/LoginForm";
// import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import authService from '../../services/authService';
import ImageLogo from "../../assets/images/logo.png";
import './Login.scss';

const Login = () => {
  const dispatch: any = useDispatch();

  var loginForm: any = useSelector((state: any) => state.loginForm);

  const navigate = useNavigate();

  if(authService.isLogged()){
    dispatch(userActions.loggedIn(true));
    navigate('/modele');
  }

  var handleLogin = () => {
    authService.login({
      nom: loginForm.username,
      password: loginForm.password
    }).then(
      (res) => {
        dispatch(loginFromActions.setHelperText(""));
        dispatch(loginFromActions.setIsError(false));
        toast.success("Connexion réussie", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        if (authService.isLogged()) {
          dispatch(userActions.loggedIn(true));
          navigate('/modeles');
        }
      },
      error => {
          dispatch(loginFromActions.setHelperText("Nom d'utilisateur ou mot de passe incorrects"));
          dispatch(loginFromActions.setIsError(true));
          toast.error("Connexion échouée", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          dispatch(userActions.loggedIn(false));
      }
    );
    
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      loginForm.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch(loginFromActions.setUsername(event.target.value));
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch(loginFromActions.setPassword(event.target.value));
    }
  return (
    <form className="container" noValidate autoComplete="off">
      <Card className="card">
        <Paper className='iconContainer' variant="outlined">
            <img src={ImageLogo} />
        </Paper>
        <CardContent>
          <div>
            <TextField
              error={loginForm.isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={loginForm.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={loginForm.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className="loginBtn"
            onClick={handleLogin}
            disabled={!loginForm.username && !loginForm.password}>
            Login
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default Login