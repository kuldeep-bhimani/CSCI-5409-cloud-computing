import React from "react";
import Card2 from "./Card2";
import SwipeButton from "./SwipeButton";
import "../../App.css";
import Navbar from "./Navbar";
const Home = () => {
  return (
    <div className="App">
      <Navbar /> <Card2 /> <SwipeButton />
    </div>
  );
};

export default Home;
