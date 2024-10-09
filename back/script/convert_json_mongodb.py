import json

# Chemin du fichier JSON d'entrée (celui que vous avez)
input_file = './data/recipes.json'
# Chemin du fichier JSON de sortie (formaté pour MongoDB)
output_file = 'recipesMongoDB.json'

# Charger les données depuis le fichier JSON d'entrée
with open(input_file, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Transformer les données en un tableau de documents
formatted_data = []

for recipe_id, recipe_details in data.items():
    # Préparer chaque document à insérer dans MongoDB
    formatted_document = {
        "id": recipe_id,
        "recipeName": recipe_details.get("recipe_name"),
        "totalTimeMinutes": recipe_details.get("total_time_minutes"),
        "servings": recipe_details.get("servings"),
        "ingredients": recipe_details.get("ingredients"),
        "directions": recipe_details.get("directions"),
        "rating": recipe_details.get("rating"),
        "url": recipe_details.get("url"),
        "nutrition": recipe_details.get("nutrition"),
        "imgSrc": recipe_details.get("img_src"),
        "diet": [recipe_details.get("diet")] if recipe_details.get("diet") else [],
        "tags": recipe_details.get("tags", [])
    }
    formatted_data.append(formatted_document)

# Écrire les données formatées dans un fichier JSON de sortie
with open(output_file, 'w', encoding='utf-8') as file:
    json.dump(formatted_data, file, indent=2, ensure_ascii=False)

print(f"Les données ont été converties et enregistrées dans {output_file}.")
