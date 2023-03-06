//@ts-nocheck
import { atom } from 'jotai'

export const atomWithLocalStorage = (key, initialValue) => {
  if (typeof window === 'undefined') return atom(null)

  const getInitialValue = () => {
    const item = localStorage?.getItem(key)
    if (item && item !== "undefined") {
      return JSON.parse(item)
    }
    return initialValue
  }
  const baseAtom = atom(getInitialValue())
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update
      set(baseAtom, nextValue)
      localStorage?.setItem(key, JSON.stringify(nextValue))
    }
  )

  return derivedAtom
}
