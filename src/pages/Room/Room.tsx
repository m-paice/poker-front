import React, { useEffect } from "react";

import { FiPlusSquare } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import { Container, Content, Wrapper, Item } from "./style";

import { useGameContext } from "../../contexts/gameContext";

interface Props {}

const Room: React.FC<Props> = ({ children }) => {
    const history = useHistory();

    const { getAllRooms, joinRoom, rooms } = useGameContext();

    useEffect(() => {
        getAllRooms();
    }, []);

    return (
        <Container>
            <Content>
                <h1> Select a room to planning poker </h1>

                <p onClick={() => history.push("/create")}>
                    <FiPlusSquare /> Create Room
                </p>
                <Wrapper>
                    {rooms.map((room, index) => (
                        <Item key={index}>
                            <p> {room.name} </p> <button onClick={() => joinRoom(room)}> Join </button>
                        </Item>
                    ))}
                </Wrapper>
            </Content>
        </Container>
    );
};

export default Room;
