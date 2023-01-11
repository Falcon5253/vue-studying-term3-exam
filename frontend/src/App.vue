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
        v-model="searchQuery"
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      ></v-text-field>
      <v-btn icon :disabled="searchIsEmpty" @click="startSearching">
        <v-icon>mdi-arrow-top-right</v-icon>
      </v-btn>
      <div v-if="!isAuthenticated">
        <v-btn @click="isAuthenticated=!isAuthenticated" text>
          <span>Войти в аккаунт</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn class='mr-2' text to="/profile/">
          <span>Профиль</span>
        </v-btn>
        <v-btn @click="isAuthenticated=!isAuthenticated" text>
          <span>Выйти</span>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main style="height: 50px; overflow-y: scroll; margin-top: 64px; padding-top: 0px;">
      <router-view></router-view>
    </v-main>
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
    }
  },
  mounted() {
    this.$store.dispatch('getData');
    this.$root.$on("reset-scroll", this.resetScroll);
  },
};
</script>

<style>
html {
  overflow-y: hidden;
}
.appTitle {
  font-weight: 400;
}
.appTitle:hover {
  cursor: default;
}
</style>