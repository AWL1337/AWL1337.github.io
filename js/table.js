document.addEventListener("DOMContentLoaded", () => {
    const resultTable = document.getElementById("result-table");
    const preloader = document.getElementById("preloader");
    const API_BASE_URL = "http://localhost:8080/games";

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

    function createRow({id, name, description, rating, link }) {
        const row = document.createElement("div");
        row.classList.add("grid-row");

        row.appendChild(createCell(id));
        row.appendChild(createCell(name));
        row.appendChild(createCell(description));
        row.appendChild(createCell(rating));
        row.appendChild(createCell(link, true));

        resultTable.appendChild(row);
    }

    const showPreloader = (isVisible) => {
        preloader.style.display = isVisible ? "flex" : "none";
    };

    const showError = (message) => {
        const errorElement = document.createElement("div");
        errorElement.textContent = message;
        errorElement.style.color = "red";
        resultTable.insertAdjacentElement("afterbegin", errorElement);

        setTimeout(() => errorElement.remove(), 3000);
    };

    const fetchGames = async () => {
        showPreloader(true);
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                console.error("Ошибка при загрузке данных");
            }
            const games = await response.json();
            if (games.length === 0) {
                showError("Нет данных для отображения");
            } else {
                games.forEach(createRow);
            }
        } catch (error) {
            console.error(error);
            showError("Не удалось загрузить данные");
        } finally {
            showPreloader(false);
        }
    };

    fetchGames();
});