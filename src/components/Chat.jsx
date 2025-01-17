import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, createSocketConnection } from "../utils/constants";
import { useSelector } from "react-redux";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  console.log(user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log(chat.data.messages);
    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg.senderId.firstName,
        lastName: msg.senderId.lastName,
        text: msg.text,
        time : new Date(msg.updatedAt).toLocaleTimeString(),
      };
    });
    setMessage(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " " + text);
      setMessage((message) => [...message, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName : user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <>
      <div className="bg-gray-800 w-1/3 ml-96 h-[50vh] mt-10 p-4 overflow-y-auto">
        {message.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              user.firstName === msg.firstName ? "items-end" : "items-start"
            } mb-4`}
          >
            <div className="text-white">
              {msg.firstName + " " + msg.lastName}
              <time className="text-xs opacity-50 ml-2">{msg.time}</time>
            </div>
            <div
              className={`p-3 rounded-lg max-w-[70%] break-words ${
                user.firstName === msg.firstName
                  ? "bg-blue-500 text-white"
                  : "bg-gray-500 text-white"
              }`}
            >
              {msg.text}
            </div>
            {
              msg.firstName === user.firstName ? "" : <div className="text-xs text-white opacity-50 mt-1">{user.lastSeen ? " Last seen " + new Date(user.lastSeen).toLocaleTimeString() : "Unavailable"}</div>
            }
          </div>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="text-black p-2 outline-none ml-[630px] mt-2 mr-3 border border-gray-800"
        type="text"
      />
      <button onClick={sendMessage} className="btn btn-secondary">
        Send
      </button>
    </>
  );
};

export default Chat;
