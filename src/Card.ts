import * as PIXI_PROJECTION from 'pixi-projection';
import * as PIXI from 'pixi.js';
import * as PIXI_DISPLAY from '@pixi/layers';
import { gsap } from 'gsap';

export class CardSprite extends PIXI_PROJECTION.Container3d {
    multiplier:number = 0;
    shadow: PIXI_PROJECTION.Sprite3d;
    inner: PIXI_PROJECTION.Container3d;
    back: PIXI_PROJECTION.Sprite3d;
    face: PIXI_PROJECTION.Sprite3d;
    
    constructor(faceTexture: string, multiplier?: number, shadowGroup?: PIXI_DISPLAY.Group, cardsGroup?: PIXI_DISPLAY.Group) {
        super();

        this.multiplier = multiplier ?? 0;

        const tex = PIXI.Assets.get(faceTexture);

        this.shadow = new PIXI_PROJECTION.Sprite3d(PIXI.Texture.WHITE);
        this.shadow.tint = 0x000000;
        this.shadow.width = tex.width * 0.6;
        this.shadow.height = tex.height * 0.9;
        this.shadow.scale3d.x = 0.4;
        this.shadow.scale3d.y = 0.4;
        this.shadow.scale3d.z = 0.4;
        this.shadow.anchor.set(0.5);
        this.shadow.alpha = 0.3;
        this.shadow.parentGroup = shadowGroup;
        this.addChild(this.shadow);
        

        this.inner = new PIXI_PROJECTION.Container3d();
        this.inner.parentGroup = cardsGroup;
        this.addChild(this.inner);
        

        this.back = new PIXI_PROJECTION.Sprite3d(PIXI.Assets.get("back"));
        this.back.anchor.set(0.5);

        this.back.scale3d.x = 0.4;
        this.back.scale3d.y = 0.4;
        this.back.scale3d.z = 0.4;
        this.inner.addChild(this.back);
        

        this.face = new PIXI_PROJECTION.Sprite3d(tex);
        this.face.anchor.set(0.5);
        this.face.scale3d.x = 0.4;
        this.face.scale3d.y = 0.4;
        this.face.scale3d.z = 0.4;
        this.face.euler.y = Math.PI;
        this.inner.addChild(this.face);

        this.back.renderable = true;
        this.face.renderable = false;
    }
    
    updateFace() {

        let angle = this.inner.euler.y % (Math.PI * 2);
        if (angle < 0) angle += Math.PI * 2;
        
        if (angle > Math.PI / 2 && angle < (Math.PI * 3 / 2)) {
            this.back.renderable = false;
            this.face.renderable = true;
        } else {
            this.back.renderable = true;
            this.face.renderable = false;
        }

        this.shadow.euler.y = this.inner.euler.y;
    }
    
    flip() {
        const timeline = gsap.timeline();
        
        timeline
            .to(this.inner.position3d, {
                z: -40,
                duration: 0.3,
                ease: "power2.out"
            })
            .to(this.inner.euler, {
                y: `+=${Math.PI}`,
                duration: 0.6,
                ease: "power2.inOut",
                onUpdate: () => this.updateFace()
            }, "-=0.1")
            .to(this.inner.position3d, {
                z: 0,
                duration: 0.3,
                ease: "power2.in"
            }, "-=0.2");
        
        return timeline;
    }
}