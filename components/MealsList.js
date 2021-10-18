import React from 'react';
import { View ,FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import MealItem from './MealItem';

const MealsList = (props) => {
    const favMeals = useSelector(state => state.favoriteMeals)
    const renderMealItem = itemData => {
        const isFavorite = favMeals.some(meal => meal.id === itemData.item.id);
        return (
            <MealItem 
                title={itemData.item.title} 
                image={itemData.item.imageUrl}
                duration={itemData.item.duration}
                affordablility={itemData.item.affordablility}
                complexity={itemData.item.complexity}
                onSelectedMeal={() => {
                    props.navigation.navigate(
                        'MealDetail',
                        {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFavorite
                        }
                    )
                }}
            />
        )
    }
    return (
        <View style={styles.list}>
            <FlatList
                data={props.listData}
                renderItem={renderMealItem}
                style={{ width: '100%' }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MealsList;