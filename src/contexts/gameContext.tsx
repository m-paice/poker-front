import React, { createContext, useContext, useState, useEffect } from "react";
import Socket from "socket.io-client";

import { URL_API } from "../service/api";

interface PlayerTypes {
    id: number;
    name: string;
    vote: number;
}

interface ResultTypes {
    average: string;
    votesOfPoints: { [key: number]: number };
}

interface UserTypes {
    name: string;
}

interface GameContextTypes {
    user: UserTypes;

    joinGame: (data: { username: string }) => void;
    startGame: () => void;
    resetGame: () => void;
    vote: (data) => void;
    remove: (data) => void;

    players: PlayerTypes[];
    result: ResultTypes;

    enableReveal: boolean;
    start: boolean;
    currentVote: number;
}

const GameContext = createContext<GameContextTypes>({} as GameContextTypes);

export const GameContextProvider = ({ children }) => {
    const [user, setUser] = useState<UserTypes>(null);
    const [players, setPlayers] = useState([]);
    const [enableReveal, setEnableReveal] = useState(players.some((item) => !item.vote));
    const [result, setResult] = useState<ResultTypes>({ average: null, votesOfPoints: {} });
    const [start, setStart] = useState(false);

    const [currentVote, setCurrentVote] = useState(null);
    const [io, setIo] = useState(null);

    useEffect(() => {
        if (!io) return;

        io.on("joined", (data) => {
            const { users } = data;
            setPlayers(users);
        });

        io.on("voted", (data) => {
            const { user } = data;

            handleVoted(user);
        });
        io.on("disconnected", (data) => {
            const { user } = data;

            handleDisconnected(user);
        });
        io.on("started", (data) => {
            const { users } = data;

            handleStarted(users);
        });
        io.on("reseted", () => {
            handleReseted();
        });
    }, [io]);

    useEffect(() => {
        const checkEnable = players.some((item) => !item.vote);

        setEnableReveal(checkEnable);
    }, [players]);

    const connect = (data) => {
        const { username } = data;

        const socketIo = Socket(URL_API);

        setIo(socketIo);
        socketIo.emit("join", { username });
    };

    const handleVoted = (user) => {
        setPlayers((previousValues) => {
            const payload = previousValues.map((item) => {
                if (item.id === user.id) {
                    return {
                        ...item,
                        vote: user.id,
                    };
                }

                return item;
            });

            return payload;
        });
    };

    const handleDisconnected = (user) => {
        setPlayers((previousValues) => {
            const payload = previousValues.filter((item) => item.id !== user.id);

            return payload;
        });
    };

    const handleReseted = () => {
        setPlayers((previousValues) => {
            const payload = previousValues.map((item) => ({ ...item, vote: null }));

            return payload;
        });
        setCurrentVote(null);
        setResult({ average: null, votesOfPoints: {} });
        setStart(false);
    };

    const handleSocketVote = (vote) => {
        return io.emit("vote", { vote });
    };

    const handleSocketStart = () => {
        return io.emit("start");
    };

    const handleSocketReset = () => {
        return io.emit("reset");
    };

    const handleSocketRemove = (data) => {
        return io.emit("remove", { id: data });
    };

    const handleStarted = (users) => {
        const average = users.filter((item) => item.vote >= 1).reduce((acc, cur) => acc + cur.vote, 0) / users.length;

        const votes = users.reduce((acc, cur) => {
            if (cur.vote === -1) {
                return {
                    ...acc,
                    0: (acc[0] || 0) + 1,
                };
            }

            return {
                ...acc,
                [cur.vote]: (acc[cur.vote] || 0) + 1,
            };
        }, {});

        setResult({
            average: average.toFixed(1),
            votesOfPoints: votes,
        });
        setStart(true);
    };

    const handleJoinGame = (data: { username: string }) => {
        const { username } = data;
        setUser({ name: username });

        connect({ username });
    };

    const handleResetGame = () => {
        handleSocketReset();
    };

    const handleVote = (data) => {
        setCurrentVote(data.vote);

        const vote = data.vote === 0 ? -1 : data.vote;

        handleSocketVote(vote);
    };

    const handleStartClik = () => {
        handleSocketStart();
    };

    const handleRemoveClick = (data) => {
        handleSocketRemove(data);
    };

    return (
        <GameContext.Provider
            value={{
                user,

                joinGame: handleJoinGame,
                startGame: handleStartClik,
                resetGame: handleResetGame,
                vote: handleVote,
                remove: handleRemoveClick,
                players,
                result,
                enableReveal,
                start,
                currentVote,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);

    return context;
};
