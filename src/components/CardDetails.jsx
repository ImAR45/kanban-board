/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useBoard } from "../data/BoardProvider";
import { useEffect, useState } from "react";

const CardDetails = ({ cardId }) => {
  const nevigate = useNavigate();
  const taskStatus = ["todo", "in-progress", "testing", "done"];

  const {
    getCardDetails,
    deleteTask,
    updateTaskTitle,
    updateTaskDescription,
    moveCard,
  } = useBoard();
  const details = getCardDetails(cardId);

  const [title, setTitle] = useState(details?.title);
  const [description, setDescription] = useState(details?.description);
  const [descriptionActive, setDescriptionActive] = useState(false);
  const [isTaskButtonActive, setTaskButtonActive] = useState(false);

  useEffect(() => {
    setTitle(details?.title);
    setDescription(details?.description);
  }, [details]);

  const handleTitle = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateTitle = () => {
    updateTaskTitle(cardId, title);
  };
  const handleDescriptionFocus = () => {
    setDescriptionActive(true);
  };

  const updateDescription = () => {
    setDescriptionActive(false);
    updateTaskDescription(cardId, description);
  };

  const handleDelete = () => {
    deleteTask(cardId, details?.columnId);
    nevigate("/");
  };

  const handleTaskStatus = () => {
    setTaskButtonActive(!isTaskButtonActive);
  };

  const updateTaskStatus = (columnId) => {
    setTaskButtonActive(!isTaskButtonActive);
    moveCard(details.id, columnId, details.position);
  };

  return (
    <div className="w-lvw h-lvh p-4">
      <header className=" flex font-semibold items-center p-2 text-xl">
        <div className="w-1/12 text-center">
          <p className="text-red-600 bg-gray-200 rounded-md">{details?.id}</p>
        </div>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          className="outline-none ml-4 w-full"
          onChange={handleTitle}
          onBlur={updateTitle}
        />
      </header>
      <section className="border-t-2 border-gray-200 h-full p-4">
        <div className="flex w-full h-1/3">
          <label className="w-1/6 font-semibold">Description :</label>
          <textarea
            name="description"
            value={description}
            className={`pt-2 text-sm tracking-wider p-4 w-full bg-gray-200 resize-none rounded-md ${
              descriptionActive && "bg-white"
            }`}
            placeholder="Add Description"
            onFocus={handleDescriptionFocus}
            onChange={handleDescription}
            onBlur={updateDescription}
          ></textarea>
        </div>
        <div className="flex justify-end mt-8">
          <div onMouseEnter={handleTaskStatus} onMouseLeave={handleTaskStatus}>
            <p
              className={`mr-8 rounded-md p-4 text-center ${
                details.columnId === "todo"
                  ? "bg-gray-200"
                  : details.columnId === "in-progress"
                  ? "bg-yellow-500"
                  : details.columnId === "testing"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              } `}
            >
              {details?.columnId.toUpperCase()}
            </p>
            {isTaskButtonActive && (
              <div className="bg-gray-400 border-2 rounded-md mr-8 text-center">
                {taskStatus
                  .filter((task) => task !== details.columnId)
                  .map((card, index) => (
                    <p
                      className="p-2 hover:bg-gray-300 cursor-pointer rounded-md"
                      key={index}
                      id={card}
                      onClick={() => updateTaskStatus(card)}
                    >
                      {card.toUpperCase()}
                    </p>
                  ))}
              </div>
            )}
          </div>
          <div>
            <button
              className=" bg-red-600 text-white rounded-md p-4 hover:bg-red-500"
              onClick={handleDelete}
            >
              Delete Task
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardDetails;
