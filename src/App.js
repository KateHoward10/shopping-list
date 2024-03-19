import { useState } from "react";
import List from "./components/List";
import AddItemForm from "./components/AddItemForm";
import { items as initial } from "./data/items";

function App() {
  const [items, setItems] = useState(initial);

  function addItem(newItem) {
    setItems(existing => [...existing, newItem]);
  }

  return (
    <>
      <List items={items} />
      <AddItemForm addItem={addItem} />
    </>
  );
}

export default App;
