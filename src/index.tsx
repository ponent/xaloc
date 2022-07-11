import { render } from "react-dom"
import { Provider } from "react-redux"
import reportWebVitals from './reportWebVitals';
import App from "./App"
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

const rootElement = document.getElementById("root")
render(
    <Provider store={store}>
        <BrowserRouter>
            <MantineProvider>
                <NotificationsProvider position="top-right">
                    <App />
                </NotificationsProvider>
            </MantineProvider>
        </BrowserRouter>
    </Provider>,
    rootElement
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();