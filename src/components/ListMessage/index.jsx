import { useEffect, useRef, useState } from "react";
import "./style.css";

function ListMessage({ socket, name, id }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);

  const messagesEndRef = useRef();

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: id,
        username: name,
        message: currentMessage,
        time: new Date().getHours() + ":" + new Date().getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setListMessage((message) => [...message, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (messageData) => {
      console.log(messageData);
      setListMessage((message) => [...message, messageData]);
    });
  }, [socket]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("bottom");
  };

  useEffect(() => {
    scrollToBottom();
    console.log("bottom");
  }, [listMessage]);

  return (
    <>
      <div className="App__content2">
        <div className="list_mes style-1">
          {listMessage.map((message, index) => {
            return (
              <>
                <span
                  key={index}
                  className={message.username === name ? "mes__me" : "mes__you"}
                >
                  {message.message}
                </span>
                <span
                  key={index}
                  className={
                    message.username === name ? "title__me" : "title__you"
                  }
                >
                  {message.username + " "}
                  {message.time}
                </span>
              </>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="bottom">
          <input
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
            className="bottom__input"
            placeholder="message..."
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage(event.target.value);
            }}
          />
          <button onClick={sendMessage} className="button__btn">
            Gửi
          </button>
        </div>
      </div>
    </>
  );
}

export default ListMessage;
