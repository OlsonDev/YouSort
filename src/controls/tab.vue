<template>
  <section
    v-show="shouldShow"
    :aria-hidden="!shouldShow"
    class="tabs-component-panel"
    :id="hash"
    role="tabpanel">
    <slot />
  </section>
</template>

<script>
  export default {
    props: {
      id: { type: String, default: null },
      name: { type: String, required: true },
      prefix: { type: String, default: '' },
      suffix: { type: String, default: '' },
      isDisabled: { type: Boolean, default: false },
    },

    data: () => ({
      isActive: false,
      isVisible: true,
    }),

    computed: {
      shouldShow() {
        return this.isActive && this.isVisible;
      },

      header() {
        return this.prefix + this.name + this.suffix;
      },

      hash() {
        return this.isDisabled
          ? '#'
          : this.id
            ? `#${this.id}`
            : `#${this.hashedName}`;
      },

      hashedName() {
        return this.name.toLowerCase().replace(/ /g, '-');
      },
    },
  };
</script>

<style scoped lang="scss">
  .tab-button {
    display: block;
    padding: 20px;
    color: #000;
    &:hover {
      color: #666;
    }
  }
</style>