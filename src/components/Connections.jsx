import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
      // console.log(res.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>Connections not found</h1>;

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl } = connection;
        return (
          <div className="flex text-white m-3 mx-auto mb-3 p-3 bg-neutral rounded-md w-1/2" key={firstName}>
            <div>
              <img className="w-16 rounded-full"
                alt="photo"
                src={
                  photoUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISuukVSb_iHDfPAaDKboFWXZVloJW9XXiwGYFab-QwlAYQ3zFsx4fToY9ijcVNU5ieKk&usqp=CAU"
                }
              ></img>
            </div>
            <div className="ml-4 mt-4 font-bold">{firstName + " " + lastName}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
