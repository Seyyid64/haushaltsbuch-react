import { useContext } from "react";
import { Monatsliste } from "./Monatsliste";
import { GlobalContext } from "../context/GlobalState";
import { v4 as uuidv4 } from "uuid";

const Monatslistensammlung = () => {
  const { eintraege } = useContext(GlobalContext);

  const groupNames = Array.from(
    new Set(
      eintraege.map((k) =>
        new Date(k.datum).toLocaleString("de-DE", {
          month: "long",
          year: "numeric",
        })
      )
    )
  );

  eintraege.sort(function (a, b) {
    return new Date(b.datum) - new Date(a.datum);
  });

  groupNames.sort(function (a, b) {
    return new Date(b.datum) - new Date(a.datum);
  });

  return (
    <section id="monatslisten">
      {groupNames.map((month) => (
        <Monatsliste key={uuidv4()} groupName={month} />
      ))}
    </section>
  );
};

export default Monatslistensammlung;
