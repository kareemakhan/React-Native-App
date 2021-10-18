import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from '../screens/FiltersScreen';
import Colors from "../constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Platform, Text } from "react-native";

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.secondary
    },
    headerTitleStyle: {
        fontFamily: 'cinzel-bold'
    },
    headerTintColor: 'white',
    headerTitle: 'A Screen'
}
const MealsNavigator =  createStackNavigator({
    //alternate way incase we want to add more options
        Categories: {
            screen: CategoriesScreen,
            navigationOptions: {
                headerTitle: 'Meal Categories'
            }
        },
        CategoryMeals: CategoryMealsScreen,
        MealDetail: MealDetailScreen
    }, {
        defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
})
const tabScreenConfig = {
    Meals: {screen: MealsNavigator, navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return <Ionicons name='restaurant' size={25} color={tabInfo.tintColor} />
        },
        tabBarColor: Colors.secondary,
        tabBarLabel: <Text style={{fontFamily: 'cinzel-bold', fontSize: 14}}>Meals</Text>
    }},
    Favorites: {screen: FavNavigator, navigationOptions: {
        tabBarLabel: 'Favorite Meals',
        tabBarIcon: (tabInfo) => {
            return <Ionicons name='star' size={25} color={tabInfo.tintColor} />
        },
        tabBarColor: Colors.primary,
        tabBarLabel: <Text style={{fontFamily: 'cinzel-bold', fontSize: 14}}>Favorites</Text>
    }}
}

const MealsFavTabNavigator = Platform.OS === 'android' ?
    createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true
    }) :
    createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            activeTintColor: 'white',
            /*style: {
                backgroundColor: Colors.secondaryLight
            }*/
        }
});
const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    /*navigationOptions: {
        drawerLabel: 'Filters!!'
    },*/
    defaultNavigationOptions: defaultStackNavOptions
})

const MainNavigator = createDrawerNavigator({
    MealsFav: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: FiltersNavigator
}, {
    //drawerBackgroundColor: Colors.primaryLightest,
    contentOptions: {
        activeTintColor: 'white',
        activeBackgroundColor: Colors.secondaryExtra,
        itemsContainerStyle: {
            marginVertical: 20
        },
        labelStyle: {
            fontFamily: 'open-sans-bold',
            fontSize: 18
        }
    }
})

export default createAppContainer(MainNavigator);