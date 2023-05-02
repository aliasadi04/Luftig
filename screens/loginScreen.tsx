import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { z } from 'zod';
import { RootStackParamList } from '../App';
import { selectCurrentUser } from '../store/user/user.selector';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../utils/firebase.utils';

//dette objekt beskriver valdationen som input felterne gennemgår. Der er skrevet error beskeder. string beskriver typee variabel, evt. efterfulgt af email. min og max sætter grænse på hvor lang inputtet må være. Superrefine funktionen tjekker om 'repeat password' passer præcist med 'password'
const UserSignup = z.object({
  displayName: z.string().min(3, 'Display name must be atleast 3 characters long!').max(15, 'Display name cant be longer than 15 characters'),
  email: z.string().email('Please enter a valid email!').min(0, 'Please enter an email!'),
  password: z.string().min(8, 'Password must be atleast 8 characters long!'),
  repeatedPassword: z.string().min(8, 'Password must be atleast 8 characters long!'),
}).superRefine(({ repeatedPassword, password }, ctx) => {
  if (repeatedPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match!"
    });;
  }
});

//dette object bruges nå brugeren skal logge ind i stedet for den forrige objekt
const UserLogin = z.object({
  email: z.string().email('Please enter a valid email!').min(0, 'Please enter an email!'),
  password: z.string().min(8, 'Password must be atleast 8 characters long!'),

});


export type UserType = z.infer<typeof UserSignup>;


const INITIAL_USER_STATE = {
  displayName: '',
  email: '',
  password: '',
  repeatedPassword: ''
}


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;



const LoginScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const [screenState, setScreenState] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(INITIAL_USER_STATE);
  const [errorMessage, setErrorMessage] = useState(''); 

  //denne funktion behandler ændringen i alle inputfelte og opdaterer userInfo variablen
  const setUserState = (text: string, name: string) => {
    setUserInfo({ ...userInfo, [name]: text });
    setErrorMessage('');
  }

  //bruger userInfo til at logge brugeren ind i firebase authentication
  const LogUserIn = async () => {
    setLoading(true);
    signInAuthUserWithEmailAndPassword(userInfo.email, userInfo.password).then(() => navigation.navigate('Home'))
      .catch((error) => { if (error.code)setErrorMessage(error.code.replace('auth','').replace('-',' ').replace('/','')); setLoading(false); });
  }

   //bruger userInfo til at lave en brugerkonto og derefter logge brugeren ind i firebase authentication
  const SignUserUp = async () => {
    setLoading(true);
    createAuthUserWithEmailAndPassword(userInfo.email, userInfo.password).then(({ user }: any) => {
      createUserDocumentFromAuth(user, {
        co: 0,
        voc: 0,
        displayName: userInfo.displayName,
      }).then((user) => navigation.navigate('Home')).catch((error) => { setErrorMessage(error.message); setLoading(false); })


    }).
      catch((error) => { setErrorMessage(error.message); setLoading(false); })
  }

  //ændrer screenState mellem signUp og Login, så slipper vi for at lave to screens og evt. skulle gentage kode
  const buttonPressed = () => {
    if (screenState) {
      const authCheck = UserLogin.safeParse(userInfo);
      if (authCheck.success) {
        setErrorMessage('');
        LogUserIn();
      } else setErrorMessage(authCheck.error.issues[0].message);

    } else {
      const authCheck = UserSignup.safeParse(userInfo);
      if (authCheck.success) {
        setErrorMessage('');
        SignUserUp();
      } else setErrorMessage(authCheck.error.issues[0].message);
    }
  }

  //sætter loading variablen til false nå man går ud af denne skærm. Ellers ville der står 'loading' nå man logger ud og kommer tilbage til login screenen.
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(false);
    })
  }, [])

  return (

    <View style={styles.container}>
      
      <Text style={styles.errorMessage}>{errorMessage}</Text>

      {/* Displayname feltet hvises kun hvis screenstate er sat til signup, der man kun skal bruge email og adgangskode til at logge ind */}
      {!screenState &&
        <TextInput
          style={styles.TextInput}
          placeholder="Display name"
          placeholderTextColor="#003f5c"
          onChangeText={(displayName) => setUserState(displayName, 'displayName')}
        />}


      <TextInput
        style={styles.TextInput}
        placeholder="Email"
        placeholderTextColor="#003f5c"
        onChangeText={(email) => setUserState(email, 'email')}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="Password"
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(password) => setUserState(password, 'password')}
      />

      {/* Repeatpassword feltet hvises kun hvis screenstate er sat til signup, der man kun skal bruge email og adgangskode til at logge ind */}

      {!screenState &&
        <TextInput
          style={styles.TextInput}
          placeholder="Repeat password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(repeatPassword) => setUserState(repeatPassword, 'repeatedPassword')}
        />
      }
      {/* Denne knap ændrer udseende efter om brugeren skal logge ind eller lave en konto (sign up). Teksten og farven samt teksten til at ændre fra login til signup state  */}
      <TouchableOpacity onPress={() => setScreenState(!screenState)} >
        <Text style={styles.changeScreenState}>{screenState ? ("Don't have an account?") : ("Already have an account?")}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ ...styles.loginBtn, backgroundColor: loading ? "#366f93" : "#053c5e" }} disabled={loading} onPress={() => buttonPressed()} >
        <Text style={styles.buttonText} >{!loading ? screenState ? "Login" : "Signup" : "Loading..."}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f4f5",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
  },

  TextInput: {
    height: 50,
    backgroundColor: 'white',
    width: '60%',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  changeScreenState: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "40%",
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#053c5e",
  },
  errorMessage: {
    color: "#ff0033",
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'ChivoMono-Regular',
    color: "#f9f4f5",
    fontSize: 17,
  },
});


export default LoginScreen