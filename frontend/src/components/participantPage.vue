<template>
  <v-container>
    <h2 class="mt-5 text-h2 mb-2">Картина "{{ participant.alt[0].toUpperCase() + participant.alt.slice(1) }}"</h2>
    <div class='d-flex'>
      <div>
        <v-img class='mr-5' position="left center" :src="participant.image" width="800" height="600" contain></v-img>
        <p class='text-h6 mt-2'>{{ participant.about }}</p>
      </div>
      <v-form
        style="width: 50%;"
        ref="form"
        v-model="valid"
        lazy-validation
        :disabled="isLoading || votedFor"
      >
        <div v-if="votedFor">
          <p class='text-h5' > Ваш голос был принят!</p>
        </div>
        <div v-else>
          <p class='text-h5'> Понравилась работа автора? Так проголосуйте за нее! </p>
        </div>
        <v-text-field
          v-model="name"
          :counter="24"
          :rules="nameRules"
          label="Имя"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Почта"
          required
        ></v-text-field>
        <v-btn color="light-green" class="mt-1" @click="sendData" :disabled="isLoading || !valid || votedFor">
            Проголосовать
        </v-btn>

      </v-form>

    </div>
    
    <h2 class='text-h2 mt-10 mb-5'>Автор: {{ participantProfile.name }}</h2>
    <div class='d-flex'>
      <v-img class='mr-5' :src="participantProfile.picture" width="300" height="400"></v-img>
      <p class='text-h6'>{{ participantProfile.description }}</p>
    </div>
  </v-container>
</template>

<script>

  export default {
    name: 'participantPage',
    data() {
      return {
        participantId: this.$route.params.id,
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      }
    },
    computed: {
      participantProfile() {
        let participants = this.$store.state.participantsData;
        try{
          let participant = participants.find((el) => el.id == this.$route.params.id);
          return participant.profile;
        }
        catch {
          return this.$store.state.participantTemplate.profile;
        }
      },
      participant() {
        let participants = this.$store.state.participantsData;
        try{
          let participant = participants.find((el) => el.id == this.$route.params.id);
          return participant;
        }
        catch {
          return this.$store.state.participantTemplate;
        }
      },
      isLoading() {
        return this.$store.state.loading
      },
      votedFor() {
        let votedIds = this.$store.state.userData.filter(el => {
          let jsonEl = JSON.parse(el);
          console.log(jsonEl);
          if (jsonEl.voteId == this.$route.params.id) {
            this.name = jsonEl.name;
            this.email = jsonEl.email;
            return true;
          }
        });
        if (votedIds.length > 0) {
          return true
        }
        return false;
      }
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      async sendData() {
        await this.validate();
        if (this.valid == true) {
          this.sendDataCommit();
        }
      },
      sendDataCommit() {
        let data = { "name": this.name, "email": this.email, "voteId": this.$route.params.id };
        this.$store.commit('sendUserData', data);
      }
    },
  }
</script>