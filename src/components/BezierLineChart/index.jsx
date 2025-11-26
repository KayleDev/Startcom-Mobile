import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { globalStyle } from "../../styles/globalStyle";

const monthNames = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const monthNamesBR = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

const normalizeKey = (key) => {
  const m = monthNames[key];
  if (m) {
    const y = new Date().getFullYear();
    return `${y}-${String(m).padStart(2, "0")}`;
  }

  if (!isNaN(new Date(key).getTime())) return key;

  if (/^\d{4}-\d{2}$/.test(key)) return key;

  return null;
};

const fillMissingDays = (data, daysBack) => {
  const now = new Date();
  const result = [];

  for (let i = daysBack - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);

    const key = d.toISOString().split("T")[0];

    result.push({
      date: key,
      vendas: data[key] ?? 0,
    });
  }

  return result;
};

const fillMissingMonths = (data, monthsBack) => {
  const now = new Date();
  const result = [];

  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

    result.push({
      date: key,
      vendas: data[key] ?? 0,
    });
  }

  return result;
};

const ranges = {
  "7d": { type: "day", amount: 7 },
  "30d": { type: "day", amount: 30 },
  "6m": { type: "month", amount: 6 },
  "1y": { type: "month", amount: 12 },
};

const BezierLineChart = ({ data, period }) => {
  const screenWidth = Dimensions.get("window").width;

  const range = ranges[period] || ranges["6m"];

  const normalized = {};

  Object.entries(data || {}).forEach(([key, value]) => {
    const norm = normalizeKey(key);
    if (!norm) return;

    if (range.type === "month" && norm.length === 10) {
      const dateObj = new Date(norm);
      const monthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}`;

      normalized[monthKey] = (normalized[monthKey] || 0) + value;
      return;
    }

    normalized[norm] = value;
  });

  const filled =
    range.type === "day"
      ? fillMissingDays(normalized, range.amount)
      : fillMissingMonths(normalized, range.amount);

  const labels =
    range.type === "day"
      ? filled.map((i, index) => {
          const [_, month, day] = i.date.split("-");
          if (range.amount === 30) {
            if (index % 5 === 0 || index === filled.length - 1) {
              return `${day}/${month}`;
            }
            return "";
          }
          return `${day}/${month}`;
        })
      : filled.map((i) => {
          const [_, month] = i.date.split("-");
          const monthIndex = parseInt(month, 10) - 1;
          return monthNamesBR[monthIndex] || month;
        });

    const values = filled.map((i) => i.vendas);

    const maxValue = Math.max(...values, 0);
    
    let yAxisLabel = "R$ ";
    let divisor = 1;
    let suffix = "";

    if (maxValue >= 1000000) {
        if (maxValue < 1000000) {
            divisor = 1000;
            suffix = "k";
        } else {
            divisor = 1000000;
            suffix = "M";
        }
        } else if (maxValue >= 1000) {
        divisor = 1000;
        suffix = "k";
    }

const formattedValues = values.map(v => v / divisor);
  
  const formatYAxisLabel = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "0";
    
    if (divisor === 1) {
      return num.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    
    return num.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });
  };

  const chartData = {
    labels,
    datasets: [{ data: formattedValues.length > 0 ? formattedValues : [0] }],
  };

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: divisor === 1 ? 0 : 1,
    color: () => globalStyle.primary,
    labelColor: () => "#000",
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: globalStyle.primary,
    },
    formatYLabel: formatYAxisLabel,
  };

  return (
    <LineChart
      data={chartData}
      width={screenWidth - 80}
      height={256}
      chartConfig={chartConfig}
      bezier
      style={{ borderRadius: 16 }}
      withInnerLines={true}
      withOuterLines={true}
      withVerticalLines={false}
      withHorizontalLines={true}
      yAxisLabel={yAxisLabel}
      yAxisSuffix={suffix}
      segments={4}
      fromZero={true}
    />
  );
};

export default BezierLineChart;