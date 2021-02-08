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
      <v-toolbar dark :color="category.color">
        <v-btn icon dark @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title v-if="category.id">
          {{ category.name[$i18n.locale] }}
        </v-toolbar-title>
        <v-toolbar-title v-else>
          {{ $t('categories.new') }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-if="category.id" dark text @click="update">
            <v-icon left>mdi-content-save</v-icon>
            {{ $t('update') }}
          </v-btn>
          <v-btn v-else dark text @click="store">
            <v-icon left>mdi-content-save</v-icon>
            {{ $t('store') }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('categories.headers.parent_category_name') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-select
                v-model="category.category_id"
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
              {{ $t('categories.name') }}
            </v-list-item-title>
            <v-list-item-subtitle class="pt-3">
              <v-text-field
                v-for="(locale, l) in $i18n.locales"
                :key="l"
                v-model="category.name[locale.code]"
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

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('categories.color') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-select
                v-model="category.color"
                solo
                outlined
                dense
                :items="colors"
                item-text="text"
                item-value="value"
                hide-details="true"
              >
                <template #selection="{ item }">
                  <v-alert :color="item.text" dark dense>
                    {{ item.text }}
                  </v-alert>
                </template>
                <template #item="{ item }">
                  <v-alert :color="item.text" dark dense>
                    {{ item.text }}
                  </v-alert>
                </template>
              </v-select>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('categories.image') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-file-input
                ref="fileInputRef"
                truncate-length="25"
                :label="$t('categories.image_label')"
                outlined
                dense
                solo
                @change="changeFileInput"
              ></v-file-input>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="category.image !== null">
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('categories.current_image') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <a :href="category.image" target="_blank">{{ category.image }}</a>
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
          v-if="category.id"
          :color="`${category.color} white--text`"
          @click="update"
        >
          {{ $t('update') }}
        </v-btn>
        <v-btn v-else :color="`${category.color} white--text`" @click="store">
          {{ $t('store') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'CategoryDialog',
  data: () => ({
    show: false,
    dataForm: new FormData(),
    category: {
      id: null,
      name: {
        en: null,
        pt: null,
      },
      color: 'red',
      category_id: null,
      image: null,
    },
    colors: [],
    categories: [],
  }),
  async fetch() {
    this.$nuxt.$emit('loader-true')
    await this.$axios
      .get(`admin/categories/colors`)
      .then((response) => {
        this.colors = response.data
      })
      .catch((error) => {
        this.$nuxt.$emit('loader-false')
        this.$nuxt.$emit('toasty', {
          color: 'danger',
          text: error.response.data,
        })
      })

    await this.$axios
      .get(`admin/categories/array`)
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
  methods: {
    showDialog(item) {
      this.show = true
      this.category = item
    },
    hideDialog() {
      this.show = false
      this.category = {
        id: null,
        name: {
          en: null,
          pt: null,
        },
        color: 'red',
        category_id: null,
        image: null,
      }
    },
    changeFileInput(file) {
      this.dataForm.append('file', file)
    },
    async store() {
      this.$nuxt.$emit('loader-true')
      this.dataForm.append('category_id', this.category.category_id)
      this.dataForm.append('color', this.category.color)
      this.dataForm.append('name', JSON.stringify(this.category.name))
      await this.$axios
        .post(`/admin/categories`, this.dataForm)
        .then((response) => {
          this.$refs.fileInputRef.value = null
          this.dataForm = new FormData()
          this.hideDialog()
          this.$nuxt.$emit('text-toasty', {
            color: 'success',
            text: response.data.message,
          })
          this.$nuxt.$emit('loader-false')
          this.$fetch()
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
      this.dataForm.append('id', this.category.id)
      if (this.category.category_id) {
        this.dataForm.append('category_id', this.category.category_id)
      }
      this.dataForm.append('color', this.category.color)
      this.dataForm.append('name', JSON.stringify(this.category.name))
      await this.$axios
        .post(`/admin/categories/${this.category.id}`, this.dataForm)
        .then((response) => {
          this.$refs.fileInputRef.value = null
          this.dataForm = new FormData()
          this.hideDialog()
          this.$nuxt.$emit('text-toasty', {
            color: 'success',
            text: response.data.message,
          })
          this.$nuxt.$emit('loader-false')
          this.$fetch()
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
