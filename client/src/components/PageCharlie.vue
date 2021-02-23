<template>
  <div class="page-charlie">
    <h1> Thank You for participating! </h1>

    <div class="page-body" >
      <div v-for="(instruction,index) in instructions" v-bind:key="index" >
        <p>{{instructions[index].message}}</p>
      </div>
    </div>

  </div>
</template>

<script>
import { goodbye } from '@/components/instructions.js';

export default {
  name: 'PageCharlie',
  data() {
    return {
      instructions: goodbye,
    }
  },

  methods: {
  },
}
</script>

<style scoped>
.page-charlie {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.page-body {
  display: flex;
  flex-direction: column;
  min-width: 600px;
  max-width: 900px;

  padding: 5px 30px;
  border: 1px solid lightgray;

  font-size: 1.3em;

  margin-top: 20px;
}

</style>
