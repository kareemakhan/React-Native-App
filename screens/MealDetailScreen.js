import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import BodyText from '../components/BodyText';
import Colors from '../constants/Colors';
import { toggleFavorite } from '../store/actions/mealsAction';

const ListItem = props => {
    return <View style={styles.listItem}>
        <Text style={styles.textStyle}>{props.children}</Text>
    </View>
}
const MealDetailScreen = (props) => {
    const mealDetailId = props.navigation.getParam('mealId');
    const availableMeals = useSelector(state => state.meals);
    const currentFavMeal = useSelector(state =>
        state.favoriteMeals.some(meal => meal.id === mealDetailId)
    )
    const SelectedMeal = availableMeals.find(meal => meal.id === mealDetailId);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealDetailId));
    }, [dispatch, mealDetailId]);

    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavoriteHandler})
    }, [toggleFavoriteHandler]);
    
    useEffect(() => {
        props.navigation.setParams({isFav: currentFavMeal});
    }, [currentFavMeal]);

    return (
        <ScrollView>
            <Image source={{uri: SelectedMeal.imageUrl}} style={styles.image} />
            <View style={styles.details}>
                <Text>{SelectedMeal.duration} minutes</Text>
                <BodyText style={{color: Colors.secondary}}>{SelectedMeal.complexity}</BodyText>
                <BodyText style={{color: Colors.secondary}}>{SelectedMeal.affordablility}</BodyText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {
                SelectedMeal.ingredients.map((ingredient, index) => (
                    <View style={styles.ingredientsList} key={index}>
                        <Text style={{padding: 4}}>{'\u2022' + "   "}</Text>
                        <Text key={ingredient} style={styles.textStyle}>{ingredient}</Text>
                    </View>
                ))
            }
            <Text style={styles.title}>Steps</Text>
            {
                SelectedMeal.steps.map(step => (
                    <ListItem key={step} style={styles.textStyle}>{step}</ListItem>
                ))
            }
        </ScrollView>
    );
};
MealDetailScreen.navigationOptions = navigationData => {
    const SelectedMealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');
    return {
        headerTitle: SelectedMealTitle,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Favorite'
                    iconName={isFavorite ? 'star' : 'star-outline'}
                    onPress={toggleFavorite}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: 200,
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: 'center',
        color: Colors.primaryLight
    },
    ingredientsList: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    listItem: {
        margin: 8,
        borderColor: Colors.primaryExtra,
        borderWidth: 1,
        padding: 10
    },
    textStyle: {
        fontFamily: 'open-sans',
        fontSize: 18,
        color: Colors.secondary,
        paddingBottom: 4
    }
})

export default MealDetailScreen;