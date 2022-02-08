import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { v4 as uuidv4 } from "uuid";

const Eingabeformular = () => {
  const [titel, setTitel] = useState("");
  const [typ, setTyp] = useState("ausgabe");
  const [betrag, setBetrag] = useState("");
  const [datum, setDatum] = useState(new Date().toISOString().slice(0, 10));
  const [showFehler, setShowFehler] = useState(false);
  const [fehler, setFehler] = useState([]);
  const { addEintrag } = useContext(GlobalContext);

  const formulardaten_validieren = (formulardaten) => {
    let fehler = [];
    if (formulardaten.titel === "") {
      fehler.push("Titel");
    }
    if (formulardaten.betrag === 0) {
      fehler.push("Betrag");
    }
    if (formulardaten.datum === "") {
      fehler.push("Datum");
    }
    return fehler;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newEintrag = {
      id: Date.now(),
      titel,
      typ,
      betrag: typ === "ausgabe" ? -Math.abs(betrag) : Math.abs(betrag),
      datum,
    };

    let formular_fehler = formulardaten_validieren(newEintrag);
    if (formular_fehler.length === 0) {
      setShowFehler(false);
      addEintrag(newEintrag);
      setTyp("ausgabe");
      setTitel("");
      setBetrag("");
    } else {
      setFehler(formular_fehler);
      setShowFehler(true);
    }
  };

  return (
    <section id="eingabeformular-container">
      {showFehler ? (
        <div className="fehlerbox">
          <span>Folgende Felder wurden nicht korrekt ausgefüllt:</span>
          <ul>
            {fehler.map((e) => (
              <li key={uuidv4()}>{e}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <form
        id="eingabeformular"
        action="#"
        method="get"
        onSubmit={onSubmit}
      ></form>
      <div className="eingabeformular-zeile">
        <h1>Neue Einnahme / Ausgabe hinzufügen</h1>
      </div>
      <div className="eingabeformular-zeile">
        <div className="titel-typ-eingabe-gruppe">
          <label htmlFor="titel">Titel</label>
          <input
            type="text"
            id="titel"
            form="eingabeformular"
            name="titel"
            placeholder="z.B. Einkaufen"
            size="10"
            title="Titel des Eintrags"
            value={titel}
            onChange={(e) => setTitel(e.target.value)}
          />

          <input
            type="radio"
            id="einnahme"
            name="typ"
            value="einnahme"
            onChange={(e) => setTyp(e.target.value)}
            form="eingabeformular"
            title="Typ des Eintrags"
            checked={typ === "einnahme"}
          />
          <label
            style={{ cursor: "pointer" }}
            htmlFor="einnahme"
            title="Typ des Eintrags"
          >
            Einnahme
          </label>

          <input
            type="radio"
            id="ausgabe"
            name="typ"
            value="ausgabe"
            onChange={(e) => setTyp(e.target.value)}
            form="eingabeformular"
            title="Typ des Eintrags"
            checked={typ === "ausgabe"}
          />
          <label
            style={{ cursor: "pointer" }}
            htmlFor="ausgabe"
            title="Typ des Eintrags"
          >
            Ausgabe
          </label>
        </div>
      </div>
      <div className="eingabeformular-zeile">
        <div className="betrag-datum-eingabe-gruppe">
          <label htmlFor="betrag">Betrag</label>
          <input
            type="number"
            id="betrag"
            name="betrag"
            form="eingabeformular"
            placeholder="z.B. 10,42"
            size="10"
            step="0.01"
            min="0.01"
            title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)"
            value={betrag}
            onChange={(e) => setBetrag(e.target.value)}
          />
          <label htmlFor="datum">Datum</label>
          <input
            type="date"
            id="datum"
            name="datum"
            form="eingabeformular"
            size="10"
            title="Datum des Eintrags"
            value={datum}
            onChange={(e) => setDatum(e.target.value)}
          />
        </div>
      </div>
      <div className="eingabeformular-zeile">
        <button className="standard" type="submit" form="eingabeformular">
          Hinzufügen
        </button>
      </div>
    </section>
  );
};

export default Eingabeformular;
