import I18n from '../../components/i18n/i18n';

/////////////////CONSTANTS/////////////////////
const CHANGE_LOCALE = "CHANGE_LOCALE";


/////////////////ACTIONS//////////////
const changeLocaleConst = (locale) => ({type: CHANGE_LOCALE, locale});


/////////////////REDUCER/////////////////////
//initiate your starting state
let initial = {
   locale: ''
};
const reducer = (state = initial, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      console.log(action);
      I18n.locale = action.locale;
      return Object.assign({}, state, {locale: action.locale});
    default:
      return state;
  }

};

export default reducer;



/////////////// ACTION DISPATCHER FUNCTIONS///////////////////
export const changeLocale = (locale) => dispatch => {
  dispatch(changeLocaleConst(locale))
};

