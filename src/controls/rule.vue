<template>
  <li>
    <div>
        <label :for="`rule-name-${rule.ruleId}`">Name</label>
        <input type="text" :id="`rule-name-${rule.ruleId}`" v-model="rule.name" placeholder="Rule name"/>
    </div>
    <div>
        <h4>Selectors</h4>
        <ol>
          <li v-for="(selector, j) of rule.selectors" :key="j">
            <div>
              <label :for="`rule-specificity-${rule.ruleId}-${j}`">Specificity</label>
              <input
                type="number"
                :id="`rule-specificity-${rule.ruleId}-${j}`"
                min="0"
                step="1"
                :max="maxSpecificity"
                v-model.number="selector.specificity"
                placeholder="Selector specificity"
              />
            </div>
            <div>
              <ol>
                <li v-for="(criterion, k) of selector.criteria" :key="k">
                  <div>Criterion {{k}}... TODO</div>
                </li>
              </ol>
            </div>
          </li>
        </ol>
    </div>
  </li>
</template>

<script>
  export default {
    props: {
      rule: { type: Object, required: true },
    },

    data: () => ({
    }),

    computed: {
    },
  };
</script>

<style scoped lang="scss">
</style>