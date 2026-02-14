import * as PIXI from 'pixi.js';
import * as PIXI_PROJECTION from 'pixi-projection';
import * as PIXI_DISPLAY from '@pixi/layers';
import { gsap } from 'gsap';

import { CardSprite } from "./Card.ts";

import multipliers from "../public/multipliers.json";
import {weightedRandom} from  "./utils.ts";

let app: PIXI.Application;
app = new PIXI.Application({
  width: 800,
  height: 600,
  resizeTo: document.getElementById('tarot') as HTMLElement,
  backgroundColor: 0x0f212f
});

document.getElementById('tarot')?.appendChild(app.view as HTMLCanvasElement);

PIXI.Assets.addBundle("gold", multipliers.middle);
PIXI.Assets.addBundle("silver", multipliers.side);
PIXI.Assets.add({alias: "back", src: "/assets/tarot-bckseat-gold.png"});

await PIXI.Assets.loadBundle("gold");
await PIXI.Assets.loadBundle("silver");
await PIXI.Assets.load("back");

const camera = new PIXI_PROJECTION.Camera3d();
camera.position.set(app.screen.width / 2, app.screen.height / 2);
camera.setPlanes(200, 10, 10000000);
camera.euler.x = Math.PI / 6;
app.stage.addChild(camera);

const shadowGroup = new PIXI_DISPLAY.Group(1, false);
const cardsGroup = new PIXI_DISPLAY.Group(2, false);

camera.addChild(new PIXI_DISPLAY.Layer(shadowGroup));
camera.addChild(new PIXI_DISPLAY.Layer(cardsGroup));

const cardContainer = new PIXI_PROJECTION.Container3d();
camera.addChild(cardContainer);

const centerX = app.screen.width / 2;
const centerY = app.screen.height / 2;
const tarotContainer = new PIXI.Container();
tarotContainer.position.set(centerX, centerY);
app.stage.addChild(tarotContainer);
function showResult(cards: CardSprite[]) {
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

const card = new CardSprite("/assets/tarot-bckseat-gold.png");
cardContainer.addChild(card);

document.querySelector("button")?.addEventListener('click', (event) => {
  cardContainer.removeChildren();
  const button = event.currentTarget as HTMLButtonElement;
  button.disabled = true;
  const cards: CardSprite[] = [];

  const targetPositions = [
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

  for (let i = 0; i < 3; i++) {
    const pos = i === 1 ? multipliers.middle : multipliers.side;
    const [alias, multiplier] = weightedRandom(pos);
    const card = new CardSprite(alias, multiplier, shadowGroup, cardsGroup);

    card.position3d.x = 0;
    card.position3d.y = 0;
    card.position3d.z = 0;
    card.euler.z = 0;
    card.euler.y = 0;
    card.alpha = 0;

    cardContainer.addChild(card);
    cards.push(card);
  }
  
  const masterTimeline = gsap.timeline({
    onComplete: () => {
      button.disabled = false;
      
      const total = cards[0].multiplier * cards[1].multiplier * cards[2].multiplier;
      console.log('Total payout:', total);
      showResult(cards);
    }
  });
  
  masterTimeline.to(cards, {
    alpha: 1,
    duration: 0.3,
    stagger: 0.1
  });
  
  cards.forEach((card, i) => {
    const target = targetPositions[i];
    
    masterTimeline
      
      .to(card.position3d, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: 0.6,
        ease: "back.out(1.2)"
      }, i * 0.15 + 0.2)
      
      .to(card.euler, {
        z: target.rotationZ,
        y: target.rotationY,
        duration: 0.6,
        ease: "back.out(1.2)"
      }, i * 0.15 + 0.2);
  });

  masterTimeline
    .add("flip", "+=0.3")
    .add(cards[1].flip(), "flip")
    .add(cards[0].flip(), "flip+=1")
    .add(cards[2].flip(), "flip+=2");
});