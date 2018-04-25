<template>
  <div>
    <h3>{{authors.length}} authors</h3>
    <v-data-table
      :headers="headers"
      :items="authors"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.authorName }}</td>
        <td>{{ props.item.authorUrl }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    props: {
      authors: { type: Array, required: true },
    },

    data: () => ({
      headers: [
        { text: 'Name', value: 'authorName' },
        { text: 'URL', value: 'authorUrl' },
      ],
    }),

    computed: {
    },
  };
</script>

<style scoped lang="scss">
</style>