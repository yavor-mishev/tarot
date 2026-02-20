export interface ICameraConfig {
    fov: number;
    nearPLane: number;
    farPLane: number;
    tiltAngle: number;
}
export interface ICardConfig {
    spacing: number;
    zLift: number;
    scale: number;
}
export interface IAnimationConfig {
    fadeInDuration: number;
    fadeInStagger: number;
    positionDuration: number;
    positionStagger: number;
    positionEase: string;
    flipDelay: number;
    flipStagger: number;
}

export interface IBalanceConfig {
    initial: number;
    minBet: number;
    maxBet: number;
}

export interface IGameConfig {
    camera: ICameraConfig;
    card: ICardConfig;
    animation: IAnimationConfig;
    balance: IBalanceConfig;
}

export const gameConfig: IGameConfig = {
    camera: {
        fov: 350,
        nearPLane: 10,
        farPLane: 100000,
        tiltAngle: Math.PI / 6
    },
    card: {
        spacing: 150,
        zLift:-40,
        scale: 1.0
    },
    animation: {
        fadeInDuration: 0.3,
        fadeInStagger: 0.1,
        positionDuration: 0.6,
        positionStagger: 0.15,
        positionEase: "back.out(1.2)",
        flipDelay: 0.3,
        flipStagger: 1.0
    },
    balance: {
        initial: 5000,
        minBet: 10,
        maxBet: 100
    }
}