import { GlobalProvider } from "./context/GlobalState";
import Navigationsleiste from "./components/Navigationsleiste";
import Eingabeformular from "./components/Eingabeformular";
import Monatslistensammlung from "./components/Monatslistensammlung";
import {Gesamtbilanz} from "./components/Gesamtbilanz";



function App() {
  return (
    <GlobalProvider>
      <Navigationsleiste />
      <Eingabeformular />
      <Monatslistensammlung />
      <Gesamtbilanz />
    </GlobalProvider>
  );
}

export default App;
