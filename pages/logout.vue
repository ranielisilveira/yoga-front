<template>
  <div>
    <v-divider></v-divider>
    <v-card flat>
      <v-card-title class="headline justify-center"> Entrar </v-card-title>
      <v-card-subtitle class="text-center mb-3"
        >Entre com seu email e senha.</v-card-subtitle
      >

      <v-alert type="success" border="top" color="green lighten-2" dark>
        Você foi deslogado com sucesso.
      </v-alert>

      <v-card-text class="pb-0">
        <v-form>
          <v-text-field
            v-model="username"
            label="Seu email"
            name="username"
            type="text"
            solo-inverted
            flat
            @keyup.enter.native="login"
          />

          <v-text-field
            id="password"
            v-model="password"
            label="Sua senha"
            name="password"
            type="password"
            solo-inverted
            flat
            @keyup.enter.native="login"
          />
        </v-form>
      </v-card-text>
      <v-sheet v-if="$vuetify.breakpoint.smAndDown" class="px-3">
        <v-btn
          depressed
          light
          color="purple darken-2 white--text"
          class="px-12 mb-3"
          large
          block
          @click="login"
          >Entrar
        </v-btn>
        <v-btn block nuxt text color="purple darken-2" to="/forgot-password"
          >Esqueci minha senha</v-btn
        >
      </v-sheet>
      <v-card-actions v-else class="text-center">
        <v-btn nuxt text color="purple darken-2" to="/forgot-password"
          >Esqueci minha senha</v-btn
        >
        <v-spacer />
        <v-btn
          depressed
          light
          color="purple darken-2 white--text"
          class="px-12"
          large
          @click="login"
          >Entrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'guest',
  data() {
    return {
      error: null,
      username: null,
      password: null,
    }
  },
  head() {
    return {
      title: 'Login',
    }
  },
  computed: {
    isFilled() {
      return this.password && this.username
    },
  },
  mounted() {
    this.$nuxt.$emit('loader-false')
  },
  methods: {
    async login() {
      this.$nuxt.$emit('loader-true')

      if (!this.isFilled) {
        this.$nuxt.$emit('text-toasty', {
          text: 'Favor preencher os dados de acesso',
        })
        this.$nuxt.$emit('loader-false')
        return false
      }

      await this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .then(() => {
          this.$router.push(`/dashboard`)
        })
        .catch((error) => {
          this.$nuxt.$emit('loader-false')
          this.$nuxt.$emit('toasty', {
            color: 'danger',
            text: error.response.data,
          })
        })
    },
  },
}
</script>
