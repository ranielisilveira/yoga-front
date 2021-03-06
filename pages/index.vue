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
      <v-alert
        v-if="confirm && confirm == 'success'"
        type="success"
        border="top"
        color="green lighten-2"
        dark
      >
        {{ $t('auth.email_confirmed') }}
      </v-alert>
      <v-alert
        v-if="confirm && confirm == 'already-activated'"
        type="warning"
        border="top"
        dark
      >
        {{ $t('auth.email_already_confirmed') }}
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
          >{{ $t('auth.enter') }}
        </v-btn>
        <v-btn
          block
          nuxt
          text
          color="blue lighten-2"
          :to="localePath('/forgot-password')"
          >{{ $t('auth.forgot_password') }}</v-btn
        >
      </v-sheet>
      <v-card-actions v-else class="text-center">
        <v-btn
          nuxt
          text
          color="blue lighten-2"
          :to="localePath('/forgot-password')"
          >{{ $t('auth.forgot_password') }}</v-btn
        >
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
      <v-divider class="mt-4 mb-4"></v-divider>
      <v-btn
        block
        nuxt
        text
        color="purple darken-2"
        :to="localePath('/register')"
        >{{ $t('auth.create_account_btn') }}</v-btn
      >

      {{ browser }}
      <v-bottom-sheet v-model="sheet">
        <v-sheet class="text-center pt-4" height="150px">
          <v-row>
            <v-col>
              <div class="pa-3">
                {{ $t('pwa_ios') }}
              </div>
            </v-col>
            <v-col cols="3" class="mt-3">
              <v-icon class="text-lg">mdi-export-variant</v-icon>
            </v-col>
          </v-row>
          <v-btn text color="purple" @click="sheet = !sheet">
            {{ $t('close') }}
          </v-btn>
        </v-sheet>
      </v-bottom-sheet>
    </v-card>
  </div>
</template>

<script>
import { isIOS } from 'mobile-device-detect'

export default {
  layout: 'guest',
  data: () => ({
    browser: process.browser.language,
    error: null,
    email: null,
    password: null,
    confirm: null,
    sheet: isIOS,
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
    this.confirm = this.$route.query.confirm
  },
  methods: {
    async login() {
      this.$nuxt.$emit('loader-true')

      if (!this.isFilled) {
        this.$nuxt.$emit('text-toasty', {
          text: this.$t('data_not_filled'),
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
<style>
.text-lg {
  font-size: 45px !important;
}
</style>
