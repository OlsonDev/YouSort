<template>
  <div>
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
  </div>
</template>

<script>
  const timestampToSeconds = ts => {
    if (!ts) return 0;
    const parts = ts.split(':');
    const seconds = Number(parts.pop()) || 0;
    const minutes = Number(parts.pop()) || 0;
    const hours = Number(parts.pop()) || 0;
    return seconds + (minutes * 60) + (hours * 60 * 60);
  };

  export default {
    props: {
      videos: { type: Array, required: true },
    },

    data: () => ({
    }),

    computed: {
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