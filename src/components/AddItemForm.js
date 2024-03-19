function AddItemForm({ addItem }) {

  function handleSubmit(e) {
    e.preventDefault();
    addItem(e.target.name.value, e.target.price.value);
    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-field">
        <label htmlFor="name">Name*</label>
        <input id="name" name="name" required aria-required="true" />
      </div>
      <div className="form-field">
        <label htmlFor="price">Price in pence</label><input id="price" name="price" type="number" min="0" step="1" />
      </div>
      <button type="submit" className="submit-button">Add item</button>
    </form>
  );
}

export default AddItemForm;
