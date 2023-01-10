<template>
  <v-container>
    <v-row class="d-flex justify-content-center">
      <span class="text-center text-h5 col-12">Скоро заканчивается конкурс художников в номинации "Майское утро"!<br>Проголосуйте скорее, если вы все еще этого не сделали!</span>
    </v-row>
    <cardsComponent></cardsComponent>
  </v-container>
</template>

<script>
  import cardsComponent from './cardsComponent.vue';

  export default {
    name: 'MainPage',
    components: {
      cardsComponent
    },
  }
</script>

