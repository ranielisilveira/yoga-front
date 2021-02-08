<template>
  <v-sheet>
    <v-list-item
      v-for="(locale, i) in showLocales"
      :key="i"
      @click="switchLang(locale.code)"
    >
      <v-list-item-title>
        <v-icon>mdi-swap-horizontal-bold</v-icon>
        {{ locale.name }}
      </v-list-item-title>
    </v-list-item>
  </v-sheet>
</template>

<script>
export default {
  name: 'LangSwitcher',
  computed: {
    showLocales() {
      return this.$i18n.locales.filter(
        (locale) => locale.code !== this.$i18n.locale
      )
    },
  },
  methods: {
    async switchLang(code) {
      this.$nuxt.$emit('loader-true')
      await this.$axios
        .post(`/profile/update`, {
          language: code,
        })
        .then(() => {
          this.$router.push({
            path: this.switchLocalePath(code),
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
