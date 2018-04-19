<template>
  <div id="popup">
    <tabs>
      <template slot="before-buttons">
        <h1>YouSort</h1>
      </template>

      <tab name="Rules">
        <rules-tab :rules="rules" />
      </tab>
      <tab name="Authors">
        <authors-tab :authors="authors" />
      </tab>
      <tab name="Playlists">
        <h3>Current: {{currentPlaylist ? currentPlaylist.name : '(none)'}}</h3>
      </tab>
      <tab name="Videos">
        <videos-tab :videos="videos" />
      </tab>
      <tab name="Settings">
        <h3>Settings not implemented</h3>
      </tab>
    </tabs>
  </div>
</template>

<script>
  import _ from 'lodash';
  import YouSort from '../yousort';
  import Tabs from '../controls/tabs.vue';
  import Tab from '../controls/tab.vue';
  import RulesTab from '../controls/rules-tab.vue';
  import AuthorsTab from '../controls/authors-tab.vue';
  import VideosTab from '../controls/videos-tab.vue';

  const youSort = new YouSort();

  export default {
    components: {
      Tabs,
      Tab,
      RulesTab,
      AuthorsTab,
      VideosTab,
    },

    data: () => ({
      storage: {},
      rules: [],
    }),

    computed: {
      currentPlaylist() {
        return this.storage
          && this.storage.currentPlaylist
          && this.storage[this.storage.currentPlaylist];
      },

      videos() {
        return (this.currentPlaylist && this.currentPlaylist.videos)
          || [];
      },

      authors() {
        return (this.storage && this.storage.authors)
          || [];
      },
    },

    methods: {
      updateStorage() {
        youSort.updateStorage().then(() => {
          this.storage = _.assign({}, this.storage, youSort.storage);
          this.rules = this.storage.rules;
          youSort.mergeAuthors().then(() => {
            this.storage = _.assign({}, this.storage, youSort.storage);
          });
        });
      },
    },

    created() {
      this.updateStorage();
    },
  };
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #popup {
    width: 800px;
    > * {
      margin: 0;
      padding: 0;
    }
  }
  h1 {
    color: #f00;
    margin: 0;
    padding: 0;
  }
  ol, ul {
    list-style: none;
  }
  table {
    border-collapse: collapse;
    cursor: default;
    width: 100%;

    th {
      text-align: left;
    }

    th, td {
      padding: 1px 8px;

      &:first-child {
        padding-left: 2px;
      }

      &:last-child {
        padding-right: 2px;
      }

      &.align-right {
        text-align: right;
        font-family: monospace;
        font-size: 12px;
      }
    }

    tr {
      &first-child {
        background: #000;
        color: #fff;
      }

      &:nth-child(2n + 3) {
        background: #f5f5f5;
      }

      &:not(:first-child) {
        &:hover {
          background: #fdd;
        }
      }
    }
  }
  label {
    line-height: 24px;
    background: #ddd;
  }
  label, input, select, button {
    padding-left: 4px;
    padding-right: 4px;
    height: 24px;
    min-width: 150px;
    display: inline-block;
    vertical-align: middle;
  }
  button + * {
    margin-top: 8px;
  }
</style>