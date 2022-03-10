import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { Container, Content, Wrapper, WrapperInput, Button } from "./style";

import { useGameContext } from "../../contexts/gameContext";

interface Props {}

const Form: React.FC<Props> = ({ children }) => {
    const history = useHistory();

    const { createRoom } = useGameContext();

    const [roomName, setRoomName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        createRoom({ name: roomName });
    };

    return (
        <Container>
            <Content>
                <h1> Creating room to play</h1>

                <Wrapper>
                    <form onSubmit={handleSubmit}>
                        <WrapperInput>
                            <label> Room name </label>

                            <input
                                placeholder="Type room name here..."
                                value={roomName}
                                onChange={(event) => setRoomName(event.target.value)}
                            />
                        </WrapperInput>

                        <Button type="submit"> Create </Button>
                    </form>
                </Wrapper>
                <p onClick={() => history.push("/")}> Back to rooms </p>
            </Content>
        </Container>
    );
};

export default Form;
