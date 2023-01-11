<template>
  <v-container>
    <v-row class="d-flex justify-content-center print-hidden">
      <span class="text-center banner-text col-12">Скоро заканчивается конкурс художников в номинации "Майское утро"!<br>Проголосуйте скорее, если вы все еще этого не сделали!</span>
    </v-row>
    <h2 class='mb-10 mt-5 page-title'>Майское утро</h2>
    <cardsComponent :participantsData='participantsData'></cardsComponent>
  </v-container>
</template>

<script>
  import cardsComponent from './cardsComponent.vue';

  export default {
    name: 'mainPage',
    components: {
      cardsComponent
    },
    data() {
      return {
        filtered: false,
        sortBy: "",
      }
    },
    methods: {
      toggleFilter() {
        this.filtered = !this.filtered;
      },
      toggleSort() {
        if (this.sortBy == ""){
          this.sortBy = "byName";
        }
        else if (this.sortBy == "byName") {
          this.sortBy = "!byName";
        }
        else {
          this.sortBy = "";
        }
      }
    },
    computed: {
      participantsData() {
        let data = this.$store.getters.participantsData
        if (this.filtered == true) {
          data = data.filter(el => el.hasLink == true);
        }
        var sorted = [];
        if (this.sortBy == "byName") {
          for(let key in data) {
              sorted[sorted.length] = data[key].about;
          }
          sorted.sort();
        }
        else if (this.sortBy == "!byName") {
          for(let key in data) {
              sorted[sorted.length] = data[key].about;
          }
          sorted.sort().reverse();
        }
        let sortedData = []
        sorted.forEach(sortedElement => {
          data.forEach(element => {
            if (element.about == sortedElement) {
              sortedData.push(element)
            }
          })
        })
        if (sortedData.length > 0) {
          data = sortedData;
        }
        return data;
      }
    },
    mounted() {
      this.$root.$on("toggleFilter", this.toggleFilter)
      this.$root.$on("toggleSort", this.toggleSort)
    }
  }
</script>
<style>
.banner-text {
  font-size: 28px;
}
.page-title {
  font-size: 52px;
  font-weight: 400;
}
@media (max-width: 1920px) {
  .banner-text {
    font-size: 20px;
  }
  .page-title {
    font-size: 32px;
  }
  
}
@media (max-width: 650px) {
  .banner-text {
    font-size: 14px;
  }
  .page-title {
    font-size: 24px;
  }
}
@media print {
  .v-main {
    margin-top: 0;
  }
  .v-main__wrap {
    margin-top: 0;
  }
  .print-hidden {
    display: none !important;
  }
  button, a, footer, header {
    display: none !important;
  }
}
</style>
