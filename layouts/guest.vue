<template>
  <v-app id="guest" style="">
    <v-main style="width: 100%">
      <v-container fluid ma-0 pa-0 fill-height>
        <v-row align="start" justify="center" class="align-self-stretch">
          <v-col
            sm="12"
            md="5"
            class="d-none d-md-flex p-0 align-self-stretch"
            style="background: #733c7d"
          ></v-col>
          <v-col sm="12" md="7" class="pa-16 justify-center">
            <v-row align="start" justify="center" class="align-self-stretch">
              <v-col md="8" sm="12" class="justify-center">
                <logo></logo>
                <nuxt></nuxt>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-snackbar
          v-model="snackbar.show"
          :timeout="snackbar.timeout"
          :color="snackbar.color"
          top
        >
          <template #default>
            <v-row align="start" justify="center">
              <v-col v-for="(text, i) in snackbar.text" :key="i" cols="12">
                {{ text }}
              </v-col>
            </v-row>
          </template>
        </v-snackbar>

        <v-snackbar
          v-model="textSnackbar.show"
          :timeout="textSnackbar.timeout"
          :color="textSnackbar.color"
          top
        >
          {{ textSnackbar.text }}
        </v-snackbar>
      </v-container>
    </v-main>

    <v-overlay :value="loader" absolute :z-index="5999">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import map from 'lodash/map'
import Logo from '../components/Logo'

export default {
  name: 'Guest',
  components: { Logo },
  data: () => {
    return {
      loader: false,
      snackbar: {
        timeout: 20000,
        show: false,
        color: undefined,
        text: ['Ocorreu um erro'],
      },
      textSnackbar: {
        timeout: 20000,
        show: false,
        color: undefined,
        text: 'Ocorreu um erro',
      },
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$auth.is_admin
        ? this.$router.push({ path: `/admin` })
        : this.$router.push({ path: `/home` })
    }
  },
  created() {
    this.$nuxt.$on('toasty', this.showSnackbar)
    this.$nuxt.$on('text-toasty', this.showTextSnackbar)
    this.$nuxt.$on('loader-true', this.loaderTrue)
    this.$nuxt.$on('loader-false', this.loaderFalse)
  },
  beforeDestroy() {
    this.$nuxt.$off('toasty')
    this.$nuxt.$off('text-toasty')
    this.$nuxt.$off('loader-true')
    this.$nuxt.$off('loader-false')
  },
  methods: {
    loaderTrue() {
      this.loader = true
    },
    loaderFalse() {
      this.loader = false
    },
    showSnackbar({ text = ['Ocorreu um erro'], color = undefined }) {
      this.snackbar.show = true
      this.snackbar.text = text
      this.snackbar.color = color

      if (text instanceof Object) {
        const messageString = []

        map(text, (k) => {
          messageString.push(k)
        })

        this.snackbar.text = messageString
      }
    },
    showTextSnackbar({ text = 'Ocorreu um erro', color = undefined }) {
      this.textSnackbar.show = true
      this.textSnackbar.text = text
      this.textSnackbar.color = color
    },
  },
}
</script>

<style scoped>
/deep/ .v-main__wrap {
  background-color: #fff !important;
}
</style>
