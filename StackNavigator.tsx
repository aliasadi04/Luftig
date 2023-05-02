import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from './App';
import HomeScreen from './screens/homeScreen';
import LeaderboardScreen from './screens/leaderboardScreen';
import LoginScreen from './screens/loginScreen';
import OverblikScreen from './screens/overblikScreen';
import TipsScreen from './screens/TipsScreen';
import { setValues } from './store/sensor/sensor.action';
import { setCurrentUser } from './store/user/user.action';
import { selectCurrentUser } from './store/user/user.selector';
import { getUserByUid, onAuthStateChangedListener, sensorValuesListener } from './utils/firebase.utils';



const Stack = createNativeStackNavigator<RootStackParamList>();



const StackNavigator = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const setCurrentUserFromFirebase = async (uid: string) => {
        getUserByUid(uid).then(({ displayName, email, co, uid, voc }) => {
            // console.log(displayName, email, co, uid, voc);
            dispatch(setCurrentUser({ displayName, email, co, uid, voc }))
            console.log({ displayName, email, co, uid, voc });

        })
    }

    useEffect(() => {
        const unsubscribeFromUsersListener = onAuthStateChangedListener((user: any) => {
            if (user) {
                setCurrentUserFromFirebase(user.uid);
            }
        });
        return unsubscribeFromUsersListener;
    }, [])

    useEffect(() => {
        const unsubscribeFromValuesListener = sensorValuesListener((values: any) => {
            const readableValues = values.docs[0].data();
            dispatch(setValues(readableValues));

        })
        return unsubscribeFromValuesListener;
    }, [])






    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* her bliver headerstylen ændret for alle screens. Ved at have det i en stack.group i stedet for at skrive det ved hver enkel screen */}
                <Stack.Group screenOptions={{
                    title: '',
                    headerTintColor: '#053c5e',
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    headerTransparent: true,
                    headerStyle: {
                        backgroundColor: '#f9f4f5',
                    }
                }}>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        //vi fjerne headeren fra sider hvor vi ikke gider have
                        options={{ headerShown: false }} />
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name='Overblik'
                        component={OverblikScreen} />

                    <Stack.Screen
                        name="Leaderboard"
                        component={LeaderboardScreen} />

                    <Stack.Screen
                        name="Tips"
                        component={TipsScreen} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator