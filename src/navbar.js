import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import FastfoodIcon from '@material-ui/icons/Fastfood';
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NavigationBar = () => {
    const [display, setdisplay] = useState(false);
    const [number, setNumber] = useState(0);
    const [success, setSuccess] = React.useState(false);
    const history = useHistory();
    const user = firebase.auth().currentUser;

    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
    } else {
        // No user is signed in.
    }
    if (sessionStorage.getItem('markit-email') === null) {
        sessionStorage.setItem('markit-email', "");
    }
    const handleSuccess = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };
    const increment = () => {
        if (sessionStorage.getItem('markit-email') === "") {
            setNumber(number + 1);
            setdisplay(false);
        }
        else {

            setdisplay(true);
        }
    }

    const handleToggle = () => {

        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            if (sessionStorage.getItem('markit-email')) {
                setdisplay(false);
                sessionStorage.setItem('markit-email', "");
                setSuccess(true);
            }
        }).catch((error) => {
            // An error happened.
        });
    }

    useEffect(() => {
        increment();
    }, [number])

    switch (sessionStorage.getItem('markit-email') !== "") {
        case true:
            return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                    <Container>
                        <Navbar.Brand href="/" style={{ 'color': '#ffffff' }}>
                            Halifax
                            <FastfoodIcon fontSize="large"></FastfoodIcon>
                            Foodie
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link href="/">HOME</Nav.Link>
                                <Nav.Link href="/#/wordcloud">WORD CLOUD</Nav.Link>
                                <Nav.Link href="/#/ml">ML</Nav.Link>
                                <Nav.Link href="/#/user">USER</Nav.Link>
                                <Nav.Link href="/#/admin">ADMIN</Nav.Link>
                                <Nav.Link href="/#/reset">RESET</Nav.Link>
                                <Nav.Link href="/#/login" onClick={handleToggle}>LOGOUT</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            );
        default:
            return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                    <Container>
                        <Navbar.Brand href="/" style={{ 'color': '#FFA500' }}>
                            Halifax
                            <FastfoodIcon fontSize="large"></FastfoodIcon>
                            Foodie
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link href="/">HOME</Nav.Link>
                                <Nav.Link href="/#/login" >SIGN IN</Nav.Link>
                                <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccess}>
                                    <Alert onClose={handleSuccess} severity="success">
                                        Logged out successfully!''
                                    </Alert>
                                </Snackbar>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            );
    }
}
export default NavigationBar;