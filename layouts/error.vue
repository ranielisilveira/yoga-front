<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ $t('page_not_found') }}
    </h1>
    <h1 v-else>
      {{ $t('error') }}
    </h1>
    <NuxtLink to="/"> {{ $t('home_page') }} </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data: () => ({}),
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
