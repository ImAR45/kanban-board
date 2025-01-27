/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ListCardView = ({ id, title }) => {
  const cardId = useParams("id");

  const [activeCard, setActiveCard] = useState(false);

  useEffect(() => {
    checkActiveCard();
  }, [cardId]);

  const checkActiveCard = () => {
    if (cardId.id === id) setActiveCard(true);
    else setActiveCard(false);
  };

  return (
    <p
      className={`p-2 font-semibold border-[1px] rounded-md m-[1px] hover:bg-gray-200 cursor-pointer ${
        activeCard && "bg-gray-300"
      }`}
    >
      {title.length < 20 ? title : title.substring(0, 17) + "..."}
    </p>
  );
};

export default ListCardView;
