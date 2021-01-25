<template>
  <div>
    <v-divider></v-divider>
    <v-card flat>
      <v-card-title class="headline justify-center">
        {{ $t('auth.enter') }}
      </v-card-title>
      <v-card-subtitle class="text-center mb-3">
        {{ $t('auth.enter_desc') }}
      </v-card-subtitle>

      <v-alert type="success" border="top" color="green lighten-2" dark>
        {{ $t('auth.logout_success') }}
      </v-alert>

      <v-card-text class="pb-0">
        <v-form>
          <v-text-field
            v-model="email"
            :label="$t('auth.your_email')"
            name="email"
            type="text"
            solo-inverted
            flat
            @keyup.enter.native="login"
          />

          <v-text-field
            id="password"
            v-model="password"
            :label="$t('auth.your_password')"
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
          {{ $t('auth.enter') }}
        </v-btn>
        <v-btn block nuxt text color="purple darken-2" to="/forgot-password">{{
          $t('auth.forgot_password')
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
          >{{ $t('auth.enter') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'guest',
  data: () => ({
    error: null,
    email: null,
    password: null,
  }),
  head() {
    return {
      title: this.$t('auth.enter'),
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
          text: this.$t('auth.data_not_filled'),
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
          this.$auth.is_admin
            ? this.$router.push({ path: `/admin` })
            : this.$router.push({ path: `/home` })
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
