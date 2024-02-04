const spreadsheetId = "1Ec9omsrDd4pRp5dTizj56Q3hCEpMoWh5ejAzlHaYI2Y";
const range = "Players"; // Spécifiez la plage de cellules à lire

// Créez une requête HTTP GET pour récupérer les données
const api = fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`
)
    .then((response) => response.json())
    .then((data) => {
        // Traitement des données récupérées
        console.log("Données récupérées :", data);
    })
    .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
    });

console.log(api);
