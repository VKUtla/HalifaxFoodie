import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  TextField,
  Card,
  Button,
  Checkbox,
} from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import markit_logo from "../images/markit_logo.png";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function Login() {
  const cardStyle = {
    padding: 50,
    height: "auto",
    width: 400,
    margin: "15% auto",
  };

  const avatarStyle = { backgroundColor: "#000000" };
  const classes = useStyles();
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [validEmail, setvalidEmail] = useState(true);
  const [validTnC, setvalidTnC] = useState(true);
  const [tnc, settnc] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [mfa, setmfa] = useState(false);
  const [answer, setAnswer] = useState("");
  const [qna1, setqna1] = useState("What is your grandfather's name?");
  const [qna2, setqna2] = useState("What is your childhood favourite toy?");
  const [qna3, setqna3] = useState("What is the first movie you ever watched?");
  const [qna4, setqna4] = useState("What is the name of your best friend?");
  const [qna5, setqna5] = useState("What is the name of your favourite car?");
  const [qna6, setqna6] = useState("What is your favourite game?");
  const [qna7, setqna7] = useState("What is your first school name?");
  const [qna8, setqna8] = useState("What is the name of your youngest/eldest sibling?");
  const [qna9, setqna9] = useState("What is your favourite restaurant?");
  const [qnaChoice, setqnaChoice] = useState(qna1);
  const [qnaChoiceString, setqnaChoiceString] = useState('');
  const history = useHistory();
  const mfa_verify_url = "https://h2om2rj43b.execute-api.us-east-1.amazonaws.com/HalifaxFoodie/halifaxfoodie/mfa/verify";

  const handleInput = (event) => {
    if (event.target.name === "password") {
      setpassword(event.target.value);
    }
    if (event.target.name === "email") {
      setemail(event.target.value);
      handleEmail(event.target.value);
    }
    if (event.target.name === "tnc") {
      settnc(event.target.checked);
      handleTnC(event.target.checked);
    }
    if (event.target.name === "ans1") {
      setAnswer(event.target.value);
    }
  };


  const handleInputQnA = (event) => {
    if (event.target.name === "qna1") {
      setqna1(event.target.value);
    }
    if (event.target.name === "qna2") {
      setqna2(event.target.value);
    }
    if (event.target.name === "qna3") {
      setqna3(event.target.value);
    }
    if (event.target.name === "qna4") {
      setqna4(event.target.value);
    }
    if (event.target.name === "qna5") {
      setqna5(event.target.value);
    }
    if (event.target.name === "qna6") {
      setqna6(event.target.value);
    }
    if (event.target.name === "qna7") {
      setqna7(event.target.value);
    }
    if (event.target.name === "qna8") {
      setqna8(event.target.value);
    }
    if (event.target.name === "qna9") {
      setqna9(event.target.value);
    }
  };

  const handleEmail = (emailID) => {
    if (emailID !== null || emailID !== "") {
      const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
      setvalidEmail(regex.test(emailID));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEmail(email);
    handleTnC(tnc);
    setOpen(false);

    if (tnc && email) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          //sessionStorage.setItem('markit-email', email);
          getRandomQnA();
        })
        .catch((error) => {
          setOpen(true);
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    }
  };

  const handleMFA = (event) => {
    event.preventDefault();

    async function registerQna() {
      console.log('In axios auth')
      var json_body = {
        [qnaChoiceString]: answer
      }
      json_body['email'] = email;
      json_body['status'] = "active";

      await axios.post(mfa_verify_url,
        json_body, {
        headers: {
          'hfx_authorizer': 'Pp7G4fZQEq88q4vb6JVUF1UFI7oZxdBv4CzRgJn5'
        }
      }).then((response) => {
        console.log('In response auth')
        console.log(response);
        if (response.status === 200) {
          console.log('QnA updated in dynamodb successfully!');
        } else if (response.status === 500) {
          console.log('Internal Server Error');
        }
      }).catch((error) => {
        console.log('In error auth')
        console.log(error);
      });
      sessionStorage.setItem('markit-email', email);
      setSuccess(true);
    }
    registerQna();
  }

  const handleTnC = (tncValue) => {
    settnc(tncValue);
    setvalidTnC(tncValue);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const getRandomQnA = () => {
    console.log('In Get Random QnA auth')
    var qnaChoiceArrary = [qna2, qna6, qna9];
    var randome_number = (Math.floor(Math.random() * 2) + 1);
    setqnaChoice(qnaChoiceArrary[randome_number]);
    setqnaChoiceString('qna' + randome_number);
    setmfa(true);
  };

  const handleSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
    setmfa(true);
    history.push('/');
  };

  if (!mfa) {
    return (
      <div >
        <Grid container spacing={3}>
          <Grid item lg={3} md={3}></Grid>
          <Grid item xs={12} lg={6} md={6}>
            <Card style={cardStyle}>
              <Grid align="center">
                <Avatar alt="" src={markit_logo} style={avatarStyle} className={classes.large}></Avatar>
                <Typography variant="body1" gutterBottom >
                  <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="h5.fontSize" m={1}>
                    LOGIN
                  </Box>
                </Typography>
              </Grid>

              <form>
                <div>
                  <TextField
                    label="Email"
                    placeholder="Email address"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="email"
                    id="email"
                    error={!validEmail}
                    helperText={validEmail ? "" : "Enter a valid email address."}
                    onChange={handleInput}
                  ></TextField>
                </div>
                <div>
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    placeholder="Enter password"
                    name="password"
                    id="password"
                    variant="outlined"
                    margin="normal"
                    onChange={handleInput}
                  ></TextField>
                </div>
                <div>
                  <Grid align="left">
                    <Link to="/reset">
                      <Box fontSize={14} m={1}>
                        Forgot password?
                      </Box>
                    </Link>
                  </Grid>
                </div>
                <div>
                  <Grid align="center">
                    <Box fontSize={12} m={1}>
                      <Checkbox
                        name="tnc"
                        checked={tnc}
                        onChange={handleInput}
                        color="primary"
                      ></Checkbox>
                      <Link
                        variant="body1"
                        href="https://3912.cupe.ca/documents/collective-agreements/"
                      >
                        Agree to Terms and Conditions.
                      </Link>
                    </Box>
                  </Grid>
                </div>
                <p
                  className={validTnC ? "hidden" : "text-danger p-tag-alert"}
                  style={{ color: "red", "font-size": "x-small" }}
                >
                  {" "}
                  Agree to the terms and conditions to login!
                </p>
                <div>
                  <Grid align="center">
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      onClick={handleSubmit}
                      className={classes.margin}
                      endIcon={<Icon>send</Icon>}
                    >
                      Sign in
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="error">
                        Invalid email or password!
                      </Alert>
                    </Snackbar>
                    <Snackbar open={success} autoHideDuration={750} onClose={handleSuccess}>
                      <Alert onClose={handleSuccess} severity="success">
                        Logged in successfully!
                      </Alert>
                    </Snackbar>
                  </Grid>
                </div>

                <div>
                  New user?
                  <Link to="/register">
                    <span> Sign up!</span>
                  </Link>
                </div>
              </form>
            </Card>
          </Grid>

          <Grid item lg={3} md={3}></Grid>
        </Grid>
      </div>
    );
  } else {
    return (
      <div >
        <Grid container spacing={3}>
          <Grid item lg={3} md={3}></Grid>
          <Grid item xs={12} lg={6} md={6}>
            <Card style={cardStyle}>
              <Grid align="center">
                <Avatar alt="" src={markit_logo} style={avatarStyle} className={classes.large}></Avatar>
                <Typography variant="body1" gutterBottom >
                  <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="h5.fontSize" m={1}>
                    Multifactor Authentication
                  </Box>
                </Typography>
              </Grid>
              <form>
                <div>
                  <FormControl>
                    <Typography>{qnaChoice}</Typography>
                    <TextField
                      label="Answer"
                      placeholder="Enter answer"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      name="ans1"
                      id="ans1"
                      value={answer}
                      onChange={handleInput}
                    ></TextField>
                  </FormControl>
                  <div>
                    <Grid align="left">
                      <Link to="/resetQnA">
                        <Box fontSize={14} m={1}>
                          Forgot answer?
                        </Box>
                      </Link>
                    </Grid>
                  </div>
                  <div>
                    <Grid align="center">
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        onClick={handleMFA}
                        className={classes.margin}
                        endIcon={<Icon>send</Icon>}
                      >
                        Verify
                      </Button>
                      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                          User already exists!
                        </Alert>
                      </Snackbar>
                      <Snackbar open={success} autoHideDuration={750} onClose={handleSuccess}>
                        <Alert onClose={handleSuccess} severity="success">
                          Login successful!
                        </Alert>
                      </Snackbar>
                    </Grid>
                  </div>
                  <div>
                    New user?
                    <Link to="/register">
                      <span> Sign up!</span>
                    </Link>
                  </div>
                </div>
              </form>
            </Card>
          </Grid>

          <Grid item lg={3} md={3}></Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
