<template>
  <v-sheet>
    <v-list-item
      v-for="(locale, i) in showLocales"
      :key="i"
      nuxt
      :to="switchLocalePath(locale.code)"
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
}
</script>
