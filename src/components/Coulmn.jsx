/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import CardList from "./CardList";
import EmptyCardHolder from "./EmptyCardHolder";
import {
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useBoard } from "../data/BoardProvider";

/* eslint-disable react/prop-types */
const Coulmn = ({ column }) => {
  const { id, name, cards } = column;
  const ref = useRef(null);
  const [isCoulumnActive, setCoulmnActive] = useState(false);
  const { moveCard } = useBoard();
  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    return dropTargetForElements({
      element,
      onDragLeave() {
        setCoulmnActive(false);
      },
      onDragEnter() {
        setCoulmnActive(true);
      },
      onDrop() {
        setCoulmnActive(false);
      },
    });
  }, []);

  useEffect(() => {
    monitorForElements({
      onDrop({ source, location }) {
        const target = location.current.dropTargets[0];

        if (!source || !target) return;

        const sourceData = source.data;
        const targetData = target.data;
        if (!sourceData || !targetData) return;
        let targetPosition = -1;
        if (targetData.id === "placeholder") {
          moveCard(sourceData.id, targetData.columnId, 0);
        } else {
          const indexOfTarget = cards.findIndex(
            (card) => card.id === targetData.id
          );
          console.log(indexOfTarget);
          if (indexOfTarget === 0) {
            targetPosition = 0;
          } else if (indexOfTarget === cards.length - 1) {
            targetPosition = -1;
          } else {
            targetPosition = targetData.position;
          }
        }
        console.log(sourceData);
        console.log(targetData);
        console.log(targetPosition);

        moveCard(sourceData.id, targetData.columnId, targetPosition - 1);
      },
    });
  }, [moveCard]);

  return (
    <div
      ref={ref}
      className={`border-2 border-black m-4 p-4 rounded-md min-w-72 min-h-96 ${
        isCoulumnActive && "bg-gray-500"
      }`}
    >
      <h1 className="mb-2 border-b-2 ">{name}</h1>
      {cards.length > 0 ? (
        <>
          <CardList cards={cards} />
          <EmptyCardHolder coulmnId={id} />
        </>
      ) : (
        <EmptyCardHolder coulmnId={id} />
      )}
    </div>
  );
};

export default Coulmn;
