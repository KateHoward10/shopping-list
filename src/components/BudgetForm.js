function BudgetForm({ budget, setBudget, formatCurrency }) {

  function handleSubmit(e) {
    e.preventDefault();
    setBudget(e.target.budget.value);
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="budget">Budget in pence</label>
          <input id="budget" name="budget" type="number" min="0" step="1" />
        </div>
        <button type="submit" className="submit-button">Set budget</button>
      </form>
      {budget ? <div className="amount">Budget: {formatCurrency(budget)}</div> : null}
    </div>
  );
}

export default BudgetForm;
