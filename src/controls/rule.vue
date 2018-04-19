<template>
  <li>
    <div>
        <label :for="`rule-name-${rule.ruleId}`">Name</label>
        <input type="text" :id="`rule-name-${rule.ruleId}`" v-model="rule.name" placeholder="Rule name"/>
    </div>
    <div>
      <h4>Orderings</h4>
      <button type="button" @click="addOrdering">Add ordering</button>
      <ol class="ordering-list">
        <li v-for="(ordering, i) of rule.orderings" :key="i">
          <div>
            <label :for="`rule-ordering-${rule.ruleId}-${i}`">{{i ? 'Then by' : 'Order by' }}</label>
            <select v-model="ordering.by" :id="`rule-ordering-${rule.ruleId}-${i}`">
              <option value="videoName">Video name</option>
              <option value="videoTime">Video time</option>
              <option value="seriesNumber">Series number</option>
              <option value="authorName">Author name</option>
              <option value="dateAdded">Date added</option>
              <option value="datePublished">Date published</option>
            </select>
            <select v-model="ordering.dir">
              <option value="asc">ascending</option>
              <option value="desc">descending</option>
            </select>
            <button v-show="canRemoveOrderings" type="button" @click="removeOrdering(i)">Remove</button>
          </div>
        </li>
      </ol>
    </div>
    <div>
      <h4>Selectors</h4>
      <button type="button" @click="addSelector">Add selector</button>
      <ol class="selector-list">
        <li v-for="(selector, i) of rule.selectors" :key="i">
          <div>
            <label :for="`rule-specificity-${rule.ruleId}-${i}`">Specificity</label>
            <input
              type="number"
              :id="`rule-specificity-${rule.ruleId}-${i}`"
              min="0"
              step="1"
              :max="maxSpecificity"
              v-model.number="selector.specificity"
              placeholder="Selector specificity"
            />
            <button v-show="canRemoveSelectors" type="button" @click="removeSelector(i)">Remove</button>
          </div>
          <div>
            <h5>Criteria</h5>
            <button type="button" @click="addCriterion(selector)">Add criterion</button>
            <ol class="selector-criteria-list">
              <li v-for="(criterion, j) of selector.criteria" :key="j">
                <select v-model="criterion.property" :id="`rule-selector-${rule.ruleId}-${i}-${j}-property`">
                  <option value="videoName">Video name</option>
                  <option value="videoTime">Video time</option>
                  <option value="seriesNumber">Series number</option>
                  <option value="authorName">Author name</option>
                  <option value="dateAdded">Date added</option>
                  <option value="datePublished">Date published</option>
                </select>
                <select v-model="criterion.operator" :id="`rule-selector-${rule.ruleId}-${i}-${j}-operator`">
                  <option value="===">equals</option>
                  <option value="!==">does not equal</option>
                  <option value="contains">contains</option>
                  <option value="matches">matches regex</option>
                  <option value="is-empty">is empty</option>
                  <option value="is-not-empty">is not empty</option>
                  <option value="<">&lt;</option>
                  <option value="<=">&lt;=</option>
                  <option value=">">&gt;</option>
                  <option value=">=">&gt;=</option>
                </select>
                <input v-model="criterion.value" :id="`rule-selector-${rule.ruleId}-${i}-${j}-value`" />
                <button v-show="canRemoveCriterion(selector)" type="button" @click="removeCriterion(selector, j)">Remove</button>
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
      maxSpecificity: { type: Number, required: true },
    },

    data: () => ({
    }),

    computed: {
      canRemoveOrderings() {
        return this.rule.orderings.length > 1;
      },

      canRemoveSelectors() {
        return this.rule.selectors.length > 1;
      },
    },

    methods: {
      addOrdering() {
        this.rule.orderings.push({
          by: 'videoName',
          dir: 'asc',
        });
      },

      removeOrdering(index) {
        if (!this.canRemoveOrderings) return;
        this.rule.orderings.splice(index, 1);
      },

      addSelector() {
        const selector = {
          specificity: this.maxSpecificity + 1,
          criteria: [],
        };
        this.addCriterion(selector);
        this.rule.selectors.push(selector);
      },

      removeSelector(index) {
        if (!this.canRemoveSelectors) return;
        this.rule.selectors.splice(index, 1);
      },

      addCriterion(selector) {
        selector.criteria.push({
          property: 'authorName',
          operator: '===',
          value: null,
        });
      },

      removeCriterion(selector, index) {
        if (!this.canRemoveCriterion(selector)) return;
        selector.criteria.splice(index, 1);
      },

      canRemoveCriterion(selector) {
        return selector.criteria.length > 1;
      },
    },
  };
</script>

<style scoped lang="scss">
  h4 {
    margin-top: 8px;
  }
</style>