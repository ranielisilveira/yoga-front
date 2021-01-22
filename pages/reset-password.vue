<template>
  <div>
    <v-divider></v-divider>
    <v-card flat>
      <v-card-title class="headline justify-center">
        {{ $vuetify.lang.t('$vuetify.auth.create_new_password') }}
      </v-card-title>
      <v-card-subtitle class="text-center mb-3">
        {{ $vuetify.lang.t('$vuetify.auth.pick_new_password') }}
      </v-card-subtitle>

      <v-card-text class="pb-0">
        <v-form>
          <v-text-field
            v-model="email"
            :label="$vuetify.lang.t('$vuetify.auth.your_email')"
            name="email"
            type="text"
            solo-inverted
            flat
            @keyup.enter.native="forgotPassword"
          />

          <v-text-field
            id="password"
            v-model="password"
            :label="$vuetify.lang.t('$vuetify.auth.new_password')"
            name="password"
            type="password"
            flat
            solo-inverted
          />

          <v-text-field
            id="password_confirmation"
            v-model="password_confirmation"
            :label="$vuetify.lang.t('$vuetify.auth.confirm_new_password')"
            name="password_confirmation"
            type="password"
            flat
            solo-inverted
            @keyup.enter.native="resetPassword"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn nuxt text color="purple darken-2" to="/">
          {{ $vuetify.lang.t('$vuetify.auth.enter') }}
        </v-btn>
        <v-spacer />
        <v-btn
          depressed
          light
          color="purple darken-2 white--text"
          class="px-12"
          large
          :disabled="!isFilled"
          @click="resetPassword"
          >{{ $vuetify.lang.t('$vuetify.auth.create_password') }}
        </v-btn>
      </v-card-actions>
      <v-divider class="mb-5 mt-5"></v-divider>
      <v-alert
        v-if="mail_token"
        type="info"
        border="top"
        color="purple darken-2"
        dark
      >
        {{ mail_token }}
      </v-alert>
      <v-alert v-else type="error" border="top" color="red" dark>
        {{ $vuetify.lang.t('$vuetify.auth.mail_token_error') }}
      </v-alert>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'guest',
  data() {
    return {
      mail_token: null,
      email: null,
      password: null,
      password_confirmation: null,
    }
  },
  head() {
    return {
      title: this.$vuetify.lang.t('$vuetify.auth.password_recovery'),
    }
  },
  computed: {
    isFilled() {
      return (
        this.email &&
        this.password &&
        this.password_confirmation &&
        this.password === this.password_confirmation &&
        this.mail_token
      )
    },
  },
  mounted() {
    this.$nuxt.$emit('loader-false')
    this.mail_token = this.$route.query.mail_token
  },
  methods: {
    async resetPassword() {
      this.$nuxt.$emit('loader-true')

      if (!this.isFilled) {
        this.$nuxt.$emit('text-toasty', {
          text: this.$vuetify.lang.t('$vuetify.auth.data_not_filled'),
        })
        this.$nuxt.$emit('loader-false')
        return false
      }

      this.$nuxt.$emit('loader-true')
      await this.$axios
        .post('/reset-password', {
          mail_token: this.mail_token,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then((response) => {
          this.$nuxt.$emit('loader-false')
          this.$nuxt.$emit('toasty', {
            color: 'success',
            text: response.data,
          })
          this.$router.push('/dashboard')
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
