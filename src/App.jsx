import { useState } from 'react'
import BillForm from './components/BillForm'
import Result from './components/Result'
import { splitBill } from './utils/splitBill'
import './App.css'

function App() {
  const [total, setTotal] = useState('')
  const [tipPercent, setTipPercent] = useState(0)
  const [people, setPeople] = useState('')

  let amount = null
  let error = null

  if (people !== '' && Number(people) < 1) {
    error = 'Number of people must be at least 1'
  } else if (total !== '' && people !== '') {
    amount = splitBill(Number(total), tipPercent, Number(people))
  }

  const bill = Number(total)
  const tip = (bill * tipPercent) / 100
  const isPristine = total === '' && people === '' && tipPercent === 0

  function reset() {
    setTotal('')
    setTipPercent(0)
    setPeople('')
  }

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <h1>Expense Splitter</h1>
          <p className="app-subtitle">Split the bill, tip included.</p>
        </div>
        <button type="button" className="reset-button" onClick={reset} disabled={isPristine}>
          Reset
        </button>
      </header>
      <BillForm
        total={total}
        tipPercent={tipPercent}
        people={people}
        onTotalChange={setTotal}
        onTipChange={setTipPercent}
        onPeopleChange={setPeople}
      />
      <Result amount={amount} bill={bill} tip={tip} error={error} />
    </main>
  )
}

export default App
