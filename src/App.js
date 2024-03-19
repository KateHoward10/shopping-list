import { useState, useEffect } from "react";
import List from "./components/List";
import AddItemForm from "./components/AddItemForm";

function App() {
  // Get initial state from localStorage if previously stored
  const stored = localStorage.getItem("shopping-list");
  const [items, setItems] = useState(stored ? JSON.parse(stored) : []);
  const total = items.reduce((acc, cur) => cur.price ? acc + +cur.price : acc, 0);

  function addItem(name, price) {
    // Set uuid for new items so they can be uniquely identified
    const id = crypto.randomUUID();
    setItems(existing => [
      ...existing,
      { id, name, price, crossed: false, position: existing.length}
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

  function formatCurrency(pence) {
    return (+pence / 100).toLocaleString("en-GB", { style: "currency", currency: "GBP" });
  }

  // Store shopping list in localStorage whenever items updates
  useEffect(() => {
    localStorage.setItem("shopping-list", JSON.stringify(items));
  }, [items]);

  return (
    <div className="app">
      <header>
        <h1>Shopping List</h1>
        <AddItemForm addItem={addItem} />
      </header>
      <List
        items={items}
        deleteItem={deleteItem}
        crossItem={crossItem}
        moveItem={moveItem}
        formatCurrency={formatCurrency}
      />
      <div className="total">Total: {formatCurrency(total)}</div>
    </div>
  );
}

export default App;
