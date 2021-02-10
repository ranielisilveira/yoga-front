<template>
  <v-row class="mt-n5">
    <v-col :sm="12" :md="10" class="mx-auto">
      <v-breadcrumbs class="mb-4" :items="breadcrumbs" large></v-breadcrumbs>
      <v-card>
        <v-row class="mb-0">
          <div class="col-12 my-0 py-0">
            <v-toolbar flat color="blue-grey darken-1" dark>
              <v-text-field
                v-model="search"
                append-icon="search"
                :label="$t('search_label')"
                single-line
                hide-details
                solo-inverted
                flat
                @input="doSearch()"
              ></v-text-field>

              <media-dialog ref="MediaDialogRef" @refresh="$fetch" />
            </v-toolbar>
          </div>
          <div class="col-12 my-0 py-0">
            <v-data-table
              :headers="headers"
              :items="medias.data"
              :page.sync="medias.current_page"
              :items-per-page="medias.per_page"
              hide-default-footer
            >
              <template #[`header.actions`]>
                <span>
                  <v-select
                    v-model="medias.per_page"
                    small
                    solo
                    style="width: 105px"
                    :items="perPageOptions"
                    item-text="text"
                    item-value="value"
                    hide-details="true"
                    @change="$fetch"
                  ></v-select>
                </span>
              </template>

              <template #[`item.category`]="{ item }">
                <span v-if="item.category.category">
                  {{
                    item.category.category && item.category.category.category
                      ? item.category.category.category.name[$i18n.locale] +
                        ' > '
                      : ''
                  }}
                  {{
                    item.category.category
                      ? item.category.category.name[$i18n.locale] + ' > '
                      : ''
                  }}
                </span>
                <span v-if="item.category">
                  {{ item.category.name[$i18n.locale] }}
                </span>
                <span v-else> Categoria não encontrada </span>
              </template>

              <template #[`item.media`]="{ item }">
                <a
                  v-if="item.type === 1"
                  target="_blank"
                  :href="`https://vimeo.com/${item.media[$i18n.locale]}`"
                >
                  {{ `https://vimeo.com/${item.media[$i18n.locale]}` }}
                </a>

                <v-menu v-if="item.type === 3" open-on-hover top offset-y>
                  <template #activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                      {{ item.media[$i18n.locale].substring(0, 40) + '...' }}
                    </span>
                  </template>
                  <v-sheet max-width="450px" class="px-4 py-4">
                    {{ item.media[$i18n.locale] }}
                  </v-sheet>
                </v-menu>
              </template>

              <template #[`item.deleted_at`]="{ item }">
                {{ item.deleted_at ? $t('inactive') : $t('active') }}
              </template>

              <template #[`item.actions`]="{ item }">
                <v-tooltip v-if="!item.deleted_at" top>
                  <template #activator="{ on }">
                    <v-btn
                      small
                      depressed
                      color="primary"
                      dark
                      @click="edit(item)"
                      v-on="on"
                    >
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('details') }}</span>
                </v-tooltip>

                <v-tooltip v-if="item.deleted_at" top>
                  <template #activator="{ on }">
                    <v-btn
                      small
                      depressed
                      color="success"
                      dark
                      @click="restoreDialog(item)"
                      v-on="on"
                    >
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('restore') }}</span>
                </v-tooltip>

                <v-tooltip v-else top>
                  <template #activator="{ on }">
                    <v-btn
                      small
                      depressed
                      color="error"
                      dark
                      @click="removeDialog(item)"
                      v-on="on"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('deactivate') }}</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </div>

          <v-divider></v-divider>

          <div class="col-12">
            <div class="offset-md-3 col-sm-12 col-md-6">
              <v-pagination
                v-model="medias.current_page"
                :length="medias.last_page"
                @next="$fetch()"
                @previous="$fetch()"
                @input="$fetch()"
              ></v-pagination>
            </div>
          </div>
        </v-row>
      </v-card>
    </v-col>

    <delete-dialog
      ref="RemoveDialogRef"
      :item="selectedItem.media[$i18n.locale] || ''"
      :title="$t('medias.delete_dialog_title')"
      :info="$t('medias.delete_dialog_info')"
      @confirm-remove="remove()"
    ></delete-dialog>
    <restore-dialog
      ref="RestoreDialogRef"
      :item="selectedItem.media[$i18n.locale] || ''"
      :title="$t('medias.restore_dialog_title')"
      :info="$t('medias.restore_dialog_info')"
      @confirm-restore="restore()"
    ></restore-dialog>
  </v-row>
</template>
<script>
import debounce from 'lodash/debounce'
export default {
  layout: 'admin',
  data() {
    return {
      search: '',
      perPageOptions: [
        { value: 10, text: '10 itens' },
        { value: 25, text: '25 itens' },
        { value: 50, text: '50 itens' },
        { value: 100, text: '100 itens' },
      ],
      medias: {
        current_page: 1,
        data: [],
        from: 1,
        last_page: 1,
        per_page: 10,
        prev_page_url: null,
        to: 1,
        total: 1,
      },
      selectedItem: {
        id: null,
        type: null,
        media: {
          en: null,
          pt: null,
        },
      },
    }
  },
  async fetch() {
    this.$nuxt.$emit('loader-true')
    await this.$axios
      .get(
        `admin/media?page=${this.medias.current_page}&search=${this.search}&length=${this.medias.per_page}`
      )
      .then((response) => {
        this.medias = response.data
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
      title: this.$t('medias.head'),
    }
  },
  computed: {
    breadcrumbs() {
      return [
        {
          text: this.$t('breadcumbs.content'),
          disabled: true,
        },
        {
          text: this.$t('breadcumbs.media'),
          disabled: true,
        },
      ]
    },
    headers() {
      return [
        {
          text: this.$t('medias.headers.category'),
          align: 'start',
          sortable: false,
          value: 'category',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('medias.headers.media'),
          align: 'start',
          sortable: false,
          value: 'media',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('medias.headers.status'),
          sortable: false,
          value: 'deleted_at',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('medias.headers.actions'),
          sortable: false,
          value: 'actions',
          class: 'blue-grey white--text',
        },
      ]
    },
  },
  methods: {
    doSearch: debounce(function () {
      if (this.search.length > 2 || this.search.length === 0) {
        this.medias.current_page = 1
        this.$fetch()
      }
    }, 500),
    removeDialog(item) {
      this.selectedItem = item
      this.$refs.RemoveDialogRef.showDialog()
    },
    restoreDialog(item) {
      this.selectedItem = item
      this.$refs.RestoreDialogRef.showDialog()
    },
    edit(item) {
      this.$refs.MediaDialogRef.showDialog(item)
    },
    async remove() {
      this.$nuxt.$emit('loader-true')
      this.$refs.RemoveDialogRef.hideDialog()
      await this.$axios
        .delete(`/admin/media/${this.selectedItem.id}`)
        .then((response) => {
          this.$nuxt.$emit('text-toasty', {
            color: 'success',
            text: response.data.message,
          })
          this.medias = response.data.medias
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
    async restore() {
      this.$nuxt.$emit('loader-true')
      this.$refs.RestoreDialogRef.hideDialog()
      await this.$axios
        .patch(`/admin/media/${this.selectedItem.id}`)
        .then((response) => {
          this.$nuxt.$emit('text-toasty', {
            color: 'success',
            text: response.data.message,
          })
          this.medias = response.data.medias
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
