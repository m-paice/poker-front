import React from "react";

import "./styles/GlobalStyles.css";

// routes
import Routes from "./routes";

// context
import { GameContextProvider } from "./contexts/gameContext";

interface Props {}

const App: React.FC<Props> = (props) => {
    return (
        <GameContextProvider>
            <Routes />
        </GameContextProvider>
    );
};

export default App;
