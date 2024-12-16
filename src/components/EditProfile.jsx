/* eslint-disable react/prop-types */
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [age, setAge] = useState(user.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const dispatch = useDispatch();
  const [toast, setToast] = useState(false);
  const [error, setError] = useState("");

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/update",
        {
          firstName,
          lastName,
          age,
          about,
          photoUrl,
          skills,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="mb-16 flex justify-center">
      <div className="flex justify-center my-3">
        <div className="card bg-base-content text-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title font-bold">Edit Profile</h2>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs text-black"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs text-black"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">About</span>
                </div>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs text-black"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">Skills</span>
                </div>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs text-black"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full max-w-xs text-black"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">Photo Url</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs text-black"
                />
              </label>
            </div>
            {
              error && <p className="text-red-500">ERROR : {error}</p>
            }
            <div className="card-actions flex justify-center">
              <button
                className="px-8 p-2 rounded-lg font-bold bg-blue-400"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3 ml-5">
        <UserCard user={{ firstName, lastName, age, about, photoUrl }} />
      </div>
      <div className="toast toast-top toast-center">
        {toast && <div className="alert alert-success">
          <span>Profile updated successfully.</span>
        </div>}
      </div>
    </div>
  );
};

export default EditProfile;
