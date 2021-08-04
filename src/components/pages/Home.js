import React from "react";
import { Grid, Card } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import markit_logo from "../images/markit_logo.png";
import Chatbot from "../Chatbot/Chatbot";

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
}));

const cardStyle = {
  padding: 50,
  height: "auto",
  width: "50%",
  margin: "15% auto",
};

const Home = () => {
  const classes = useStyles();
  const avatarStyle = { backgroundColor: "#000000" };

  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item lg={3} md={3}></Grid>

        <Grid item xs={12} lg={6} md={6}>
          <Card style={cardStyle}>
            <Grid align="center">
              <Avatar
                alt=""
                src={markit_logo}
                style={avatarStyle}
                className={classes.large}
              ></Avatar>
              <Typography variant="body1" gutterBottom>
                <Box
                  fontFamily="Monospace"
                  fontWeight="fontWeightBold"
                  fontSize="h5.fontSize"
                  m={1}
                >
                  WELCOME TO HALIFAX FOODIE
                </Box>
              </Typography>
            </Grid>
          </Card>
        </Grid>

        <Grid item lg={3} md={3}></Grid>
      </Grid>

      {sessionStorage.getItem("markit-email") !== "" ? <Chatbot /> : null}
    </div>
  );
};

export default Home;
