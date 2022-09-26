import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider  } from 'react-redux';
import ReduxThunk from "redux-thunk";
import userReducer from "./reducers/User";
import loginFormReducer from './reducers/LoginForm';
import modeleReducer from './reducers/Modele';

const rootReducer = combineReducers({
        user: userReducer,
        loginForm: loginFormReducer,
        modeleReducer: modeleReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
        <Provider store={store}>
                <BrowserRouter>
                        <App />
                </BrowserRouter>
        </Provider>
);
