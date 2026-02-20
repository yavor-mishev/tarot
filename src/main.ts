import * as PIXI from 'pixi.js';
import * as PIXI_PROJECTION from 'pixi-projection';
import * as PIXI_DISPLAY from '@pixi/layers';
import { gsap } from 'gsap';

import { gameConfig } from './config';
import { CardSprite } from "./Card.ts";
import { weightedRandom, showResult, targetPositions } from  "./utils.ts";
import multipliers from "../public/multipliers.json";

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
camera.setPlanes(gameConfig.camera.fov, gameConfig.camera.nearPLane, gameConfig.camera.farPLane);
camera.euler.x = gameConfig.camera.tiltAngle;
app.stage.addChild(camera);

const shadowGroup = new PIXI_DISPLAY.Group(1, false);
const cardsGroup = new PIXI_DISPLAY.Group(2, false);
const cardContainer = new PIXI_PROJECTION.Container3d();
camera.addChild(new PIXI_DISPLAY.Layer(shadowGroup));
camera.addChild(new PIXI_DISPLAY.Layer(cardsGroup));
camera.addChild(cardContainer);

const centerX = app.screen.width / 2;
const centerY = app.screen.height / 2;
const tarotContainer = new PIXI.Container();
tarotContainer.position.set(centerX, centerY);
app.stage.addChild(tarotContainer);

const card = new CardSprite("/assets/tarot-bckseat-gold.png");
cardContainer.addChild(card);

document.querySelector("button")?.addEventListener('click', (event) => {
  cardContainer.removeChildren();
  const button = event.currentTarget as HTMLButtonElement;
  button.disabled = true;
  const cards: CardSprite[] = [];

  for (let i = 0; i < 3; i++) {
    const pos = i === 1 ? multipliers.middle : multipliers.side;
    const [src, multiplier] = weightedRandom(pos);
    const card = new CardSprite(src, multiplier, shadowGroup, cardsGroup);

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
      showResult(cards, app, centerX, centerY);
    }
  });
  
  masterTimeline
    .to(cards, {
      alpha: 1,
      duration: 0.3
    });
  
  cards.forEach((card, i) => {
    const target = targetPositions[i];
    
    masterTimeline
      .to(card.position3d, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: 0.5,
        ease: "back.out(1.2)"
      }, "<0.2")
  });

  masterTimeline
    .add("flip", "+=0.3")
    .add(cards[1].flip(), "flip")
    .add(cards[0].flip(), "flip+=1")
    .add(cards[2].flip(), "flip+=2");
});