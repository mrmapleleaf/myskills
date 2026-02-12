<template>
  <h1>My Skills</h1>
  <div class="charts-container">
    <div class="chart-wrapper">
      <LangSkillChart />
      <ToolSkillChart />
      <FrameworkSkillChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import LangSkillChart from '../../components/LangSkillChart.vue';
import ToolSkillChart from '../../components/ToolSkillChart.vue';
import FrameworkSkillChart from '../../components/FrameworkSkillChart.vue';
</script>

<style scoped>
.chart-wrapper {
  display: grid;
  grid-template-columns: 400px 400px 400px;
  grid-gap: 10px;
}
.charts-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
