import React from "react";
import {
  Grid,
  TextField,
  Card,
  Button,
  Checkbox,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { useState } from "react";
import { useHistory } from 'react-router';
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

function Register() {
  const cardStyle = {
    padding: 50,
    height: "auto",
    width: "400px",
    margin: "12.5% auto",
  };
  const avatarStyle = { backgroundColor: "#000000" };
  const classes = useStyles();

  const [username, setusername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [validPassword, setvalidPassword] = useState(true);
  const [validUsername, setvalidUsername] = useState(true);
  const [validFirstname, setvalidFirstname] = useState(true);
  const [validLastname, setvalidLastname] = useState(true);
  const [validConfPwd, setvalidConfPwd] = useState(true);
  const [validEmail, setvalidEmail] = useState(true);
  const [validTnC, setvalidTnC] = useState(true);
  const [tnc, settnc] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openSelect1, setopenSelect1] = React.useState(false);
  const [openSelect2, setopenSelect2] = React.useState(false);
  const [openSelect3, setopenSelect3] = React.useState(false);
  const [selectValue1, setselectValue1] = React.useState('');
  const [selectValue2, setselectValue2] = React.useState('');
  const [selectValue3, setselectValue3] = React.useState('');
  const [mfa, setmfa] = useState(false);
  const [qna1, setqna1] = useState("What is your grandfather's name?");
  const [qna2, setqna2] = useState("What is your childhood favourite toy?");
  const [qna3, setqna3] = useState("What is the first movie you ever watched?");
  const [qna4, setqna4] = useState("What is the name of your best friend?");
  const [qna5, setqna5] = useState("What is the name of your favourite car?");
  const [qna6, setqna6] = useState("What is your favourite game?");
  const [qna7, setqna7] = useState("What is your first school name?");
  const [qna8, setqna8] = useState("What is the name of your sibling?");
  const [qna9, setqna9] = useState("What is your favourite restaurant?");
  const [answer1, setanswer1] = useState('');
  const [answer2, setanswer2] = useState('');
  const [answer3, setanswer3] = useState('');
  const [validqna, setvalidqna] = useState(true);
  const qna_update_api = "https://h2om2rj43b.execute-api.us-east-1.amazonaws.com/HalifaxFoodie/halifaxfoodie/mfa/update";
  const history = useHistory();

  const handleCloseSelect = (event) => {
    setopenSelect1(false);
    setopenSelect2(false);
    setopenSelect3(false);
  };

  const handleOpenSelect = (event) => {
    console.log('In 105:' + event.target.id);
    console.log('In 105:' + event.target.value);
    if (event.target.id === "select1")
      setopenSelect1(true);
    if (event.target.id === "select2")
      setopenSelect2(true);
    if (event.target.id === "select3")
      setopenSelect3(true);
  };

  const handleChangeSelect = (event) => {
    console.log('In 115:' + event.target.id);
    console.log('In 115:' + event.target.value);
    if (openSelect1)
      setselectValue1(event.target.value);
    if (openSelect2)
      setselectValue2(event.target.value);
    if (openSelect3)
      setselectValue3(event.target.value);
  };

  const handleInput = (event) => {
    if (event.target.name === "username") {
      setusername(event.target.value);
      handleUsername(event.target.id, event.target.value);
    }
    if (event.target.name === "firstname") {
      setfirstname(event.target.value);
      handleUsername(event.target.id, event.target.value);
    }
    if (event.target.name === "lastname") {
      setlastname(event.target.value);
      handleUsername(event.target.id, event.target.value);
    }
    if (event.target.name === "password") {
      setpassword(event.target.value);
      handlePassword(event.target.value);
    }
    if (event.target.name === "email") {
      setemail(event.target.value);
      handleEmail(event.target.value);
    }
    if (event.target.name === "confirmPassword") {
      setconfirmPassword(event.target.value);
      handleConfirmPassword(event.target.value);
    }
    if (event.target.name === "tnc") {
      settnc(event.target.checked);
      handleTnC(event.target.checked);
    }
    if (event.target.name === "ans1") {
      setanswer1(event.target.value);
    }
    if (event.target.name === "ans2") {
      setanswer2(event.target.value);
    }
    if (event.target.name === "ans3") {
      setanswer3(event.target.value);
    }
  };

  const handleUsername = (nameValue, userName) => {
    let boolName = false;
    const regex = /^\w+$/;
    if (userName !== null && userName !== "") {
      boolName = regex.test(userName);
    }
    if (nameValue === "username") {
      setvalidUsername(boolName);
    }
    if (nameValue === "firstname") {
      setvalidFirstname(boolName);
    }
    if (nameValue === "lastname") {
      setvalidLastname(boolName);
    }
  };

  const handlePassword = (passWord) => {
    if (passWord !== null || passWord !== "") {
      const regex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[%$&!*@?])[A-Za-z\d@$!%*?&]{8,}$/;
      setvalidPassword(regex.test(passWord));
    }
  };

  const handleConfirmPassword = (passWord) => {
    if (passWord !== null && passWord !== "") {
      if (password === passWord) setvalidConfPwd(true);
      else setvalidConfPwd(false);
    } else {
      setvalidConfPwd(false);
    }
  };

  const handleEmail = (emailID) => {
    if (emailID !== null || emailID !== "") {
      const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
      setvalidEmail(regex.test(emailID));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUsername("firstname", firstname);
    handleUsername("lastname", lastname);
    handlePassword(password);
    handleConfirmPassword(confirmPassword);
    handleEmail(email);
    handleTnC(tnc);
    setOpen(false);

    if (tnc && email) {
      setmfa(true);
    }
  };

  const handleMFA = (event) => {
    event.preventDefault();
    console.log('273')
    console.log(mfa)
    console.log(email)
    console.log(password)
    if (mfa && validqna) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          console.log('Firebase create user');
          console.log(user);

          var json_body = {
            [selectValue1]: answer1,
            [selectValue2]: answer2,
            [selectValue3]: answer3,
          }
          json_body['email'] = email;
          json_body['status'] = 'inactive';

          console.log('json_body:' + json_body);
          //Storing user question and answers
          async function registerQna() {
            console.log('In axios auth')
            await axios.post(qna_update_api,
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
            setSuccess(true);
          }
          registerQna();
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          setOpen(true);
        });
    }
  }

  const handleSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
    history.push('/login');
  };

  const handleTnC = (tncValue) => {
    settnc(tncValue);
    setvalidTnC(tncValue);
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
                    REGISTRATION
                  </Box>
                </Typography>
              </Grid>

              <form>
                <div>
                  <TextField
                    label="Firstname"
                    placeholder="Enter first name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="firstname"
                    id="firstname"
                    error={!validFirstname}
                    helperText={
                      validFirstname
                        ? ""
                        : "Only alpha numeric characters are allowed!"
                    }
                    onChange={handleInput}
                  ></TextField>
                </div>
                <div>
                  <TextField
                    label="Lastname"
                    placeholder="Enter last name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="lastname"
                    id="lastname"
                    error={!validLastname}
                    helperText={
                      validLastname
                        ? ""
                        : "Only alpha numeric characters are allowed!"
                    }
                    onChange={handleInput}
                  ></TextField>
                </div>
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
                    error={!validPassword}
                    helperText={
                      validPassword
                        ? ""
                        : "Minimum 8 characters with one uppercase, one lowercase, one number and a special character!"
                    }
                    onChange={handleInput}
                  ></TextField>
                </div>
                <div>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    placeholder="Enter password"
                    name="confirmPassword"
                    id="confirmPassword"
                    variant="outlined"
                    margin="normal"
                    error={!validConfPwd}
                    helperText={validConfPwd ? "" : "Passwords do not match!"}
                    onChange={handleInput}
                  ></TextField>
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
                      <Link href="https://3912.cupe.ca/documents/collective-agreements/">
                        Agree to Terms and Conditions.
                      </Link>
                    </Box>
                  </Grid>
                </div>
                <p
                  className={validTnC ? "hidden" : "text-danger p-tag-alert"}
                  style={{ color: "red", "font-size": "x-small" }}
                >
                  Agree to the terms and conditions to register!
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
                      Sign up
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="warning">
                        User already registered!
                      </Alert>
                    </Snackbar>
                    <Snackbar open={success} autoHideDuration={750} onClose={handleSuccess}>
                      <Alert onClose={handleSuccess} severity="success">
                        Registration successfull!
                      </Alert>
                    </Snackbar>
                  </Grid>
                </div>
                <div>
                  Existing user?
                  <Link to="/login">
                    <span> Sign in!</span>
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
                    <InputLabel id="select1">QUESTION 1</InputLabel>
                    <Select
                      label="select1"
                      id="select1"
                      open={openSelect1}
                      onClose={handleCloseSelect}
                      onOpen={handleOpenSelect}
                      value={selectValue1}
                      onChange={handleChangeSelect}
                    >
                      <MenuItem value="qna1">{qna1}</MenuItem>
                      <MenuItem value="qna2">{qna2}</MenuItem>
                      <MenuItem value="qna3">{qna3}</MenuItem>
                    </Select>
                    <TextField
                      label="Answer"
                      placeholder="Enter answer for question 1"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      name="ans1"
                      id="ans1"
                      onChange={handleInput}
                    ></TextField>
                  </FormControl>
                  <FormControl>
                    <InputLabel id="select2">QUESTION 2</InputLabel>
                    <Select
                      labelId="select2"
                      id="select2"
                      open={openSelect2}
                      onClose={handleCloseSelect}
                      onOpen={handleOpenSelect}
                      value={selectValue2}
                      onChange={handleChangeSelect}
                    >
                      <MenuItem value="qna4">{qna4}</MenuItem>
                      <MenuItem value="qna5">{qna5}</MenuItem>
                      <MenuItem value="qna6">{qna6}</MenuItem>
                    </Select>
                    <TextField
                      label="Answer"
                      placeholder="Enter answer for question 2"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      name="ans2"
                      id="ans2"
                      onChange={handleInput}
                    ></TextField>
                  </FormControl>
                  <FormControl>
                    <InputLabel id="select3">QUESTION 3</InputLabel>
                    <Select
                      labelId="select3"
                      id="select3"
                      open={openSelect3}
                      onClose={handleCloseSelect}
                      onOpen={handleOpenSelect}
                      value={selectValue3}
                      onChange={handleChangeSelect}
                    >
                      <MenuItem value="qna7">{qna7}</MenuItem>
                      <MenuItem value="qna8">{qna8}</MenuItem>
                      <MenuItem value="qna9">{qna9}</MenuItem>
                    </Select>
                    <TextField
                      label="Answer"
                      placeholder="Enter answer for question 3"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      name="ans3"
                      id="ans3"
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
                          Registration successful!
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

export default Register;