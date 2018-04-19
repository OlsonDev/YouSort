<template>
  <div id="rules-tab">
    <h3>{{rules.length}} rules</h3>
    <button type="button" @click="addRule">Add rule</button>
    <ol id="rules-list">
        <rule
          v-for="(rule, i) of rules"
          :key="rule.id"
          :rule="rule"
          :max-specificity="maxSpecificity"
          @remove="removeRule(i)"
        />
    </ol>
  </div>
</template>

<script>
  import _ from 'lodash';
  import Rule from './rule.vue';

  export default {
    components: {
      Rule,
    },

    props: {
      rules: { type: Array, required: true },
    },

    data: () => ({
    }),

    computed: {
      maxRuleId() {
        const ruleIds = this.rules.map(r => r.ruleId);
        return _.max(ruleIds) || 0;
      },

      maxSpecificity() {
        const selectors = _.flatten(this.rules.map(r => r.selectors));
        const specificities = selectors.map(s => s.specificity);
        return _.max(specificities) || 0;
      },
    },

    methods: {
      addRule() {
        this.rules.push({
          ruleId: this.maxRuleId + 1,
          name: 'New rule',
          selectors: [{
            specificity: this.maxSpecificity + 1,
            criteria: [{
              property: 'authorName',
              operator: '===',
              value: null,
            }],
          }],
          orderings: [{
            by: 'videoName',
            dir: 'asc',
          }],
          isValid: false,
        });
      },

      removeRule(index) {
        this.rules.splice(index, 1);
      },
    },
  };
</script>

<style lang="scss">
  #rules-tab {
    padding: 8px;
  }

  #rules-list {
    margin-top: 8px;

    > li {
      margin-top: 8px;
      background: #f3f3f3;
      border: 1px solid #999;
      padding: 8px;

      &:first-child {
        margin-top: 0;
      }

      &:nth-child(2n) {
        background: #f1f1ff;
        border: 1px solid #99c;
      }
    }
  }

  .ordering-list {
    > li {
      margin-top: 4px;

      &:first-child {
        margin-top: 0;
      }
    }
  }
</style>