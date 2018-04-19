<template>
  <div>
    <h3>{{rules.length}} rules</h3>
    <button type="button" @click="addRule">Add rule</button>
    <ol id="rules-list">
        <rule v-for="rule of rules" :key="rule.id" :rule="rule" />
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
            criteria: [],
          }],
          orderings: [{
            by: 'videoName',
            dir: 'asc',
          }],
          isValid: false,
        });
      },
    },
  };
</script>

<style scoped lang="scss">
</style>