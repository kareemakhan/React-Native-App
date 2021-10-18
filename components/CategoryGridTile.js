import React from 'react';
import { TouchableOpacity, View, StyleSheet, Platform, TouchableNativeFeedback, Text } from 'react-native';
import Colors from '../constants/Colors';

function CategoryGridTile(props) {
    let Component = TouchableOpacity
    if (Platform.OS === 'android' && Platform.Version >= 21)
        Component = TouchableNativeFeedback
    return (
        <View style={styles.gridItem}>
            <Component onPress={props.onSelect}>
                <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                    <Text style={styles.categoryText}>{props.title}</Text>
                </View>
            </Component>
        </View>
    );
}
const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        overflow: 'hidden',
        elevation: 10,
        borderRadius: 15
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    categoryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        textAlign: 'center',
        color: Colors.secondary
    }
})

export default CategoryGridTile;