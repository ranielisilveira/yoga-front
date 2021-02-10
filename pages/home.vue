<template>
  <div>
    <v-row class="ma-0 pa-0">
      <NuxtLink
        v-for="category in categories"
        :key="category.id"
        :to="localePath(`/categories/${category.id}`)"
        class="mx-auto pa-8 top-menu-image pointer col col-12"
        :style="`background: url(${category.image}) no-repeat center center ;`"
        @click="goTo(`/categories/${category.id}`)"
      >
        <v-subheader>
          {{ category.name[$i18n.locale] }}
        </v-subheader>
      </NuxtLink>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: [],
  }),
  async fetch() {
    this.$nuxt.$emit('loader-true')
    await this.$axios
      .get(`/menu/top`)
      .then((response) => {
        this.categories = response.data
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
  head() {
    return {
      title: 'Home',
    }
  },
  methods: {
    goTo(route) {
      this.$router.push({ path: route })
    },
  },
}
</script>
<style scoped>
/deep/ .v-subheader {
  font-size: 1.7rem !important;
  display: inline-block !important;
  text-align: center !important;
  margin: 0 auto;
  width: 100%;
}
</style>
