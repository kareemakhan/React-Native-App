import React from 'react';
import { useSelector } from 'react-redux';
import { CATEGORIES } from '../data/dummyData';
import MealsList from '../components/MealsList'
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const CategoryMealsScreen = (props) => {

    const catId = props.navigation.getParam('categoryId');
    
    const availableMeals = useSelector(state => state.filteredMeals);

    const displayedMeals = availableMeals.filter(
        meal => meal.categoryId.indexOf(catId) >= 0
    );
    if(displayedMeals.length === 0) {
        return <View style={styles.screen}>
            <Text style={styles.textStyle}>No meals found.</Text>
            <Text style={styles.textStyle}>Maybe check your filters!</Text>
        </View>
    }
    return (
        <MealsList
            listData={displayedMeals}
            navigation={props.navigation}
        />
    );
};

CategoryMealsScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    return{
        headerTitle: selectedCategory.title
    }
}
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

export default CategoryMealsScreen;