import { View, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { globalStyle } from "../../styles/globalStyle";

const COLORS = [
  globalStyle.primary,
  "#03A0B9",
  "#025965",
  "#00C2D1",
  "#89E7F0",
  "#01454E",
];

const CategoryPieChart = ({ data }) => {
  const screenWidth = Dimensions.get("window").width;

  if (!data || typeof data !== "object") {
    return <View style={{ height: 200 }} />;
  }

  const formatted = Object.entries(data).map(([name, value], index) => ({
    name,
    population: value,
    color: COLORS[index % COLORS.length],
    legendFontColor: "#7F7F7F",
    legendFontSize: 14,
  }));

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={{ alignItems: "center", marginVertical: 16 }}>
      <PieChart
        data={formatted}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="5"
        center={[10, 0]}
      />
    </View>
  );
};

export default CategoryPieChart;
