import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import Button from '../../components/Button';

import { styles } from './styles';
import { commonUserStyles } from '../../styles/commonUserStyles.js';
import SalesCard from '../../components/SalesCard';
import Input from '../../components/Input';
import PeriodSelector from '../../components/PeriodSelector';
import StatusFilter from '../../components/StatusFilter';

import { Plus, DollarSign, ShoppingCart, TrendingUp} from 'lucide-react-native';
import { globalStyle } from '../../styles/globalStyle.js';
import SalesInfo from '../../components/SalesInfo/index.jsx';

const Sales = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const [search, setSearch] = useState("")

  const handleSale = () => {
    console.log("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
  }

  return (
    <SafeAreaView style={commonUserStyles.safeArea}>
      <Header 
        onMenuPress={() => setIsSidebarOpen(true)}
        title="Vendas"
      />

      <ScrollView style={commonUserStyles.screenBlock}>
        <Text style={commonUserStyles.screenTitle}>
          Vendas
        </Text>
            
        <Text style={commonUserStyles.screenDescription}>
          Gerencie todas as suas vendas e transações
        </Text>

        <Button 
          title={
            <View style={commonUserStyles.alignButtonText}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={commonUserStyles.saveText}>Nova Venda</Text>
            </View>          
          }
          onPress={handleSale}
        />


        <View style={styles.salesContainer}>
          <SalesCard 
            title="Vendas Hoje"
            amount="R$ 1.247,50"
            valuePlus="+12.5% vs ontem"
            icon={<DollarSign color={globalStyle.primary}/>}
            iconBgColor={globalStyle.primaryTransparent}
          />

          <SalesCard 
            title="Total de Vendas"
            amount="156"
            valuePlus="+8 esta semana"
            icon={<ShoppingCart color={globalStyle.primary}/>}
            iconBgColor={globalStyle.primaryTransparent}
          />

          <SalesCard 
            title="Ticket Médio"
            amount="R$ 89,50"
            valuePlus="+5.2% este mês"
            icon={<TrendingUp color={globalStyle.primary}/>}
            iconBgColor={globalStyle.primaryTransparent}
          />
        </View>

        <View style={styles.filterContainer}>
          <Input 
            placeholder="Buscar Vendas por cliente, ID..." 
            styleInput={styles.inputVariant}
            onChangeText={setSearch}
            value={search}
          />

          <View style={styles.filters}>
            <PeriodSelector
              periods={["Hoje", "Esta Semana", "Este Mês", "Este Ano"]}
              defaultPeriod="Este Mês"
              containerStyle={{width: "49%"}}
            />

            <StatusFilter
              onFilterChange={(selectedFilters) => {
                console.log('Filtros selecionados:', selectedFilters);
              }}
              containerStyle={{width: "49%"}}
            />
          </View>
        </View>

        <SalesInfo/>
        
      </ScrollView>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navigation={navigation}
        currentRoute={route.name}
      />
    </SafeAreaView>
  );
};

export default Sales;