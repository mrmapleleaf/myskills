export const options = {
  responsive: true,
  maintainAspectRatio: false,
  borderRadius: 10,
  borderWidth: 0,
  scales: {
    x: {
      grid: { display: false }, // X軸のグリッド線を消す
      categoryPercentage: 0.5, // セクション幅
      barPercentage: 0.8, // 棒の太さ
      ticks: {
        font: {
          size: 10 // ここでサイズを調整（デフォルトは12程度）
        }
      }
    },
    y: {
      beginAtZero: true,
      // 最大値が5（例えば5段階評価）なら、6に設定すると上にゆとりが生まれます
      suggestedMax: 5,
      ticks: {
        font: {
          size: 10 // ここでサイズを調整（デフォルトは12程度）
        }
      }
    },
  },
};
