<template>
    <div class="video-recorder-page">
        <div class="camera-configs">
            <label class=camera-input>Select Video Input: </label>
            <select class="camera-selection" v-model="deviceId">
                <option>--Select Device--</option>
                <option 
                    v-for="device in devices"
                    :key="device.deviceId"
                    :value="device.deviceId"
                    >{{device.label}}
                </option>
            </select>
        </div>
            
        <div class="video-recorder">
            <video id="myVideo" class="video-js vjs-default-skin" playsinline></video>
            <div class="timerOverlay" v-show="overlay">
                {{timerCount}}
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import 'video.js/dist/video-js.css'
    import 'videojs-record/dist/css/videojs.record.css'
    import videojs from 'video.js'

    import 'webrtc-adapter'
    import RecordRTC from 'recordrtc'
    import Record from 'videojs-record/dist/videojs.record.js'

    export default {
        name: 'VideoRecorder',
        props: {
            actionIndex: {
                type: Number,
                default() {
                    return 0;
                }
            },
            stageIndex: {
                type: Number,
                default() {
                    return 0;
                }
            },
            stageStatus: {
                type: Boolean,
            },
            deviceIndex: {
                type: Array,
            },
        },

        data() {
            return {
                player: '',
                deviceId: null,
                devices: [],
                options: {
                    controls: true,
                    bigPlayButton: false,
                    fluid: false,
                    loop: false,  
                    width: 640,
                    height: 360,
                    bigPlayButton: false,
                    plugins: {
                        // configure videojs-record plugin
                        record: {
                            audio: false,
                            video: {
                                videoMimeType: 'video/webm\;codecs=vp8',
                            },                      
                            maxLength: 5,
                            videoEngine: 'recordrtc',
                            debug: true,
                        }
                    }
                },
                // Passing data from Instruction List
                actionID: 0,
                stageID: 0,

                // Timer function
                overlay: false,
                timerCount: 0,
                timerRecord: 0,

                // Fetching ID from URL
                userID: this.$route.params.id,
            };
        },

         watch: {
             deviceId: function(id) {
                 this.changeVideoInput(id);
             },

             devices: function() {
                 const [first, ...tail] = this.devices;
                 if(first) {
                     this.deviceId = first.deviceId;
                 }
             },

             actionIndex: function() {
                 this.actionID = this.actionIndex;
                 //console.log('Action Index ' + this.actionID);
             },

            stageIndex: function() {
                 this.stageID = this.stageIndex;
                 //console.log('Stage Index ' + this.stageID);
             },

             stageStatus: function() {
                 if (this.stageStatus === true) {
                    this.player.recordToggle.disable();
                 }
             },

            timerCount: {
                handler(value) {
                    if (value > 0) {
                    setTimeout(() => {
                        this.timerCount--;
                    }, 1000);
                    }

                    if (this.timerCount === 0) {
                        this.overlay = false;
                    }
                },
                immediate: true,
            },

            timerRecord: {
                handler(value) {
                    if (value > 0) {
                    setTimeout(() => {
                        this.timerRecord--;
                    }, 1000);
                    }

                    if (this.timerRecord === 1) {
                        this.player.recordToggle.enable();
                    }
                },
                immediate: true,
            },
        },

        methods: {
            changeVideoInput: async function(device) {
                try {
                    this.player.record().setVideoInput(device);
                    //console.log("Changed video input to '" + "' (deviceId: " + this.deviceId + ")");
                } catch (error) {
                    console.warn(error);
                }
            },

            // Uploading blob into the designated serverUrl
            // Subjected to change when uploading to Monash server
            uploadBlob: async function(bloburl) {
                if (this.stageID === 1){
                    var serverUrl = '/stage1';
                }else {
                    var serverUrl = '/stage2';
                }

                var data = bloburl;
                var formData = new FormData();

                // Change the name of the file
                var name = `${this.userID.split('=')[1]}-${this.actionID}-${Date.now()}.webm`;

                formData.append('file', data, name);
                console.log('uploading recording:', name);

                fetch(serverUrl, {
                    method: 'POST',
                    body: formData
                }).then(
                    success => {
                        console.log('Recording upload complete!');
                        // Enable the next button in the parent page
                        this.$emit('buttonEnabled');
                        this.player.recordToggle.enable();
                    }
                ).catch(
                    error => console.error('An upload error occurred!')
                );               
            },
            
            /*
            sleep: function(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                })
            },

            // Fetch ID from URL
            getIDfromURL() {
                //this.userID = window.location.pathname.split('/')[2].split('=');
                var urlArray = window.location.pathname.split('/');
                if (urlArray[1] != '') {
                    this.userID = urlArray[1].split('=');
                }
            },
            */
        },

        mounted() {
            /* eslint-disable no-console */
            this.player = videojs('#myVideo', this.options, () => {
                // print version information at startup
                var msg = 'Using video.js ' + videojs.VERSION +
                    ' with videojs-record ' + videojs.getPluginVersion('record') +
                    ' and recordrtc ' + RecordRTC.version;
                videojs.log(msg);
                this.devices = this.deviceIndex;
            });

            // device is ready
            this.player.one('deviceReady', () => {
                console.log('The player is ready to record!');
            });

            // user clicked the record button and started recording
            this.player.on('startRecord', () => {
                //this.player.record().startVideoPreview();
                this.$emit('buttonDisabled');
                this.player.recordToggle.disable();

                // Timer overlay
                this.overlay = true;
                this.timerCount = 5; 
                this.timerRecord = 10;
            });

            // user completed recording and stream is available
            this.player.on('finishRecord', () => {
                // the blob object contains the recorded data that
                // can be downloaded by the user, stored on server etc.
                console.log('Finished recording: ', this.player.recordedData);
                this.uploadBlob(this.player.recordedData);      
            });

            // error handling
            this.player.on('error', (element, error) => {
                console.warn(error);
            });

            this.player.on('deviceError', () => {
                console.error('device error:', this.player.deviceErrorCode);
            });
        },

        beforeDestroy() { 
            if (this.player) {
                this.player.dispose();
            }
        }
    }
</script>

<style scoped>
.video-recorder {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
}

.timerOverlay {
    position: absolute;
    background-color: rgba(185, 0, 0, 0);
    font-size: 8.0em;
    color:white;
    text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
}

.camera-configs {
  display: flex;
  justify-content: center;
  font-size: 1.2em;
}

.camera-input {
  padding: 5px 10px;
}

.camera-selection {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 1.0em;

  padding: 5px 10px;
  border: 1px solid lightgray;
  border-radius: 10px;
  width: fit-content;
  margin-bottom: 20px;
}

</style>