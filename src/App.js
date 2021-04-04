import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function App() {

  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [friendList, setFriendList] = useState([])

  const addFriend = () =>{
    Axios.post('https://learn-mern-pawan.herokuapp.com/insert',{
      name: name,
      age: age
    })
    .then((response)=>{
      setFriendList([...friendList, {_id: response.data._id ,name: name, age: age}])
    })
    .catch((e)=>{
      alert(e);
    })
  }

  const updateFriend = (id) =>{
    const newAge = prompt('enter new age ');

    Axios.put('https://learn-mern-pawan.herokuapp.com/update',{
      newAge: newAge,
      id: id
    })
    .then(()=>{
      setFriendList(friendList.map((val)=>{
        return val._id == id 
        ? {_id: id, name:val.name, age: newAge} 
        : val
      }))
    })
  }

  const deleteFriend = (id) =>{
    Axios.delete(`https://learn-mern-pawan.herokuapp.com/delete/${id}`)
    .then(()=>{
      setFriendList(friendList.filter((val)=>{
        return val._id != id 
      }))
    })
  }

  useEffect(()=>{
    Axios.get('https://learn-mern-pawan.herokuapp.com/read')
    .then((response)=>{
      setFriendList(response.data)
    })
    .catch((e)=>{
      alert(e);
    })
  },[])

  return (
    <div className="App">
      <input type="text" placeholder="friend name" 
      onChange={(e)=>{
        setName(e.target.value)
      }}
      />
      <input type="number" placeholder="friend age"
      onChange={(e)=>{
        setAge(e.target.value)
      }}
      />
      <button onClick={addFriend}>Add Friend</button>
      <br/>
      <div className="friend-list">
      {friendList.map((friend)=>{
        return (
        <div style={{display:'flex'}}>
          <div style={{padding: '10px'}}> {friend.name} = {friend.age} </div>
          <button onClick={() =>{updateFriend(friend._id)}}>Update</button>
          <button onClick={() =>{deleteFriend(friend._id)}}>X</button>
        </div>
        )
      })}

      </div>
    </div>
  );
}

export default App;
