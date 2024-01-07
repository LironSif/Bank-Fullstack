import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserProvider, AccountProvider } from "./context/UsersContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <AccountProvider>
        <App />
      </AccountProvider>
    </UserProvider>
  </React.StrictMode>
);
