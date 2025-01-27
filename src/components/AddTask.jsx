import { useState } from "react";
import { useBoard } from "../data/BoardProvider";

const AddTask = () => {
  const [active, setActive] = useState(false);
  const [title, setTiltle] = useState(null);
  const { addTask } = useBoard();
  const handleActive = () => {
    setActive(true);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setTiltle(value);
  };

  const handleDone = () => {
    addTask(title);
    setTiltle(null);
    setActive(false);
  };
  return (
    <div className="flex items-center">
      {!active && (
        <button
          className=" bg-gray-500 rounded-md p-2 m-4 text-white font-semibold"
          onClick={handleActive}
        >
          Add Task
        </button>
      )}
      {active && (
        <div>
          <input
            type="text"
            name="task title"
            id=""
            className="w-80 p-2 border-2 m-4 border-gray-500 rounded-md font-semibold"
            placeholder="Title"
            onChange={handleInput}
          />
          <button
            className="w-20 p-2 bg-gray-500 rounded-md m-2 text-white font-semibold"
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTask;
