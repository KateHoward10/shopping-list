import { useState } from "react";

function List({ items, deleteItem, crossItem, moveItem }) {
  const [draggedItem, setDraggedItem] = useState(null);
  const sorted = items.sort((a, b) => a.position - b.position);

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragStart(item) {
    setDraggedItem(item);
  }

  function handleDrop(e, position) {
    e.preventDefault();
    if (e.target.id !== draggedItem.id) {
      moveItem(draggedItem.id, draggedItem.position, position);
    }
  }

  return (
    <ul className="list" onDragOver={handleDragOver}>
      {sorted.map(({ id, name, crossed, position }) => (
        <li
          key={id}
          id={id}
          className="list-item"
          draggable={true}
          onDragStart={() => handleDragStart({ id, position })}
          onDrop={e => handleDrop(e, position)}
        >
          <span
            onClick={() => crossItem(id)}
            className={crossed ? "crossed-item-name" : "item-name"}
          >
            {name}
          </span>
          <button onClick={() => deleteItem(id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default List;
