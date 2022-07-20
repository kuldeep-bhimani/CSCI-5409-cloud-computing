import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import "./Card2.css";

const Card2 = () => {
  const [users, setUsers] = useState([
    {
      name: "kishan",
      url: "https://images.unsplash.com/photo-1656947149483-f0f4af8f6f59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Savaliya",
      url: "https://images.unsplash.com/photo-1656866694773-76ce55a76559?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    },
  ]);

  const swiped = (direction, name) => {
    console.log("removing:" + name + " to: " + direction);
  };

  const outOfFrame = (name) => {
    console.log("left: " + name);
  };

  return (
    <div className="tinderCard">
      <div className="tinderCard__cardContainer">
        {users.map((user) => {
          return (
            <TinderCard
              className="swipe"
              key={user.name}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swiped(dir, user.name)}
              onCardLeftScreen={() => outOfFrame(user.name)}
            >
              <div
                style={{ backgroundImage: `url(${user.url})` }}
                className="card"
              >
                <h3>{user.name}</h3>
              </div>
            </TinderCard>
          );
        })}
      </div>
    </div>
  );
};

export default Card2;
