<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div v-if="isMainPage" class='d-flex align-content-center'>
        <h1 class='appTitle'>Nominations</h1>
        <v-btn icon class='ml-3' @click="refresh()">
          <v-icon medium>
            mdi-refresh
          </v-icon>
        </v-btn>
        <v-btn v-if="!filtered" icon @click="toggleFilter()" color="accent">
          <v-icon medium>
            mdi-filter
          </v-icon>
        </v-btn>
        <v-btn v-else icon @click="toggleFilter()">
          <v-icon medium>
            mdi-filter
          </v-icon>
        </v-btn>
        <v-btn v-if="sortBy == ''" class='ml-5  mt-2 sortField' text @click="toggleSort()">
          sort by description
        </v-btn>
        <v-btn v-else-if="sortBy == 'byName'" class='ml-5  mt-2 sortField' text @click="toggleSort()">
          sort by description
          <v-icon medium class='ml-3 sortField'>
            mdi-arrow-down
          </v-icon>
        </v-btn>
        <v-btn v-else class='ml-5  mt-2' text @click="toggleSort()">
          sort by description
          <v-icon medium class='ml-3'>
            mdi-arrow-up
          </v-icon>
        </v-btn>
      </div>
      <div v-else class='d-flex'>
        <v-btn icon class='mr-3' @click="goMainMenu">
          <v-icon medium>
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <h1>
          {{ participantName }}
        </h1>
      </div>
      <v-spacer></v-spacer>
      <v-text-field
        class='searchField'
        v-model="searchQuery"
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      ></v-text-field>
      <v-btn class='searchField' icon :disabled="searchIsEmpty" @click="startSearching">
        <v-icon>mdi-arrow-top-right</v-icon>
      </v-btn>
      <v-btn class='mobile-show' icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-btn class='mobile-hidden' text href="/main.json">
         <span>main.json</span>
      </v-btn>
      <div class='mobile-hidden' v-if="!isAuthenticated">
        <v-btn @click="isAuthenticated=!isAuthenticated" text>
          <span>Войти в аккаунт</span>
        </v-btn>
      </div>
      <div class='mobile-hidden' v-else>
        <v-btn class='mr-2' text to="/profile/">
          <span>Профиль</span>
        </v-btn>
        <v-btn @click="isAuthenticated=!isAuthenticated" text>
          <span>Выйти</span>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer
      class='footer'
      color="primary lighten-1"
      padless
    >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="primary py-4 text-center white--text"
        cols="12"
      >
      <v-btn class="link" text href="https://github.com/Falcon5253/vue-studying-term3-exam">Link to my GitHub</v-btn>
      </v-col>
    </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isMainPage() {
      if (this.$route.fullPath == "/") {
        return true;
      }
      else {
        return false;
      }
    },
    participantName() {
      if (!this.isMainPage) {
        let participants = this.$store.getters.participantsData;
        try{
          let participant = participants.find((el) => el.id == this.$route.params.id);
          return participant.username;
        }
        catch {
          return "";
        }
      }
      return "";
    },
    searchIsEmpty() {
      if (this.searchQuery == "") {
        return true
      }
      return false;
    }
  },
  data: () => ({
    searchQuery: "",
    filtered: false,
    sortBy: "",
    isAuthenticated: true
  }),
  methods: {
    goMainMenu() {
      this.resetScroll();
      this.$router.push("/");
      this.searchQuery = "";
    },
    resetScroll() {
      document.querySelector(".v-main").scrollTo(0, 0);
    },
    startSearching() {
      this.$router.push("/search?query=" + this.searchQuery);
    },
    refresh() {
      this.$store.dispatch('getData');
    },
    toggleFilter() {
      this.filtered = !this.filtered;
      this.$root.$emit("toggleFilter");
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
      this.$root.$emit("toggleSort");
    }
  },
  mounted() {
    this.$store.dispatch('getData');
    this.$root.$on("reset-scroll", this.resetScroll);
  },
};
</script>

<style>
.link {
  color: white !important;
  text-decoration: underline;
}
html {
  overflow-y: hidden;
}
.appTitle {
  font-weight: 400;
}
.appTitle:hover {
  cursor: default;
}
.v-main {
  height: 50px;
  overflow-y: scroll;
  padding-top: 0px;
}
.mobile-show {
  display: none;
}
@media (max-width: 1263px) {
  .searchField {
    display: none;
  }
}
@media (max-width: 959px) {
  .sortField {
    display: none;
  }

}
@media (max-width: 650px) {
  .mobile-hidden {
    display: none;
  }
  .mobile-show {
    display: block;
  }
  .appTitle {
    margin-top: 5px;
    font-size: 24px;
  }
}
@media print {
  html {
    page-break-inside: avoid;
  }
  .v-main {
    padding-top: 0 !important;
    overflow-y: hidden;
  }
}
</style>