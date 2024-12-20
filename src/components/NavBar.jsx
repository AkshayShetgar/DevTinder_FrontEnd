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
          <Link to="/feed" className="btn btn-ghost text-xl">
            devTinder
          </Link>
        </div>
        {user && <p className="mr-6">Welcome, {user.firstName}</p>}
        {user && (
          <div className="navbar-center hidden lg:flex mr-7">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>Menu</summary>
                  <ul className="p-2">
                    <li className="text-black font-bold">
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li className="text-black font-bold">
                      <Link to="/connections">Connection</Link>
                    </li>
                    <li className="text-black font-bold">
                      <Link to="/requests">Requests</Link>
                    </li>
                    <li
                      className="text-black cursor-pointer ml-3 hover:bg-gray-200 p-1 rounded-md font-bold"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                    
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
