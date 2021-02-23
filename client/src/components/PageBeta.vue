<template>
  <div class="page-beta">
    <h1> Stage 2 </h1>
    <div class="page-intro">
        <div v-for="(instruction,index) in page_instructions" v-bind:key="index" >
          <br> {{page_instructions[index].message}}
        </div>
    </div>

    <div class="page-divider">
      <div class="page-video">
        <iframe width="640" height="360" 
          :src= youtube[this.count].message
          frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
      
      <VideoRecorder :actionIndex="count" :stageIndex="stage" :stageStatus="completed"
        :deviceIndex="deviceIndex" @buttonEnabled="onEnable" @buttonDisabled="onDisable" />
    </div>

    <div class="page-list">
      <div class="page-instruction" >
        <div v-if="this.completed === true">
          Done! Please proceed to the next stage!
        </div>
        <div v-else>
          {{instructions[count].message}}
        </div>
      </div>
      <div v-if="this.completed === false">
        <button class="button" @click="onCounter" :disabled="buttonDisabled"> Next </button>
      </div>
      <div v-else>
        <button class="button" @click="onComplete"> Done </button>
      </div>
    </div>
  </div>
</template>

<script>
import VideoRecorder from '@/components/VideoRecorder.vue'
import { beta_page_instructions, beta_gestures_instructions, beta_url } from '@/components/instructions.js';

export default {
  name: 'PageBeta',
  components: {
    VideoRecorder,
  },
  props: {
    deviceIndex: {
      type: Array,
    }
  },
  data() {
    return {
      // buttonEnabled: 1 = disabled, 0 = enabled
      buttonEnabled: 1,
      instructions: beta_gestures_instructions,
      page_instructions: beta_page_instructions,
      youtube: beta_url,
      count: 0,
      stage: 0,
      completed: false,
    }
  },
  methods: {
    onCounter() {
      if (this.count < 26) {
        this.count++;
      }
      else this.completed = true;

      // Use this to disable the next button
      this.buttonEnabled = 1;
    },

    onEnable: function() {
      this.buttonEnabled = 0;
    },

    onDisable: function() {
      this.buttonEnabled = 1;
    },

    onComplete: async function(){
      this.$emit('complete');
    }
  },

  computed: {
    buttonDisabled: function() {
      return this.buttonEnabled === 1 ? true : false;
    },
  },

  mounted() {
    // Use this to track the index of all the instructions
    this.stage = 2;
  }
}
</script>

<style scoped>
.page-beta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.page-intro {
  display: flex;
  flex-direction: column;
  min-width: 600px;
  max-width: 1000px;

  font-size: 1.5em;
  margin-top: 20px;
  margin-bottom: 25px;
}

.page-divider {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.page-video {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 700px;
  margin-top: 55px;
  margin-bottom: 20px;
}

.page-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 600px;
  max-width: 1300px;
}

.page-instruction {
  padding: 5px 10px;
  border: 1px solid lightgray;
  border-radius: 10px;
  width: fit-content;
  font-size: 1.5em;
  margin-bottom: 20px;
}

.button {
  display: flex;
  justify-content:right;
  padding: .5em 1em;
  border: none;
  cursor: pointer;

  background-color: #6A7D8C;
  border-radius: 5px;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 1.5em;
}

</style>
