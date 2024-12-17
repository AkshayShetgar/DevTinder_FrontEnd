import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequests());
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      // console.log(res.data.connectioRequest[0]);
      dispatch(addRequests(res.data.connectioRequest));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <p className="flex justify-center font-bold my-10">No request found :/</p>;

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Connections Request</h1>
      {requests.map((request, index) => {
        const { firstName, lastName, photoUrl} = request.senderId;
        return (
          <div
            className="flex text-white m-3 mx-auto mb-3 p-3 bg-neutral rounded-md w-1/3"
            key={index}
          >
            <div>
              <img
                className="w-16 rounded-full"
                alt="photo"
                src={
                  photoUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISuukVSb_iHDfPAaDKboFWXZVloJW9XXiwGYFab-QwlAYQ3zFsx4fToY9ijcVNU5ieKk&usqp=CAU"
                }
              ></img>
            </div>
            <div className="ml-4 mt-2 font-bold flex">
              {firstName + " " + lastName}
            </div>
            <div className="ml-24">
              <button
                className="btn mr-3 btn-success"
                onClick={() => reviewRequest("accepted",request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-error"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
