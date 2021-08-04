import React from "react";
import {
    Grid,
    TextField,
    Card,
    Button,
    ButtonGroup
} from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { useState, useEffect } from "react";
import axios from 'axios';
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
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function Profile() {
    const cardStyle = {
        padding: 50,
        width: 400,
        margin: "15% auto",
    };
    const avatarStyle = { backgroundColor: "#000000" };
    const classes = useStyles();

    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [validPassword, setvalidPassword] = useState(true);
    const [validFirstname, setvalidFirstname] = useState(true);
    const [validLastname, setvalidLastname] = useState(true);
    const [validConfPwd, setvalidConfPwd] = useState(true);
    const [validEmail, setvalidEmail] = useState(true);
    const [validTnC, setvalidTnC] = useState(true);
    const [tnc, settnc] = useState(false);
    const [userDetails, setuserDetails] = useState({
        firstname: "",
        lastname: "",
        email: ""
    })
    const [makeVisible, setmakeVisible] = useState("visible");
    const [makeInvisible, setmakeInvisible] = useState("hidden");
    const [triggerUseEffect, settriggerUseEffect] = useState(true);
    const user_profile_api = "/api/profile/user-details";
    const profile_update_api = "/api/profile/update-user";
    const [success, setSuccess] = React.useState(false);

    const handleInput = (event) => {
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
    };

    const handleUsername = (nameValue, userName) => {
        let boolName = false;
        const regex = /^[a-z\d_\s]+$/i;
        if (userName !== null && userName !== "") {
            boolName = regex.test(userName);
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

    const handleSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {}
        if (firstname) {
            body['firstname'] = firstname;
        }
        if (lastname) {
            body['lastname'] = lastname;
        }
        if (email) {
            body['email'] = email;
        }

        if (firstname || lastname || email) {
            async function authenticateUser() {
                await axios.put(profile_update_api, body
                    , { headers: { 'email': userDetails.email } })
                    .then((response) => {
                        if (response.status === 200) {
                            console.log('Profile updated successful!');
                            handleEdit();
                            setSuccess(true);
                            setuserDetails({
                                ...userDetails,
                                firstname: response.data.result[0].firstname,
                                lastname: response.data.result[0].lastname,
                                email: response.data.result[0].email
                            })
                            if (email) {
                                sessionStorage.setItem(response.data.result[0].email);
                            }
                        } else if (response.status === 404) {
                            console.log('Profile not found');
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
            }
            authenticateUser();
        }
    };

    const handleTnC = (tncValue) => {
        settnc(tncValue);
        setvalidTnC(tncValue);
    };

    const handleEdit = () => {
        if (triggerUseEffect) {
            settriggerUseEffect(false);
            setmakeVisible("hidden");
            setmakeInvisible("visible");
        } else {
            settriggerUseEffect(true);
            setmakeVisible("visible");
            setmakeInvisible("hidden");
        }
    }

    useEffect(() => {
        async function authenticateUser() {
            await axios.post(user_profile_api,
                {
                    email: sessionStorage.getItem('markit-email')
                })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        console.log('Profile retrival successful!');
                        console.log(response.data.result);
                        setuserDetails({
                            ...userDetails,
                            firstname: response.data.result[0].firstname,
                            lastname: response.data.result[0].lastname,
                            email: response.data.result[0].email
                        })
                        console.log(userDetails);
                    } else if (response.status === 404) {
                        console.log('Profile not found');
                    }
                }).catch((error) => {
                    console.log(error);
                });
        }
        authenticateUser();
    }, [triggerUseEffect])

    if (triggerUseEffect) {
        return (
            <div >
                <Grid container spacing={3}>
                    <Grid item lg={3} md={3} sm={2}></Grid>
                    <Grid item xs={12} lg={6} md={6}>
                        <Card style={cardStyle}>
                            <Grid align="center">
                                <Avatar alt="" src={markit_logo} style={avatarStyle} className={classes.large}></Avatar>
                                <Typography variant="body1" gutterBottom >
                                    <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="h5.fontSize" m={1}>
                                        YOUR MARKIT PROFILE
                                    </Box>
                                </Typography>
                            </Grid>
                            <form>
                                <div align="left">
                                    <Typography variant="body1" gutterBottom >
                                        <Box fontSize="h6.fontSize" visibility="visible" m={1}>
                                            Welcome {userDetails.firstname}, {userDetails.lastname}.
                                        </Box>
                                    </Typography>
                                    <Typography variant="body1" gutterBottom >
                                        <Box fontWeight="Italic" visibility="visible" fontSize="h6.fontSize" m={1}>
                                            Your contact details in our application is registered as {userDetails.email}.
                                        </Box>
                                    </Typography>
                                </div>
                                <div>
                                    <Grid align="center">

                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            onClick={handleEdit}
                                            className={classes.margin}
                                            endIcon={<EditOutlinedIcon>send</EditOutlinedIcon>}
                                        >
                                            EDIT DETAILS
                                        </Button>
                                        <Snackbar open={success} autoHideDuration={750} onClose={handleSuccess}>
                                            <Alert onClose={handleSuccess} severity="success">
                                                Profile updated successfully!''
                                            </Alert>
                                        </Snackbar>
                                    </Grid>
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
                    <Grid item lg={3} md={3} sm={2}></Grid>
                    <Grid item xs={12} lg={6} md={6}>
                        <Card style={cardStyle}>
                            <Grid align="center">
                                <Avatar alt="" src={markit_logo} style={avatarStyle} className={classes.large}></Avatar>
                                <Typography variant="body1" gutterBottom >
                                    <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="h5.fontSize" m={1}>
                                        UPDATE PROFILE
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid align="left">
                                <Typography variant="body1" gutterBottom >
                                    <Box fontFamily="Monospace" fontWeight="fontWeightBold" color="primary.main" fontSize="h8.fontSize" m={1}>
                                        Enter the details that you want to update in markit profile and click apply.
                                    </Box>
                                </Typography>
                            </Grid>
                            <form>
                                <div>
                                    <Box visibility={makeInvisible}>
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
                                    </Box>
                                </div>
                                <div>
                                    <Box visibility={makeInvisible}>
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
                                    </Box>
                                </div>
                                {/* <div>
                                    <Box visibility={makeInvisible}>
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
                                    </Box>
                                </div> */}
                                <div>
                                    <Grid align="center">
                                        <Box visibility={makeInvisible}>
                                            <ButtonGroup

                                                color="primary"
                                                aria-label="vertical outlined primary button group"
                                            >

                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={handleSubmit}
                                                    className={classes.margin}
                                                    endIcon={<Icon>send</Icon>}
                                                >
                                                    APPLY
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    variant="outlined"
                                                    onClick={handleEdit}
                                                    className={classes.margin}
                                                    endIcon={<CancelOutlinedIcon>send</CancelOutlinedIcon>}
                                                >
                                                    CANCEL
                                                </Button>

                                            </ButtonGroup>
                                        </Box>
                                    </Grid>
                                </div>
                            </form>
                        </Card>
                    </Grid>

                    <Grid item lg={3} md={3}></Grid>
                </Grid>
            </div >
        );
    }
}

export default Profile;
