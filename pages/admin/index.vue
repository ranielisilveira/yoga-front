<template>
  <div>
    <v-row>
      <v-col :sm="12" :md="4" :lg="3">
        {{ $t('auth.area') }}
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data: () => ({}),
  head() {
    return {
      title: 'Dashboard',
    }
  },
  computed: {},
  created() {},
  methods: {},
}
</script>
