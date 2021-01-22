<template>
  <div>
    <v-row>
      <v-col :sm="12" :md="4" :lg="3">
        <pre>
          <code>{{ $auth.user }}</code>
        </pre>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  components: {},
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
