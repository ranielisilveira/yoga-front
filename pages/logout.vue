<template>
  <div>
    <v-divider></v-divider>
    <v-card flat>
      <v-card-title class="headline justify-center">
        {{ $vuetify.lang.t('$vuetify.auth.enter') }}
      </v-card-title>
      <v-card-subtitle class="text-center mb-3">
        {{ $vuetify.lang.t('$vuetify.auth.enter_desc') }}
      </v-card-subtitle>

      <v-alert type="success" border="top" color="green lighten-2" dark>
        {{ $vuetify.lang.t('$vuetify.auth.logout_success') }}
      </v-alert>

      <v-card-text class="pb-0">
        <v-form>
          <v-text-field
            v-model="email"
            :label="$vuetify.lang.t('$vuetify.auth.your_email')"
            name="email"
            type="text"
            solo-inverted
            flat
            @keyup.enter.native="login"
          />

          <v-text-field
            id="password"
            v-model="password"
            :label="$vuetify.lang.t('$vuetify.auth.your_password')"
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
        >
          {{ $vuetify.lang.t('$vuetify.auth.enter') }}
        </v-btn>
        <v-btn block nuxt text color="purple darken-2" to="/forgot-password">{{
          $vuetify.lang.t('$vuetify.auth.forgot_password')
        }}</v-btn>
      </v-sheet>
      <v-card-actions v-else class="text-center">
        <v-btn nuxt text color="purple darken-2" to="/forgot-password">{{
          $vuetify.lang.t('$vuetify.auth.forgot_password')
        }}</v-btn>
        <v-spacer />
        <v-btn
          depressed
          light
          color="purple darken-2 white--text"
          class="px-12"
          large
          @click="login"
          >{{ $vuetify.lang.t('$vuetify.auth.enter') }}
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
      email: null,
      password: null,
    }
  },
  head() {
    return {
      title: this.$vuetify.lang.t('$vuetify.auth.enter'),
    }
  },
  computed: {
    isFilled() {
      return this.password && this.email
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
          text: this.$vuetify.lang.t('$vuetify.auth.data_not_filled'),
        })
        this.$nuxt.$emit('loader-false')
        return false
      }

      await this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
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
