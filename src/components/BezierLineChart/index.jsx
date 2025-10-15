import { Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { globalStyle } from "../../styles/globalStyle";

const BezierLineChart = ({period = 'Últimos 6 meses'}) => {
    const screenWidth = Dimensions.get("window").width;
    
    const getChartData = (selectedPeriod) => {
        switch (selectedPeriod) {
        case 'Últimos 7 dias':
            return {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{
                    data: [900, 1100, 1000, 1250, 1500, 1100, 950]
                }]
            };
        
        case 'Últimos 30 dias':
            return {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                datasets: [{
                    data: [8000, 7000, 9000, 12000]
                }]
            };
        
        case 'Últimos 6 meses':
            return {
                labels: ['Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
                datasets: [{
                    data: [32000, 36000, 38000, 42000, 38000, 48000]
                }]
            };
        
        case 'Último 1 ano':
            return {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    data: [75000, 82000, 80000, 88000, 90000, 89000, 93000, 95000, 94000, 99000, 102000, 108000]
                }]
            };
        
        default:
            return {
                labels: ['Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
                datasets: [{
                    data: [32000, 36000, 38000, 42000, 38000, 48000]
                }]
            };
        }
    };

    const chartData = getChartData(period);

    const chartConfig = {
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        decimalPlaces: 0,
        color: (opacity = 1) => globalStyle.primary,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: globalStyle.primary
        }
    };

    return (
        <LineChart
            data={chartData}
            width={screenWidth - 80}
            height={256}
            chartConfig={chartConfig}
            bezier
            style={{
                borderRadius: 16
            }}
        />
    )
}

export default BezierLineChart