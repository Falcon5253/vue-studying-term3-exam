<template>
    <v-row class='d-flex flex-wrap justify-content-between'>
      <v-card class='col-4 d-flex' v-for='item in participantsData'  :key="item.id">
        <div class='d-flex flex-column align-items-center mr-2 '>
          <v-img class='mb-2 rounded' :src="item.image" max-width="200"></v-img>
          <v-btn color="primary" class='mb-2' @click="goToItem(item.id)">
            Подробнее
          </v-btn>
        </div>
        <div class='d-flex col-8 flex-column'>
          <span  style="display:block; height: 100%;"> {{ item.about }} </span>
          <a :href="item.image" v-if="item.hasLink">{{ item.image }}</a>
        </div>
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
