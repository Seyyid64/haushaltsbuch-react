import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  eintraege: []
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteEintrag(id) {
    dispatch({
      type: 'DELETE_EINTRAG',
      payload: id
    });
  }

  function addEintrag(eintrag) {
    dispatch({
      type: 'ADD_EINTRAG',
      payload: eintrag
    });
  }


  return (<GlobalContext.Provider value={{
    eintraege: state.eintraege,
    deleteEintrag,
    addEintrag
  }}>
    {children}
  </GlobalContext.Provider>);
}