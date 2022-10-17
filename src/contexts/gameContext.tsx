import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import Socket from "socket.io-client";

import api, { URL_API } from "../service/api";
import history from "../utils/history";

interface Rooms {
    id: string;
    name: string;
}
interface PlayerTypes {
    id: string;
    roomId: string;
    name: string;
    vote: number;
    onlyView: boolean;
}

interface ResultTypes {
    average: string;
    votesOfPoints: { [key: number]: number };
}

interface UserTypes {
    id?: string;
    roomId: string;
    name: string;
    onlyView: boolean;
    room: {
        id: string;
        name: string;
    };
}

interface GameContextTypes {
    user: UserTypes;

    joinGame: (data) => void;
    startGame: () => void;
    resetGame: () => void;
    vote: (data) => void;
    remove: (data) => void;
    createRoom: (data) => void;
    getAllRooms: () => void;
    joinRoom: (data) => void;

    players: PlayerTypes[];
    result: ResultTypes;

    enableReveal: boolean;
    start: boolean;
    currentVote: number;

    rooms: Rooms[];
}

const GameContext = createContext<GameContextTypes>({} as GameContextTypes);

export const GameContextProvider = ({ children }) => {
    const [user, setUser] = useState<UserTypes>(null);
    const [players, setPlayers] = useState([]);
    const [enableReveal, setEnableReveal] = useState(players.some((item) => !item.vote));
    const [result, setResult] = useState<ResultTypes>({ average: null, votesOfPoints: {} });
    const [start, setStart] = useState(false);

    const [rooms, setRooms] = useState<Rooms[]>([]);

    const [currentVote, setCurrentVote] = useState(null);

    const io = useRef(null);

    useEffect(() => {
        const checkEnable = players.some((item) => !item.vote);

        setEnableReveal(checkEnable);
    }, [players]);

    useEffect(() => {
        const socketIo = Socket(URL_API);

        io.current = socketIo;

        socketIo.on("connect", () => {
            setUser((prevState) => ({ ...prevState, id: socketIo.id }));
        });

        socketIo.on("new_user", (data) => {
            if (data.onlyView) return;
            setPlayers((prevState) => {
                return [...prevState, data];
            });
        });

        socketIo.on("disconnected", (data) => {
            setPlayers((prevState) => {
                return prevState.filter((user) => user.id !== data);
            });
        });

        socketIo.on("voted", (data) => {
            handleVoted(data);
        });

        socketIo.on("started", (data) => {
            const players = data.filter((player) => !player.onlyView);
            handleStarted(players);
        });

        socketIo.on("reseted", () => {
            handleReseted();
        });

        socketIo.on("removed", (data) => {
            setPlayers((prevState) => {
                return prevState.filter((player) => player.id !== data.userId);
            });
        });
    }, [io]);

    const handleCreateRoom = async (data) => {
        const response = await api.post("/rooms", data);

        setRooms([...rooms, response.data]);

        history.push("/");
    };

    const handleGetAllRooms = async () => {
        const response = await api.get("/rooms");

        setRooms(response.data);
    };

    const getPlayersFromRoomId = async (roomId) => {
        const response = await api.get(`/users/${roomId}`);

        const players = response.data.filter((user) => !user.onlyView);

        setPlayers(players);
    };

    const handleJoinRoom = (room) => {
        setUser((prevState) => ({
            ...prevState,
            room: {
                id: room.id,
                name: room.name,
            },
        }));

        history.push(`/room/${room.id}`);
    };

    const handleVoted = (user) => {
        setPlayers((previousValues) => {
            const payload = previousValues.map((item) => {
                if (item.id === user.id) {
                    return {
                        ...item,
                        vote: user.vote,
                    };
                }

                return item;
            });

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
        return io.current.emit("vote", { vote });
    };

    const handleSocketStart = async () => {
        const response = await api.get(`/users/${user.roomId}`);

        const players = response.data.filter((player) => !player.onlyView);

        handleStarted(players);

        return io.current.emit("start", { roomId: user.roomId });
    };

    const handleSocketReset = () => {
        handleReseted();

        return io.current.emit("reset", { roomId: user.roomId });
    };

    const handleSocketRemove = ({ userId, roomId }: { userId: string; roomId: string }) => {
        return io.current.emit("remove", { userId, roomId });
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

    const handleJoinGame = (data: { username: string; onlyView: boolean; roomId: string }) => {
        const { username, onlyView, roomId } = data;

        io.current.emit("join", {
            roomId,
        });

        io.current.emit("set_user", {
            roomId,
            name: username,
            onlyView,
        });

        setUser((prevState) => {
            return {
                ...prevState,
                roomId,
                name: username,
                onlyView,
            };
        });
        getPlayersFromRoomId(roomId);
    };

    const handleResetGame = () => {
        handleSocketReset();
    };

    const handleVote = (data) => {
        setCurrentVote(data.vote);

        const vote = data.vote === 0 ? -1 : data.vote;

        setPlayers((prevState) => {
            const payload = prevState.map((item) => {
                if (item.id === user.id) {
                    return {
                        ...item,
                        vote,
                    };
                }

                return item;
            });

            return payload;
        });
        handleSocketVote(vote);
    };

    const handleStartClik = async () => {
        await handleSocketStart();
    };

    const handleRemoveClick = ({ userId, roomId }: { userId: string; roomId: string }) => {
        setPlayers((prevState) => {
            return prevState.filter((user) => user.id !== userId);
        });
        handleSocketRemove({ userId, roomId });
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
                createRoom: handleCreateRoom,
                getAllRooms: handleGetAllRooms,
                joinRoom: handleJoinRoom,

                players,
                result,
                enableReveal,
                start,
                currentVote,
                rooms,
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
