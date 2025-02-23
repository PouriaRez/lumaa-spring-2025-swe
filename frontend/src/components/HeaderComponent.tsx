import { logout } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const nav = useNavigate();
  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <>
      <div className="flex justify-between items-center p-5 bg-white/70 rounded-l mb-5 max-w-300 w-300">
        <img
          src="/lumaa-indigo.svg"
          alt="Lumaa"
          className="cursor-pointer"
          onClick={() => nav("/")}
        />
        <h1 className="text-black font-extralight">Task Management</h1>
        <button className="text-red-700" onClick={handleLogout}>
          <div className="font-light hover:font-semibold">Signout!</div>
        </button>
      </div>
    </>
  );
};

export default HeaderComponent;
