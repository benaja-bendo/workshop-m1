// Attendre que le DOM soit complètement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('signupForm')?.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const guests = parseInt(document.getElementById('guests').value.trim(), 10);
        const size = parseInt(document.getElementById('size').value.trim(), 10);
        const weight = parseInt(document.getElementById('weight').value.trim(), 10);
        const undesirableIngredients  = Array.from(document.getElementById('allergies').selectedOptions).map(option => option.value);
        const goals = document.querySelector('input[name="objectif"]:checked')?.value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour vérifier le format de l'email
        let valid = true;
        let errorMessage = '';

        if (!emailRegex.test(email)) {
            valid = false;
            errorMessage += 'L\'adresse e-mail doit être valide (contient un @).\n';
        }

        if (firstName.length < 4) {
            valid = false;
            errorMessage += 'Le prénom doit contenir plus de 3 caractères.\n';
        }

        if (lastName.length < 4) {
            valid = false;
            errorMessage += 'Le nom doit contenir plus de 3 caractères.\n';
        }

        if (password.length < 4) {
            valid = false;
            errorMessage += 'Le mot de passe doit contenir plus de 3 caractères.\n';
        }

        if (guests <= 0) {
            valid = false;
            errorMessage += 'Le nombre de personnes doit être supérieur à 0.\n';
        }

        if (size <= 0) {
            valid = false;
            errorMessage += 'La taille doit être supérieure à 0 cm.\n';
        }

        if (weight <= 0) {
            valid = false;
            errorMessage += 'Le poids doit être supérieur à 0 kg.\n';
        }


        if (!valid) {
            document.getElementById('errorMessage').innerText = errorMessage;
            document.getElementById('errorMessage').classList.remove('hidden');
        } else {
            document.getElementById('errorMessage').classList.add('hidden');
            PostUser({ email, password, firstName, lastName, guests, size, weight, undesirableIngredients, goals });
        }
    });

    document.getElementById('loginForm')?.addEventListener('submit', function (event) {
        event.preventDefault();

        const userData = getUserLoginData();

        PostUser(userData);
    });
});

// Fonction pour récupérer les données de connexion
function getUserLoginData() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    return { email, password };
}

// Fonction pour envoyer les données à l'API
async function PostUser(data) {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const postUserEndpoint = import.meta.env.VITE_POST_USER;

        const response = await fetch(`${apiUrl}${postUserEndpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Type de contenu
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status} ${response.statusText}`);
        }

        const result = await response.json(); // Réponse de l'API en JSON
        console.log('Réponse de l\'API:', result);
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
    }
}
