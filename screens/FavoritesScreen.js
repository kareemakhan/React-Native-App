import React from 'react';
import MealsList from '../components/MealsList';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const FavoritesScreen = (props) => {
    const favMeals = useSelector(state => state.favoriteMeals);
    
    if(favMeals.length === 0 || !favMeals) {
        return <View style={styles.screen}>
            <Text style={styles.textStyle}>No Favorite meals added.</Text>
            <Text style={styles.textStyle}>Start Adding some!</Text>
        </View>
    }
    return <MealsList listData={favMeals} navigation={props.navigation} />
};

FavoritesScreen.navigationOptions = navOption => {
    return {
        headerTitle: 'Your Favorites!',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu' 
                    iconName='menu' 
                    onPress={() => {navOption.navigation.toggleDrawer()}} 
                />
            </HeaderButtons>
        )
    }
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'cinzel-bold',
        fontSize: 20,
        color: Colors.secondaryExtra
    }
})
export default FavoritesScreen;