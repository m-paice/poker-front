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
        color: #3993ff;
        cursor: pointer;

        display: flex;
        align-items: center;

        margin: 20px 0;

        svg {
            margin-right: 7px;
        }

        :hover {
            text-decoration: underline;
        }
    }
`;
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 80%;

    overflow-y: auto;
`;
export const Item = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 12px 7px;

    border-bottom: 1px solid #e6e6e6;

    p {
        font-size: 18px;
    }

    button {
        width: 70px;
        height: 20px;

        padding: 0 7px;
        border-radius: 7px;

        background-color: #3993ff;
        color: #fff;

        transition: 0.2s;

        :hover {
            opacity: 0.8;
        }
    }
`;
