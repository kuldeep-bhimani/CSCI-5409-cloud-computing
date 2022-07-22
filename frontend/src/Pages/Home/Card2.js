import React, { useState,useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./Card2.css";

const Card2 = () => {

  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/allusers',{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=>response.json()).then(result=>setUsers(result.Items))
  },[])

  
  

  const swiped = (direction, name, email) => {
    console.log("removing:" + name + " to: " + direction);
      // add to liked array
      fetch('http://localhost:5000/updatelikes',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email,
          sEmail:localStorage.getItem("email")
        })
      })
  };

  const outOfFrame = (name) => {
    console.log("left: " + name);
  };

  return (
    <div className="tinderCard">
      <div className="tinderCard__cardContainer">
        {users.map((user,index) => {
          console.log(user)
          return (
            <TinderCard
              className="swipe"
              key={index}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swiped(dir, user.name.S,user.email.S)}
              onCardLeftScreen={() => outOfFrame(user.name.S)}
            >
              <div
                style={{ backgroundImage: `url('${user.imgurl.S}')` }} //https://codematcherprofile.s3.amazonaws.com/dd3746b70824045d558a66161f40f25b.png
                className="card"
              >
               <meta name="referrer" content="same-origin" />
              
                <h3>{user.name.S}</h3>
              </div>
            </TinderCard>
          );
        })}
      </div>
    </div>
  );
};

export default Card2;
