# Electron-React-Typescript starter

A starter project for a simple dice roll game using [Javascript](https://javascript.info/), [Electron](https://www.electronjs.org/docs/latest/), [React](https://react.dev/learn) and [Typescript](https://www.typescriptlang.org/docs/).  
This project was bootstrapped with [Create React App (CRA)](https://github.com/facebook/create-react-app).

## Folder structure

``` bash
├── .vscode
│   └── ...                     # vscode configuration
├── server
│   ├── server.ts               # typescript implementation of server
│   └── __server.js             # javascript implementation of server.ts
├── server
│   └── electron
│       └── ...                 # electron startup file
├── public
│   └── ...                     # public resources created by CRA    
├── src
│   ├── components
│   │   ├── ActionButton.tsx    # button to roll dice
│   │   └── PlayerComponent.tsx # component to display player information
│   ├── data
│   │   ├── DnDGame.ts          # Game data structures in typescript
│   │   └── __DnDGame.js        # javascript implementation of DnDGame.ts
│   ├── App.jsx                 # main app component
│   ├── index.js                # entry point for react
│   └── ...
├── .env                        # environment file
├── package.json                # npm package file
├── tsconfig.json               # typescript configuration
└── ...
```

## Setting up the Project

Packages required by this project are listed in `package.json`.  
To download and install them, run `npm install` in the project root directory.

For more information on how to use npm, see [npm documentation](https://docs.npmjs.com/about-npm).

## Usage

``` bash
├── .vscode
│   ├── tasks.json              # build task definition
│   └── launch.json             # debug configuration
└── ...
```

### Build and Start Dev Environment

The `tasks.json` file contains the build task definition for this project.  
It defines two tasks:

* `tsc: watch - tsconfig.json`: To compile Typescript we run run the command `tsc --build`. This will compile all `.ts` files in the project to `.js` files.
* `npm: build`: To start the dev environment run `npm build`. This will allow you to run the app in a browser using the URL `http://localhost:3000`.  
If you set the `BROWSER` environment variable in the _.env_ file to a valid browser name, the browser will be opened automatically after the build step.

The `launch.json` file contains the debug configuration for this project.  
It defines three debug configurations:

* `Launch App`: launches the electron app.
* `Launch Server`: launches the server for debugging.

### Launch the Server and Client

To start the server, run `npm run server` in the project root directory. Alternatively, to debug the server, run the `Launch Server` debug configuration.

To run the client Electron app, you can run the `Launch App` debug configuration. Alternatively, you can run `npm run electron` in the project root directory.

Note: you can run only 1 debug configuration at a time. So, if you want to debug the server you need to run the client using the command line and vice versa.
