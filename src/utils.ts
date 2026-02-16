import * as PIXI from 'pixi.js';
import { CardSprite } from './Card';
import { gsap } from 'gsap';

export function weightedRandom(items: { alias: string, src:string, weight: number }[]): [string, number] {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  const cursor = Math.random() * total;
  let sum = 0;
  for (const item of items) {
    sum += item.weight;
    if (cursor < sum) return [item.src, Number(item.alias)];
  }
  return [items[items.length - 1].src, Number(items[items.length - 1].alias)];
}

export function showResult(cards: CardSprite[], app: PIXI.Application, centerX: number, centerY: number) {
  const betInput = document.getElementById('userInput') as HTMLInputElement;
  const betAmount = parseFloat(betInput.value);
  const product = cards.reduce((acc, card) => acc * Number(card.multiplier ?? 1), 1);
  const payout = betAmount * product;

  const resultContainer = new PIXI.Container();

  const glow = new PIXI.Graphics();
  glow.beginFill(0xFFD700, 0.3);
  glow.drawRoundedRect(-170, -80, 340, 160, 20);
  glow.endFill();
  resultContainer.addChild(glow);

  const bg = new PIXI.Graphics();
  bg.beginFill(0x1a1a2e);
  bg.drawRoundedRect(-160, -70, 320, 140, 15);
  bg.endFill();
  resultContainer.addChild(bg);

  const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 48,
    fontWeight: 'bold',
    fill: ['#FFD700', '#FFA500'],
    stroke: '#000000',
    strokeThickness: 4
  });

  const multiplierStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fontWeight: 'bold',
    fill: 0xFFD700,
    align: 'center'
  });

  const multiplierText = new PIXI.Text( `Multiplier: x${product.toFixed(2)}`, multiplierStyle );
  multiplierText.anchor.set(0.5);
  multiplierText.position.set(0, -20);
  resultContainer.addChild(multiplierText);

  const payoutText = new PIXI.Text(`$${payout.toFixed(2)}`, style);
  payoutText.anchor.set(0.5);
  payoutText.position.set(0, 20);
  resultContainer.addChild(payoutText);

  resultContainer.position.set(centerX, centerY);
  resultContainer.scale.set(0);
  app.stage.addChild(resultContainer);
  
  gsap.to(resultContainer.scale, {
    x: 1,
    y: 1,
    duration: 0.5,
    ease: "back.out(1.7)"
  });
  
  gsap.to(glow, {
    alpha: 0.6,
    duration: 0.5,
    yoyo: true,
    repeat: 3,
    ease: "sine.inOut"
  });

  setTimeout(() => {
    gsap.to(resultContainer.scale, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "back.in(1.7)",
      onComplete: () => {
        app.stage.removeChild(resultContainer);
      }
    });
  }, 1700);
}

export const targetPositions = [
    { 
      x: -150, 
      y: 0, 
      z: 0, 
      rotationZ: 0,
      rotationY: 0
    },
    { 
      x: 0, 
      y: 0, 
      z: 0, 
      rotationZ: 0,
      rotationY: 0
    },
    { 
      x: 150, 
      y: 0, 
      z: 0, 
      rotationZ: 0,
      rotationY: 0
    }
  ];