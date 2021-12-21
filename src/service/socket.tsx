import React, { useState, useEffect } from "react";

import socket from "socket.io-client";
import { URL_API } from "./api";

export const useSocket = () => {
    const [io, setIo] = useState(null);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!io) return;

        io.on("joined", (data) => {
            const { users } = data;
            setUsers(users);
        });

        io.on("voted", (data) => {
            const { user } = data;

            handleVoted(user);
        });
        io.on("disconnected", (data) => {
            const { user } = data;

            handleDisconnected(user);
        });
        io.on("started", () => {});
        io.on("reseted", () => {
            handleReseted();
        });
    }, [io]);

    const connect = (data) => {
        const { username } = data;

        const socketIo = socket(URL_API);

        setIo(socketIo);
        socketIo.emit("join", { username });
    };

    const handleVoted = (user) => {
        setUsers((previousValues) => {
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
        setUsers((previousValues) => {
            const payload = previousValues.filter((item) => item.id === user.id);

            return payload;
        });
    };

    const handleReseted = () => {
        setUsers((previousValues) => {
            const payload = previousValues.map((item) => ({ ...item, vote: null }));

            return payload;
        });
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

    return {
        connect,
        handleSocketVote,
        handleSocketStart,
        handleSocketReset,
        users,
    };
};
