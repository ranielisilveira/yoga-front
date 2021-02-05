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
      <v-toolbar dark color="green">
        <v-btn icon dark @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title v-if="redeem_code.id">
          {{ redeem_code.code }}
        </v-toolbar-title>
        <v-toolbar-title v-else>
          {{ $t('redeem_codes.new') }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-if="redeem_code.id" dark text @click="update">
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
              {{ $t('redeem_codes.code') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-text-field
                v-model="redeem_code.code"
                label=""
                solo
                outlined
                dense
                hide-details="true"
                autofocus
              ></v-text-field>
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
        <v-btn v-if="redeem_code.id" color="green white--text" @click="update">
          {{ $t('update') }}
        </v-btn>
        <v-btn v-else color="green white--text" @click="store">
          {{ $t('store') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'RedeemCodeDialog',
  data: () => ({
    show: false,
    redeem_code: {
      id: null,
      code: null,
    },
  }),
  async fetch() {
    this.$nuxt.$emit('loader-true')
    await this.$axios
      .get(`admin/redeem-codes`)
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
  methods: {
    showDialog(item) {
      this.show = true
      this.redeem_code = item
    },
    hideDialog() {
      this.show = false
      this.redeem_code = {
        id: null,
        code: null,
      }
    },
    async store() {
      this.$nuxt.$emit('loader-true')
      await this.$axios
        .post(`/admin/redeem-codes`, this.redeem_code)
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
        .put(`/admin/redeem-codes/${this.redeem_code.id}`, this.redeem_code)
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
