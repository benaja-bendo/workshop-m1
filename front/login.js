document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('signupForm')?.addEventListener('submit', function (event) {
        event.preventDefault();

        // Récupération des valeurs des champs obligatoires
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const username = document.getElementById('username').value.trim();

        // On initialise les valeurs des champs non obligatoires
        const size = document.getElementById('size') ? parseInt(document.getElementById('size').value.trim(), 10) : null; // taille
        const weight = document.getElementById('weight') ? parseInt(document.getElementById('weight').value.trim(), 10) : null;
        const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;
        const dietaryRegime = document.querySelector('input[name="dietaryRegime"]:checked') ? document.querySelector('input[name="dietaryRegime"]:checked').value : null;
        const birthDate = document.getElementById('birthDate') ? document.getElementById('birthDate').value : null;
        const allergies = Array.from(document.getElementById('allergies').selectedOptions).map(option => option.value) || [];

        // Validation des champs obligatoires
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let valid = true;
        let errorMessage = '';

        // Vérification de la validité des champs obligatoires
        if (!emailRegex.test(email)) {
            valid = false;
            errorMessage += 'L\'adresse e-mail doit être valide.\n';
        }

        if (password.length < 4) {
            valid = false;
            errorMessage += 'Le mot de passe doit comporter au moins 4 caractères.\n';
        }

        if (!firstName) {
            valid = false;
            errorMessage += 'Le prénom est obligatoire.\n';
        }

        if (!lastName) {
            valid = false;
            errorMessage += 'Le nom est obligatoire.\n';
        }

        if (!username) {
            valid = false;
            errorMessage += 'Le nom d\'utilisateur est obligatoire.\n';
        }

        if (!valid) {
            alert(errorMessage);
            return;
        }

        // Préparation des données à envoyer
        const data = {
            firstName,
            lastName,
            username,
            email,
            password,
            size, // taille
            weight,
            gender,
            dietaryRegime,
            allergies,
            birthDate
        };

        // Envoi des données à l'API
        PostUser(data)
            .then(response => {
                console.log('Utilisateur créé avec succès :', response);
                window.location.href = 'success.html';
            })
            .catch(error => {
                console.error('Erreur lors de la création de l\'utilisateur :', error);
            });
    });
});

async function PostUser(data) {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const postUserEndpoint = import.meta.env.VITE_POST_USER;

        const response = await fetch(`${apiUrl}${postUserEndpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Réponse de l\'API:', result);
        return result;
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
        throw error;
    }
};
