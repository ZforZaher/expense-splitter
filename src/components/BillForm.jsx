const TIP_OPTIONS = [0, 10, 15, 20]

function BillForm({ total, tipPercent, people, onTotalChange, onTipChange, onPeopleChange }) {
  const peopleCount = Number(people) || 0

  return (
    <form className="bill-form" onSubmit={(event) => event.preventDefault()}>
      <div className="field">
        <label htmlFor="total">Bill total</label>
        <div className="input-wrap">
          <span className="input-prefix" aria-hidden="true">$</span>
          <input
            id="total"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="0.00"
            value={total}
            onChange={(event) => onTotalChange(event.target.value)}
          />
        </div>
      </div>

      <fieldset className="field">
        <legend>Tip</legend>
        <div className="tip-options">
          {TIP_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={tipPercent === option}
              onClick={() => onTipChange(option)}
            >
              {option}%
            </button>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="people">Number of people</label>
        <div className="stepper">
          <button
            type="button"
            aria-label="Remove a person"
            disabled={peopleCount <= 1}
            onClick={() => onPeopleChange(String(Math.max(1, peopleCount - 1)))}
          >
            −
          </button>
          <input
            id="people"
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            placeholder="1"
            value={people}
            onChange={(event) => onPeopleChange(event.target.value)}
          />
          <button
            type="button"
            aria-label="Add a person"
            onClick={() => onPeopleChange(String(peopleCount + 1))}
          >
            +
          </button>
        </div>
      </div>
    </form>
  )
}

export default BillForm
