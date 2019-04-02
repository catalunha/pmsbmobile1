# Projeto De Aplicação Mobile

## Setup

Requirements to use this project:

##### Node.js (https://nodejs.org/download/)

##### npm (Node Package Manager, it comes with node.js installation)
In case you're not with the latest version of npm:
```sh
$ sudo npm install npm -g
```

##### Cordova & Ionic Cli
To install both of them on your system just launch this command:
```sh
$ sudo npm install cordova ionic -g
```

## Install NPM Dependencies
Once you clone this repository, run this command on your terminal to install all needed dependencies:
```sh
$ npm install
```

## Install cordova plugin Dependencies
Run this command on your terminal to add a platform and install all needed puglins:

iOS:
```sh
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Android:
```sh
$ ionic cordova platform add android
$ ionic cordova run android
```
## Launching the App
After installing the needed dependencies you are done, launch your app with a simple
```sh
$ ionic serve
```