<template>
    <v-row class='d-flex flex-wrap justify-content-between'>
      <!-- СДЕЛАТЬ РЕЗИНОВУЮ ВЕРСТКУ ДЛЯ КРАСИВОГО ОТОБРАЖЕНИЯ -->
      <v-card class='col-4 d-flex' v-for='item in participantsData'  :key="item.id">
        <div class='d-flex flex-column align-items-center mr-2 '>
          <v-img class='mb-2 rounded' :src="item.image" max-width="200"></v-img>
          <v-btn color="primary" class='mb-2' @click="goToItem(item.id)">
            Подробнее
          </v-btn>
        </div>
        <span  style="display:block; height: 100%;"> {{ item.about }} </span>
      </v-card>
    </v-row>
</template>

<script>
  export default {
    name: 'cardsComponent',
    props: ["participantsData"],
    methods: {
      goToItem(id) {
        this.$root.$emit('reset-scroll');
        this.$router.push("/participant/" + id);
      }
    }
  }
</script>
