<template>
  <v-container>
    <v-row class="d-flex justify-content-center">
      <span class="text-center text-h5 col-12">Скоро заканчивается конкурс художников в номинации "Майское утро"!<br>Проголосуйте скорее, если вы все еще этого не сделали!</span>
    </v-row>
    <router-link to="/1">A</router-link>
  </v-container>
</template>

<script>
  export default {
    name: 'MainPage',
    data() {
      return {
        participantsData: {},
      }
    },
  }
</script>

