<template>
  <v-container>
    <h2 class="mt-5 mb-2 big-title">Картина "{{ participant.alt[0].toUpperCase() + participant.alt.slice(1) }}"</h2>
    <div class='d-flex flex-column flex-lg-row'>
      <div>
        <v-img class='mr-5 image' position="left center" :src="participant.image" contain></v-img>
        <h3 class='subtitle'>Описание</h3>
        <p class='text-desc mt-4'>{{ participant.about }}</p>
      </div>
      <v-form
        class="print-hidden form"
        ref="form"
        v-model="valid"
        lazy-validation
        :disabled="isLoading || votedFor || !canVote"
      >
        <div v-if="votedFor"        class="print-hidden">
          
          <p class='text-desc'> Ваш голос был принят!</p>
        </div>
        <div v-else-if='!canVote'>
          <p class='text-desc'> Вы проголосовали уже за слишком большое число других участников </p></div>
        <div v-else>
          <p class='text-desc'> Понравилась работа автора? Так проголосуйте за нее! </p>
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
    
    <h2 class='mt-10 mb-5 big-title'>Автор: {{ participantProfile.name }}</h2>
    <div class='d-flex flex-column flex-lg-row'>
      <v-img class='mr-5' :src="participantProfile.picture" width="300" height="400"></v-img>
      <p class='text-desc mt-3'>{{ participantProfile.description }}</p>
    </div>
    <reviewsList
      :comments="participant.comments"
    ></reviewsList>
  </v-container>
</template>

<script>
  import reviewsList from './reviewsList.vue';

  export default {
    name: 'participantPage',
    components: {
      reviewsList
    },
    data() {
      return {
        participantId: this.$route.params.id,
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 24) || 'Name must be less than 24 characters',
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
        let participants = this.$store.getters.participantsData;
        try{
          let participant = participants.find((el) => el.id == this.$route.params.id);
          return participant.profile;
        }
        catch {
          return this.$store.getters.participantTemplate.profile;
        }
      },
      participant() {
        let participants = this.$store.getters.participantsData;
        try{
          let participant = participants.find((el) => el.id == this.$route.params.id);
          
          return participant;
        }
        catch {
          return this.$store.getters.participantTemplate;
        }
      },
      isLoading() {
        return this.$store.isLoading
      },
      votedFor() {
        let votedIds = this.$store.getters.userData.filter(el => {
          let jsonEl = JSON.parse(el);
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
      },
      canVote() {
        if (this.$store.getters.userData.length > 2) {
          return false
        }
        return true
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
        this.$store.dispatch('sendUserData', data);
      }
    },
    mounted() {
      if (this.$store.getters.userData.length > 0) {
        let votedIds = this.$store.getters.userData.filter(el => {
          let jsonEl = JSON.parse(el);
          if (jsonEl.voteId == this.$route.params.id) {
            return true;
          }
        });
        if (votedIds.length > 0) {
          let data = JSON.parse(votedIds[0])
          this.name = data.name;
          this.email = data.email;
        }
        else {
          let data = this.$store.getters.userData;
          data = JSON.parse(data[data.length-1]);
          this.email = data.email;
          this.name = data.name;
        }
      }
    }
  }
</script>
<style>
.image {
  width: 800px;
  height: 600px;
}
.text-desc {
  font-size: 24px;
}
.form {
  width: 50%;
}
.big-title {
  font-size: 48px;
  font-weight: 300;
}
.subtitle {
  margin-top: 20px;
  font-size: 32px;
  font-weight: 300;
}
@media (max-width: 1263px) {
  .image {
    width: 100%;
    height: auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .form {
    width: 100%;
  }
}
@media (max-width: 600px) {
  .big-title {
    font-size: 24px;
  }
  .subtitle {
    font-size: 18px;
  }
  .text-desc {
    font-size: 14px;
  }
}
</style>