import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectValues } from '../store/sensor/sensor.selector';
import { selectAllUsers, selectCurrentUser } from '../store/user/user.selector';



const LeaderboardScreen = () => {
  //sensor værdierne bliver hentet fra redux basen
  const { co: reducerCo, voc: reducerVoc } = useSelector(selectValues);

  //brugerinformationerne for alle brugere bliver hentet fra redux basen
  const allUsers = useSelector(selectAllUsers);

  //dataen om den nuværende user bliver taget fra redux databasen
  const currentUser = useSelector(selectCurrentUser);


  //sætter admin kontoens co og voc værdier til værdierne fra databasen
  const moddedUsers = allUsers.map((user: any) => user.uid == 'yRwL4xsXWxfanDT4Zdt9ZxaSl3o2' ? { ...user, co: reducerCo, voc: reducerVoc } : user)

  //sorterer brugerne med deres co værdi.
  const sortedUsers = moddedUsers.sort((a: any, b: any) => b.co - a.co);
  

  return (
    <View style={styles.container} >
      <View style={styles.appContainer} >
        <Text style={styles.title} >Leaderboard</Text>


      {/* denne række viser hvordan informationen displayes i leaderboardet */}
        <View style={styles.displayTab} >
          <Text style={styles.displayRowText} >Username</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.displayRowText} >co-</Text>
            <Text style={styles.displayRowText} >voc</Text>
          </View>
        </View>

        {/* brugerlisten bliver kørt igennem, hvor hver user så få en plads på leaderboarden */}
        <ScrollView showsVerticalScrollIndicator={false} horizontal={false}  >
          {sortedUsers.map(({ displayName, co, voc, uid }: any) =>
            <View style={uid == currentUser.uid ? { ...styles.displayTab, backgroundColor: '#053c5e' } : styles.displayTab} key={uid} >
              <Text style={styles.rowText} >{displayName}</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.rowText} >{co}</Text>
                <Text style={styles.rowText} >-</Text>
                <Text style={styles.rowText} >{voc}</Text>
              </View>
            </View>
          )}

        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f4f5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '30%',
  },
  title: {
    fontFamily: 'Lobster-Regular',
    fontSize: 50,
    color: '#053c5e',
    marginBottom: 20,
  },

  appContainer: {
    flex: 1,
    backgroundColor: '#f9f4f5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 50,
  },
  displayTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    width: 280,
    height: 50,
    marginVertical: '3%',
    borderRadius: 12,
    backgroundColor: '#5bc3eb',
  },

  rowText: {
    fontSize: 15,
    color: '#f9f4f5',
    fontFamily: 'ChivoMono-Regular',
  },
  displayRowText: {
    fontSize: 15,
    color: '#042e48',
    fontFamily: 'ChivoMono-Regular',
  },
  scoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 10,
    width: 40,
    justifyContent: 'space-between',

  },
});
export default LeaderboardScreen