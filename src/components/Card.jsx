/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { useBoard } from "../data/BoardProvider";
import { useNavigate } from "react-router-dom";

const Card = ({ card }) => {
  const { id, title, columnId } = card;
  console.log(card);

  const ref = useRef(null);
  const [isDragging, setDragging] = useState(false);
  const [aboutToDrop, setAboutToDrop] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    return combine(
      draggable({
        element,
        getInitialData() {
          return card;
        },
        onDragStart() {
          setDragging(true);
        },
        onDrop() {
          setDragging(false);
        },
      }),
      dropTargetForElements({
        element,
        getData() {
          return card;
        },
        canDrop({ source }) {
          return source.element !== element;
        },
        onDragEnter() {
          setAboutToDrop(true);
        },
        onDragLeave() {
          setAboutToDrop(false);
        },
        onDrop() {
          setAboutToDrop(false);
        },
      })
    );
  }, [card]);

  const nevigate = useNavigate();

  const handleClick = () => {
    nevigate(`/card/${id}`);
  };

  return (
    <div
      ref={ref}
      className={`border-2 border-gray-400 p-4 rounded-md mb-2 bg-green-300 cursor-pointer hover:text-gray-800 ${
        isDragging && "opacity-50"
      } ${aboutToDrop && "bg-green-800 text-white"} ${
        columnId === "done" && "bg-green-500 line-through"
      }`}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};

export default Card;
