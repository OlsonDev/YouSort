<template>
  <div>
    <h3>{{videos.length}} videos</h3>
    <h4>{{totalDuration}} of content</h4>

    <v-data-table
      :headers="headers"
      :items="videos"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{props.item.index}}</td>
        <td class="text-xs-right">{{props.item.videoTime}}</td>
        <td>{{props.item.authorName}}</td>
        <td>{{props.item.videoName}}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import YouSort from '../yousort';

  export default {
    props: {
      videos: { type: Array, required: true },
    },

    data: () => ({
      headers: [
        { text: '#', value: 'index' },
        { text: 'Time', value: 'videoTimeSeconds' },
        { text: 'Author', value: 'authorName' },
        { text: 'Name', value: 'videoName' },
      ],
    }),

    computed: {
      totalDuration() {
        const totalSeconds = this.videos.reduce((acc, cur) => acc + YouSort.timestampToSeconds(cur.videoTime), 0);
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

<style lang="scss">
</style>