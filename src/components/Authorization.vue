<template>
  <v-container fluid>
  <form>
    <v-text-field
      v-model="login"
      :error-messages="loginErrors"
      :counter="10"
      label="Логин"
      required
      @input="$v.login.$touch()"
      @blur="$v.login.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'on' : 'off'"
      :error-messages="passwordErrors"
      label="Пароль"
      name="input-10-1"
      required
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-btn class="mr-4" @click="authorization">Авторизоваться</v-btn>
    <v-btn @click="clear">Очистить</v-btn>
    <v-alert v-if="isAlert" type="error">
      Такой комбинации пароль/логин не существует
    </v-alert>
  </form>
  </v-container>
</template>

<script>
 import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
const checkLogin = (value) => value === 'teacher' || value === 'student';
const checkPass = (value) => value === 'tdemo' || value === 'sdemo';
  export default {
    
    mixins: [validationMixin],

    validations: {
      login: { required, maxLength: maxLength(10), checkLogin},
      password: { required, checkPass },
    },

    data: () => ({
      show1: false,
      login: '',
      password: '',
      isAlert: false,
      teacherLog: 'teacher',
      studentLog: 'student',
    }),

    computed: {
      loginErrors () {
        const errors = []
        if (!this.$v.login.$dirty) return errors
        !this.$v.login.maxLength && errors.push('Логин не более 10 символов')
        !this.$v.login.required && errors.push('Необходимо ввести логин')
        !this.$v.login.checkLogin && errors.push('Такого логина не существует')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Нужно ввести пароль')
        !this.$v.password.checkPass && errors.push('Такого пароля не существует')
        return errors
      },
    },
    methods: {
      authorization () {
        this.$v.$touch();
        if( this.login === 'student' && this.password === 'sdemo' ) {
          this.$router.push( 'student' ).catch( err => { alert(err)});
        } else if ( this.login === 'teacher' && this.password === 'tdemo' ) {
          this.$router.push( 'teacher' ).catch( err => { alert(err)});
        } else {
          this.isAlert = true;
          setInterval(()=> this.isAlert=false, 2500);
        }
      },
      clear () {
        this.$v.$reset()
        this.login = ''
        this.password = ''
      },
    },
  }
</script>
