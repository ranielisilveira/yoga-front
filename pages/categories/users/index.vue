@@ -0,0 +1,185 @@
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
            </v-toolbar>
          </div>
          <div class="col-12 my-0 py-0">
            <v-data-table
              :headers="headers"
              :items="users.data"
              :page.sync="users.current_page"
              :items-per-page="users.per_page"
              hide-default-footer
            >
              <template #[`header.actions`]>
                <span>
                  <v-select
                    v-model="users.per_page"
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

              <template #[`item.is_active`]="{ item }">
                {{ item.is_active ? $t('inactive') : $t('active') }}
              </template>
            </v-data-table>
          </div>

          <v-divider></v-divider>

          <div class="col-12">
            <div class="offset-md-3 col-sm-12 col-md-6">
              <v-pagination
                v-model="users.current_page"
                :length="users.last_page"
                @next="$fetch()"
                @previous="$fetch()"
                @input="$fetch()"
              ></v-pagination>
            </div>
          </div>
        </v-row>
      </v-card>
    </v-col>
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
      users: {
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
        name: null,
        email: null,
        code: {
          code: null,
        },
      },
    }
  },
  async fetch() {
    this.$nuxt.$emit('loader-true')
    await this.$axios
      .get(
        `admin/users?page=${this.users.current_page}&search=${this.search}&length=${this.users.per_page}`
      )
      .then((response) => {
        this.users = response.data
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
      title: this.$t('users.head'),
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
          text: this.$t('breadcumbs.users'),
          disabled: true,
        },
      ]
    },
    headers() {
      return [
        {
          text: this.$t('users.headers.name'),
          align: 'start',
          sortable: false,
          value: 'name',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('users.headers.email'),
          align: 'start',
          sortable: false,
          value: 'email',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('users.headers.is_active'),
          sortable: false,
          value: 'is_active',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('users.headers.code'),
          sortable: false,
          value: 'code.code',
          class: 'blue-grey white--text',
        },
        {
          text: this.$t('users.headers.actions'),
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
        this.users.current_page = 1
        this.$fetch()
      }
    }, 500),
    edit(item) {},
  },
}
</script>
