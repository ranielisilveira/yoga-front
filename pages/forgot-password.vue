<template>
  <div>
    <v-divider></v-divider>
    <v-card flat>
      <v-card-title class="headline justify-center">
        Recuperação de Senha
      </v-card-title>
      <v-card-subtitle class="text-center mb-3"
        >Digite seu email de login.</v-card-subtitle
      >

      <v-card-text class="pb-0">
        <v-form>
          <v-text-field
            v-model="email"
            label="Seu email"
            name="email"
            type="text"
            solo-inverted
            flat
            @keyup.enter.native="forgotPassword"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn nuxt text color="purple darken-2" to="/">Entrar</v-btn>
        <v-spacer />
        <v-btn
          depressed
          light
          color="purple darken-2 white--text"
          class="px-12"
          large
          @click="forgotPassword"
          >Enviar
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
      email: null,
    }
  },
  head() {
    return {
      title: 'Recuperação de Senha',
    }
  },
  computed: {
    isFilled() {
      return this.email
    },
  },
  mounted() {},
  methods: {
    async forgotPassword() {
      if (!this.isFilled) {
        this.$nuxt.$emit('text-toasty', {
          text: 'Favor preencher e email',
        })

        return false
      }

      this.$nuxt.$emit('loader-true')
      await this.$axios
        .post('/forgot-password', {
          email: this.email,
        })
        .then((response) => {
          this.$nuxt.$emit('toasty', {
            text: response.data,
          })
          this.$router.push('/')
          this.$nuxt.$emit('loader-false')
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
