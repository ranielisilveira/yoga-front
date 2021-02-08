<template>
  <v-dialog
    v-model="show"
    transition="dialog-bottom-transition"
    max-width="450px"
    @keydown.esc="show = false"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        class="ma-2 white--text"
        color="green"
        dark
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left dark>mdi-plus</v-icon>
        {{ $t('add') }}
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary darken-1">
        <v-btn icon dark @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title v-if="media.id">
          {{ $t('medias.edit') }}
        </v-toolbar-title>
        <v-toolbar-title v-else>
          {{ $t('medias.new') }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-if="media.id" :disabled="!filled" dark text @click="update">
            <v-icon left>mdi-content-save</v-icon>
            {{ $t('update') }}
          </v-btn>
          <v-btn v-else :disabled="!filled" dark text @click="store">
            <v-icon left>mdi-content-save</v-icon>
            {{ $t('store') }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('medias.headers.category') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-select
                v-model="media.category_id"
                dense
                solo
                outlined
                :items="categories"
                item-text="text"
                item-value="value"
                hide-details="true"
              />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('medias.headers.type') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-select
                v-model="media.type"
                solo
                outlined
                dense
                :items="types"
                item-text="text"
                item-value="value"
                hide-details="true"
              />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="media.type === 1">
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('medias.headers.media') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $t('medias.hints.video') }} <br />
              Ex.: https://vimeo.com/<strong style="font-weight: 700"
                >504844831</strong
              >
              (somente a parte marcada)
            </v-list-item-subtitle>
            <v-list-item-subtitle class="pt-3">
              <v-text-field
                v-for="(locale, l) in $i18n.locales"
                :key="l"
                v-model="media.media[locale.code]"
                :label="locale.name"
                outlined
                dense
                hide-details="true"
                autofocus
                class="mb-2"
              ></v-text-field>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="media.type === 3">
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('medias.headers.media') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $t('medias.hints.text') }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="pt-3">
              <v-textarea
                v-for="(locale, l) in $i18n.locales"
                :key="l"
                v-model="media.media[locale.code]"
                :label="locale.name"
                outlined
                dense
                hide-details="true"
                autofocus
                class="mb-2"
                autosize
              ></v-textarea>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue-grey white--text" @click="show = false">
          {{ $t('cancel') }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="media.id"
          :disabled="!filled"
          color="green white--text"
          @click="update"
        >
          {{ $t('update') }}
        </v-btn>
        <v-btn
          v-else
          :disabled="!filled"
          color="green white--text"
          @click="store"
        >
          {{ $t('store') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'MediaDialog',
  data: () => ({
    show: false,
    media: {
      id: null,
      media: {
        en: null,
        pt: null,
      },
      type: 1,
      category_id: null,
    },
    categories: [],
    types: [],
  }),
  async fetch() {
    this.$nuxt.$emit('loader-true')
    await this.$axios
      .get(`admin/media/types`)
      .then((response) => {
        this.types = response.data
      })
      .catch((error) => {
        this.$nuxt.$emit('loader-false')
        this.$nuxt.$emit('toasty', {
          color: 'danger',
          text: error.response.data,
        })
      })

    await this.$axios
      .get(`admin/categories/grouped`)
      .then((response) => {
        this.categories = response.data
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
  computed: {
    filled() {
      return this.media.type && this.media.media && this.media.category_id
    },
    mediaType() {
      return this.media.type
    },
  },
  watch: {
    mediaType() {
      // this.media.media = {
      //   en: null,
      //   pt: null,
      // }
    },
  },
  methods: {
    showDialog(item) {
      this.show = true
      this.media = item
    },
    hideDialog() {
      this.show = false
      this.media = {
        id: null,
        media: {
          en: null,
          pt: null,
        },
        type: 1,
        categoria_id: null,
      }
    },
    async store() {
      this.$nuxt.$emit('loader-true')
      await this.$axios
        .post(`/admin/media`, {
          ...this.media,
          media: JSON.stringify(this.media.media),
        })
        .then((response) => {
          this.hideDialog()
          this.$nuxt.$emit('text-toasty', {
            color: 'success',
            text: response.data.message,
          })
          this.$nuxt.$emit('loader-false')
          this.$emit('refresh')
        })
        .catch((error) => {
          this.$nuxt.$emit('loader-false')
          this.$nuxt.$emit('toasty', {
            color: 'danger',
            text: error.response.data,
          })
        })
    },
    async update() {
      this.$nuxt.$emit('loader-true')
      await this.$axios
        .put(`/admin/media/${this.media.id}`, {
          ...this.media,
          media: JSON.stringify(this.media.media),
        })
        .then((response) => {
          this.hideDialog()
          this.$nuxt.$emit('text-toasty', {
            color: 'success',
            text: response.data.message,
          })
          this.$nuxt.$emit('loader-false')
          this.$emit('refresh')
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
/deep/ .v-text-field {
  width: 450px;
}
</style>
