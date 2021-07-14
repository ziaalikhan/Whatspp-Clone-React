import React,{useState,useEffect} from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import SidebarChat from './SidebarChat';
import db from '../config/firebase';
import {useStateValue} from '../store/StateProvider';


function Sidebar() {

  const [{user}, dispatch] = useStateValue();



  const [rooms, setRooms] = useState([]);

  useEffect(()=> {
  const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => (
      setRooms(snapshot.docs.map(doc => (
        {
          id: doc.id,
          data: doc.data(),
        }
      )))
    ));
    return() => {
      unsubscribe();
    }
  },[])



  return (
    <div className="sidebar">
      <div className="sidebar_Header">
        <IconButton>
        <Avatar src={user?.photoURL} />
        </IconButton>
        <h3 className='header_name'>{user?.displayName}</h3>
        <div className="sidebar_header_Right">
            {/* Header Icons */}
            <IconButton>
            <DonutLarge />
            </IconButton >
            <IconButton>
            <Chat />
            </IconButton >
            <IconButton>
            <MoreVert />
            </IconButton >  
        </div>
      </div>
      <div className="sidebar_search">
          {/* Search */}
          <div className="sidebar_search_container">
            
            <SearchOutlined />
            <input type="text" placeholder='Search or start new chat' />
          </div>
      </div>
      <div className="sidebar_chats">
        {/* SidebarChat Component */}
        <SidebarChat addNewChat />
        {
          rooms.map(room => (
            <SidebarChat key={room.id} id={room.id}
            name={room.data.name}/>
          ))
        }
       
      
      </div>
    </div>
  );
}

export default Sidebar;
