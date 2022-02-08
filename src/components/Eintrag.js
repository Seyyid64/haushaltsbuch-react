import { FaTrash } from "react-icons/fa";
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

function moneyFormatter(num) {
  return num.toFixed(2).replace(/\./, ",");
}

export const Eintrag = ({ eintrag }) => {
  const { deleteEintrag } = useContext(GlobalContext);

  return (
    <li className={eintrag.typ}>
      <span className="datum">
        {new Date(eintrag.datum).toLocaleDateString("de-DE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </span>
      <span className="titel">{eintrag.titel}</span>
      <span className="betrag">{moneyFormatter(eintrag.betrag)} €</span>
      <button
        className="entfernen-button"
        onClick={() => deleteEintrag(eintrag.id)}
        style={{ cursor: "pointer" }}
      >
        <FaTrash />
      </button>
    </li>
  );
};
