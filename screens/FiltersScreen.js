import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/mealsAction';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text style={styles.textStyle}>{props.label}</Text>
            <Switch
                value={props.state}
                onValueChange={props.onChange}
                trackColor={{ true: Colors.primaryLightest, false: '#767577' }}
                thumbColor={Colors.secondaryExtra}
            />
        </View>
    )
}
const FiltersScreen = (props) => {
    //destructuring props object and pulling out navigation prop value and storing in navigation constant.
    const { navigation } = props;
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    //using callback to make sure that saveFilters only update when our state changes/ avoiding unnecessary rebuilds of this func
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            vegan: isVegan,
            lactoseFree: isLactoseFree,
            vegetarian: isVegetarian
        };
        dispatch(setFilters(appliedFilters));
    },[isGlutenFree, isVegan, isLactoseFree, isVegetarian, dispatch]);

    //will only run if there is changes in navigation prop and not other props
    useEffect(() => {
        navigation.setParams({save: saveFilters});
    }, [saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters</Text>
            <FilterSwitch
                label='Gluten-Free'
                state={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch
                label='Vegan'
                state={isVegan}
                onChange={newValue => setIsVegan(newValue)}
            />
            <FilterSwitch
                label='Vegetarian'
                state={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)}
            />
            <FilterSwitch
                label='Lactose-Free'
                state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)}
            />
        </View>
    );
};
FiltersScreen.navigationOptions = navOption => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName='menu'
                    onPress={() => { navOption.navigation.toggleDrawer() }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Save'
                    iconName='save'
                    onPress={navOption.navigation.getParam('save')}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    },
    textStyle: {
        fontFamily: 'cinzel-regular',
        fontSize: 18,
        color: Colors.secondaryExtra
    }
})

export default FiltersScreen;