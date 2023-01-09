<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div v-if="isMainPage">
        <h1>Nominations</h1>
      </div>
      <div v-else class='d-flex'>
        <v-btn icon class='mr-3'>
          <v-icon large>
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <h1>
          Some participant
        </h1>
      </div>
      <v-spacer></v-spacer>
      <div v-if="!isAuthenticated">
        <v-btn @click="isAuthenticated=!isAuthenticated">
          <span>Войти в аккаунт</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn class='mr-2'>
          <span>Профиль</span>
        </v-btn>
        <v-btn @click="isAuthenticated=!isAuthenticated">
          <span>Выйти</span>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isMainPage() {
      return true;
    }
  },
  data: () => ({
    isAuthenticated: true
  }),
  mounted() {
    this.$store.commit('getData');
  }
};
</script>
