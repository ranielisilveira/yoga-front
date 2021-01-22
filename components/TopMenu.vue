<template>
  <v-toolbar>
    <div v-if="$vuetify.breakpoint.mdAndUp">
      <v-menu
        v-for="(item, i) in items"
        :key="i"
        :close-on-content-click="true"
        :nudge-width="200"
        transition="slide-x-transition"
        bottom
        right
      >
        <template #activator="{ on, attrs }">
          <v-btn color="grey darken-2" text v-bind="attrs" v-on="on">
            {{ item.title }}
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Menu {{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list v-if="item.children">
            <v-list-item
              v-for="(child, ic) in item.children"
              :key="ic"
              link
              :to="child.route"
            >
              <v-list-item-title>{{ child.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
    <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
  </v-toolbar>
</template>
<script>
export default {
  name: 'TopMenu',
  props: {
    items: {
      type: Array,
      default: () => {},
    },
  },
  data: () => ({}),
  watch: {},
  methods: {},
}
</script>

<style></style>
