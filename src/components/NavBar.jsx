import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <div>
      <div className="navbar bg-neutral text-white">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            devTinder
          </Link>
        </div>
        {user ? (
          <p className="mr-6">
            Welcome, {user.firstName + " " + user.lastName}
          </p>
        ) : (
          <p className="mr-6">Welcome</p>
        )}
        {user && (
          <div>
            <button className="block w-full px-4 py-2 text-white">
              Profile
            </button>
            <button
              className="block w-full px-4 py-2 text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
