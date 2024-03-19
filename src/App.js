import { useState } from "react";
import List from "./components/List";
import AddItemForm from "./components/AddItemForm";
import { items as initial } from "./data/items";

function App() {
  const [items, setItems] = useState(initial);

  function addItem(name) {
    const id = crypto.randomUUID();
    setItems(existing => [...existing, { id, name }]);
  }

  function deleteItem(id) {
    setItems(existing => existing.filter(item => item.id !== id));
  }

  function crossItem(id) {
    setItems(existing => existing.map(item => item.id === id ? { ...item, crossed: true } : item));
  }

  return (
    <>
      <List items={items} deleteItem={deleteItem} crossItem={crossItem} />
      <AddItemForm addItem={addItem} />
    </>
  );
}

export default App;
