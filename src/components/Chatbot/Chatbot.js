import React, { Component } from "react";
import "./Chatbot.scss";
import { ChatBot } from "aws-amplify-react";

class Chatbot extends Component {
  state = {};

  render() {
    return (
      <ChatBot
        title="Halifax Foodie Bot"
        botName="HalifaxFoodie"
        welcomeMessage="Welcome, how can I help you today?"
        clearOnComplete={true}
      />
    );
  }
}

export default Chatbot;
