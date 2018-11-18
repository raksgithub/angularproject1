export class Recipe {
    constructor(public id: number, public name: string, public desc: string, public imageURL: string) {}
}

export const Recipes = [
    new Recipe(1, "Lemon Rice", "This is a lemon rice recipe", "https://www.vegrecipesofindia.com/wp-content/uploads/2018/09/lemon-rice-recipe-2-500x375.jpg"),
    new Recipe(2, "Veg Curry", "This is a veg curry recipe", "https://i2.wp.com/mypullzone-9vexd6dl53at.netdna-ssl.com/wp-content/uploads/2018/02/Mix-Veg-Recipe-Step-By-Step-Instructions.jpg?fit=750%2C621&ssl=1"),
    new Recipe(3, "Pulav", "This is a pulav recipe", "https://www.indianhealthyrecipes.com/wp-content/uploads/2015/11/pulao-recipe.jpg")
];