import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from "axios";
import { Grid, Card } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { FormControl, InputGroup } from "react-bootstrap";

const cardStyle = {
  padding: 50,
  height: "auto",
  width: "70%",
  margin: "15% auto",
};

function ML() {
  const cors_url = "https://cors-anywhere.herokuapp.com/"
  const reg_urlInterac = "https://us-central1-database-assignment-2-317714.cloudfunctions.net/serverlessautomlfunction";
  var [result, setResult] = useState("");
  var [resName, setResName] = useState("");
  var [temp, setTemp] = useState("");
  const submit = () => {
    async function storePaymentInterac() {
      const req = {
        "message": resName
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
        setResult(res.data)
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
      {/* <InputGroup>
        <FormControl id="resName" as="textarea" aria-label="With textarea" placeholder="Enter restaurant name..." style={{ marginBelow: "5%", marginTop: "5%", marginLeft: "auto", marginRight: "auto", maxWidth: "40%", backgroundColor: "lightgrey", fontStyle: "italic", fontSize: "20px", height: "155px" }} onChange={instructions} />
      </InputGroup> */}
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
        onClick={submit}>Train data</Button>
      <Grid container spacing={3}>
        <Grid item lg={3} md={3}></Grid>

        <Grid item xs={12} lg={6} md={6}>
          <Card style={cardStyle}>
            <Box
              fontFamily="Monospace"
              fontWeight="fontWeightBold"
              fontSize="h5.fontSize"
              m={1}
            >
              {result}
            </Box>
          </Card>

        </Grid>

        <Grid item lg={3} md={3}></Grid>
      </Grid>
    </div >
  );
}

export default ML;
