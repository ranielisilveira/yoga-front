<template>
  <div>
    <v-row v-if="category.id" class="ma-0 pa-0">
      <v-col
        class="mx-auto pa-15 top-menu-image"
        :style="`background: url(${category.image}) no-repeat center center ;`"
      >
        <v-subheader>
          {{ category.name[$i18n.locale] }}
        </v-subheader>
      </v-col>

      <v-col cols="12" class="video-body ma-0 pa-0 text-center">
        <v-card v-if="$vuetify.breakpoint.smAndDown" tile>
          <v-card-title :class="category.color">
            <span class="title">{{ selectedCategory }}</span>
            <v-spacer></v-spacer>
            <v-menu bottom left>
              <template #activator="{ on, attrs }">
                <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon class="font-lg">mdi-arrow-down-drop-circle</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(subcategory, i) in category.categories"
                  :key="subcategory.id"
                  @click="selectCategory(subcategory, i)"
                >
                  <v-list-item-title>{{
                    subcategory.name[$i18n.locale]
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
        </v-card>
        <v-tabs
          v-else
          v-model="tab"
          :background-color="category.color"
          show-arrows
          fixed-tabs
          centered
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
            <v-expansion-panels v-if="subcategory.categories.length" accordion>
              <v-expansion-panel
                v-for="subcategory2nd in subcategory.categories"
                :key="subcategory2nd.id"
              >
                <v-expansion-panel-header>
                  {{ subcategory2nd.name[$i18n.locale] }}
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  v-for="media2nd in subcategory2nd.medias"
                  :key="media2nd.id"
                >
                  <iframe
                    v-if="media2nd.type === 1"
                    :src="`https://player.vimeo.com/video/${
                      media2nd.media[$i18n.locale]
                    }`"
                    allowfullscreen
                    :width="$vuetify.breakpoint.mdAndUp ? '600' : screenW"
                    :height="
                      $vuetify.breakpoint.mdAndUp ? '336' : screenW * (56 / 100)
                    "
                    frameborder="0"
                  />
                  <p v-else class="py-10 px-15 text-justify">
                    {{ media2nd.media[$i18n.locale] }}
                  </p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-card
              v-for="media in subcategory.medias"
              v-else
              :key="media.id"
              flat
            >
              <iframe
                v-if="media.type === 1"
                :src="`https://player.vimeo.com/video/${
                  media.media[$i18n.locale]
                }`"
                allowfullscreen
                :width="$vuetify.breakpoint.mdAndUp ? '600' : screenW"
                :height="
                  $vuetify.breakpoint.mdAndUp ? '336' : screenW * (56 / 100)
                "
                frameborder="0"
              />
              <p v-else class="py-10 px-15 text-justify">
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
      selectedCategory: null,
    }
  },
  async fetch() {
    this.$nuxt.$emit('loader-true')
    await this.$axios
      .get(`/menu/category/${this.$route.params.id}`)
      .then((response) => {
        this.category = response.data

        this.selectedCategory = this.category.categories[0].name[
          this.$i18n.locale
        ]
        this.tab = 0
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
    selectCategory(subcategory, i) {
      this.selectedCategory = subcategory.name[this.$i18n.locale]
      this.tab = i
    },
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
/deep/ .v-slide-group__prev .v-icon,
/deep/ .v-slide-group__next .v-icon {
  font-size: 40px !important;
}
/deep/ .v-expansion-panel-content__wrap {
  background-color: #efefef;
  padding: 0 !important;
}
.font-lg {
  font-size: 2.5rem !important;
}
</style>
