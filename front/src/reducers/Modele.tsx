import { NOM, DESCRIPTION, PUHT, GAMME, INGREDIENTS, GRAMMAGE, ISERROR } from "../actions/Modele";

const initState = {
  nom: "",
  description: "",
  puht: "",
  gamme: "",
  ingredients: [],
  grammage: "",
  isError: false
};

const modeleReducer = (state = initState, action: any) => {
    switch (action.type) {
        case NOM: 
          return {
            ...state,
            nom: action.nom
          };
        case DESCRIPTION: 
          return {
            ...state,
            description: action.description
          };
        case PUHT: 
          return {
            ...state,
            puht: action.puht
          };
        case GAMME: 
          return {
            ...state,
            gamme: action.gamme
          };
        case INGREDIENTS: 
          return {
            ...state,
            ingredients: action.ingredients
          };
        case GRAMMAGE: 
          return {
            ...state,
            grammage: action.grammage
          };
        case ISERROR: 
          return {
            ...state,
            isError: action.isError
          };
        default:
          return state;
      }
};

export default modeleReducer;