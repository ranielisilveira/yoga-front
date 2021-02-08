@@ -0,0 +1,42 @@
<template>
  <div>
    <v-tabs show-arrows grow>
      <v-tab
        v-for="(menu, i) in items"
        :key="i"
        nuxt
        :to="`/categories/${menu.id}`"
        color="blue-grey lighten-4"
      >
        {{ menu.name[$i18n.locale] }}
      </v-tab>
    </v-tabs>
  </div>
</template>
<script>
export default {
  name: 'UserMenu',
  props: {
    items: {
      type: [Object, Array],
      default: () => {},
    },
  },
  data: () => ({}),
  watch: {},
  methods: {},
}
</script>

<style scoped>
/deep/ .v-tab:hover {
  background-color: transparent !important;
}
/deep/ .v-tab.v-tab--active {
  color: #727272 !important;
}
/deep/ .v-tabs-slider {
  color: #727272 !important;
  background-color: #727272 !important;
}
</style>
