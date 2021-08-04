import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from "axios";
import { FormControl, InputGroup } from "react-bootstrap";

function WordCloud() {
  const cors_url = "https://cors-anywhere.herokuapp.com/"
  const reg_urlInterac = "https://16nu0sryn3.execute-api.us-east-1.amazonaws.com/wordWeb/wordweb";
  var [result, setResult] = useState("");
  var [resName, setResName] = useState("");
  var [temp, setTemp] = useState("");
  const submit = () => {
    async function storePaymentInterac() {
      const req = {
        "resName": resName
      }
      console.log(req)
      await axios.post(
        reg_urlInterac, req, {
        headers: {
          'content-type': 'application/json'
        }
      }
      ).then((res) => {
        console.log(res)
        setResult(JSON.parse(res.data.body).message)
      })
    }
    storePaymentInterac();
  }
  const instructions = () => {
    setResName(document.getElementById("resName").value);
    console.log(resName);
  }


  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Halifax Foodie</h1>
      <InputGroup>
        <FormControl id="resName"
          as="textarea"
          aria-label="With textarea"
          placeholder="Enter restaurant name..."
          style={{
            marginBelow: "5%",
            marginTop: "5%",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "30%",
            backgroundColor: "lightgrey",
            fontStyle: "italic",
            fontSize: "20px",
            height: "auto"
          }} onChange={instructions} />
      </InputGroup>
      <Button variant="success" style={{ marginTop: "2%" }}
        onClick={submit}>Get Popular dishes</Button>
      <div className="d-flex justify-content-center" style={{ marginLeft: "5%" }}>
        <img alt="" src={result} />
      </div>
    </div>
  );
}

export default WordCloud;
