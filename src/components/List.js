import { useState } from "react";

function List({ items, deleteItem, crossItem, moveItem, formatCurrency }) {
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
      {sorted.map(({ id, name, price, crossed, position }) => (
        <li
          key={id}
          id={id}
          className="list-item"
          draggable={true}
          onDragStart={() => handleDragStart({ id, position })}
          onDrop={e => handleDrop(e, position)}
        >
          <span className={crossed ? "crossed-item-name" : ""}>
            {name}
            {price ? `, ${formatCurrency(price)}` : ""}
          </span>
          <div className="actions">
            {crossed ? null : (
              <button
                onClick={() => crossItem(id)}
                className="tick-button"
                aria-label="Cross item off"
                title="Cross item off"
              >✔</button>
            )}
            <button
              onClick={() => deleteItem(id)}
              aria-label="Delete item"
              title="Delete item"
            >❌</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default List;
