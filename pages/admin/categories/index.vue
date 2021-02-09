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

              <category-dialog ref="CategoryDialogRef" @refresh="$fetch" />
            </v-toolbar>
          </div>
          <div class="col-12 my-0 py-0">
            <v-data-table
              :headers="headers"
              :items="categories.data"
              :page.sync="categories.current_page"
              :items-per-page="categories.per_page"
              hide-default-footer
            >
              <template #[`header.actions`]>
                <span>
                  <v-select
                    v-model="categories.per_page"
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

              <template #[`item.order`]="{ item }">
                <v-text-field
                  :key="item.id"
                  v-model="item.order"
                  style="width: 80px"
                  hide-details
                  class="my-2"
                  type="number"
                  min="1"
                  dense
                  outlined
                  solo-inverted
                  @input="updateOrder(item)"
                ></v-text-field>
              </template>

              <template #[`item.name`]="{ item }">
                {{ item.name[$i18n.locale] }}
                <span v-if="item.category">
                  {{
                    item.category.category
                      ? item.category.category.name[$i18n.locale] + ' > '
                      : ''
                  }}
                  {{
                    item.category
                      ? item.category.name[$i18n.locale] + ' > '
                      : ''
                  }}
                </span>
              </template>

              <template #[`item.color`]="{ item }">
                <v-alert :color="item.color" dark dense>
                  {{ item.color }}
                </v-alert>
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
                v-model="categories.current_page"
                :length="categories.last_page"
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
      :item="selectedItem.name[$i18n.locale] || ''"
      :title="$t('categories.delete_dialog_title')"
      :info="$t('categories.delete_dialog_info')"
      @confirm-remove="remove()"
    ></delete-dialog>
    <restore-dialog
      ref="RestoreDialogRef"
      :item="selectedItem.name[$i18n.locale] || ''"
      :title="$t('categories.restore_dialog_title')"
      :info="$t('categories.restore_dialog_info')"
      @confirm-restore="restore()"
    ></restore-dialog>
  </v-row>
</template>
<script>
import debounce from 'lodash/debounce'
import CategoryDialog from '~/components/categories/CategoryDialog.vue'
export default {
  components: { CategoryDialog },
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
      categories: {
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
        name: {
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
        `admin/categories?page=${this.categories.current_page}&search=${this.search}&length=${this.categories.per_page}`
      )
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
  head() {
    return {
      title: this.$t('categories.head'),
    }
  },
  computed: {
    breadcrumbs() {
      return [
        {
          text: this.$t('breadcumbs.config'),
          disabled: true,
        },
        {
          text: this.$t('breadcumbs.categories'),
          disabled: true,
        },
      ]
    },
    headers() {
      return [
        {
          text: this.$t('categories.headers.order'),
          sortable: false,
          value: 'order',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('categories.headers.color'),
          sortable: false,
          value: 'color',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('categories.headers.name'),
          align: 'start',
          sortable: false,
          value: 'name',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('categories.headers.media'),
          sortable: false,
          value: 'medias_count',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('categories.headers.sub_categories_count'),
          sortable: false,
          value: 'categories_count',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('categories.headers.status'),
          sortable: false,
          value: 'deleted_at',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('categories.headers.actions'),
          sortable: false,
          value: 'actions',
          class: 'blue-grey white--text',
        },
      ]
    },
  },
  methods: {
    updateOrder: debounce(async function (item) {
      this.$nuxt.$emit('loader-true')
      await this.$axios
        .put(`/admin/categories/${item.id}/sort`, item)
        .then((response) => {
          this.$nuxt.$emit('text-toasty', {
            color: 'success',
            text: response.data.message,
          })
          this.$nuxt.$emit('loader-false')
          this.$fetch()
        })
        .catch((error) => {
          this.$nuxt.$emit('loader-false')
          this.$nuxt.$emit('toasty', {
            color: 'danger',
            text: error.response.data,
          })
        })
    }, 500),
    doSearch: debounce(function () {
      if (this.search.length > 2 || this.search.length === 0) {
        this.categories.current_page = 1
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
      this.$refs.CategoryDialogRef.showDialog(item)
    },
    async remove() {
      this.$nuxt.$emit('loader-true')
      this.$refs.RemoveDialogRef.hideDialog()
      await this.$axios
        .delete(`/admin/categories/${this.selectedItem.id}`)
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
