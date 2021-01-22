<template>
  <p v-if="$fetchState.pending">Fetching categories...</p>

  <div v-else>
    <h1>Nuxt categories</h1>
    <ul>
      <li v-for="categorie of categories" :key="categorie.id">
        {{ categorie.title }}
      </li>
    </ul>
    <button @click="$fetch">Refresh</button>
  </div>
</template>

<script>
export default {
  layout: 'guest',
  data() {
    return {
      categories: [],
    }
  },
  async fetch() {
    this.$nuxt.$emit('loader-true')
    this.categories = await this.$axios
      .get(`/admin/categories?length=10`)
      .then((response) => {
        this.companies = response.data
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
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 5000) {
      this.$fetch()
    }
  },
}
</script>
