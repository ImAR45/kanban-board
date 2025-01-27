import Card from "./Card";

/* eslint-disable react/prop-types */
const CardList = ({ cards }) => {
  return (
    <div>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardList;
