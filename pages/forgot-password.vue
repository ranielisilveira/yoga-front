<template>
  <div>
    <v-divider></v-divider>
    <v-card flat>
      <v-card-title class="headline justify-center">
        {{ $t('auth.password_recovery') }}
      </v-card-title>
      <v-card-subtitle class="text-center mb-3">
        {{ $t('auth.password_recovery') }}
      </v-card-subtitle>

      <v-card-text class="pb-0">
        <v-form>
          <v-text-field
            v-model="email"
            :label="$t('auth.type_your_email')"
            name="email"
            type="text"
            solo-inverted
            flat
            @keyup.enter.native="forgotPassword"
          />
        </v-form>
      </v-card-text>
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
          @click="forgotPassword"
          >{{ $t('auth.sent') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'guest',
  data: () => ({
    email: null,
  }),
  head() {
    return {
      title: this.$t('auth.password_recovery'),
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
          text: this.$t('auth.data_not_filled'),
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
