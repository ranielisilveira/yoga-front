<template>
  <v-dialog v-model="show" persistent width="500" @keydown.esc="show = false">
    <v-card>
      <v-card-title class="grey lighten-2">
        {{ title }}
      </v-card-title>
      <v-card-text class="headline pt-4">
        {{ item }}
      </v-card-text>
      <v-card-text class="pt-2 pb-2">
        <v-alert v-if="info" border="top" color="red lighten-2" dark>
          {{ info }}
        </v-alert>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue-grey white--text" @click="show = false">
          {{ $t('cancel') }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red white--text" @click="confirm">
          {{ $t('confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'DeleteDialog',
  props: {
    title: {
      type: String,
      default: 'Remover o item selecionado?',
    },
    item: {
      type: String,
      default: '',
    },
    info: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    show: false,
  }),
  methods: {
    showDialog() {
      this.show = true
    },
    hideDialog() {
      this.show = false
    },
    confirm() {
      this.$emit('confirm-remove')
    },
  },
}
</script>
