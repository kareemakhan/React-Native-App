import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback, Text, ImageBackground } from 'react-native';
import Colors from '../constants/Colors';
import BodyText from './BodyText'

function MealItem(props) {
    return (
        <View style={styles.mealItem}>
            <TouchableNativeFeedback onPress={props.onSelectedMeal}>
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader}}>
                        <ImageBackground source={{uri: props.image}} style={styles.bgImage} >
                            <Text style={styles.titleText}>{props.title}</Text>
                        </ImageBackground>
                    </View>
                    <View style={{...styles.mealRow, ...styles.mealDetail}}>
                        <Text style={styles.itemText}>{props.duration} minutes</Text>
                        <BodyText>{props.complexity}</BodyText>
                        <BodyText>{props.affordablility}</BodyText>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}
const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: Colors.primary,
        marginVertical: 10
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    titleText: {
        fontFamily: 'open-sans',
        fontSize: 22,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 12,
        paddingVertical: 5,
        textAlign: 'center'
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '85%'
    },
    mealDetail: {
        paddingHorizontal: 10,
        height: '15%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemText: {
        color: 'white',
        fontSize: 16
    }
})
export default MealItem;