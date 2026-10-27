import { describe, expect, it } from 'vitest'
import { splitBill } from './splitBill'

describe('splitBill', () => {
  it('splits a bill evenly with no tip', () => {
    expect(splitBill(100, 0, 4)).toBe(25)
  })

  it('adds the tip before splitting', () => {
    expect(splitBill(100, 20, 4)).toBe(30)
  })

  it('splits a 15% tip between two people', () => {
    expect(splitBill(80, 15, 2)).toBe(45)
  })

  it('rounds to 2 decimals', () => {
    expect(splitBill(10, 0, 3)).toBe(3.33)
  })

  it('rejects fewer than 1 person', () => {
    expect(() => splitBill(100, 0, 0)).toThrow(RangeError)
  })
})
