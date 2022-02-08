// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch(action.type) {
      case 'DELETE_EINTRAG':
        return {
          ...state,
          eintraege: state.eintraege.filter(eintrag => eintrag.id !== action.payload)
        }
      case 'ADD_EINTRAG':
        return {
          ...state,
          eintraege: [action.payload, ...state.eintraege]
        }
      default:
        return state;
    }
  }
