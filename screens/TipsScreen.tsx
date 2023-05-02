import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const TipsScreen = () => {
    return (

        //Liste over gode råd til at reducere mængden af VOC gasser
        <View style={styles.container} >
            <View style={styles.appContainer} >
                <Text style={styles.title} >Gode råd</Text>
                <Text style={styles.subTitle} >Svært ved at reducere mængden af VOC gasser?</Text>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Text style={styles.breadText} >
                        Opbevar kemikalier i en garage eller et skur. Åbne kemikalier kan lække VOC til luften.
                    </Text>
                    <View style={styles.separator} ></View>
                    <Text style={styles.breadText} >

                        Bortskaf kemikalier der ikke skal bruges længere.
                    </Text>
                    <View style={styles.separator} ></View>
                    <Text style={styles.breadText} >

                        Køb maling med et lavt VOC indhold.
                    </Text>
                    <View style={styles.separator} ></View>
                    <Text style={styles.breadText} >

                        Køb færre produkter fremstillet af komposittræ, da de indeholder flere VOC gasser end andre træprodukter.
                    </Text>
                    <View style={styles.separator} ></View>
                    <Text style={styles.breadText} >

                        Øg mængden af ​​frisk luft i dit hjem ved hjælp af åbne døre og vinduer. Brug eventuelt blæsere til at maksimere den mængden af frisk luft.
                    </Text>
                    <View style={styles.separator} ></View>
                    <Text style={styles.breadText} >Hold både temperaturen og luftfugtigheden så lav som muligt. Kemikalier afgasser mere ved høje temperaturer og luftfugtighed.
                    </Text>

                </ScrollView >

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#f9f4f5',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    appContainer: {
        flex: 1,
        backgroundColor: '#f9f4f5',
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 30,
    },
    breadText: {
        fontFamily: 'ChivoMono-Regular',
    },
    title: {
        fontFamily: 'Lobster-Regular',
        fontSize: 50,
        color: '#0e4d75',
        marginBottom: 20,
    },
    subTitle: {
        fontFamily: 'Righteous-Regular',
        fontSize: 20,
        color: '#0e4d75',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
        backgroundColor: 'black',
    },
});

export default TipsScreen