<template>
  <v-container>
    <v-row class="d-flex justify-content-center">
      <span class="text-center text-h5 col-12">Скоро заканчивается конкурс художников в номинации "Майское утро"!<br>Проголосуйте скорее, если вы все еще этого не сделали!</span>
    </v-row>
    <h2 class='mb-10 mt-5 text-h2'>Майское утро</h2>
    <cardsComponent></cardsComponent>
  </v-container>
</template>

<script>
  import cardsComponent from './cardsComponent.vue';

  export default {
    name: 'mainPage',
    components: {
      cardsComponent
    },
  }
</script>

