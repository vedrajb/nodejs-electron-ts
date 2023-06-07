# FF starter

This is a simple project to use [Typescript](https://www.typescriptlang.org/docs/), Node.js Foreign Function Interface module [ffi-napi](https://github.com/node-ffi/node-ffi), [Electron](https://www.electronjs.org/docs/latest/), [React](https://react.dev/learn) and [Redux](https://redux.js.org/introduction/getting-started).  
This project was bootstrapped with [Vite](https://vitejs.dev/guide/). _This is recommended by Aivan, but not used in Anne._

## Folder structure

``` bash
├── .vscode
├── server                  # server folder
|   ├── bin
|   │   └── binding.dll     # C++ dll for Fibonacci series
│   ├── modules
│   │   └── fibo-ffi.ts     # ffi implementation of binding.dll
│   ├── server.ts           # typescript implementation of server
├── public
│   └── ...                 # public resources created by Vite
├── src
│   ├── components
│   │   └── FiboComponent.tsx       # React component to display fibonacci series
│   │   └── FiboComponentRedux.tsx  # React-Redux component to display fibonacci series
│   ├── App.tsx             # main app component
│   ├── index.tsx           # entry point for react
│   ├── store.ts            # Redux store
│   ├── custom.d.ts         # typescript declaration file 
│   └── ...
├── index.html              # html template
├── main.tsx                # electron startup file
├── package.json            # npm package file
├── tsconfig.json           # typescript configuration
└── vite.config.json        # vite configuration
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

### __[Server]__ Build and Start Dev Environment

The `tasks.json` file contains the build task definition for this project.  
It defines two tasks:

* `tsc: watch - tsconfig.json`: To compile Typescript we run run the command `tsc --build`. This will check for compilation errors in the Typescript files.

The `launch.json` file contains the debug configuration for this project.  
It defines three debug configurations:

* `Launch Server`: starts the server from vscode. Alternatively, you can run `npm run server` in the terminal.

### __[Client]__ Build and Start Dev Environment

The `tasks.json` file contains the build task definition for this project.  
It defines two tasks:

* `tsc: watch - tsconfig.json`: To compile Typescript we run run the command `tsc --build`. This will check for compilation errors in the Typescript files.
* `npm: build`: To start the dev environment run `npm build`. This will allow you to run the app in a browser using the URL specified in the build output `http://localhost:3000`.  

The `launch.json` file contains the debug configuration for this project.  
It defines three debug configurations:

* `Launch App`: launches the electron app from vscode. Alternatively, you can run `npm run client` in the terminal.
