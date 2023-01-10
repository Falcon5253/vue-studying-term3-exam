<template>
    <v-row class='d-flex flex-wrap justify-content-between'>
      <!-- СДЕЛАТЬ РЕЗИНОВУЮ ВЕРСТКУ ДЛЯ КРАСИВОГО ОТОБРАЖЕНИЯ -->
      <v-card class='col-4 d-flex' v-for='item in participantsData'  :key="item.id">
        <div class='d-flex flex-column align-items-center mr-2 '>
          <v-img class='mb-2 rounded' :src="item.image" max-width="200" alt="Картина"></v-img>
          <v-btn color="primary" :to="'/' + item.id">
            Check out
          </v-btn>
        </div>
        <span  style="display:block; height: 100%;"> {{ item.about }} </span>
      </v-card>
    </v-row>
</template>

<script>
  export default {
    name: 'cardsComponent',
    computed: {
        participantsData() {
          return this.$store.state.participantsData
        }
    },
  }
</script>
