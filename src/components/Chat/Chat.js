import React, { useEffect, useState } from "react";
import "./Chat.scss";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";

const useStyles = makeStyles({
  chatArea: {
    width: "100%",
  },
  rightBorder: {
    borderRight: "1px solid #e0e0e0",
  },
  messageSpace: {
    height: "70vh",
    overflowY: "auto",
  },
  listItem: {
    paddingTop: "0px",
    paddingBottom: "0px",
  },
});

const Chat = ({ currentUserType, loggedInUserId }) => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const classes = useStyles();
  const ADMIN_USER_ID = "halifax_foodie";
  const NORMAL_USER = "user";
  let timer = null;
  let activeUsersTimer = null;

  useEffect(() => {
    if (currentUserType === NORMAL_USER) {
      setSelectedUser(ADMIN_USER_ID);
    }

    if (timer === null) {
      timer = setInterval(fetchChatMessages, 1000);
    }

    return () => {
      clearInterval(timer);
      clearInterval(activeUsersTimer);
    };
  }, [currentUserType]);

  const fetchChatMessages = () => {
    const subscriptionId = loggedInUserId + "-sub";

    axios
      .get(
        `https://us-central1-csci5410.cloudfunctions.net/pull_messages?subscription_id=${subscriptionId}`
      )
      .then((res) => {
        const jsonData = res.data;
        if (jsonData.hasOwnProperty("message")) {
          setChatMessages((chatMessages) => [
            ...chatMessages,
            JSON.parse(jsonData["message"]),
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPeopleJSX = () => {
    if (currentUserType === NORMAL_USER) {
      return (
        <>
          <ListItem selected button>
            <ListItemIcon>
              <AccountCircleIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Halifax Foodie">Halifax Foodie</ListItemText>
          </ListItem>
        </>
      );
    }

    let users = [];
    chatMessages.forEach((item) => {
      if (item.receiver === loggedInUserId && !users.includes(item.sender)) {
        users.push(item.sender);
      }
    });

    return users.map((item, key) => (
      <ListItem
        selected={selectedUser === item}
        button
        key={key}
        onClick={() => setSelectedUser(item)}
      >
        <ListItemIcon>
          <AccountCircleIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText primary={item}>{item}</ListItemText>
      </ListItem>
    ));
  };

  const getChatJSX = () => {
    const getChatSlide = (alignment, message, key) => {
      return (
        <ListItem className={classes.listItem} key={key}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align={alignment} primary={message}></ListItemText>
              <Divider />
              <Divider />
            </Grid>
          </Grid>
        </ListItem>
      );
    };

    if (selectedUser === "") return;
    let chats = chatMessages.filter(
      (item) =>
        (item.sender === selectedUser && item.receiver === loggedInUserId) ||
        (item.sender === loggedInUserId && item.receiver === selectedUser)
    );

    return chats.map((item, key) =>
      getChatSlide(
        item.sender === loggedInUserId ? "right" : "left",
        item.message,
        key
      )
    );
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const data = {
      sender: loggedInUserId,
      receiver: selectedUser,
      message,
    };

    axios
      .get(
        `https://us-central1-csci5410.cloudfunctions.net/send_message?topic_id=${selectedUser}&message=${JSON.stringify(
          data
        )}`
      )
      .then((res) => {
        setChatMessages((chatMessages) => [...chatMessages, data]);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="chat-content container">
      <Grid container className="mb-2">
        <Grid item xs={12}>
          <Typography variant="h5">Chat here</Typography>
        </Grid>
      </Grid>

      <Grid container component={Paper} className={classes.chatArea}>
        <Grid item xs={3} className={classes.rightBorder}>
          <List>
            <ListItem key="logged-in-person">
              <ListItemIcon>
                <AccountCircleIcon fontSize="large" color="primary" />
              </ListItemIcon>
              <ListItemText primary="You"></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Divider />
          <List>{getPeopleJSX()}</List>
        </Grid>

        <Grid item xs={9}>
          <List className={classes.messageSpace}>{getChatJSX()}</List>

          {selectedUser !== "" ? (
            <>
              <Divider />
              <Divider />
              <form onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
            </>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
