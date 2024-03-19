function AddItemForm({ addItem }) {

  function onSubmit(e) {
    e.preventDefault();
    addItem(e.target.newItem.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="newItem" />
      <button type="submit">Add item</button>
    </form>
  );
}

export default AddItemForm;
