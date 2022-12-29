import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  //send message and display
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      //add your own message after emit
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  //wait if emit change, listen for any emit call from backend with data
  useEffect(() => {
    //eventListener for only return 1 message
    const eventListener = (data) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", eventListener);
    return () => socket.off("receive_message", eventListener);
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>{`Live Chat - Room: ${room}`}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            //back-end send "data" to front end
            return (
              //username is a the user who using this (from props we passed in APP.js)
              <div className="message" id={username === messageContent.author ? "other" : "you"}>
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}
