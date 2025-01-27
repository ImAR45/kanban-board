import { useBoard } from "../data/BoardProvider";
import AddTask from "./AddTask";
import Coulmn from "./Coulmn";

const Board = () => {
  const { board } = useBoard();

  return (
    <div className="m-4">
      <AddTask />
      <div className="flex justify-between font-mono font-semibold">
        {board.columns.map((col) => (
          <Coulmn key={col.id} column={col} />
        ))}
      </div>
    </div>
  );
};

export default Board;
