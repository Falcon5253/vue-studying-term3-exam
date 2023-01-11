<template>
    <div class='cards-list'>
      <v-card class='d-flex flex-column flex-sm-row cards-list__item' v-for='item in participantsData'  :key="item.id">
        <div class='d-flex flex-column align-items-center mr-2 '>
          <v-img class='mb-2 rounded card-image' :src="item.image"></v-img>
          <div class="print-view">
            <img class="print-view-img" :src="item.image" alt="Картина">
          </div>
          <v-btn color="primary" class='mb-2' @click="goToItem(item.id)">
            Подробнее
          </v-btn>
        </div>
        <div class='d-flex col-lg-7 flex-column'>
          <span class='card-text'> {{ item.about }} <a :href="item.image" v-if="item.hasLink">{{ item.image }}</a></span>
        </div>
      </v-card>
    </div>
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

<style lang='scss'>

.cards-list {
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2%;
  row-gap: 10px;
  justify-content: start;
  &__item {
    padding-left: 10px;
    padding-top: 10px;
    width: 32%;
  }
}
.card-image {
  width: 200px;
}
.card-text {
  display:block;
  height: 100%;
}
.print-view {
  display: none;
}
@media (max-width: 1919px) {
  .cards-list {
    display: flex;
    gap: 1%;
    row-gap: 10px;
    &__item {
      padding-left: 10px;
      padding-top: 10px;
      width: 49%;
    }
  }
}
@media (max-width: 1263px) {
  .cards-list {
    row-gap: 10px;
    &__item {
      padding-left: 10px;
      padding-top: 10px;
      width: 100%;
    }
  }
}
@media (max-width: 600px) {
  .card-image {
    width: 100%;
  }
}
@media print {
  .card-image {
    display: none !important;
  }
  .cards-list {
    page-break-inside: avoid;
  }
  .print-view {
    display: block;
    width: 100%;
    &-img {
      width: 100%;
    }
  }
}
</style>