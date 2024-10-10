import numpy as np
import random
import time
import sys


MARGIN = 0.2
MAX_DURATION = 20 # secondes


def calculate_bmr(weight, height, age, gender):
    if gender == 'male':
        return 10 * weight + 6.25 * height - 5 * age + 5
    else:
        return 10 * weight + 6.25 * height - 5 * age - 161

def calculate_tdee(bmr, activity_level):
    activity_factors = {
        'sedentary': 1.2,
        'lightly active': 1.375,
        'moderately active': 1.55,
        'very active': 1.725,
        'super active': 1.9
    }
    return bmr * activity_factors[activity_level]

def adjust_for_goal(tdee, goal):
    if goal == 'maintain':
        return tdee
    elif goal == 'weight loss':
        return tdee - 500
    elif goal == 'weight gain':
        return tdee + 500

def daily_nutritional_requirements(weight, height, age, gender, activity_level, goal):
    bmr = calculate_bmr(weight, height, age, gender)
    tdee = calculate_tdee(bmr, activity_level)
    adjusted_calories = adjust_for_goal(tdee, goal)

    # Macronutrient distribution
    carbs = adjusted_calories * 0.55 / 4  # 55% of calories from carbs, 4 kcal/g
    protein = adjusted_calories * 0.20 / 4  # 20% of calories from protein, 4 kcal/g
    fats = adjusted_calories * 0.25 / 9  # 25% of calories from fats, 9 kcal/g

    return {
        'Calories': round(adjusted_calories),
        'Total Carbohydrate': round(carbs),
        'Protein': round(protein),
        'Total fat': round(fats)
    }


def filter_recipes(recipes, diet, tags):
    # Define dietary categories
    dietary_categories = {
        'omnivore': ['omnivore', 'pescatarian', 'vegetarian', 'vegan'],
        'pescatarian': ['pescatarian', 'vegetarian', 'vegan'],
        'vegetarian': ['vegetarian', 'vegan'],
        'vegan': ['vegan']
    }
    # Filter recipes based on diet
    filtered_recipes = {uuid : recipe for uuid, recipe in recipes.items() if recipe['diet'] in dietary_categories[diet]}
    # Filter recipes based on allergens
    filtered_recipes = {uuid : recipe for uuid, recipe in filtered_recipes.items() if not any(tag in recipe['tags'] for tag in tags)}
    return filtered_recipes


def parse_nutritional_values(nutrition, recipe_servings):
    parsed_values = {}
    for key, value in nutrition.items():
        amount = value['amount']
        if 'mg' in amount:
            parsed_values[key] = (float(amount.replace('mg', '')) / 1000) / recipe_servings
        elif 'g' in amount:
            parsed_values[key] = (float(amount.replace('g', ''))) / recipe_servings
        elif 'kcal' in amount:
            parsed_values[key] = (float(amount.replace('kcal', ''))) / recipe_servings
    return parsed_values


def find_meals(recipes, daily_requirements):

    categories = {
        "breakfast": ["Petit déjeuner et brunch"],
        "appetizer": ["Salade", "Apéritifs et collations", "Recettes de soupes, ragoûts et chili", "Recettes de soupes"],
        "main_course": ["Plat d'accompagnement", "Plats principaux", "Viandes et volailles", "Fruit de mer", "Barbecue et grillades"],
        "desert": ["Desserts"]
    }

    selected_meals = {
        "breakfast": None,
        "appetizer_1": None,
        "main_course_1": None,
        "desert_1": None,
        "appetizer_2": None,
        "main_course_2": None,
        "desert_2": None
    }

    # Filter recipes by category
    categorized_recipes = {category: {} for category in categories}
    for recipe_id, recipe in recipes.items():
        for category, types in categories.items():
            if recipe['recipe_type'] in types:
                categorized_recipes[category][recipe_id] = recipe

    # Helper function to check if nutritional values are within the margin
    def within_margin(total_nutritional_values, daily_requirements):
        keys_to_check = ['Calories', 'Total Carbohydrate', 'Protein', 'Total Fat']
        abs_differences = []
        for key in keys_to_check:
            if key in total_nutritional_values:
                abs_differences.append(np.abs((total_nutritional_values[key] - daily_requirements[key]) / daily_requirements[key]))
            else:
                abs_differences.append(0)
        score = np.average(abs_differences, weights=[4, 1, 1, 1])
        return score


    # Initialize total nutritional values
    total_nutritional_values = {
        'Calories': 0,
        'Total Carbohydrate': 0,
        'Protein': 0,
        'Total Fat': 0
    }

    def update_nutri(nutritional_values):
        for key in total_nutritional_values.keys():
            total_nutritional_values[key] += nutritional_values.get(key, 0)

    # Select breakfast
    breakfast = [(recipe_id, recipe) for recipe_id, recipe in categorized_recipes['breakfast'].items()]
    random.shuffle(breakfast)
    recipe_id, recipe = breakfast[0]
    nutritional_values = parse_nutritional_values(recipe['nutrition'], recipe['servings'])
    selected_meals['breakfast'] = recipe_id
    update_nutri(nutritional_values)

    # Select two appetizers
    appetizers = [(recipe_id, recipe) for recipe_id, recipe in categorized_recipes['appetizer'].items()]
    random.shuffle(appetizers)
    recipe_id, recipe = appetizers[0]
    nutritional_values = parse_nutritional_values(recipe['nutrition'], recipe['servings'])
    selected_meals['appetizer_1'] = recipe_id
    update_nutri(nutritional_values)
    recipe_id, recipe = appetizers[1]
    nutritional_values = parse_nutritional_values(recipe['nutrition'], recipe['servings'])
    selected_meals['appetizer_2'] = recipe_id
    update_nutri(nutritional_values)


    # Select two main courses
    main_courses = [(recipe_id, recipe) for recipe_id, recipe in categorized_recipes['main_course'].items()]
    random.shuffle(main_courses)
    recipe_id, recipe = main_courses[0]
    nutritional_values = parse_nutritional_values(recipe['nutrition'], recipe['servings'])
    selected_meals['main_course_1'] = recipe_id
    update_nutri(nutritional_values)
    recipe_id, recipe = main_courses[1]
    nutritional_values = parse_nutritional_values(recipe['nutrition'], recipe['servings'])
    selected_meals['main_course_2'] = recipe_id
    update_nutri(nutritional_values)


    # Select two desserts
    desserts = [(recipe_id, recipe) for recipe_id, recipe in categorized_recipes['desert'].items()]
    random.shuffle(desserts)
    recipe_id, recipe = desserts[0]
    nutritional_values = parse_nutritional_values(recipe['nutrition'], recipe['servings'])
    selected_meals['desert_1'] = recipe_id
    update_nutri(nutritional_values)
    recipe_id, recipe = desserts[1]
    nutritional_values = parse_nutritional_values(recipe['nutrition'], recipe['servings'])
    selected_meals['desert_2'] = recipe_id
    update_nutri(nutritional_values)

    score = within_margin(total_nutritional_values, daily_requirements)
    return selected_meals, score



def get_menu(filtered_recipes, daily_requirements):
    best_score = 1000
    best_meals = None
    selected_meals = None
    start_time = time.time()
    while selected_meals == None:
        selected_meals, score = find_meals(filtered_recipes, daily_requirements)
        if score < MARGIN:
            return selected_meals
        elif score < best_score:
            best_score = score
            best_meals = selected_meals
        selected_meals = None
        elapsed_time = time.time() - start_time
        if elapsed_time > MAX_DURATION:
            print("Best score:", best_score)
            return best_meals


def main():
    # Récupère les arguments
    recipes = sys.argv[1] # json des recettes
    diet = sys.argv[2]    # 'omnivore' | 'pescitarian' | 'vegetarian' | 'vegan'
    if diet == None: diet = 'omnivore'
    tags = sys.argv[3]    # ['contain_gluten', 'contain_dairy', 'contain_nuts', 'contain_eggs', 'contain_soy', 'high_FODMAP']
    if tags == None: tags = []
    weight = sys.argv[4]  # en kg
    height = sys.argv[5]  # en cm
    age = sys.argv[6]     # int
    goal = sys.argv[7]    # 'maintain' | 'weight loss' | 'weight gain'
    if goal == None: goal = 'maintain'
    servings = sys.argv[8] # int
    if servings == None: servings = 1
    gender = sys.argv[9]  # 'male' | 'female'
    if gender == None: gender = 'male'
    activity_level = sys.argv[10] # 'sedentary' | 'lightly active' | 'moderately active' | 'very active' | 'super active'
    if activity_level == None: activity_level = 'moderately active'
    filtered_recipes = filter_recipes(recipes, diet, tags)
    daily_requirements = daily_nutritional_requirements(weight, height, age, gender, activity_level, goal)
    menu = get_menu(filtered_recipes, daily_requirements)
    return {key: recipes[key] for key in menu.values()}


if __name__ == "__main__":
    exit(main())
