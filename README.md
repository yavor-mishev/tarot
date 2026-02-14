# Tarot Backseat Gaming

This is a simple web app that simulates the card game "Tarot". It uses PixiJS for rendering, GSAP for animations, and pixi-projection for 3D effects and @pixi/layers for better layer management. The app allows users to draw cards with different multipliers and displays them in a somewhat visually appealing way.

## To start the app

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server using `npm run dev`.
4. Open your browser and navigate to `http://localhost:3000` to see the app in action.
5. Click the "Bet" button

## To build the app for production

1. Run `npm run build` to create a production build of the app in the `dist` folder.

You can run `npm run preview` to preview the production build locally.

## Project structure

- `src/`: Contains the source code for the app.
  - `main.ts`: The main entry point of the application where the PixiJS app is initialized and the game logic is implemented.
  - `Card.ts`: Contains the `CardSprite` class which represents a card in the game, including its visual representation and properties.
  - `utils.ts`: Contains utility functions, such as `weightedRandom`, which is used to select cards based on their multipliers.
- `multipliers.json`: A JSON file that defines the different multipliers for the cards and their probabilities.
- `assets/`: Contains the image assets used in the app, such as card textures.
- `docs/`: Contains the learning journal and notes related to the development of the app. I have followed many resources to learn how to use PixiJS and implement the game logic, and I have documented my learning process in this folder.

## AI log

I have used Claude for most of the maths regarding animations and card placements, as well as for some of the code structure and organization. I used it mostly when learning about the new technologies, like help me understand how to use PixiJS and its various features, such as containers, sprites, and plugins. I have also used it to help me with the mental model of the game. Overall, Claude has been a valuable resource in helping me learn and implement this project.

For the assets I have used Gemini's NanoBanana to generate the card textures and my girlfriend (non-AI) to make the visuals consistent.

I have tried my best to not use AI to write code for me but rather to give me clear directions for things I might have missed or have trouble with. Hence, I have really only used it in ASK mode and not in Agent mode.

## Other learning resources

- [PixiJS documentation](https://pixijs.download/v7.x/docs/index.html): The official documentation for PixiJS v7, which I used to learn about the different classes and methods available in the library.
- [learningPixi](https://github.com/kittykatattack/learningPixi?tab=readme-ov-file#introduction): a repository from kittykatattack that i think explains the use of PixiJS in a very clear and concise way, with lots of examples and explanations.
- [GSAP documentation](https://greensock.com/docs/): The official documentation for GSAP, which I used to learn about the different animation methods (mainly `to()`) and properties available in the library.
- [Pixi.js](https://www.youtube.com/watch?v=_HjQTzpbRK4&list=PLGsA9l-S7trVmUJ7HJsNSKIj0qoAO_qO8) YouTube tutorial series by **Dower Chin**

## Things I found cool and want to implement in the future

- loading multiple asseys as one image (spritesheet) for better performance (and selecting specific frames from the spritesheet for different sprites) and some other tricks that could boost performance, such as using `ParticleContainer` for a large number of similar sprites.
- how the renderer works and its properties.

## Things Id like to improve in the future and if i had more time

- perfecting the perspective and shadow effects
- utilizing more of the features of PixiJS and its plugins, such as filters and masks, to create more visually appealing effects.
- adding more interactivity to the app, such as allowing users to shuffle the deck.
- improving the overall design and layout of the app
- implement the state flow machine in this verion of the app (I implemented it in my first version but that one had way too many flaws and I wanted to start from scratch and do it better, so I didnt get the chance to replicate it here).
- responsiveness and making the app work well on different screen sizes and devices.
- and most importantly cleaning up the code and making it more organized and maintainable, such as by separating the game logic from the rendering logic and using a more structured approach to managing the different components of the app.

Overall, thank you for the challenge and for the opportunity to learn and create this app! I had a lot of fun working on it!
