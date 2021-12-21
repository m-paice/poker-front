interface PlayerTypes {
    id: number;
    name: string;
    vote: number;
}
interface ResultTypes {
    average: string;
    votesOfPoints: {
        [key: number]: number;
    };
}
interface UserTypes {
    name: string;
}
interface GameContextTypes {
    user: UserTypes;
    joinGame: (data: {
        username: string;
    }) => void;
    startGame: () => void;
    resetGame: () => void;
    vote: (data: any) => void;
    players: PlayerTypes[];
    result: ResultTypes;
    enableReveal: boolean;
    start: boolean;
}
export declare const GameContextProvider: ({ children }: {
    children: any;
}) => JSX.Element;
export declare const useGameContext: () => GameContextTypes;
export {};
