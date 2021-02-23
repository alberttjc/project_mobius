<template>
  <div class="page-alpha">
    <h1> Stage 1 </h1>
    <div class="page-intro">
        <div v-for="(instruction,index) in page_instructions" v-bind:key="index" >
          <br> {{page_instructions[index].message}}
        </div>
    </div>

    <div class="page-divider">
      <div class="page-image">
        <img src="../assets/fetch-robot.png" height="450px"/>
      </div>
      <VideoRecorder :actionIndex="count"  :stageIndex="stage"
        :deviceIndex="deviceIndex" :stageStatus="this.completed"
        @buttonEnabled="onEnable" @buttonDisabled="onDisable" />
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
        <button class="button" @click="onDone"> Done </button>
      </div>
    </div>
  </div>
</template>

<script>
import VideoRecorder from '@/components/VideoRecorder.vue'
import { alpha_gestures_instructions, alpha_page_instructions } from '@/components/instructions.js';

export default {
  name: 'PageAlpha',
  components: {
    VideoRecorder,
  },
  props: {
    deviceIndex: {
      type: Array,
    },
  },

  data() {
    return {
      // buttonEnabled: 1 = disabled, 0 = enabled
      buttonEnabled: 1,
      instructions: alpha_gestures_instructions,
      page_instructions: alpha_page_instructions,
      count: 0,
      stage: 0,
      completed: false,
      array: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    }
  },
  methods: {
    onCounter() {
      if (this.array.length > 0) {
        this.count = this.getRandomInt(this.array.length);
        this.removeItem(this.array,this.count);
      }
      else this.completed = true;

      // Use this to disable the next button
      this.buttonEnabled = 1;
    },

    removeItem: function(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index,1);
      }
      return arr;
    },

    getRandomInt: function(max) {
      return this.array[Math.floor(Math.random() * Math.floor(max))];
    },

    onEnable: function() {
      this.buttonEnabled = 0;
    },

    onDisable: function() {
      this.buttonEnabled = 1;
    },

    onDone: async function(){
      this.$emit('done');
    }
  },

  computed: {
    buttonDisabled: function() {
      return this.buttonEnabled === 1 ? true : false;
    },
  },

  mounted() {
    // Use this to track the index of all the instructions
    this.count = this.getRandomInt(this.array.length);
    this.removeItem(this.array,this.count);
    //console.log('ListPage ' + this.count);
    this.stage = 1;
  },
}
</script>

<style scoped>
.page-alpha {
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
  margin-bottom: 10px;
}

.page-divider {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.page-image {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;

  margin-bottom: 20px;
}

.page-list {
  display: flex;
  flex-direction: column;
  align-items: center;
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
