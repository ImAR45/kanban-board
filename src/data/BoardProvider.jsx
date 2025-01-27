/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import { createContext } from "react";
import initBoardData from "./data.json";
import { useContext } from "react";

const BoardContext = createContext({
  board: { name: "", coulmn: [] },
  moveCard: "",
});

const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState(initBoardData);

  const getCardDetails = (id) => {
    const details = board.columns
      .map((column) => column.cards.find((card) => card.id === id))
      .find((task) => task !== undefined && task.id === id);
    if (details) return details;
    return "Card Not Found";
  };

  const getAllCards = () => {
    return board.columns.map((column) => column.cards);
  };

  const addTask = (title) => {
    const length = board.columns
      .map((column) => column.cards.length)
      .reduce((acc, x) => acc + x);

    setBoard((board) => ({
      ...board,
      ...board.columns[0].cards.push({
        id: "id-" + Math.floor(Math.random() * length * 1000),
        title: title,
        description: "",
        position: length + 1,
        columnId: "todo",
      }),
    }));
    console.log(board);
  };

  const deleteTask = (id, columnId) => {
    const newCards = board.columns
      .find((col) => col.id === columnId)
      .cards.filter((card) => card.id != id);
    setBoard({
      ...board,
      ...(board.columns.find((col) => columnId === col.id).cards = newCards),
    });
  };

  const updateTaskTitle = (id, title) => {
    const updatedCard = board.columns
      .map((col) => col.cards)
      .flat()
      .find((card) => card.id === id);
    updatedCard.title = title;
  };

  const updateTaskDescription = (id, description) => {
    const updatedCard = board.columns
      .map((col) => col.cards)
      .flat()
      .find((card) => card.id === id);
    updatedCard.description = description;
  };

  const moveCard = useCallback(
    (cardId, targetColumnId, targetPosition) => {
      setBoard((prevBoard) => {
        const newBoard = JSON.parse(JSON.stringify(prevBoard));

        // Find the card and its current column
        let sourceColumn;
        let card;
        let sourceCardIndex = -1;

        for (const column of newBoard.columns) {
          sourceCardIndex = column.cards.findIndex((c) => c.id === cardId);
          if (sourceCardIndex !== -1) {
            sourceColumn = column;
            card = column.cards[sourceCardIndex];
            break;
          }
        }

        if (!sourceColumn || !card) {
          console.error("Card not found");
          return prevBoard;
        }

        // Find the target column
        const targetColumn = newBoard.columns.find(
          (col) => col.id === targetColumnId
        );

        if (!targetColumn) {
          console.error("Target column not found");
          return prevBoard;
        }

        // Remove the card from its current column
        sourceColumn.cards.splice(sourceCardIndex, 1);

        // Determine the insertion index
        let insertIndex;
        if (
          targetPosition === -1 ||
          targetPosition >= targetColumn.cards.length
        ) {
          insertIndex = targetColumn.cards.length;
        } else if (targetPosition === 0) {
          insertIndex = 0;
        } else {
          insertIndex = targetPosition;
        }

        // Insert the card at the target position
        targetColumn.cards.splice(insertIndex, 0, {
          ...card,
          columnId: targetColumnId,
        });

        // Update positions of all cards in the affected columns
        const updatePositions = (column) => {
          column.cards.forEach((c, index) => {
            c.position = index;
          });
        };

        updatePositions(targetColumn);
        if (sourceColumn !== targetColumn) {
          updatePositions(sourceColumn);
        }

        return newBoard;
      });
    },
    [setBoard]
  );

  return (
    <BoardContext.Provider
      value={{
        board,
        moveCard,
        addTask,
        getCardDetails,
        deleteTask,
        getAllCards,
        updateTaskTitle,
        updateTaskDescription,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

const useBoard = () => useContext(BoardContext);

export { BoardProvider, useBoard };
