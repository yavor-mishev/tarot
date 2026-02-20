export const enum GameState {
    IDLE = "IDLE",
    ROUND_START = "ROUND_START",
    REVEAL = "REVEAL",
    RESULT = "RESULT"
}

export interface ICardData {
    texture: string;
    multiplier: number;
    type: 'middle' | 'side';
}

export interface IGameStateData {
    currentState: GameState;
    balance: number;
    currentBet: number;
    lastPayout: number;
    roundCards: ICardData[];
}