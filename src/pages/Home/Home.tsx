import React, { useState } from "react";

import { FiTarget, FiTrash2 } from "react-icons/fi";

import { useGameContext } from "../../contexts/gameContext";
import { version } from "../../../package.json";

import rules from "../../data/rules.json";

interface Props {}

import {
    Conatiner,
    Header,
    Wrapper,
    Table,
    WrapperCards,
    Card,
    Player,
    ButtonReveal,
    ButtonStart,
    Modal,
    ModalBody,
    WrapperInput,
    Button,
} from "./styles";

const Home: React.FC<Props> = (props) => {
    const {
        user,
        players,
        result,
        startGame,
        resetGame,
        vote,
        joinGame,
        remove,
        enableReveal,
        start,
        currentVote,
    } = useGameContext();

    const [username, setUsername] = useState("");
    const [currentPlayer, setCurrentePlayer] = useState(null);

    const handleStartClick = () => {
        startGame();
    };
    const handleResetClick = () => {
        resetGame();
    };

    const handleJoinClick = () => {
        if (!username.trim()) return;

        joinGame({ username: username.trim() });
    };

    const hanldeVoteClick = (data) => {
        vote({
            vote: data,
        });
    };

    const handleDoubleClick = (player) => {
        if (currentPlayer?.id === player.id) return setCurrentePlayer(null);

        return setCurrentePlayer(player);
    };

    return (
        <Conatiner>
            <Header>
                <div>
                    <FiTarget />
                    <h1>Planning Poker - Ikatec</h1>
                </div>

                <span>
                    {user?.name} - versão {version}
                </span>
            </Header>
            <Wrapper>
                <div className="players">
                    {players.map((item) => (
                        <div key={item.id}>
                            <Player onDoubleClick={() => handleDoubleClick(item)} voting={!item.vote}>
                                {currentPlayer?.id === item.id && <FiTrash2 onClick={() => remove(item.id)} />}
                            </Player>
                            <span className="name">{item.name}</span>
                        </div>
                    ))}
                </div>

                <div className="result">
                    <Table>
                        {!start ? (
                            <ButtonReveal disabled={enableReveal} onClick={handleStartClick}>
                                Reveal cards
                            </ButtonReveal>
                        ) : (
                            <ButtonStart onClick={handleResetClick}>Start new voting</ButtonStart>
                        )}
                    </Table>
                    <div>
                        {!!result.average && (
                            <>
                                <span className="average">Average:</span>
                                <span className="points">{result.average}</span>
                            </>
                        )}
                    </div>
                </div>
            </Wrapper>

            <WrapperCards>
                {rules.map((item) => (
                    <div key={item.key}>
                        <Card
                            disabled={!!result.average}
                            onClick={() => hanldeVoteClick(item.value)}
                            voted={currentVote === item.value}
                        >
                            <span className="count">{result.votesOfPoints[item.value]}</span>

                            {item.key}
                        </Card>
                    </div>
                ))}
            </WrapperCards>

            {!user && (
                <Modal>
                    <ModalBody>
                        <h1> Welcome to Planning Poker - Ikatec </h1>
                        <WrapperInput>
                            <label> Your name </label>

                            <input
                                placeholder="Type your name here..."
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </WrapperInput>
                        <Button onClick={handleJoinClick}> Save </Button>
                    </ModalBody>
                </Modal>
            )}
        </Conatiner>
    );
};

export default Home;
