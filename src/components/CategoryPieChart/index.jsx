import { View, Dimensions } from "react-native"
import { PieChart } from "react-native-chart-kit"
import { globalStyle } from "../../styles/globalStyle";

const CategoryPieChart = ({period = 'Últimos 6 meses'}) => {
    const screenWidth = Dimensions.get("window").width;
    
    const getChartData = (selectedPeriod) => {
        switch (selectedPeriod) {
        case 'Últimos 7 dias':
            return [
                {name: "Acessórios", population: 20, color: globalStyle.primary + 60, legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Calçados", population: 20, color: globalStyle.primary + 80, legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Eletrônicos", population: 25, color: globalStyle.primary + 20, legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Roupas", population: 35, color: globalStyle.primary, legendFontColor: "#7F7F7F", legendFontSize: 14},
            ];
        
        case 'Últimos 30 dias':
            return [
                {name: "Acessórios", population: 30, color: globalStyle.primary + 60, legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Calçados", population: 50, color: globalStyle.primary + 80, legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Eletrônicos", population: 250, color: globalStyle.primary + 20, legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Roupas", population: 100, color: globalStyle.primary, legendFontColor: "#7F7F7F", legendFontSize: 14},
            ];
        
        case 'Últimos 6 meses':
            return [
                {name: "Acessórios", population: 2000, color: globalStyle.primary + 60, legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Calçados", population: 2055, color: globalStyle.primary + 80, legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Eletrônicos", population: 5000, color: globalStyle.primary + 20, legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Roupas", population: 9000, color: globalStyle.primary, legendFontColor: "#7F7F7F", legendFontSize: 14},
            ];
        
        case 'Último 1 ano':
            return [
                {name: "Acessórios", population: 5000, color: globalStyle.primary + 60, legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Calçados", population: 1000, color: "#EC4899", legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Eletrônicos", population: 5000, color: globalStyle.primary + 20, legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Roupas", population: 12000, color: globalStyle.primary, legendFontColor: "#7F7F7F", legendFontSize: 14},
            ];
        
        default:
            return [
                {name: "Acessórios", population: 2000, color: "#8B5CF6", legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Calçados", population: 2055, color: "#EC4899", legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Eletrônicos", population: 5000, color: "#F59E0B", legendFontColor: "#7F7F7F", legendFontSize: 14},
                {name: "Roupas", population: 9000, color: globalStyle.primary, legendFontColor: "#7F7F7F", legendFontSize: 14},
            ];
        }
    };

    const chartData = getChartData(period);

    const chartConfig = {
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        }
    };

    return (
        <View style={{ alignItems: 'center', marginVertical: 16 }}>
            <PieChart
                data={chartData}
                width={screenWidth - 32}
                height={220}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft="5"
                center={[10, 0]}
            />
        </View>
    )
}

export default CategoryPieChart