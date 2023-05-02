import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../App';
import { selectValues } from '../store/sensor/sensor.selector';
import { selectCurrentUser } from '../store/user/user.selector';
type Props = NativeStackScreenProps<RootStackParamList, 'Overblik'>;

const OverblikScreen = ({ navigation }: Props) => {
  //mængden af co2 og voc bliver hentet fra values reduceren
  const { co, voc } = useSelector(selectValues);

  const [cobackgroundColor, setcoBackgroundColor] = useState('#e2dedf');
  const [vocbackgroundColor, setvocBackgroundColor] = useState('#e2dedf');
  const [vocdescription, setvocDescription] = useState('Venter på sensorer');
  const [codescription, setcoDescription] = useState('Venter på sensorer');
  
  //vores avanceret algoritme beregner en indeks ud fra mængden af co2 og voc
  const coIndex = co < 1400 ? Math.round((1500 - co) / 100 - 1) : 1;
  const vocIndex = voc < 2200 ? Math.round((2200 - voc) / 200 - 1) : 1;

  
  //ændrer farven baseret på den korrosponderende indeks
  useEffect(() => {
    if (coIndex == 0) {
      setcoBackgroundColor('#e2dedf');
      setcoDescription('Venter på sensorer');
    } else if (coIndex <= 2.5) {
      setcoBackgroundColor('#e68d2e');
      setcoDescription('Udluftning stærkt anbefalet D:');

    } else if (coIndex <= 5) {
      setcoBackgroundColor('#e6af2e');
      setcoDescription('Udluftning anbefalet :P');
    } else if (coIndex <= 7.5) {
      setcoBackgroundColor('#A4D021');
      setcoDescription('Luftkvaliteten er tilstrækkelig :)');
    } else {
      setcoBackgroundColor('#5bc3eb');
      setcoDescription('Luftkvaliteten er god! :D');
    }

  }, [coIndex])

  useEffect(() => {
    if (vocIndex == 0) {
      setvocBackgroundColor('#e2dedf');
      setvocDescription('Venter på sensorer');
    } else if (vocIndex <= 2.5) {
      setvocBackgroundColor('#e68d2e');
      setvocDescription('Udluftning stærkt anbefalet D:');

    } else if (vocIndex <= 5) {
      setvocBackgroundColor('#e6af2e');
      setvocDescription('Udluftning anbefalet :P');
    } else if (vocIndex <= 7.5) {
      setvocBackgroundColor('#A4D021');
      setvocDescription('Luftkvaliteten er tilstrækkelig :)');
    } else {
      setvocBackgroundColor('#5bc3eb');
      setvocDescription('Luftkvaliteten er god! :D');
    }

  }, [vocIndex])
  return (

    <View style={styles.container} >
      <View style={styles.appContainer} >
      <Text style={styles.title} >Overblik</Text>
      {co>-1 &&
      <View style={{ ...styles.tab, backgroundColor: cobackgroundColor }}>
        <Text style={styles.tabText} >{co ? 'CO2' : 'Loading...'}</Text>
        <Text style={styles.valueText} >{`${co} ppm`}</Text>

         <Text style={styles.tabNumber} >
          {`${coIndex > 10 ? 10 : coIndex} `}
          <Text style={styles.udAfText} >
            ud af
          </Text>
          {'10'}
        </Text>
        <Text style={styles.description} >{codescription}</Text>
      </View>
  }

      {voc>-1 &&
      <View style={{ ...styles.tab, backgroundColor: vocbackgroundColor }}>
        <Text style={styles.tabText} >{voc>-1 ? 'VOC' : 'Loading...'}</Text>
        
        <Text style={styles.valueText} >{`${String(voc)} ppm`}</Text>

         <Text style={styles.tabNumber} >
          {`${String(vocIndex>10? 10 : vocIndex)} `}
          <Text style={styles.udAfText} >
            ud af
          </Text>
          {'10'}
        </Text>
        <Text style={styles.description} >{vocdescription}</Text>
      </View>
}
    {/* Link til tips screenen */}
      <TouchableOpacity onPress={()=>navigation.navigate('Tips')} style={styles.tipsTab} >
        <Text style={styles.tipsText} >Svært ved at reducere mængden af VOC gasser?
          Klik her for gode råd.</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:'100%',
    height:'100%',
    backgroundColor: '#f9f4f5',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#f9f4f5',
    marginTop: 100,
    alignItems: 'center',
    marginHorizontal:'10%',
    justifyContent: 'flex-start',
  },
  
  description: {
    fontSize: 15,
    position: 'absolute',
    bottom: 15,
    left: 20,
    fontFamily: 'ChivoMono-Regular',
  },
  
  valueText: {
    fontSize: 15,
    position: 'absolute',
    top: 20,
    right: 20,
    fontFamily: 'ChivoMono-Regular',
  },
  tab: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    aspectRatio: '1 / 0.5',
    marginVertical: '3%',
    borderRadius: 15,
    backgroundColor: '#5bc3eb',
  },
  tipsTab: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height:60,
    marginVertical: '3%',
    borderRadius: 15,
    
    backgroundColor: '#053c5e',
  },
  tipsText: {
    fontWeight:'bold',
    fontSize: 15,
    marginHorizontal:15,
    marginVertical:10,
    color:'white',

  },
  tabText: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 35,
    letterSpacing: 1,
    fontFamily: 'ConcertOne-Regular',
    color: '#f9f4f5',
  },
  tabNumber: {
    marginLeft: 20,
    fontSize: 50,
    letterSpacing: 1,
    fontFamily: 'Righteous-Regular',
    color: '#f9f4f5',
  },
  udAfText: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 25,
    letterSpacing: 0.25,
    fontFamily: 'Righteous-Regular',
    color: '#f9f4f5',
  },
  title: {
    fontFamily: 'Lobster-Regular',
    fontSize: 50,
    color: '#0e4d75',
    marginBottom: 20,
  }
});

export default OverblikScreen