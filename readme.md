<h1 align="center">
    <img alt="proffy-header" title="proffy" src=".docs/header.svg" width="900px" />
</h1>
<br>
<p align="center">
 <img alt="languages count" src="https://img.shields.io/github/languages/count/jbresolinn/nlw-proffy?color=8257EE"/>
  <img alt="repo size" src="https://img.shields.io/github/repo-size/jbresolinn/nlw-proffy?color=8257EE">
  <img alt="license" src="https://img.shields.io/github/license/jbresolinn/nlw-proffy?color=8257EE">
  <img alt="stars" src="https://img.shields.io/github/stars/jbresolinn/nlw-proffy?color=8257EE">
</p>
<br>
<p align="center">
  <a href="#-what-is-proffy">What is Proffy?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-what-technologies-are-used">What technologies are used?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-prototype">Prototype</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-running-the-project">Running the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>
<br>


## <img src=".docs/label.svg" width="18px">&nbsp; What is Proffy?

Proffy is an open source project that aims to connect teacher and students to private classes.

It was developed during the second edition of Next Level Week at Rocketseat, from August 3 to 9, 2020.

You can learn more about Rocketseat and Next Level Week [here](https://rocketseat.com.br/) and [here](http://nextlevelweek.com/).
<br><br>

## <img src=".docs/label.svg" width="18px">&nbsp; What technologies are used?

For the development of Proffy, the stack was used as a basis: `node.js`, `reactjs` and `react native`.

Along with the stack, technologies such as restfull api, hooks, sqlite storage, mobile first and reponsiveness, among others, were used.
<br><br>

## <img src=".docs/label.svg" width="18px">&nbsp; Prototype

The prototype was developed entirely by Rocketseat UI Designer [@tiagoluchtenberg](https://instagram.com/tiagoluchtenberg) and you can check the web layout at [this link](https://www.figma.com/file/GHGS126t7WYjnPZdRKChJF/Proffy-Web) and the mobile layout at [this link](https://www.figma.com/file/e33KvgUpFdunXxJjHnK7CG/Proffy-Mobile?node-id=0%3A1).
<br><br>

## <img src=".docs/label.svg" width="18px">&nbsp; Running the project

The project has three modules: `server`, `web` and `mobile`. Before running the commands below, make sure that you are in the directory of the module you want to run.

- **Server:**
    - Go to the server folder: **`cd /server`**;
    - Install the dependencies: **`yarn`** or **`npm install`**;
    - Run the project: **`yarn start`** or **`npm start`**;
    - Make sure the server is running correctly by accessing: http://localhost:3333;

- **Web:**
  -  Go to the web folder: **`cd /web`**;
  - Install the dependencies: **`yarn`** or **`npm install`**;
  - Run the project: **`yarn start`** or **`npm start`** (It is necessary to have react-scripts installed globally on the machine: **`yarn add react-scripts --global`** or **`npm install -g react-scripts`**;
  - Make sure the server is running correctly by accessing: http://localhost:3000;

- **Mobile:**

  The mobile app was developed using [Expo](https://expo.io/), so you will need some extra settings:

  **1º: Install `expo-cli` globally on your machine:** `npm install expo-cli --global` or `yarn add expo-cli -g`; <br>
  **2º: Have the Expo App installed where you will run the project:** [IOS](https://apps.apple.com/app/apple-store/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www);


    - Go to the mobile folder: **`cd /mobile`**;
    - Install the dependencies: **`yarn`** or **`npm install`**;
    - Run the project: **`yarn start`** or **`npm start`** or **`expo start`**;
    - When executing the previous command, a tab will open in your browser (Expo Console). Observe at the bottom left of the screen, some options and execute as needed: <br>
        - **If you want to run the application on your physical device:** Scan the QR Code that appears in the bottom left corner of the screen with your camera and the device will ask you to open the Expo App. Just wait for the application to be built. (:warning: Remember that the physical devices and the application server must be on the same network).
        - **If you want to run on an emulator:** Select option `Run on Android device/emulator` and just await for the application to be built.
<br><br>

## <img src=".docs/label.svg" width="18px">&nbsp; License

  This project is under the MIT license. See the [license](license.md) file more details.

---

Made with ❤ by Julia Bresolin! <br>
<small>[Follow me on social networks!](https://linktr.ee/juliabresolin)</small>