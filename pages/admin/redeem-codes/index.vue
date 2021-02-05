@@ -0,0 +1,248 @@
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

              <redeem-code-dialog ref="RedeemCodeDialogRef" @refresh="$fetch" />
            </v-toolbar>
          </div>
          <div class="col-12 my-0 py-0">
            <v-data-table
              :headers="headers"
              :items="redeem_codes.data"
              :page.sync="redeem_codes.current_page"
              :items-per-page="redeem_codes.per_page"
              hide-default-footer
            >
              <template #[`header.actions`]>
                <span>
                  <v-select
                    v-model="redeem_codes.per_page"
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

              <template #[`item.is_taken`]="{ item }">
                {{ item.is_taken ? $t('taken') : $t('available') }}
              </template>

              <template #[`item.actions`]="{ item }">
                <v-tooltip top>
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

                <v-tooltip top>
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
                  <span>{{ $t('delete') }}</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </div>

          <v-divider></v-divider>

          <div class="col-12">
            <div class="offset-md-3 col-sm-12 col-md-6">
              <v-pagination
                v-model="redeem_codes.current_page"
                :length="redeem_codes.last_page"
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
      :item="selectedItem.code || ''"
      :title="$t('redeem_codes.delete_dialog_title')"
      :info="$t('redeem_codes.delete_dialog_info')"
      @confirm-remove="remove()"
    ></delete-dialog>
  </v-row>
</template>
<script>
import debounce from 'lodash/debounce'
import RedeemCodeDialog from '~/components/redeem-codes/RedeemCodeDialog.vue'
export default {
  components: { RedeemCodeDialog },
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
      redeem_codes: {
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
        code: null,
      },
    }
  },
  async fetch() {
    this.$nuxt.$emit('loader-true')
    await this.$axios
      .get(
        `admin/redeem-codes?page=${this.redeem_codes.current_page}&search=${this.search}&length=${this.redeem_codes.per_page}`
      )
      .then((response) => {
        this.redeem_codes = response.data
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
      title: this.$t('redeem_codes.head'),
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
          text: this.$t('breadcumbs.redeem_codes'),
          disabled: true,
        },
      ]
    },
    headers() {
      return [
        {
          text: this.$t('redeem_codes.headers.code'),
          align: 'start',
          sortable: false,
          value: 'code',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('redeem_codes.headers.user'),
          align: 'start',
          sortable: false,
          value: 'user.name',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('redeem_codes.headers.status'),
          sortable: false,
          value: 'is_taken',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('redeem_codes.headers.actions'),
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
        this.redeem_codes.current_page = 1
        this.$fetch()
      }
    }, 500),
    removeDialog(item) {
      this.selectedItem = item
      this.$refs.RemoveDialogRef.showDialog()
    },
    edit(item) {
      this.$refs.RedeemCodeDialogRef.showDialog(item)
    },
    async remove() {
      this.$nuxt.$emit('loader-true')
      this.$refs.RemoveDialogRef.hideDialog()
      await this.$axios
        .delete(`/admin/redeem-codes/${this.selectedItem.id}`)
        .then((response) => {
          this.$nuxt.$emit('text-toasty', {
            color: 'success',
            text: response.data.message,
          })
          this.redeem_codes = response.data.redeem_codes
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
