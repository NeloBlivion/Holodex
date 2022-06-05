<template>
<div>
      <div class="text-center">
    <v-rating
      v-model="rating"
      bg-color="orange-lighten-1"
      color="blue"
    ></v-rating>
  </div></div>
</template>
<script>
  export default {
    data: () => ({
      c1: '#ff00ff',
      c2: '#00ff00',
      rating: 3 
    }),
  }</script>