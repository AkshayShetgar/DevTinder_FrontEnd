import axios from "axios";
import {BASE_URL} from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

/* eslint-disable react/prop-types */
const UserCard = ({user}) => {
  const {firstName, lastName, photoUrl, age, about} = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, {withCredentials : true});
    dispatch(removeFeed(_id));
  }
  return (
    <div className="m-5">
      <div className="bg-gray-900 w-80 text-white shadow-xl card">
        <figure>
          <img className="mt-4 rounded-md ml-4 w-72 mr-3.5 h-40"
            src={photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISuukVSb_iHDfPAaDKboFWXZVloJW9XXiwGYFab-QwlAYQ3zFsx4fToY9ijcVNU5ieKk&usqp=CAU"}
            alt="user-profile"
          />
        </figure>
        <div className="card-body">
          <h3 className="-mt-4 -ml-3">{about}</h3>
          <h2 className="card-title -mt-2 -ml-3">{firstName + " "+ lastName + ", " + (age || "")}</h2>
          <div className="card-actions flex justify-between">
            <button className="bg-red-600 p-2 px-6 font-bold rounded-md" onClick={() => handleSendRequest("ignored", user._id)}>Ignore</button>
            <button className="bg-pink-500 p-2 rounded-md font-bold" onClick={() => handleSendRequest("interested", user._id)}>Send Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
