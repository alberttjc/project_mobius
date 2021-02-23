<template>
  <div id="app"> 
    <component :is="currentPage" :deviceIndex="devices" 
      @go="onGoAlpha" @done="onGoBeta" @complete="onComplete"/>
  </div>
</template>

<script>
import PageAlpha from '@/components/PageAlpha.vue';
import PageBeta from '@/components/PageBeta.vue';
import PageCharlie from '@/components/PageCharlie.vue';

export default {
  name: 'App',
  title: "HRI: Data Collection Process",
  components: { 
    PageAlpha,
    PageBeta,
    PageCharlie,
  },
  data() {
    return {
      currentPage: PageAlpha,

      // Webcam selection
      deviceId: null,
      devices: [],
      camerasListEmitted: false,
    };
  },
  methods: {
    onGoAlpha() {
      this.currentPage = PageAlpha;
    },

    onGoBeta() {
      this.$fire({
        title: 'Stage 2',
        text: 'You have completed Stage 1, please proceed to Stage 2',
        type: 'success',
        focusConfirm: 'false'
      }).then(r => {
        console.log(r.value);
      })
      this.currentPage = PageBeta;
    },

    onComplete() {
      this.$fire({
        title: 'End of Survey',
        text: 'You have completed Stage 2!',
        type: 'success',
        focusConfirm: 'false'
      }).then(r => {
        console.log(r.value);
      })
      this.currentPage = PageCharlie;
    },

    // Testing for camera info
    testMediaAccess() {
      navigator.mediaDevices.getUserMedia({video: true}).then(stream=> {
          let tracks = stream.getTracks();
          tracks.forEach(track => {
              track.stop();
          });
          this.loadCameras();
      }).catch(error => this.$emit("error", error));
    },

    // Getting cameras info 
    loadCameras() {
      navigator.mediaDevices.enumerateDevices().then(deviceInfos => {
        for (let i =0; i !== deviceInfos.length; ++i) {
          let deviceInfo = deviceInfos[i];
          if (deviceInfo.kind === "videoinput") {
              this.devices.push(deviceInfo);
              console.log(deviceInfo)
          }
        }
      })
      .then(() => {
        if (!this.camerasListEmitted) {
        if (this.selectFirstDevice && this.devices.length > 0) {
            this.deviceId = this.devices[0].deviceId;
        }
        this.$emit("cameras", this.devices);
        this.camerasListEmitted = true;
        }
      }).catch(error => this.$emit("Not supported", error));
    },
  },

  // Version 3.0
  // Contains bugs for the 'Next' button while recording
  // Version 3.1
  // Fixed version 3.0 bugs of the toggle button and added countdown display
  // Versions 3.2
  // Added Gesture 0 (Do nothing) and Gesture 26 (Doing something else)
  async mounted() {
    this.testMediaAccess();
    console.log('This is version 3.2 of the data collection study. This includes Gesture 0 and 26 for stage 2.')
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100vw;
  height: 100vh;
  -bkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100vw;
  height: 100vh;;
}
</style>
