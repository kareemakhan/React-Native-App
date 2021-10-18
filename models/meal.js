class Meal {
    constructor(
        id,
        categoryId, 
        title,
        affordablility,
        complexity,
        imageUrl,
        duration,
        ingredients,
        steps,
        isGlutenFree,
        isVegan,
        isVegetarian, 
        isLactoseFree
    ) {
        this.id = id;
        this.categoryId = categoryId; 
        this.title = title;
        this.affordablility = affordablility;
        this.complexity = complexity;
        this.imageUrl = imageUrl;
        this.duration = duration;
        this.ingredients = ingredients;
        this.steps = steps;
        this.isGlutenFree = isGlutenFree;
        this.isVegan = isVegan;
        this.isVegetarian = isVegetarian;
        this.isLactoseFree = isLactoseFree;
    }
}

export default Meal