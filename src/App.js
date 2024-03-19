import { useState, useEffect } from "react";
import List from "./components/List";
import AddItemForm from "./components/AddItemForm";

function App() {
  // Get initial state from localStorage if previously stored
  const stored = localStorage.getItem("shopping-list");
  const [items, setItems] = useState(stored ? JSON.parse(stored) : []);

  function addItem(name) {
    // Set uuid for new items so they can be uniquely identified
    const id = crypto.randomUUID();
    setItems(existing => [...existing, { id, name, crossed: false }]);
  }

  
  function deleteItem(id) {
    setItems(existing => existing.filter(item => item.id !== id));
  }

  function crossItem(id) {
    setItems(existing => existing.map(item => {
      return item.id === id ? { ...item, crossed: true } : item;
    }));
  }

  // Store shopping list in localStorage whenever items updates
  useEffect(() => {
    localStorage.setItem("shopping-list", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <List items={items} deleteItem={deleteItem} crossItem={crossItem} />
      <AddItemForm addItem={addItem} />
    </>
  );
}

export default App;
