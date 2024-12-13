import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("bob@gmail.com");
  const [password, setPassword] = useState("Arvind@019");

  const handleLogin = async () => {
    try{
      const res = await axios.post("http://localhost:3000/login",
        {
          emailId : email,
          password
        },{
          withCredentials : true
        }
      );
      console.log(res);
    }catch(err){
      console.error(err);
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
          <div className="card-actions flex justify-center">
            <button className="p-2 rounded-lg px-3 font-bold bg-red-700" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
