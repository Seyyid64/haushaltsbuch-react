import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Eintrag } from "./Eintrag";
import { v4 as uuidv4 } from "uuid";

export const Monatsliste = ({ groupName }) => {
  const { eintraege } = useContext(GlobalContext);

  function moneyFormatter(num) {
    return num.toFixed(2).replace(/\./, ",");
  }

  const betraege = eintraege.map((eintrag) =>
    groupName ===
    new Date(eintrag.datum).toLocaleString("de-DE", {
      month: "long",
      year: "numeric",
    })
      ? eintrag.betrag
      : null
  );
  const total = betraege.reduce((acc, item) => (acc += item), 0);

  return (
    <article className="monatsliste">
      <h2>
        <span className="monat-jahr">{groupName}</span>
        <span
          className={
            total >= 0 ? "monatsbilanz positiv" : "monatsbilanz negativ"
          }
        >
          {moneyFormatter(total)} €
        </span>
      </h2>
      <ul>
        {eintraege.map((eintrag) =>
          groupName ===
          new Date(eintrag.datum).toLocaleString("de-DE", {
            month: "long",
            year: "numeric",
          }) ? (
            <Eintrag key={uuidv4()} eintrag={eintrag} />
          ) : null
        )}
      </ul>
    </article>
  );
};
