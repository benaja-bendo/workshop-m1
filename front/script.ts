interface Recette {
    id: number;
    name: string;
    rating: number; // Ajout du champ rating
}

// Liste des recettes avec id, nom et note
const recettes: Recette[] = [
    { id: 1, name: "Poulet rôti", rating: 4.6 },
    { id: 2, name: "Salade d’été", rating: 4.2 },
    { id: 3, name: "Crêpes à la farine d’avoine", rating: 4.8 },
    { id: 4, name: "Dessert fruité", rating: 3.0 },
    { id: 5, name: "Pancakes fluffy", rating: 4.6 },
    { id: 6, name: "Sushi et maki", rating: 4.1 },
];

// Fonction pour créer la notation étoilée
const createStarRating = (container: HTMLElement, rating: number) => {
    const starsInner = container.querySelector('.filled-stars') as HTMLElement;
    
    if (starsInner) {
        const ratingPercentage = (rating / 5) * 100; // Calcule le pourcentage pour remplir les étoiles
        console.log(`Rating: ${rating}, Rating Percentage: ${ratingPercentage}`); // Débogage
        
        starsInner.style.width = `${ratingPercentage}%`; // Met à jour la largeur pour correspondre à la note
        console.log(`Stars inner width set to: ${starsInner.style.width}`); // Débogage
    } else {
        console.log('Stars inner not found!'); // Débogage
    }
};

// Fonction pour mettre à jour les cartes de recettes
const updateQuizCards = () => {
    const quizCards = document.querySelectorAll('.card');
    quizCards.forEach((quizCard, index) => {
        const recette = recettes[index]; // Récupère la recette correspondante
        if (recette) {
            const starsContainer = quizCard.querySelector('.stars') as HTMLElement;
            createStarRating(starsContainer, recette.rating); // Crée les étoiles pour la note de la recette

            const ratingValue = quizCard.querySelector('.rating-value') as HTMLElement;
            if (ratingValue) {
                ratingValue.textContent = `${recette.rating}/5`; // Met à jour la note affichée
                console.log(`Updated rating value to: ${ratingValue.textContent}`); // Débogage
            }

            const titleElement = quizCard.querySelector('h3') as HTMLElement;
            if (titleElement) {
                titleElement.textContent = recette.name; // Met à jour le nom de la recette
                console.log(`Updated title to: ${titleElement.textContent}`); // Débogage
            }
        } else {
            console.log(`Recette not found for index: ${index}`); // Débogage
        }
    });
};

// Fonction pour mettre à jour les filtres
const updateFilters = () => {
    const difficultyFilters = document.querySelectorAll('.filters'); // Sélection des filtres
    difficultyFilters.forEach((filter) => {
        filter.addEventListener('click', (event) => {
            const selectedDifficulty = (event.target as HTMLElement).textContent; // Récupère le niveau de difficulté sélectionné
            console.log(`Niveau de difficulté sélectionné : ${selectedDifficulty}`);
            // Logique pour filtrer les recettes par difficulté
        });
    });
};

// Événement DOMContentLoaded pour initialiser les cartes et les filtres
document.addEventListener('DOMContentLoaded', () => {
    updateQuizCards(); // Met à jour les cartes de recette
    updateFilters(); // Met à jour les filtres
});
