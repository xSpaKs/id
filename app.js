let SHEET_ID = "1Ec9omsrDd4pRp5dTizj56Q3hCEpMoWh5ejAzlHaYI2Y";
let SHEET_NAME = "Players";

let FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_NAME}`;

fetch(FULL_URL)
    .then((res) => res.text())
    .then((rep) => {
        rep = JSON.parse(rep.substr(47).slice(0, -2));

        rep.table.rows.slice(1).forEach((row) => {
            let user = document.createElement("div");

            let alliance = document.createElement("span");
            alliance.innerHTML = row.c[0].v + " ";

            let username = document.createElement("span");
            username.innerHTML = row.c[1].v + " ";

            let id = document.createElement("span");
            id.innerHTML = row.c[2].v;

            user.appendChild(alliance);
            user.appendChild(username);
            user.appendChild(id);

            document.querySelector("body").appendChild(user);
        });
    });
