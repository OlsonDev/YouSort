<template>
  <v-app dark id="yousort-options">
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.href" @click="handleItemClick(item)" v-model="item.isActive">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="red" dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-icon class="mx-3">fab fa-youtube</v-icon>

      <v-toolbar-title class="mr-5 align-center">
        <span class="title">YouSort</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-layout row align-center style="max-width: 650px">
        <v-text-field
          placeholder="Search…"
          single-line
          append-icon="search"
          :append-icon-cb="() => {}"
          color="white"
          hide-details
        ></v-text-field>
      </v-layout>
    </v-toolbar>

    <v-content>
      <v-container fill-height>
        <v-layout>
          <rules-tab v-show="activeHref === 'rules'" :rules="rules" />
          <authors-tab v-show="activeHref === 'authors'" :authors="authors" />
          <videos-tab v-show="activeHref === 'videos'" :videos="videos" />
          <div v-show="activeHref === 'playlists'">Playlists not implemented</div>
          <div v-show="activeHref === 'settings'">Settings not implemented</div>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import 'vuetify/dist/vuetify.min.css';
  import _ from 'lodash';
  import YouSort from '../yousort';
  import Tabs from '../controls/tabs.vue';
  import Tab from '../controls/tab.vue';
  import RulesTab from '../controls/rules-tab.vue';
  import AuthorsTab from '../controls/authors-tab.vue';
  import VideosTab from '../controls/videos-tab.vue';

  const youSort = new YouSort();

  const buildItem = (href, icon, text, isActive) => ({
    href,
    icon,
    text,
    isActive: isActive || false,
  });

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
      drawer: true,
      items: [
        buildItem('rules', 'sort', 'Sorting rules'),
        buildItem('authors', 'supervisor_account', 'Authors', true),
        buildItem('playlists', 'playlist_play', 'Playlists'),
        buildItem('videos', 'videocam', 'Videos'),
        buildItem('settings', 'settings', 'Settings'),
      ],
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

      activeItem() {
        return this.items.find(i => i.isActive);
      },

      activeHref() {
        return this.activeItem && this.activeItem.href;
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

      handleItemClick(item) {
        const old = this.activeItem;
        if (item === old) return;
        if (old) old.isActive = false;
        item.isActive = true;
      },
    },

    created() {
      this.updateStorage();
    },
  };
</script>

<style lang="scss">
</style>