/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useBoard } from "../data/BoardProvider";
import { useEffect, useState } from "react";

const CardDetails = ({ cardId }) => {
  const nevigate = useNavigate();

  const { getCardDetails, deleteTask, updateTaskTitle } = useBoard();
  const details = getCardDetails(cardId);

  const [title, setTitle] = useState(details?.title);
  const [description, setDescription] = useState(details?.description);

  useEffect(() => {
    setTitle(details?.title);
    setDescription(details?.description);
  }, [details]);

  const handleTitle = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const updateTitle = () => {
    updateTaskTitle(cardId, title);
  };

  const handleDelete = () => {
    deleteTask(cardId, details?.columnId);
    nevigate("/");
  };

  return (
    <div className="m-4 border-2 border-gray-700 inline-block p-4 max-h-52 max-w-72 rounded-md shadow-md shadow-gray-400 font-semibold">
      <header>
        <div className="flex justify-between">
          <p className="text-red-600">{details?.id}</p>
          <label
            className="text-red-800 cursor-pointer hover:text-lg"
            onClick={handleDelete}
          >
            🗑️
          </label>
        </div>
        <input
          type="text"
          name="title"
          id="title"
          value={title.toUpperCase()}
          className="mt-2 mb-2 w-full outline-none"
          onChange={handleTitle}
          onBlur={updateTitle}
        />
      </header>
      <section className="border-t-2 border-gray-300">
        <textarea
          name="description"
          value={description}
          className="pt-2 text-sm w-full h-full outline-none resize-none"
          placeholder="Add Description"
        ></textarea>
      </section>
    </div>
  );
};

export default CardDetails;
