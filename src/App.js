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
    setItems(existing => [
      ...existing,
      { id, name, crossed: false , position: existing.length}
    ]);
  }

  function deleteItem(id) {
    setItems(existing => existing.filter(item => item.id !== id));
  }

  function crossItem(id) {
    setItems(existing => existing.map(item => {
      return item.id === id ? { ...item, crossed: true } : item;
    }));
  }

  function moveItem(id, oldPos, newPos) {
    setItems(existing => existing.map(item => {
      if (item.id === id) {
        // If dragged item, set new position
        return { ...item, position: newPos };
      } else if (oldPos < newPos && oldPos < item.position && item.position <= newPos) {
        // Draged item moved up, position of item in between decreases
        return { ...item, position: item.position - 1 };
      } else if (newPos < oldPos && newPos <= item.position && item.position < oldPos) {
        // Dragged item moved down, position of item in between increases
        return { ...item, position: item.position + 1 };
      } else {
        return item;
      }
    }))
  }

  // Store shopping list in localStorage whenever items updates
  useEffect(() => {
    localStorage.setItem("shopping-list", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <List items={items} deleteItem={deleteItem} crossItem={crossItem} moveItem={moveItem} />
      <AddItemForm addItem={addItem} />
    </>
  );
}

export default App;
