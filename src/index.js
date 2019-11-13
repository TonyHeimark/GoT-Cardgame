import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import AppRouter from "./routes/AppRouter";
import PlayerContextProvider from "./contexts/playerContextProvider";

const jsx = (
  <PlayerContextProvider>
    <AppRouter />
  </PlayerContextProvider>
);
ReactDOM.render(jsx, document.getElementById("root"));
