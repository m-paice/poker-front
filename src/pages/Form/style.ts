import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    width: 700px;
    max-width: 700px;

    height: 500px;
    max-height: 500px;

    background-color: #fff;
    border-radius: 7px;

    padding: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;

    > h1 {
        font-size: 24px;
    }

    > p {
        cursor: pointer;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 80%;

    overflow-y: auto;

    > form {
        width: 100%;
        height: 250px;

        padding: 20px 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        > div {
            width: 100%;
        }
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
