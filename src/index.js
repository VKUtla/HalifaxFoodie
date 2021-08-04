import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);
Amplify.configure({
  Auth: {
    identityPoolId: "us-east-1:0272d242-06d9-4c71-8577-3a0acac97cd2",
    region: "us-east-1",
  },
  Interactions: {
    bots: {
      HalifaxFoodie: {
        name: "HalifaxFoodie",
        alias: "$LATEST",
        region: "us-east-1",
      },
    },
  },
});

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2N2LomiPKSZQBk754dbEsApK7uFpBV7Q",
  authDomain: "halifax-foodie-be1ec.firebaseapp.com",
  projectId: "halifax-foodie-be1ec",
  storageBucket: "halifax-foodie-be1ec.appspot.com",
  messagingSenderId: "426688669509",
  appId: "1:426688669509:web:3b175528a6a0625638402c",
  measurementId: "G-JB6T0RY2TZ",
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
