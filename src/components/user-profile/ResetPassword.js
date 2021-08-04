import React from "react";
import { Link } from "react-router-dom";
import {
    Grid,
    TextField,
    Card,
    Button,
} from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import LockOpenIcon from '@material-ui/icons/LockOpen';
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
    root: {
        width: '100%',
        maxWidth: 500,
    },
}));

function ResetPassword() {
    const cardStyle = {
        padding: 50,
        height: "auto",
        width: "55%",
        margin: "15% auto",
    };

    const avatarStyle = { backgroundColor: "#000000" };
    const classes = useStyles();
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [email, setemail] = useState("");
    const [otp, setotp] = useState("");
    const [mailSent, setmailSent] = useState(false);
    const [otpVerified, setotpVerified] = useState(false);
    const [resetSuccessful, setresetSuccessful] = useState(false);
    const [validEmail, setvalidEmail] = useState(true);
    const [validOTP, setvalidOTP] = useState(true);
    const [validPassword, setvalidPassword] = useState(true);
    const [validConfPwd, setvalidConfPwd] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [openWrong, setopenWrong] = useState(false);
    const [resetAlert, setresetAlert] = useState(false);

    const handleInput = (event) => {
        if (event.target.name === "otp") {
            setotp(event.target.value);
            handleOTP(event.target.value);
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
    };

    const handlePassword = (passWord) => {
        if (passWord) {
            const regex =
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[%$&!*@?])[A-Za-z\d@$!%*?&]{8,}$/;
            setvalidPassword(regex.test(passWord));
        }
    };

    const handleConfirmPassword = (passWord) => {

        if (passWord) {

            if (password === passWord) setvalidConfPwd(true);
            else setvalidConfPwd(false);
        }
    };

    const handleEmail = (emailID) => {
        if (emailID !== null || emailID !== "") {
            const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
            setvalidEmail(regex.test(emailID));
        }
    };

    const handleOTP = (otp) => {
        if (otp !== null || otp !== "") {
            const regex = /^\d{6,6}$/;
            setvalidOTP(regex.test(otp));
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setopenWrong(false);
        setOpen(false);
    };

    const handleResetClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setresetAlert(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handlePassword(password);
        handleConfirmPassword(confirmPassword);
        handleEmail(email);
        setOpen(false);
        setOpen(false);

        if (validEmail && !mailSent && !otpVerified) {
            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    // Password reset email sent!
                    console.log(email);
                    console.log('Mail sent');
                    setmailSent(true);
                    setresetSuccessful(true);
                    setOpen(true);
                    setopenWrong(false);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                    setopenWrong(true);
                });
        }
    };

    if (!mailSent) {
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
                                        PASSWORD RESET
                                    </Box>
                                </Typography>
                            </Grid>
                            <form>
                                <div>
                                    <Typography variant="body2" gutterBottom align="left">
                                        <Box color="primary.main" fontWeight="fontWeightBold" m={1} fontSize="h8.fontSize">
                                            Please enter your email address to receive a password reset link.
                                        </Box>
                                    </Typography>
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
                                    <Grid align="center">
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            onClick={handleSubmit}
                                            className={classes.margin}
                                            endIcon={<Icon>send</Icon>}
                                        >
                                            Send
                                        </Button>
                                        <div>
                                            <Snackbar open={openWrong} autoHideDuration={3000} onClose={handleClose}>
                                                <Alert onClose={handleClose} severity="error">
                                                    Email does not exist. Please register!
                                                </Alert>
                                            </Snackbar>
                                        </div>
                                    </Grid>
                                </div>
                                <div>
                                    Want to go back to login?
                                    <Link to="/login">
                                        <span> Sign in!</span>
                                    </Link>
                                </div>
                            </form>
                        </Card>
                    </Grid>
                    <Grid item lg={3} md={3}></Grid>
                </Grid>
            </div >
        );
    } else if (otpVerified && !resetSuccessful) {
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
                                        PASSWORD RESET
                                    </Box>
                                </Typography>
                            </Grid>
                            <form>
                                <div>
                                    <Typography variant="body2" gutterBottom align="left" color="success.main">
                                        <Box color="success.main" fontWeight="fontWeightBold" m={1} fontSize="h8.fontSize">
                                            OTP verified successfully. You can reset your password.
                                        </Box>
                                    </Typography>
                                </div>
                                <div>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        placeholder="Enter password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        variant="outlined"
                                        margin="normal"
                                        error={!validPassword}
                                        helperText={validPassword ? "" : "Minimum 8 characters with one uppercase, one lowercase, one number and a special character!"}
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
                                        value={confirmPassword}
                                        variant="outlined"
                                        margin="normal"
                                        error={!validConfPwd}
                                        helperText={validConfPwd ? "" : "Passwords do not match!"}
                                        onChange={handleInput}
                                    ></TextField>
                                </div>
                                <div>
                                    <Grid align="center">
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            onClick={handleSubmit}
                                            className={classes.margin}
                                            endIcon={<LockOpenIcon />}
                                        >
                                            Reset
                                        </Button>
                                        <Snackbar open={resetAlert} autoHideDuration={6000} onClose={handleResetClose}>
                                            <Alert onClose={handleResetClose} severity="warning">
                                                Enter and confirm your password!
                                            </Alert>
                                        </Snackbar>
                                    </Grid>
                                </div>
                                <div>
                                    Want to go back to login?
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
    } else if (resetSuccessful) {
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
                                        PASSWORD RESET
                                    </Box>
                                </Typography>
                            </Grid>
                            <div>
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="success">
                                        Password reset link sent successfully!
                                    </Alert>
                                </Snackbar>
                            </div>
                            <div>
                                Want to go back to login?
                                <Link to="/login">
                                    <span> Click here!</span>
                                </Link>
                            </div>

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
                                        PASSWORD RESET
                                    </Box>
                                </Typography>
                            </Grid>
                            <form>
                                <div>
                                    <Typography variant="body2" gutterBottom align="left">
                                        <Box color="primary.main" fontWeight="fontWeightBold" m={1} fontSize="h8.fontSize">
                                            Please enter the Otp that has been sent to your email address.
                                        </Box>
                                    </Typography>
                                </div>
                                <div>
                                    <TextField
                                        label="OTP"
                                        placeholder="Enter One time password"
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        name="otp"
                                        id="otp"
                                        value={otp}
                                        error={!validOTP}
                                        helperText={validOTP ? "" : "Enter only numbers."}
                                        onChange={handleInput}
                                    ></TextField>
                                </div>
                                <div>
                                    <Grid align="center">
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            onClick={handleSubmit}
                                            className={classes.margin}
                                            endIcon={<VerifiedUserIcon></VerifiedUserIcon>}
                                        >
                                            Verify OTP

                                        </Button>
                                        <div>
                                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                                <Alert onClose={handleClose} severity="error">
                                                    Invalid OTP!
                                                </Alert>
                                            </Snackbar>
                                        </div>
                                    </Grid>
                                </div>
                                <div>
                                    Want to go back to login?
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
    }
}

export default ResetPassword;