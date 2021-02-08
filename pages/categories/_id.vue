<template>
  <div>
    <v-row v-if="category.id" class="ma-0 pa-0">
      <v-col
        class="mx-auto pa-15 top-menu-image"
        :style="`background: linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7)), url(${category.image}) no-repeat center center ;`"
      >
        <v-subheader :class="`${subheaderColor}`">
          {{ category.name[$i18n.locale] }}
        </v-subheader>
      </v-col>

      <v-col cols="12" class="ma-0 pa-0 text-center">
        <v-tabs
          v-model="tab"
          :background-color="category.color"
          dark
          show-arrows
          grow
        >
          <v-tab
            v-for="subcategory in category.categories"
            :key="subcategory.id"
          >
            {{ subcategory.name[$i18n.locale] }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="subcategory in category.categories"
            :key="subcategory.id"
          >
            <v-card v-for="media in subcategory.medias" :key="media.id" flat>
              <client-only v-if="media.type === 1">
                <vimeo-player
                  ref="player"
                  :player-width="screenW"
                  :player-height="
                    $vuetify.breakpoint.smAndDown ? screenH / 3 : '500'
                  "
                  :video-id="media.media[$i18n.locale]"
                />
              </client-only>
              <p v-else class="py-10 px-5 text-justify">
                {{ media.media[$i18n.locale] }}
              </p>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: null,
      category: {
        id: null,
        name: {
          en: null,
          pt: null,
        },
        color: 'blue-grey lighten-5',
      },
    }
  },
  async fetch() {
    this.$nuxt.$emit('loader-true')
    await this.$axios
      .get(`/menu/category/${this.$route.params.id}`)
      .then((response) => {
        this.category = response.data
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
      title: this.$t('categories.head'),
    }
  },
  computed: {
    screenW() {
      return (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      )
    },
    screenH() {
      return (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      )
    },
    subheaderColor() {
      return this.category.color.includes(' ')
        ? this.category.color.replace(' ', '--text ')
        : this.category.color + '--text '
    },
  },
  methods: {
    async restore() {
      this.$nuxt.$emit('loader-true')
      this.$refs.RestoreDialogRef.hideDialog()
      await this.$axios
        .patch(`/admin/categories/${this.selectedItem.id}`)
        .then((response) => {
          this.$nuxt.$emit('text-toasty', {
            color: 'success',
            text: response.data.message,
          })
          this.categories = response.data.categories
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
  },
}
</script>
<style scoped>
/deep/ .v-subheader {
  font-size: 2.5rem !important;
  display: inline-block !important;
  text-align: center !important;
  margin: 0 auto;
  width: 100%;
}
/deep/ .v-tab {
  padding: 0 40px 0 40px !important;
  /* word-spacing: 100vw;
  line-height: 15px; */
}
/deep/ .v-tabs-bar {
  height: 90px !important;
}
/deep/ .v-slide-group__prev .v-icon,
/deep/ .v-slide-group__next .v-icon {
  font-size: 40px !important;
}
</style>
