import update from "immutability-helper";
import { useCallback } from "react";
import { Card } from "./Card";

import { useAtom } from "jotai";
import { layoutEditorCardsAtom } from "../../../../store";

const style = {
  margin: "0 auto",
};

export const Container = () => {
  {
    const [cards, setCards] = useAtom(layoutEditorCardsAtom);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    }, []);

    const renderCard = useCallback((card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      );
    }, []);

    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    );
  }
};
