import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { AuthProvider } from "react-auth-kit";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider
    authType={"cookie"}
    authName={"_auth"}
    cookieDomain={window.location.hostname}
    cookieSecure={false}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);
