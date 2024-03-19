function List({ items, deleteItem, crossItem }) {
  return (
    <ul className="list">
      {items.map(({ id, name, crossed }) => (
        <li key={id} className="list-item">
          <span onClick={() => crossItem(id)} className={crossed ? "crossed-item-name" : "item-name"}>
            {name}
          </span>
          <button onClick={() => deleteItem(id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default List;
