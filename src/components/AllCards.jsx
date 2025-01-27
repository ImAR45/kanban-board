import { useNavigate } from "react-router-dom";
import { useBoard } from "../data/BoardProvider";
import ListCardView from "./ListCardView";

const AllCards = () => {
  const { getAllCards } = useBoard();
  const nevigate = useNavigate();

  const allCards = getAllCards().flat();
  console.log(allCards);

  const handleClick = (id) => {
    nevigate(`/card/${id}`);
  };

  return (
    <div className="w-1/4 border-r-2 border-gray-500 border-opacity-35 h-svh p-4">
      <header>
        <p className="border-b-2 border-gray-200 font-bold text-xl p-2">
          Tasks
        </p>
      </header>
      <section className="flex flex-col">
        {allCards.map((card) => (
          <div key={card.id} onClick={() => handleClick(card.id)}>
            <ListCardView id={card.id} title={card.title} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default AllCards;
