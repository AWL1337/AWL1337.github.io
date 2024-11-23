document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("table-form");
    const resultTable = document.getElementById("result-table");
    const saveDataButton = document.getElementById("save-data");
    const loadDataButton = document.getElementById("load-data");

    function createCell(content, isLink = false) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");

        if (isLink) {
            const link = document.createElement("a");
            link.href = content;
            link.textContent = "Link";
            link.target = "_blank";
            cell.appendChild(link);
        } else {
            cell.textContent = content;
        }

        return cell;
    }

    function createRow({ name, description, rating, link }) {
        const row = document.createElement("div");
        row.classList.add("grid-row");

        row.appendChild(createCell(name));
        row.appendChild(createCell(description));
        row.appendChild(createCell(rating));
        row.appendChild(createCell(link, true));

        resultTable.appendChild(row);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const gameData = {
            name: form.gameName.value,
            description: form.gameDescription.value,
            rating: form.gameRating.value,
            link: form.gameLink.value,
        };

        createRow(gameData);
        form.reset();
    });

    saveDataButton.addEventListener("click", () => {
        const rows = [...resultTable.querySelectorAll(".grid-row")];
        const tableData = rows.map(row => {
            const cells = row.querySelectorAll(".grid-cell");
            return {
                name: cells[0].textContent,
                description: cells[1].textContent,
                rating: cells[2].textContent,
                link: cells[3].querySelector("a").href,
            };
        });

        localStorage.setItem("tableData", JSON.stringify(tableData));
        alert("Данные сохранены!");
    });

    loadDataButton.addEventListener("click", () => {

        while (resultTable.firstChild) {
            resultTable.removeChild(resultTable.firstChild);
        }

        const tableData = JSON.parse(localStorage.getItem("tableData") || "[]");
        tableData.forEach(createRow);
        alert("Данные загружены!");
    });
});