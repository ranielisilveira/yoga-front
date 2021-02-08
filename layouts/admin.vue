<template>
  <v-app id="default-background">
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      :clipped="true"
      app
    >
      <v-list dense>
        <template v-for="item in menu">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="12">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.title"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template #activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              :to="child.route"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.title" link :to="item.route">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="purple darken-2"
      dark
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title style="width: 150px" class="ml-0 p-1">
        <NuxtLink to="/admin">
          <v-img contain :src="require('./../static/logo-light.png')"></v-img>
        </NuxtLink>
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
          <v-list-item nuxt to="/admin/profile">
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
      <top-menu v-if="$vuetify.breakpoint.mdAndUp" :items="menu"></top-menu>

      <v-container fluid>
        <nuxt></nuxt>
      </v-container>
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
import TopMenu from '../components/TopMenu'
import LangSwitcher from '../components/LangSwitcher'
export default {
  components: { TopMenu, LangSwitcher },
  middleware: ['auth', 'admin'],
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
  }),
  computed: {
    menu() {
      const menu = [
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          title: this.$t('admin_menu.config'),
          subtitle: this.$t('admin_menu.config_desc'),
          model: false,
          route: false,
          children: [
            {
              icon: 'mdi-info',
              title: this.$t('admin_menu.categories'),
              route: '/admin/categories',
            },
            {
              icon: 'mdi-info',
              title: this.$t('admin_menu.redeem_codes'),
              route: '/admin/redeem-codes',
            },
            {
              icon: 'mdi-info',
              title: this.$t('admin_menu.users'),
              route: '/admin/users',
            },
          ],
        },
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          title: this.$t('admin_menu.content'),
          subtitle: this.$t('admin_menu.content_desc'),
          model: false,
          route: false,
          children: [
            {
              icon: 'mdi-info',
              title: this.$t('admin_menu.media'),
              route: '/admin/media',
            },
            {
              icon: 'mdi-info',
              title: this.$t('admin_menu.about'),
              route: '/admin/about',
            },
          ],
        },
      ]

      return menu
    },
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
