import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("akshay@gmail.com");
  const [password, setPassword] = useState("Akshay@019");
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try{
      const res = await axios.post(BASE_URL + "/login",
        {
          emailId : email,
          password
        },{
          withCredentials : true
        }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    }catch(err){
      setError(err?.response?.data || "Something went wrong...");
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-content text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title font-bold">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">Email</span>
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-black"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">Password</span>
              </div>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-black"
              />
            </label>
          </div>
          <p className="text-red-600">{error}</p>
          <div className="card-actions flex justify-center">
            <button className="px-8 p-2 rounded-lg font-bold bg-red-700" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
