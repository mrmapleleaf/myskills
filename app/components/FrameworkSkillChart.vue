<template>
  <div id="framework-skill-area">
    <div>
      <h2>Framework Skills</h2>
    </div>
    <ClientOnly>
      <div class="chart-container">
        <Chart
          ref="chartRef"
          type="bar"
          :data="chartData"
          :options="chartConfig.options"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    type ChartData,
  } from 'chart.js';
  import { Chart } from 'vue-chartjs';
  import * as chartConfig from '../../chartConfig.js';
  import type { my_skill } from '~/types/my_skill.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const client = useSupabaseClient<my_skill>();

  const { data, error } = await useAsyncData('experiences_of_framework', async () => {
      const my_skills = client.from('my_skill').select('*').eq('skill_tag_id', 3).order('years_of_experience', { ascending: false })
      return my_skills;
    }
  );

  // computedによって自動でリアクティブになる
  const chartData = computed<ChartData<'bar'>>(() => {
      const displayData = data.value?.data || [] as my_skill[];
      return {
        labels: displayData.map((s) => s.skill_name),
        datasets: [
          {
            label: '経験年数',
            data: displayData.map((s) => s.years_of_experience),
            backgroundColor: displayData.map((s) => s.background_color),
          },
        ]
      };
    }
  );
</script>

<style scoped>
#framework-skill-area {
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px;
}
</style>
