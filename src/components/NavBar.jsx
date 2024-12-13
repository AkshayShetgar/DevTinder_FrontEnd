import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  return (
    <div>
      <div className="navbar bg-neutral text-white">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">devTinder</a>
        </div>
       {user ? <p className="mr-6">Welcome, {user.firstName +" "+ user.lastName}</p> : <p className="mr-6">Welcome</p>}
      </div>
    </div>
  );
};

export default NavBar;
