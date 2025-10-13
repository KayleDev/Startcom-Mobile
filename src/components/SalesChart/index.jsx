// components/SalesChart/index.jsx
import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { styles } from "./styles";
import { commonUserStyles } from "../../styles/commonUserStyles.js";

const SalesChart = ({ period = '7 dias' }) => {
  const screenWidth = Dimensions.get("window").width;

  const getChartData = (selectedPeriod) => {
    switch (selectedPeriod) {
      case 'Hoje':
        return {
          metas: [1000, 1200, 1100, 1300, 1400, 1200, 1100, 1000],
          sales: [900, 1100, 1000, 1250, 1500, 1100, 950, 900],
          labels: ['8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h']
        };
      
      case '7 dias':
        return {
          metas: [9000, 7000, 8000, 8500, 9500, 8700, 7500],
          sales: [8000, 6500, 7000, 9000, 12000, 7600, 7000],
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
        };
      
      case '30 dias':
        return {
          metas: [35000, 38000, 36000, 40000],
          sales: [32000, 36000, 38000, 42000],
          labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4']
        };
      
      case '1 ano':
        return {
          metas: [80000, 85000, 82000, 90000, 88000, 92000, 95000, 93000, 96000, 98000, 100000, 105000],
          sales: [75000, 82000, 80000, 88000, 90000, 89000, 93000, 95000, 94000, 99000, 102000, 108000],
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        };
      
      case 'Período completo':
        return {
          metas: [450000, 520000, 580000, 620000],
          sales: [420000, 510000, 590000, 650000],
          labels: ['2021', '2022', '2023', '2024']
        };
      
      default:
        return {
          metas: [9000, 7000, 8000, 8500, 9500, 8700, 7500],
          sales: [8000, 6500, 7000, 9000, 12000, 7600, 7000],
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
        };
    }
  };

  const { metas, sales, labels } = getChartData(period);

  const getBarPercentage = (selectedPeriod) => {
    switch (selectedPeriod) {
      case 'Hoje':
        return 0.35;
      case '7 dias':
        return 0.4; 
      case '30 dias':
        return 0.8;
      case '1 ano':
        return 0.3;
      case 'Período completo':
        return 0.65;
      default:
        return 0.4;
    }
  };

  const labelsDuplicated = labels.flatMap((d) => [d, ""]);
  const datasInterspersed = metas.flatMap((meta, i) => [meta, sales[i]]);

  const colors = datasInterspersed.map((_, i) =>
    i % 2 === 0 ? "#b4c8e6" : "#017688"
  );

  const data = {
    labels: labelsDuplicated,
    datasets: [
      { 
        data: datasInterspersed,
        colors: colors.map((color) => () => color),
      },
    ],
  };

  return (
    <View style={styles.container}>

      <BarChart
        data={data}
        width={screenWidth - 48}
        height={300}
        fromZero
        withInnerLines
        withCustomBarColorFromData={true}
        flatColor={true}
        showBarTops={false}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: () => "#000",
          barPercentage: getBarPercentage(period),
          propsForBackgroundLines: {
            stroke: "#bdbdbdff",
          },
        }}
        style={styles.chart}
      />

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: "#b4c8e6" }]} />
          <Text style={styles.legendText}>Meta</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: "#017688" }]} />
          <Text style={styles.legendText}>Vendas</Text>
        </View>
      </View>
    </View>
  );
};

export default SalesChart;