import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {ReactComponent as LoginFooter} from "../resources/footer_login.svg";

import "./Login.css"
const urlLogin = "http://localhost:8000/api/user/login"

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(urlLogin, {
        body: JSON.stringify({ 
          "username": username,
          "password": password 
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST"
    }).then(response => {
      if (response.status === 200 ) {
        return response.json();
      } else {
        alert("Invalid username or password");
        return;
      }
    }).then(data => {
      if (data.token === undefined) {
        alert("Invalid username or password");
        return;
      }
      console.log(data.token)
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      window.location.href = "/";
    }).catch(error => {
      console.log("error: ", error);
    }
    );
  }

  return (
    <div className="Login">
      <h1>Sign in</h1>
      <br></br>
      <p>Sign in and start managing your farm!</p>
      <Form onSubmit={handleSubmit} className = "formLogin">
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className="usernameInput"
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="usernameInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button block type="submit" disabled={!validateForm()} className="loginButton">
          Login
        </Button>
      </Form>
      <LoginFooter className="loginFooter" 
          preserveAspectRatio="xMinYMin slice"
          width="100%"/>
    </div>

  );

}



