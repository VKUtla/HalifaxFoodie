import React from "react";
import { Link } from "react-router-dom";
import {
    Grid,
    TextField,
    Card,
    Button,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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

function MFA() {
    const cardStyle = {
        padding: 50,
        height: "auto",
        width: 350,
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
    const [qna1, setqna1] = useState("What is your grandfather's name?");
    const [qna2, setqna2] = useState("What is your childhood favourite toy?");
    const [qna3, setqna3] = useState("What is the first movie you ever watched?");
    const [qna4, setqna4] = useState("What is the name of your best friend?");
    const [qna5, setqna5] = useState("What is the name of your favourite car?");
    const [qna6, setqna6] = useState("What is your favourite game?");
    const [qna7, setqna7] = useState("What is your first school name?");
    const [qna8, setqna8] = useState("What is the name of your youngest/eldest sibling?");

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const history = useHistory();

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
                    sessionStorage.setItem('markit-email', email);
                    setSuccess(true);
                    // ...
                })
                .catch((error) => {
                    setOpen(true);
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
    };

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

    const handleSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        history.push('/home');
    };

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
                                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickMenu}>
                                    CLICK TO SELECT QUESTION!
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                >
                                    <MenuItem onClick={handleCloseMenu}>{qna1}</MenuItem>
                                    <MenuItem onClick={handleCloseMenu}>{qna2}</MenuItem>
                                    <MenuItem onClick={handleCloseMenu}>{qna3}</MenuItem>
                                    <MenuItem onClick={handleCloseMenu}>{qna4}</MenuItem>
                                    <MenuItem onClick={handleCloseMenu}>{qna5}</MenuItem>
                                    <MenuItem onClick={handleCloseMenu}>{qna6}</MenuItem>
                                    <MenuItem onClick={handleCloseMenu}>{qna7}</MenuItem>
                                    <MenuItem onClick={handleCloseMenu}>{qna8}</MenuItem>
                                </Menu>
                            </div>
                            <div>
                                <TextField
                                    label="Qna1"
                                    placeholder="Enter your "
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
}

export default MFA;