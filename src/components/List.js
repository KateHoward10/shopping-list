function List({ items, deleteItem }) {
  return (
    <ul>
      {items.map(({ id, name }) => (
        <li key={id}>
          {name}
          <button onClick={() => deleteItem(id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default List;
