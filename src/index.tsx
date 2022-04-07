import * as React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware, Store } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import reportWebVitals from './reportWebVitals';

import App from "./App"
import rootReducer from "./rootReducer"
import {ApplicationState, DispatchType, ReduxAction} from "./type";
import {BrowserRouter} from "react-router-dom";

const store: Store<ApplicationState, ReduxAction> & {
    dispatch: DispatchType
} = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const rootElement = document.getElementById("root")
render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    rootElement
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();