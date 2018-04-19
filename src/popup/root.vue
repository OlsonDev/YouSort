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
        <h3>{{videos.length}} videos</h3>
        <h4>{{totalDuration}} of content</h4>
        <table>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Author</th>
            <th>Name</th>
          </tr>
          <tr v-for="video of videos" :key="video.index">
            <td class="align-right">{{video.index}}</td>
            <td class="align-right">{{video.videoTime}}</td>
            <td>{{video.authorName}}</td>
            <td>{{video.videoName}}</td>
          </tr>
        </table>
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

  const youSort = new YouSort();

  const timestampToSeconds = ts => {
    if (!ts) return 0;
    const parts = ts.split(':');
    const seconds = Number(parts.pop()) || 0;
    const minutes = Number(parts.pop()) || 0;
    const hours = Number(parts.pop()) || 0;
    return seconds + (minutes * 60) + (hours * 60 * 60);
  };

  export default {
    components: {
      Tabs,
      Tab,
      RulesTab,
      AuthorsTab,
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

      totalDuration() {
        const totalSeconds = this.videos.reduce((acc, cur) => acc + timestampToSeconds(cur.videoTime), 0);
        const secondsPerMinute = 60;
        const secondsPerHour = 60 * secondsPerMinute;
        const secondsPerDay = 24 * secondsPerHour;

        let remainingSeconds = totalSeconds;

        const days = Math.floor(remainingSeconds / secondsPerDay);
        remainingSeconds -= days * secondsPerDay;
        const hours = Math.floor(remainingSeconds / secondsPerHour);
        remainingSeconds -= hours * secondsPerHour;
        const minutes = Math.floor(remainingSeconds / secondsPerMinute);
        remainingSeconds -= minutes * secondsPerMinute;
        const seconds = remainingSeconds;

        let totalDuration = '';
        totalDuration += days ? `${days}d` : '';
        totalDuration += hours ? `${hours}h` : '';
        totalDuration += minutes ? `${minutes}m` : '';
        totalDuration += seconds ? `${seconds}s` : '';
        return totalDuration.length ? totalDuration : '0s';
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
  #rules-list {
    li {
      background: rgba(0, 0, 0, 0.05);
      padding: 4px;
      margin-top: 4px;

      &:first-child {
        margin-top: 0;
      }
    }
  }
</style>