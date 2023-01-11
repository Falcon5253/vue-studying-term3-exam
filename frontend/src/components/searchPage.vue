<template>
    <v-container>
        <h2 class='text-h4 mt-6 text-center'>Не удалось ничего найти по вашему запросу: "{{ $route.query.query }}"</h2>
    </v-container>
  </template>
  
  <script>
  
  
    export default {
      name: 'searchPage',
    }
  </script>
  
  