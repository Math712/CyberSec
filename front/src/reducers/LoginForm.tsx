import { USERNAME, PASSWORD, ISBUTTONDISABLED, HELPERTEXT, ISERROR } from "../actions/LoginForm";

const initState = {
  username: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false
};

const loginFormReducer = (state = initState, action: any) => {
    switch (action.type) {
        case USERNAME: 
          return {
            ...state,
            username: action.username
          };
        case PASSWORD: 
          return {
            ...state,
            password: action.password
          };
        case ISBUTTONDISABLED: 
          return {
            ...state,
            isButtonDisabled: action.isButtonDisabled
          };
        case HELPERTEXT: 
          return {
            ...state,
            helperText: action.helperText
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

export default loginFormReducer;