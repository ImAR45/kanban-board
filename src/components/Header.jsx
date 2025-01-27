import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to={"/"}>
      <div className=" flex w-full h-14 justify-center items-center shadow-sm shadow-gray-500 font-mono text-2xl font-bold shadow-md hover:text-gray-600">
        Kanban Board
      </div>
    </Link>
  );
};

export default Header;
