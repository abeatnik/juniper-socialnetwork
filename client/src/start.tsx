import ReactDOM from "react-dom";
import Welcome from "./components/Welcome/index";
import Logo from "./components/Logo/index";

ReactDOM.render(<Welcome />, document.querySelector("main"));

// fetch("/user/id.json")
//     .then((response) => response.json())
//     .then((userData) => {
//         if (userData.id) {
//             ReactDOM.render(<Logo />, document.querySelector("main"));
//         } else {
//             ReactDOM.render(<Welcome />, document.querySelector("main"));
//         }
//     });
