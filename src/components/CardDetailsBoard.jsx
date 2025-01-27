import { useParams } from "react-router-dom";
import AllCards from "./AllCards";
import CardDetails from "./CardDetails";

const CardDetailsBoard = () => {
  const cardId = useParams("id");
  return (
    <div className="flex">
      <AllCards />
      <CardDetails cardId={cardId.id} />
    </div>
  );
};

export default CardDetailsBoard;
