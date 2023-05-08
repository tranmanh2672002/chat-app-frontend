import './App.css';

import { useState } from 'react';
import io from 'socket.io-client';
import ListMessage from './components/ListMessage';

const host = "http://localhost:3001";
const socket = io.connect(host);

function App() {
  const [isJoin, setIsJoin] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const joinRoom = () => {
    if (name !== '' && id !== '') {
      socket.emit('join_room', id);
      setIsJoin(true);
    }

  }


  return (
    <div className="App">
      <div className="App__wrapper">
        <div className="App__header">{id ? `Chat Room: ${id}` : "Chat app"}</div>
        {isJoin ? (<ListMessage socket={socket} name={name} id={id} />) : (<div className="App__content1">
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="input"
            placeholder="Nhập tên của bạn"
          />
          <input
            onChange={(e) => {
              setId(e.target.value);
            }}
            className="input"
            placeholder="Nhập mã số phòng"
          />
          <button onClick={joinRoom} className="button">
            Tham gia
          </button>
        </div>)}


      </div >
    </div>
  );
}

export default App;
