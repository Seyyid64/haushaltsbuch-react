import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

function moneyFormatter(num) {
  return num.toFixed(2).replace(/\./, ",");
}

export const Gesamtbilanz = () => {
  const { eintraege } = useContext(GlobalContext);

  const betraege = eintraege.map((eintrag) => eintrag.betrag);
  const einnahme = betraege
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0);
  const ausgabe =
    betraege
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1;
  const total = betraege.reduce((acc, item) => (acc += item), 0);

  return (
    <aside id="gesamtbilanz">
      <h1>Gesamtbilanz</h1>
      <div className="gesamtbilanz-zeile einnahmen">
        <span>Einnahmen:</span>
        <span>+{moneyFormatter(einnahme)} €</span>
      </div>
      <div className="gesamtbilanz-zeile ausgaben">
        <span>Ausgaben:</span>
        <span>-{moneyFormatter(ausgabe)} €</span>
      </div>
      <div className="gesamtbilanz-zeile bilanz">
        <span>Bilanz:</span>
        <span className={total >= 0 ? "positiv" : "negativ"}>
          {moneyFormatter(total)} €
        </span>
      </div>
    </aside>
  );
};
