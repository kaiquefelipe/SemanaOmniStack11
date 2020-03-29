import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Image, Text, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import logoImg from '../../assets/logo.png'
import { Feather } from '@expo/vector-icons'
import styles from './styles'

export default function Incidents(){
    const navigation = useNavigation()
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigationToDetail( item ){
        navigation.navigate('Detail', { item })
    }

    async function loadIncidents(){
        try {

            if (loading) return;
            if (total > 0 && data.length === total) return

            setLoading(true)
            
            const response = await api.get('incidents', {
                params: { page }
            })

            setData([ ... data, ... response.data ]);
            setTotal(response.headers['x-total-count'])
            setPage(page + 1)
            setLoading(false)
        } catch (error) {
            setData([]);
            setPage(1)
            setLoading(true)
            alert('Erro ao carregar os casos.')
        }
    }

    //UMA FUNÇÃO QUE RECEBE A FUNÇÃO QUE VAI SER EXECUTADA, E QUAL A AÇÃO QUE VAI FAZER O PRIMEIRO PARÂMETRO SER EXECUTADO    
    useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                style={styles.incidentList}
                data={data}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{item.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{item.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}</Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigationToDetail(item)} >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}