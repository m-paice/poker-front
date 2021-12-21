import styled from "styled-components";

interface PlayerInterface {
    voting: boolean;
}

interface ButtonInterface {
    voted: boolean;
}

export const Conatiner = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 0 15px;
`;

export const Header = styled.div`
    width: 100%;
    height: 100px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
        display: flex;
        align-items: center;
    }

    svg {
        width: 50px;
        height: 50px;
    }

    h1 {
        margin-left: 15px;
        font-size: 25px;
        font-weight: 700;
        line-height: 15px;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    max-width: 800px;
    height: 100%;

    div.players {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        div {
            max-width: 90px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 7px 10px;

            transition: 0.2s;

            svg {
                color: red;
                height: 50px;
                width: 50px;
            }
        }

        .name {
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            align-items: center;
            display: flex;
            display: -webkit-box;
            font-size: 18px;
            font-weight: 700;
            justify-content: center;
            line-height: 1.2em;
            overflow: hidden;
            padding-top: 0.8 rem;
            text-align: center;
            width: 8 rem;
            height: 40px;
        }
    }

    div.result {
        margin: 30px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .average {
        font-size: 18px;
        color: #a8aeb2;
    }
    .points {
        font-weight: 700;
        font-size: 30px;
        color: #1a2935;
        margin-left: 7px;
    }
`;

export const Table = styled.div`
    background: #d7e9ff;
    border-radius: 25px;

    width: 340px;
    height: 150px;

    margin: 15px 0;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Player = styled.div<PlayerInterface>`
    width: 50px;
    height: 80px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 5px;

    background: ${(props) =>
        props.voting
            ? "#e8e9ea"
            : `linear-gradient(45deg, #3993ff 12%, transparent 0, transparent 88%, #3993ff 0),
        linear-gradient(135deg, transparent 37%, #1a7bf2 0, #1a7bf2 63%, transparent 0),
        linear-gradient(45deg, transparent 37%, #3993ff 0, #3993ff 63%, transparent 0), #74b3ff`};
    background-size: 17px 17px;

    cursor: pointer;

    margin: 0 10px;

    transition: 0.2s;
`;

export const WrapperCards = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 150px;
`;
export const Card = styled.button<ButtonInterface>`
    width: 50px;
    height: 80px;

    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 5px;
    border: 2px solid #3993ff;
    font-size: 19px;
    font-weight: bold;
    color: ${(props) => (props.voted ? "#fff" : " #3993ff")};

    background-color: ${(props) => (props.voted ? "#3993ff" : "")};

    cursor: pointer;

    margin: 0 10px;

    transition: 0.2s;

    span {
        position: absolute;
        top: -25px;
        color: #000;
    }

    :disabled {
        cursor: not-allowed;
    }

    :hover {
        margin-top: -10px;
        background-color: ${(props) => (props.voted ? "#3993ff" : "#ebf4ff")};
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
            rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
`;

export const ButtonReveal = styled.button`
    width: 195px;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 18px;
    font-weight: bold;

    border-radius: 5px;

    transition: 0.2s;

    background-color: #3993ff;
    color: #fff;

    :hover {
        background: #74b3ff;
    }

    :disabled {
        cursor: not-allowed;
    }
`;

export const ButtonStart = styled.button`
    width: 195px;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 18px;
    font-weight: bold;

    border-radius: 5px;

    transition: 0.2s;

    background-color: #48545d;
    color: #fff;

    :hover {
        background-color: #1a2935;
    }
`;

export const Modal = styled.div`
    width: 100%;
    height: 100vh;

    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.5);
`;

export const ModalBody = styled.div`
    width: 630px;
    height: 435px;

    padding: 7px 15px;

    border-radius: 7px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;

    background-color: #fff;

    > h1 {
        font-size: 24px;
    }
`;

export const WrapperInput = styled.div`
    width: 100%;

    position: relative;

    border: 1px solid #3993ff;
    border-radius: 7px;
    padding: 15px;

    > label {
        position: absolute;
        top: -11px;
        left: 15px;

        background-color: #fff;
        padding: 0 7px;
    }

    > input {
        width: 100%;
        height: 45px;
        padding: 0 7px;
    }
`;

export const Button = styled.button`
    width: 100%;
    max-width: 500px;
    height: 45px;

    padding: 0 7px;
    border-radius: 7px;

    background-color: #3993ff;
    color: #fff;

    transition: 0.2s;

    :hover {
        opacity: 0.8;
    }
`;
