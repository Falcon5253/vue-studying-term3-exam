<template>
    <v-list three-line class='d-flex flex-wrap'>
    <h2 class='big-title col-12'>Отзывы о художнике</h2>
    <div class='col-lg-6'>
        <template v-for="item in comments">
            <v-list-item :key="item.id">
                <v-list-item-avatar style="width: 75px; height: 75px;">
                    <v-img :src="item.picture"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                <v-list-item-title v-html="item.username" style="font-size: 22px;"></v-list-item-title>
                <v-list-item-subtitle v-html="item.text" style="font-size: 14px;"></v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>
    </div>
        <v-form
            class='col-lg-6 col-12'
            ref="form"
            v-model="valid"
            lazy-validation
            :disabled="isLoading"
        >
            <div>
                <p class='text-h5'>Поделитесь своим мнением о данной работе с остальными!</p>
            </div>
            <v-text-field
                v-model="name"
                :counter="24"
                :rules="nameRules"
                label="Имя"
                required
                :value="updateName"
            ></v-text-field>
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Почта"
                required
                :value="updateEmail"
            ></v-text-field>
            <v-text-field
                v-model="text"
                :rules="textRules"
                label="Текст"
                required
            ></v-text-field>
            <v-btn color="light-green" class="mt-1" @click="sendComment" :disabled="isLoading || !valid">
                Оставить комментарий
            </v-btn>

        </v-form>
    </v-list>
</template>
  
<script>

    export default {
        name: 'reviewsList',
        data() {
            return {
                participantId: this.$route.params.id,
                valid: true,
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                textRules: [
                    v => !!v || 'Text of comment is required',
                ],
                email: "",
                name: "",
                text: "",
            }
        },
        computed: {
            isLoading() {
                return this.$store.loading;
            },
            updateEmail() {
                this.$store.getters.userData.filter(el => {
                    let jsonEl = JSON.parse(el);
                    if (jsonEl.voteId == this.$route.params.id) {
                        this.email = jsonEl.email;
                        return jsonEl.email
                    }
                });
                return "";
            },
            updateName() {
                this.$store.getters.userData.filter(el => {
                    let jsonEl = JSON.parse(el);
                    if (jsonEl.voteId == this.$route.params.id) {
                        this.name = jsonEl.name;
                        return jsonEl.name
                    }
                });
                return "";
            }
        },
        props: {
            comments: {
                type: Array,
            },
        },
        methods: {
            validate () {
                this.$refs.form.validate()
            },
            async sendComment() {
                await this.validate();
                if (this.valid == true) {
                this.sendDataCommit();
                }
            },
            sendDataCommit() {
                let data = { "name": this.name, "email": this.email, "text": this.text, "reviewForId": this.$route.params.id };
                this.$store.dispatch('sendComment', data);
            }
        },
    }
</script>
<style>
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
  font-size: 32px;
}
@media (max-width: 1263px) {
  .form {
    width: 100%;
  }
}
@media (max-width: 600px) {
    .image {
        width: 50px;
        height: 50px;
    }
  .big-title {
    font-size: 24px;
    margin-top: 0;
  }
  .subtitle {
    font-size: 18px;
  }
  .text-desc {
    font-size: 14px;
  }
}
</style>