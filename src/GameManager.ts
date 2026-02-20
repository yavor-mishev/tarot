import { GameState, type IGameStateData, type ICardData } from './types';
import { gameConfig } from './config';
import { weightedRandom } from './utils';
import multipliers from '../public/multipliers.json';

export class GameManager {
    private _stateData: IGameStateData;
    private stateChangeCallbacks: ((state: GameState) => void)[] = [];

    constructor() {
        this._stateData = {
            currentState: GameState.IDLE,
            balance: gameConfig.balance.initial,
            currentBet: 0,
            lastPayout: 0,
            roundCards: []
        };
    }   

    get state(): GameState {
        return this._stateData.currentState;
    }

    get balance(): number {
        return this._stateData.balance;
    }

    get currentBet(): number {
        return this._stateData.currentBet;
    }

    onStateChange(callback: (state: GameState) => void): void {
        this.stateChangeCallbacks.push(callback);
    }

    private setState(newState: GameState): void {
        const validTransitions: Record<GameState, GameState[]> = {
            [GameState.IDLE]: [GameState.ROUND_START],
            [GameState.ROUND_START]: [GameState.REVEAL],
            [GameState.REVEAL]: [GameState.RESULT],
            [GameState.RESULT]: [GameState.IDLE]
        };
        const allowed = validTransitions[this._stateData.currentState];
        if (!allowed.includes(newState)) {
            throw new Error(`Invalid state transition from ${this._stateData.currentState} to ${newState}`);
        }
        console.log(`State: ${this._stateData.currentState} -> ${newState}`);
        this._stateData.currentState = newState;
        this.stateChangeCallbacks.forEach(callback => callback(newState));
    }

    startRound(betAmount: number): string | null {
        if (this.state !== GameState.IDLE) {
            return "Cannot start a new round while another is in progress";
        }
        // TODO
        return null;
    }

}