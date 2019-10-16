<template>
  <v-card class="mx-auto" width="400">
    <v-tabs dark centered grow background-color="primary" v-model="activeTab">
      <v-tab :href="`#tab-Login`">Login</v-tab>
      <v-tab :href="`#tab-Register`">Register</v-tab>
      <v-tab-item :value="'tab-Login'">
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field
              label="Username"
              name="username"
              prepend-icon="person"
              type="text"
              v-model="username"
              :rules="UsernameRules"
            ></v-text-field>

            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="lock"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              hint="At least 8 characters"
              counter
              v-model="password"
              :rules="PassRules"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mx-auto px-4"
            @click="login"
          >Login</v-btn>
        </v-card-actions>
      </v-tab-item>
      <v-tab-item :value="'tab-Register'">
        <v-card-text>
          <v-form v-model="valid">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  class="pa-0"
                  label="Name"
                  name="regName"
                  prepend-icon="person"
                  type="text"
                  v-model="name"
                  :rules="NameRules"
                  required
                ></v-text-field>
              </v-col>
            <v-col cols="6">
              <v-text-field
                class="pa-0"
                label="Surname"
                name="regSurname"
                type="text"
                v-model="surname"
                :rules="SurnameRules"
                required
              ></v-text-field>
            </v-col>
            </v-row>
            <v-text-field
              class="pa-0"
              label="Username"
              name="regUsername"
              prepend-icon="person"
              type="text"
              v-model="username"
              :rules="regUsernameRules"
              required
            ></v-text-field>
            <v-text-field
              class="pa-0"
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              prepend-icon="fa-at"
              required
            ></v-text-field>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  class="pa-0"
                  id="regPassword"
                  label="Password"
                  name="regPassword"
                  prepend-icon="lock"
                  type="password"
                  v-model="regPassword"
                  :rules="regPasswordRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  class="pa-0"
                  id="regConfPassword"
                  label="Confirm Password"
                  name="regConfPassword"
                  type="password"
                  v-model="regConfPassword"
                  :rules="regConfPassRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  class="pa-0"
                  v-model="date"
                  label="Birthday date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                :rules="dateRules"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="date"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
          type='submit'
            :disabled="!valid"
            color="success"
            class="mx-auto px-4"
            v-if="regPassword === regConfPassword"
            @click="submit"
          >Register</v-btn>
          <v-btn disabled class="mx-auto px-4" v-else>Passwords Doesn't match</v-btn>
          <v-chip v-if="errorReg !== null" disabled>{{ errorReg }}</v-chip>
        </v-card-actions>
        <v-card></v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    url: 'http://localhost:4000',
    activeTab: 'tab-Login',
    show1: true,
    valid: false,
    errorReg: null,
    name: '',
    NameRules: [v => !!v || 'Missing Name'],
    surname: '',
    SurnameRules: [v => !!v || 'Missing Surname'],
    username: '',
    UserList: [],
    UsernameRules: [v => !!v || 'Missing Username'],
    password: 'Password123',
    PassRules: [v => !!v || 'Missing Password'],
    regUsername: '',
    regUsernameRules: [
      v => !!v || 'Missing Username',
      v => (v && v.length <= 15) || 'Username must be less than 15 characters',
      v => (v && v.length >= 4) || 'Username must be more than 4 characters',
      v =>
        /^[a-zA-Z0-9]*$/.test(v) ||
        'Username must contain only letters or numbers'
    ],
    regPassword: '',
    regPasswordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 4) || 'Password must be more than 4 characters',
      v =>
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(v) ||
        'Password must contain at least one capital and one lowercase and one number '
    ],
    regConfPassword: '',
    regConfPassRules: [v => !!v || 'Confirmation Password is required'],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      // eslint-disable-next-line no-useless-escape
      v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
    ],
    date: null,
    dateRules: [
      v => !!v || 'Birthday is required'
    ],
    menu: false
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    submit () {
      console.log(this.username)
      console.log(this.regPassword)
      // Delete localhost:4000 for prod
      const user = {
        avatar: 0,
        background: 0,
        name: this.name,
        surname: this.surname,
        username: this.username,
        password: this.regPassword,
        friends: [],
        email: this.email,
        date: this.date,
        description: '',
        colorApp: '#512DA8'
      }
      this.axios.post(this.url + '/api/addUser', {
        user: user
      })
        .then((response) => {
          console.log('Registered !')
          this.activeTab = 'tab-Login'
        })
        .catch((error) => {
          this.errorReg = error.response.data.error
          console.log('response', JSON.stringify(error.response))
        })
    },
    async login () {
      const res = await this.axios.post(this.url + '/api/login', {
        username: this.username,
        password: this.password
      })
      if (res) {
        console.log(res.data.user)
        const user = res.data.user
        this.$session.start()
        this.$session.set('name', user.name)
        this.$session.set('surname', user.surname)
        this.$session.set('username', user.username)
        this.$session.set('avatar', user.avatar)
        this.$session.set('background', user.background)
        this.$session.set('email', user.email)
        this.$session.set('birthday', user.date)
        this.$session.set('description', user.description)
        this.$session.set('friends', user.friends)
        this.$session.set('colorApp', user.colorApp)

        console.log('Logged !')
        this.$router.push('/profile')
      } else {
        // this.error = error.response.data.message
        // console.log('response', JSON.stringify(error.response))
      }
    }
  }
}
</script>
