<template>
  <div class="tabs">
    <div class="tab-button-bar">
      <div class="before-buttons">
        <slot name="before-buttons"/>
      </div>

      <ul class="tab-buttons" role="tablist">
        <li
          v-for="(tab, i) of tabs"
          :key="i"
          :class="{ 'is-active': tab.isActive, 'is-visible': tab.isVisible, 'is-disabled': tab.isDisabled }"
          class="tab-button"
          role="presentation"
          v-show="tab.isVisible"
        >
          <a v-html="tab.header"
            :aria-controls="tab.hash"
            :aria-selected="tab.isActive"
            @click="activateTab(tab.hash, $event)"
            :href="tab.hash"
            role="tab"
          ></a>
        </li>
      </ul>
  </div>
    <div class="tab-panel">
      <slot v-show="activeVisibleTab"/>
      <div v-show="!activeVisibleTab" class="no-active-tab"></div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    props: {
    },

    data: () => ({
      tabs: [],
    }),

    computed: {
      activeVisibleTab() {
        return _.find(this.tabs, 'shouldShow');
      },
    },

    methods: {
      findTab(hash) {
        return _.find(this.tabs, ['hash', hash]);
      },

      activateTab(hash) {
        const tabToActivate = this.findTab(hash);
        if (!tabToActivate || tabToActivate.isDisabled) return;
        this.tabs.forEach(tab => {
          tab.isActive = tab.hash === tabToActivate.hash;
        });
        this.$emit('changed', { tab: tabToActivate });
        this.activeTabHash = hash;
      },

      setTabVisibility(hash, visibility) {
        const tab = this.findTab(hash);
        if (!tab) return;
        tab.isVisible = visibility;
        if (!tab.isActive) return;
        tab.isActive = false;
        this.activateFirstVisibleTab();
      },

      activateFirstVisibleTab() {
        this.tabs.every(tab => {
          if (tab.isVisible) {
            tab.isActive = true;
            return false;
          }
          return true;
        });
      },
    },

    mounted() {
      this.tabs = this.$children;
      this.activateTab(_.get(this.tabs, '[0].hash'));
    },
  };
</script>

<style scoped lang="scss">
  .tabs {
    margin-top: -5px;
    display: flex;
    flex-direction: column;
  }
  .tab-button-bar {
    display: flex;
    border-bottom: 1px solid #000;
    justify-content: space-between;

    .before-buttons {
      width: 100%;
      text-align: center;
    }

    ul {
      list-style: none;
      display: contents;

      li {
        display: block;
        width: 100%;
        text-align: center;
      }

      a {
        color: #000;
        text-decoration: none;
        display: block;
        padding: 8px 0;
        text-align: center;
        border-left: 1px solid #000;

        &:hover {
          color: #666;
        }
      }
    }
  }
  .tab-panel {
    height: 500px;
    overflow-y: scroll;
  }
</style>