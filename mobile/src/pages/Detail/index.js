import React from 'react'
import { SafeAreaView, View, Image, Text, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import logoImg from '../../assets/logo.png'
import { Feather } from '@expo/vector-icons'
import styles from './styles'

export default function Detail(){
    const navigation = useNavigation()
    const route = useRoute()

    const detail = route.params.item
    const messagem = `Olá ${detail.name}, estou entrando em contato pois gostaria de ajudar no caso "${detail.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(detail.value)}`;

    function navigationToHome(){
        navigation.goBack()
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Herói do Caso: ${detail.title}`,
            recipients: [`${detail.email}`],
            body: messagem,
        });
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${detail.whatsapp}&text=${messagem}`)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity style={styles.backButton} onPress={navigationToHome} >
                    <Feather name="arrow-left" size={28} color="#E02041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{detail.name} de {detail.city}/{detail.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{detail.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(detail.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o Dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato: </Text>
                
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp} >
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}