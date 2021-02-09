<template>
  <v-app id="default-background">
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      :clipped="true"
      app
    >
      <v-list dense>
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          link
          :to="`/categories/${item.id}`"
          :color="item.color"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ item.name[$i18n.locale] }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title style="width: 150px" class="ml-0 p-1">
        <a nuxt :to="`/home`">
          <v-img contain :src="require('./../static/logo.png')"></v-img>
        </a>
      </v-toolbar-title>
      <v-spacer />
      <span class="hidden-sm-and-down">{{ $auth.user.name }}</span>

      <v-menu left bottom>
        <template #activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item nuxt to="/profile">
            <v-list-item-title>
              <v-icon>mdi-pencil</v-icon>
              {{ $t('profile') }}
            </v-list-item-title>
          </v-list-item>
          <LangSwitcher />
          <v-list-item @click="logout">
            <v-list-item-title>
              <v-icon>mdi-power</v-icon>
              {{ $t('logout') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <top-menu :items="menu"></top-menu>

      <nuxt></nuxt>
      <v-container fluid></v-container>
    </v-main>
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

    <v-overlay :value="loader" absolute :z-index="6000">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import map from 'lodash/map'
export default {
  middleware: ['auth', 'user'],
  data: () => ({
    loader: true,
    clipped: true,
    drawer: null,
    fab: false,
    snackbar: {
      timeout: 3000,
      show: false,
      color: undefined,
      text: ['Ocorreu um erro'],
    },
    textSnackbar: {
      timeout: 3000,
      show: false,
      color: undefined,
      text: 'Ocorreu um erro',
    },
    menu: {},
  }),
  async fetch() {
    this.$nuxt.$emit('loader-true')
    await this.$axios
      .get(`/menu/top`)
      .then((response) => {
        this.menu = response.data
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
  created() {
    if (!this.$auth.loggedIn) {
      this.$auth.logout()
      this.$router.push('/')
    }

    this.$nuxt.$on('toasty', this.showSnackbar)
    this.$nuxt.$on('text-toasty', this.showTextSnackbar)
    this.$nuxt.$on('loader-true', this.loaderTrue)
    this.$nuxt.$on('loader-false', this.loaderFalse)
  },
  beforeDestroy() {
    this.$nuxt.$off('loader-true')
    this.$nuxt.$off('loader-false')
    this.$nuxt.$off('toasty')
    this.$nuxt.$off('text-toasty')
  },
  mounted() {
    this.loaderFalse()
  },
  methods: {
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
    loaderTrue() {
      this.loader = true
    },
    loaderFalse() {
      this.loader = false
    },
    logout() {
      this.loader = true
      this.$auth.logout()
    },
  },
}
</script>
<style>
.v-main__wrap {
  background-color: #efefef !important;
}
</style>
