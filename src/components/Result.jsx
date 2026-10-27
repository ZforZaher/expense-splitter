function formatMoney(value) {
  return `$${value.toFixed(2)}`
}

function Result({ amount, bill, tip, error }) {
  if (error) {
    return (
      <section className="result result-error" role="alert">
        {error}
      </section>
    )
  }

  if (amount === null) {
    return (
      <section className="result result-empty">
        Enter a bill total and number of people to see each share.
      </section>
    )
  }

  return (
    <section className="result" aria-live="polite">
      <span className="result-label">Each person pays</span>
      <strong className="result-amount">{formatMoney(amount)}</strong>
      <dl className="result-breakdown">
        <div>
          <dt>Bill</dt>
          <dd>{formatMoney(bill)}</dd>
        </div>
        <div>
          <dt>Tip</dt>
          <dd>{formatMoney(tip)}</dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd>{formatMoney(bill + tip)}</dd>
        </div>
      </dl>
    </section>
  )
}

export default Result
