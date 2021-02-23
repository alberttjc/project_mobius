
// Nodemon dependencies
const { restart } = require('nodemon');

// Dependencies for router 
const util = require('util');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const express = require('express');
const router = express.Router();

// Rendering webm into mp4
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const command = ffmpeg();


// Connecting into the vpn
/*
const vpn = require('cisco-vpn') ({
    server: 'vpn.monash.edu',
    username: '',
    password: ''
});
vpn.connect().then(() => console.log('Connected!'));
vpn.disconnect().then(() => console.log('Disconnected!'));
*/

// Connect to network drive
const sharedDrive = 'S:\\';
const sharedDir = path.join(sharedDrive, 'stage2');

if (!fs.existsSync(sharedDir)){
    fs.mkdirSync(sharedDir);
}

/*
fs.readdir(sharedDir, (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        console.log(file)
    })
})
*/

router.post('/', async (req, res) => {
    // Save uploaded file
    let form = new formidable.IncomingForm();
    let fileName = '';
    form.keepExtensions = true;

    console.log('saving uploaded file ...');

    form.on('error', (err) => {
        console.log(colors.red('upload error:'));
        console.log(err);
    });

    form.on('fileBegin', (name,file) => {
        //use original filename in this example
        file.path = sharedDir + '/' + file.name;
        fileDir = file.path;      
        console.log('Form on fileBegin');
    });

    form.on('end', function() {
        console.log('Saved file');
        console.log('Listening on port 3000. Awaiting for data...');
    });

    /*
    form.on('end', function() {
        console.log('Saved file');
        videoDir = fileDir.substr(0, fileDir.lastIndexOf(".")) + ".mp4";        
        // Rendering blob into mp4 video
        command
         .on('end', onEnd)
         .on('error',onError)
         .input(fileDir)
         .output(videoDir)
         .outputFPS(60)
         .noAudio()
         .run();
        console.log(1)
    });
    */
    
    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
    });
    
    return;
})

async function onError(err, stdout, stderr) {
    console.log('Cannot process video: ' + err.message);
}

async function onEnd() {
    console.log('Finished processing');
}


module.exports = router;