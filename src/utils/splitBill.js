// Returns the amount each person pays, tip included, rounded to 2 decimals.
export function splitBill(total, tipPercent, people) {
  if (people < 1) {
    throw new RangeError('Number of people must be at least 1')
  }

  const totalWithTip = total * (1 + tipPercent / 100)
  return Math.round((totalWithTip / people) * 100) / 100
}
