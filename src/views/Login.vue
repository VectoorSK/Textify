<template>
  <v-card class="mx-auto" width="400">
    <v-tabs dark centered grow background-color="primary" v-model="activeTab">
      <v-tab :href="`#tab-Login`">Login</v-tab>
      <v-tab :href="`#tab-Register`">Register</v-tab>
      <!-- LOGIN TAB -->
      <v-tab-item :value="'tab-Login'">
        <v-card-text>
          <v-form v-model="valid">
            <!-- Username field -->
            <v-text-field
              label="Username"
              name="username"
              prepend-icon="person"
              type="text"
              v-model="username"
              :rules="UsernameRules"
              @keypress.enter="login"
            ></v-text-field>
            <!-- Password field -->
            <v-text-field
              label="Password"
              name="password"
              prepend-icon="lock"
              :append-icon="showPswd ? 'visibility' : 'visibility_off'"
              :type="showPswd ? 'text' : 'password'"
              @click:append="showPswd = !showPswd"
              hint="At least 8 characters"
              counter
              v-model="password"
              :rules="PassRules"
              @keypress.enter="login"
            ></v-text-field>
          </v-form>
          <!-- Login error -->
          <v-icon v-if="error !== null" small color="error" class="mx-1">mdi-alert-circle</v-icon>
          <span class="error--text" :class="{ 'ma-5': error === null }">{{ error }}</span>
        </v-card-text>
        <v-card-actions>
          <!-- Submit Login button -->
          <v-btn
            :color="valid ? 'success' : 'error'"
            class="mx-auto px-4"
            :class="{ 'disable-events': !valid }"
            @click="login"
          >Login</v-btn>
        </v-card-actions>
      </v-tab-item>
      <!-- REGISTER TAB -->
      <v-tab-item :value="'tab-Register'">
        <v-card-text>
          <v-form v-model="regValid" ref="register_form">
            <v-row>
              <v-col cols="6">
                <!-- Name field -->
                <v-text-field
                  class="pa-0"
                  label="Name"
                  name="regName"
                  prepend-icon="mdi-pencil"
                  type="text"
                  v-model="name"
                  :rules="NameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <!-- Surname field -->
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
            <!-- Username field -->
            <v-text-field
              class="pa-0"
              label="Username"
              name="regUsername"
              prepend-icon="person"
              type="text"
              v-model="regUsername"
              :rules="regUsernameRules"
              required
            ></v-text-field>
            <!-- Email field -->
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
                <!-- Password field -->
                <v-text-field
                  class="pa-0"
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
                <!-- Confirm Password field -->
                <v-text-field
                  class="pa-0"
                  label="Confirm Password"
                  name="regConfPassword"
                  type="password"
                  v-model="regConfPassword"
                  :rules="regConfPassRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- Birthday picker menu -->
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
                <!-- Birthday field -->
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
          <!-- Registration error -->
          <v-icon v-if="errorReg !== null" small color="error" class="mx-1">mdi-alert-circle</v-icon>
          <span class="error--text" :class="{ 'ma-5': errorReg === null }">{{ errorReg }}</span>
        </v-card-text>
        <v-card-actions>
          <!-- Submit Registration button -->
          <v-btn
            v-if="regPassword === regConfPassword"
            :color="regValid ? 'success' : 'error'"
            class="mt-n4 mx-auto px-4"
            :class="{ 'disable-events': !regValid }"
            @click="submit"
          >Register</v-btn>
          <v-btn v-else color="error" class="mt-n4 mx-auto px-4 disable-events">Passwords Doesn't match</v-btn>
        </v-card-actions>
        <v-card></v-card>
      </v-tab-item>
    </v-tabs>
    <!-- SNACKBAR (Registered) -->
    <v-snackbar
      v-model="snackbar"
      color="#512DA8"
      class="white--text"
    >
      Welcome {{ username }}, you're now registered!
      <v-btn
        color="white"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    // tab:
    activeTab: 'tab-Login',
    // Login valid:
    valid: false,
    error: null,
    // Login username:
    username: '',
    UsernameRules: [v => !!v || 'Missing Username'],
    // Login password:
    showPswd: false,
    password: 'Password123',
    PassRules: [v => !!v || 'Missing Password'],
    // Register valid:
    regValid: false,
    errorReg: null,
    snackbar: false,
    // Register name:
    name: '',
    NameRules: [v => !!v || 'Missing Name'],
    // Register surname:
    surname: '',
    SurnameRules: [v => !!v || 'Missing Surname'],
    // Register username:
    regUsername: '',
    regUsernameRules: [
      v => !!v || 'Missing Username',
      v => (v && v.length <= 15) || 'Username must be less than 15 characters',
      v => (v && v.length >= 4) || 'Username must be more than 4 characters',
      v =>
        /^[a-zA-Z0-9]*$/.test(v) ||
        'Username must contain only letters or numbers'
    ],
    // Register email:
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      // eslint-disable-next-line no-useless-escape
      v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
    ],
    // Register password:
    regPassword: '',
    regPasswordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 4) || 'Password must be more than 4 characters',
      v =>
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(v) ||
        'Password must contain at least one capital and one lowercase and one number '
    ],
    // Register confirm password:
    regConfPassword: '',
    regConfPassRules: [v => !!v || 'Confirmation Password is required'],
    // Register date menu:
    date: null,
    dateRules: [
      v => !!v || 'Birthday is required'
    ],
    menu: false,
    // prod:
    url: '' // 'http://localhost:4000'
  }),
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    // submit user to server (registration)
    submit () {
      const user = {
        avatar: 0,
        background: 0,
        name: this.name,
        surname: this.surname,
        username: this.regUsername,
        password: this.regPassword,
        friends: [],
        email: this.email,
        date: this.date,
        description: '...',
        colorApp: '#512DA8'
      }
      this.axios.post(this.url + '/api/addUser', {
        user: user
      })
        .then((response) => {
          this.snackbar = true
          this.username = this.regUsername
          this.$refs.register_form.reset()
          this.activeTab = 'tab-Login'
        })
        .catch((error) => {
          this.errorReg = error.response.data.error
          console.log(error.response)
        })
    },
    // submit user to server (login)
    async login () {
      try {
        const res = await this.axios.post(this.url + '/api/login', {
          username: this.username,
          password: this.password
        })
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

        this.$router.push('/profile')
      } catch (err) {
        console.log(err.response)
        this.error = err.response.data.message
      }
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  }
}
</script>

<style scoped>
/* disable button (without changing color) */
.disable-events {
  pointer-events: none
}
</style>
