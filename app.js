let SHEET_ID = "1Ec9omsrDd4pRp5dTizj56Q3hCEpMoWh5ejAzlHaYI2Y";
let SHEET_NAME = "Players";
let FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_NAME}`;

// Fonction pour afficher les joueurs par alliance
function displayPlayers(playersByAlliance) {
    // Supprimer les anciens résultats
    document.querySelector("#alliances").innerHTML = "";

    // Créer une table HTML pour chaque alliance et afficher les joueurs
    for (let allianceName in playersByAlliance) {
        let allianceTable = document.createElement("table");

        let allianceCaption = document.createElement("caption");
        allianceCaption.innerHTML = allianceName;

        allianceCaption.addEventListener("click", (e) => {
            e.target.classList.toggle("active");
        });

        allianceTable.appendChild(allianceCaption);

        playersByAlliance[allianceName].forEach((player) => {
            let row = allianceTable.insertRow();
            let usernameCell = row.insertCell();
            let idCell = row.insertCell();
            usernameCell.textContent = player.username;
            idCell.textContent = player.id;
        });

        document.querySelector("#alliances").appendChild(allianceTable);
    }
}

// Effectuer la requête vers Google Sheets et traiter les données
fetch(FULL_URL)
    .then((res) => res.text())
    .then((rep) => {
        rep = JSON.parse(rep.substr(47).slice(0, -2));

        // Créer un objet pour stocker les joueurs par alliance
        let playersByAlliance = {};

        rep.table.rows.slice(1).forEach((row) => {
            let allianceName = row.c[0].v;

            // Créer une entrée pour l'alliance si elle n'existe pas encore dans l'objet
            if (!playersByAlliance.hasOwnProperty(allianceName)) {
                playersByAlliance[allianceName] = [];
            }

            // Ajouter le joueur à l'alliance correspondante
            playersByAlliance[allianceName].push({
                username: row.c[1].v,
                id: row.c[2].v,
            });
        });

        // Afficher tous les joueurs initialement
        displayPlayers(playersByAlliance);

        // Recherche
        document
            .querySelector("#searchInput")
            .addEventListener("input", (event) => {
                let searchQuery = event.target.value.toLowerCase();

                // Filtrer les alliances et joueurs
                let filteredAlliances = {};
                for (let allianceName in playersByAlliance) {
                    let filteredPlayers = playersByAlliance[
                        allianceName
                    ].filter((player) => {
                        return (
                            player.username
                                .toLowerCase()
                                .includes(searchQuery) ||
                            allianceName.toLowerCase().includes(searchQuery)
                        );
                    });
                    if (filteredPlayers.length > 0) {
                        filteredAlliances[allianceName] = filteredPlayers;
                    }
                }

                // Afficher les résultats filtrés
                displayPlayers(filteredAlliances);
            });
    });
