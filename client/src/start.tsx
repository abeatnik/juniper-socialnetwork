import ReactDOM from "react-dom";
import Welcome from "./components/Welcome/index";
import App from "./components/App/index";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";



fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                (
                <>
                <Provider store={store}>
                    <App />
                </Provider>
                </>
                )
            , document.querySelector("main"));
        }
    });
