@@ -0,0 +1,222 @@
<template>
  <div>
    <v-divider></v-divider>
    <v-card flat>
      <v-card-title class="headline justify-center">
        {{ $t('auth.profile_update') }}
      </v-card-title>
      <v-card-subtitle class="text-center mb-3">
        {{ $t('auth.profile_desc') }}
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
        </v-form>
        <v-sheet class="text-center mb-2">
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

      <v-card-actions class="text-center">
        <v-btn
          depressed
          light
          color="purple darken-2 white--text mx-auto"
          class="px-12"
          large
          :disabled="!isDataFilled"
          @click="update"
        >
          {{ $t('auth.update_data') }}
        </v-btn>
      </v-card-actions>

      <v-divider class="mt-3 mb-3"></v-divider>

      <v-card-subtitle class="text-center mb-3">
        {{ $t('auth.profile_desc_2') }}
      </v-card-subtitle>
      <v-card-text>
        <v-form>
          <v-text-field
            id="current_password"
            v-model="current_password"
            :label="$t('auth.current_password')"
            name="current_password"
            type="password"
            flat
            solo-inverted
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
            @keyup.enter.native="updatePassword"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="text-center">
        <v-btn
          depressed
          light
          color="purple darken-2 white--text"
          class="px-12 mx-auto"
          large
          :disabled="!isPassFilled"
          @click="updatePassword"
        >
          {{ $t('auth.update_password') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data: () => ({
    name: null,
    current_password: null,
    password: null,
    password_confirmation: null,
    language: 'en',
  }),
  head() {
    return {
      title: this.$t('auth.profile_update'),
    }
  },
  computed: {
    isPassFilled() {
      return (
        this.current_password &&
        this.password &&
        this.password_confirmation &&
        this.password === this.password_confirmation
      )
    },
    isDataFilled() {
      return this.name
    },
  },
  mounted() {
    this.name = this.$auth.user.name
    this.language = this.$auth.user.language
    this.$nuxt.$emit('loader-false')
  },
  methods: {
    changeLanguage(code) {
      this.switchLocalePath(code)
    },
    async updatePassword() {
      this.$nuxt.$emit('loader-true')

      if (!this.isPassFilled) {
        this.$nuxt.$emit('text-toasty', {
          text: this.$t('auth.data_not_filled'),
        })
        this.$nuxt.$emit('loader-false')
        return false
      }

      this.$nuxt.$emit('loader-true')
      await this.$axios
        .post('/profile/update-password', {
          current_password: this.current_password,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then((response) => {
          this.$nuxt.$emit('loader-false')
          this.$nuxt.$emit('text-toasty', {
            color: 'success',
            text: response.data.message,
          })
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
    async update() {
      this.$nuxt.$emit('loader-true')

      if (!this.isDataFilled) {
        this.$nuxt.$emit('text-toasty', {
          text: this.$t('auth.data_not_filled'),
        })
        this.$nuxt.$emit('loader-false')
        return false
      }

      this.$nuxt.$emit('loader-true')
      await this.$axios
        .post('/profile/update', {
          name: this.name,
          language: this.$i18n.locale,
        })
        .then((response) => {
          this.$nuxt.$emit('loader-false')
          this.$nuxt.$emit('text-toasty', {
            color: 'success',
            text: response.data.message,
          })
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
