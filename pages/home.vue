<template>
  <div>
    <v-row>
      <v-col :sm="12" :md="4" :lg="3">
        {{ $t('welcome') }}
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  head() {
    return {
      title: 'Home',
    }
  },
  computed: {},
  created() {},
  methods: {},
}
</script>
