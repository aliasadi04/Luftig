import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { RootStackParamList } from '../App';
import Tab from '../components/tab';
import { setAllUsers } from '../store/user/user.action';
import { getUsers, signOutUser } from '../utils/firebase.utils';



type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;




export default function HomeScreen({ navigation }: Props) {
    const [leaving, setLeaving] = useState(false);
    const dispatch = useDispatch();


    const logOuthandler = () => {
        signOutUser();
        setLeaving(true);
        navigation.navigate('Login');
    }
    //putter hentede brugerinformationer i userreduceren
    const getUsersFromFirebase = async () => {
        getUsers().then((users) => {
            dispatch(setAllUsers(users));
        })
    }

    //henter alle bruger informationer fra firebase
    useEffect(() => {
        getUsersFromFirebase();
    }, [])


    //dette stykke kode sikrer at brugeren ikke kan gå tilbage til login screen ved at trykke på enhedens indbygget tilbage funktion 
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLeaving(false);
        })
    }, [])
    useEffect(() => navigation.addListener('beforeRemove', (e) => {
        if (!leaving) e.preventDefault();
    }), [navigation, leaving])


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Luftig</Text>
            <View style={styles.tabContainer} >

                {/* hver screen har et navn, en henvisning til hvor filen til den screen er og at man så skal navigere over til nævnte screen */}
                <Tab text='Overblik'
                    icon={require('../assets/graph.png')}
                    onPress={() => navigation.navigate('Overblik')} />

                <Tab text='Leaderboard' onPress={() => navigation.navigate('Leaderboard')}
                    icon={require('../assets/podium.png')} />

                <Tab text='Medaljer' onPress={() => console.log('medalje side ikke udviklet')}
                    icon={require('../assets/medal.png')} />

                <Tab text={leaving ? 'Sikker?' : 'Log ud'} onPress={() => logOuthandler()}
                    icon={require('../assets/logout.png')} />

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f4f5',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '30%',
    },
    tabContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    title: {
        fontFamily: 'Lobster-Regular',
        fontSize: 50,
        color: '#053c5e',
        marginBottom: 20,
    }
});
