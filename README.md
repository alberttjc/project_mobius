# Project Mobius

This repository is used to develop the data collection study used in the FYP. This repository uses Vue.js for Frontend web development and Node.js for Backend development.

## Important

Remember to connect to Monash VPN before running the node server!

In order to run this, you would need to run two separate terminal, one for the front end and the other for the backend. 

### Update
<ls>Version 3.2 - Update Gesture 0 (Do nothing) and 26 (Doing something else)

Version 3.1 - Fixed bugs of the toggle button

Version 3.0 - Added countdown timer </ls>



## Backend

This backend server receives all the video recordings from the frontend interface. This is a simple backend server and was later improved with the help of Jerico from Monash IT solutions.

```
$ cd ~/server/
$ node main.js
```

### Dependencies
Simple dependencies needed for this frontend interface

```
$ npm install express cors body-parse mongodb
$ npm i -D nodemon
$ npm install --save @@ffmpeg-installer/ffmpeg
$ npm i vue-simple-alert
```

## Frontend

This frontend uses Vue.js as the main GUI for the user. However, this is unable to upload any videos without using the backend server.

```
$ cd ~/client/
$ npm run serve

alternatively

$ vue ui
```

### Dependencies
Simple dependencies needed for this frontend interface

```
$ npm i axios
$ npm install videojs-record
$ npm install vue-simple-alert
```

### Videojs-record

<b>Custom controls</b>

First pull the repository from [collab-project](https://github.com/collab-project/videojs-record). Then install the following:

```
$ npm install -D webpack webpack-dev-server webpack-cli css-loader style-loader
```

You can then change the source code and once you're done you need to rebuild it again.

```
$ npm run build
```

To install the directory in the project, goto the root directory of the project and run the command below:

```
$ npm install /folder [C:/Users/alber/Desktop/videojs-record]
```

DO NOT forget to install the dependencies!

```
$ npm i webrtc-adapter videojs-wavesurfer video.js recordrtc 
```

Use this shortcut in terminal to copy files over

```
cp -a C:/Users/alber/Desktop/videojs-record/dist/. C:/Users/alber/Desktop/project_mobius/client/node_modules/videojs-record/dist/
```




