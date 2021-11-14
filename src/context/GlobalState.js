import React, { createContext, useEffect, useReducer } from 'react'
import AppReducer from './AppReducer'

const init = (initialState) =>
  JSON.parse(localStorage.getItem('global_context')) || initialState


const initialState = {
  transactions: [],
}

const GlobalContext = createContext(initialState)

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, init)

  useEffect(() => {
    localStorage.setItem('global_context', JSON.stringify(state))
  }, [state])

  const deleteTransaction = (id) => {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id,
    })
  }

  const addTransaction = (transaction) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction,
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext, GlobalProvider }
