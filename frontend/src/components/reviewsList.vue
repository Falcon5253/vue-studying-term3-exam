<template>
    <v-list three-line class='d-flex flex-row flex-wrap'>
    <h2 class='text-h2 mt-10 mb-5 col-12'>Отзывы о художнике</h2>
    <div class='col-6'>
        <template v-for="item in comments">
            <v-list-item :key="item.id">
                <v-list-item-avatar style="width: 100px; height: 100px;">
                <v-img :src="item.picture"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                <v-list-item-title v-html="item.username" style="font-size: 28px;"></v-list-item-title>
                <v-list-item-subtitle v-html="item.text" style="font-size: 18px;"></v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>
    </div>
        <v-form
            style="width: 50%;"
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
                    console.log(jsonEl);
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
                    console.log(jsonEl);
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
                console.log(data)
                this.$store.commit('sendComment', data);
                console.log(data);
            }
        },
    }
</script>

  