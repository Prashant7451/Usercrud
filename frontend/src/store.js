import { createStore, combineReducers, applyMiddleware } from "redux";
// createStore is for creating our 
// combineReducers will help us to combine all reducers into one unit 
// applyMiddleware  will help us to apply Middleware into our application 
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducers/userReducers";
import { user2ListReducer, user2CreateReducer, user2UpdateReducer, user2DeleteReducer } from "./reducers/user2Reducers";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    user2List: user2ListReducer,
    user2Create: user2CreateReducer,
    user2Update: user2UpdateReducer,
    user2Delete: user2DeleteReducer,
    userUpdate: userUpdateReducer
});

const userInformation = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const initialState = {
    userLogin: { userInfo: userInformation }
};
const middleware = [thunk];

const store = createStore(
    reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
