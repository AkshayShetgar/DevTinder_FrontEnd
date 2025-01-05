import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return; // If user data is already available, return early
    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res.data)); // Dispatch the fetched user data
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login"); // Navigate to login if user is unauthorized
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userData, dispatch, navigate]); // Added dependencies to handle updates correctly

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
