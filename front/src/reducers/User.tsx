import { LOGIN, INFO_USER, RESET_USER } from "../actions/User";

const initState = {
  idUser: "",
  nom: "",
  prenom: "",
  mail: "",
  prefMarques: [],
  prefModeles: [],
  isLogin: false,
  isAdmin: 0,
  publicKey_stripe: "",
  secretKey_stripe: "",
};

const userReducer = (state = initState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLogin: action.isLogin };
    case INFO_USER:
      return {
        ...state,
        idUser: action.user.id ? action.user.id : state.idUser,
        nom: action.user.nom ? action.user.nom : state.nom,
        prenom: action.user.prenom ? action.user.prenom : state.prenom,
        mail: action.user.mail ? action.user.mail : state.mail,
        prefMarques: action.user.marquesPref
          ? action.user.marquesPref.split(",")
          : state.prefMarques,
        prefModeles: action.user.modelesPref
          ? action.user.modelesPref.split(",")
          : state.prefModeles,
        isAdmin: action.user.isAdmin ? action.user.isAdmin : state.isAdmin,
        publicKey_stripe: action.user.publicKey_stripe
          ? action.user.publicKey_stripe
          : state.publicKey_stripe,
        secretKey_stripe: action.user.secretKey_stripe
          ? action.user.secretKey_stripe
          : state.secretKey_stripe,
      };
    case RESET_USER:
      return {
        ...state,
        idUser: "",
        nom: "",
        prenom: "",
        mail: "",
        prefMarques: [],
        prefModeles: [],
        isAdmin: 0,
        isLogin: false,
        publicKey_stripe: "",
        secretKey_stripe: "",
      };
    default:
      return state;
  }
};

export default userReducer;