/* eslint-disable react/prop-types */
const UserCard = ({user}) => {
  const {firstName, lastName, photoUrl, age, about} = user;
  return (
    <div>
      <div className="card bg-gray-900 w-80 text-white shadow-xl">
        <figure>
          <img className="mt-4 rounded-md"
            src={photoUrl}
            alt="user"
          />
        </figure>
        <div className="card-body">
          <h3 className="-mt-4">{about}</h3>
          <h2 className="card-title -mt-2">{firstName + " "+ lastName + ", " + age}</h2>
          <div className="card-actions flex justify-between">
            <button className="bg-red-600 p-2 px-6 font-bold rounded-md">Ignore</button>
            <button className="bg-pink-500 p-2 rounded-md font-bold">Send Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
