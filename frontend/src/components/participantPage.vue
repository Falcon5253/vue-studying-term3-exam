<template>
    <v-container>
      {{ participant.name }} <br>
      {{ participant.description }}
    </v-container>
  </template>
  
  <script>
    export default {
      name: 'ParticipantPage',
      data() {
        return {
          participantId: this.$route.params.id
        }
      },
      computed: {
        participant() {
          let participants = this.$store.state.participantsData;
          try{
            let participant = participants.find((el) => el.id == this.$route.params.id);
            return participant.profile;
          }
          catch {
            return {};
          }
        }
      }
    }
  </script>
  
  