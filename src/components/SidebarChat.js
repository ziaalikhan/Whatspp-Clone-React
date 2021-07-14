import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar, IconButton } from "@material-ui/core";
import db from "../config/firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [messages, setMessages] = useState("");

  // Avatars //
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  // Avatars //

  useEffect(() => {
    if(id){
        db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
            setMessages(snapshot.docs.map((doc) => doc.data()))
        })
    }
}, [id]);

  const createChat = () => {
    const roomName = prompt("Please Enter Name for Chat");
    if (roomName) {
      //  Database Stuff...
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <IconButton>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        </IconButton>
        <div className="sidebarChat_info">
          <h3>{name}</h3>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h3>Add New Chat</h3>
    </div>
  );
}

export default SidebarChat;
