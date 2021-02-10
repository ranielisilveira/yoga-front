<template>
  <div>
    <v-divider></v-divider>
    <v-card flat>
      <v-card-title class="headline justify-center">
        {{ $t('auth.create_account') }}
      </v-card-title>
      <v-card-subtitle class="text-center mb-3">
        {{ $t('auth.register_desc') }}
      </v-card-subtitle>

      <v-card-text class="pb-0">
        <v-form>
          <v-text-field
            v-model="name"
            :label="$t('auth.your_name')"
            name="name"
            type="text"
            solo-inverted
            flat
          />

          <v-text-field
            v-model="email"
            :label="$t('auth.your_email')"
            name="email"
            type="email"
            solo-inverted
            flat
          />

          <v-text-field
            v-model="code"
            :label="$t('auth.redeem_code')"
            name="code"
            type="text"
            solo-inverted
            flat
          />

          <v-text-field
            id="password"
            v-model="password"
            :label="$t('auth.new_password')"
            name="password"
            type="password"
            flat
            solo-inverted
          />

          <v-text-field
            id="password_confirmation"
            v-model="password_confirmation"
            :label="$t('auth.confirm_new_password')"
            name="password_confirmation"
            type="password"
            flat
            solo-inverted
            @keyup.enter.native="createAccount"
          />
        </v-form>
        <v-sheet class="text-center">
          <v-btn-toggle
            v-model="language"
            tile
            color="deep-purple accent-3"
            group
          >
            <v-btn
              v-for="(locale, i) in $i18n.locales"
              :key="i"
              :to="switchLocalePath(locale.code)"
              :disabled="locale === $i18n.locale"
              :value="locale.code"
              small
              @click="changeLanguage(locale.code)"
            >
              <img :src="locale.flagSrc" :alt="locale.name" /> {{ locale.name }}
            </v-btn>
          </v-btn-toggle>
        </v-sheet>
      </v-card-text>
      <v-divider class="mt-3 mb-3"></v-divider>
      <v-card-actions>
        <v-btn nuxt text color="purple darken-2" :to="localePath('/')">
          <v-icon>mdi-chevron-left</v-icon> {{ $t('auth.enter') }}
        </v-btn>
        <v-spacer />
        <v-btn
          depressed
          light
          color="purple darken-2 white--text"
          class="px-12"
          large
          :disabled="!isFilled"
          @click="createAccount"
        >
          {{ $t('auth.create_account') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'guest',
  data: () => ({
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
    code: null,
    language: 'en',
  }),
  head() {
    return {
      title: this.$t('auth.create_account'),
    }
  },
  computed: {
    isFilled() {
      return (
        this.email &&
        this.password &&
        this.password_confirmation &&
        this.code &&
        this.password === this.password_confirmation
      )
    },
  },
  mounted() {
    this.$nuxt.$emit('loader-false')
  },
  methods: {
    changeLanguage(code) {
      this.switchLocalePath(code)
    },
    async createAccount() {
      this.$nuxt.$emit('loader-true')

      if (!this.isFilled) {
        this.$nuxt.$emit('text-toasty', {
          text: this.$t('auth.data_not_filled'),
        })
        this.$nuxt.$emit('loader-false')
        return false
      }

      this.$nuxt.$emit('loader-true')
      await this.$axios
        .post('/register', {
          name: this.name,
          email: this.email,
          code: this.code,
          password: this.password,
          password_confirmation: this.password_confirmation,
          language: this.$i18n.locale,
        })
        .then((response) => {
          this.$nuxt.$emit('loader-false')
          this.$nuxt.$emit('toasty', {
            color: 'success',
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
