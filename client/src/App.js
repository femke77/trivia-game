import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from '../src/pages/homepage';


import Signup from "../src/pages/Signup.jsx";
import Login from "../src/pages/Login.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import myImage from "./Trivia.png";

import Quiz from "./pages/Quiz";

import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="logo">
        <img src={myImage} alt="Triva Logo" />
      </div>
      <div className="tctr">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
