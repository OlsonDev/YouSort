<template>
  <div>
    <h3>{{authors.length}} authors</h3>
    <table>
      <tr>
        <th>Name</th>
        <th>URL</th>
      </tr>
      <tr v-for="author of authors" :key="author.authorUrl">
        <td>{{author.authorName}}</td>
        <td>{{author.authorUrl}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      authors: { type: Array, required: true },
    },

    data: () => ({
    }),

    computed: {
    },
  };
</script>

<style scoped lang="scss">
</style>