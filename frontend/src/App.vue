<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div v-if="isMainPage">
        <h1 class="text-h5">Nominations</h1>
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
      <div v-if="!isAuthenticated">
        <v-btn @click="isAuthenticated=!isAuthenticated" text>
          <span>Войти в аккаунт</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn class='mr-2' text>
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
        let participants = this.$store.state.participantsData;
        try{
          let participant = participants.find((el) => el.id == this.$route.params.id);
          return participant.username;
        }
        catch {
          return "";
        }
      }
      return "";
    }
  },
  data: () => ({
    isAuthenticated: true
  }),
  methods: {
    goMainMenu() {
      this.resetScroll();
      this.$router.push("/");
    },
    resetScroll() {
      document.querySelector(".v-main").scrollTo(0, 0);
    }
  },
  mounted() {
    this.$store.commit('getData');
    this.$root.$on("reset-scroll", this.resetScroll);
  },
};
</script>

<style>
html {
  overflow-y: hidden;
}
</style>