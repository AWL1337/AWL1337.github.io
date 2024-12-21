document.addEventListener("DOMContentLoaded", () => {
    const resultTable = document.getElementById("result-table");
    const preloader = document.getElementById("preloader");
    const API_BASE_URL = "http://localhost:8080/games";

    // Создаём таблицу
    function createTable() {

        const table = document.createElement("table");
        table.id = "gamesTable";
        table.classList.add("display");

        // Создаём заголовок таблицы
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const headers = ["ID", "Название", "Описание", "Рейтинг", "Ссылка"];
        headers.forEach((headerText) => {
            const th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        resultTable.appendChild(table);
        return tbody;
    }

    function createCell(content, isLink = false) {
        const cell = document.createElement("td");

        if (isLink) {
            const link = document.createElement("a");
            link.href = content;
            link.textContent = "Ссылка";
            link.target = "_blank";
            cell.appendChild(link);
        } else {
            cell.textContent = content;
        }

        return cell;
    }

    function createRow({ id, name, description, rating, link }) {
        const row = document.createElement("tr");

        row.appendChild(createCell(id));
        row.appendChild(createCell(name));
        row.appendChild(createCell(description));
        row.appendChild(createCell(rating));
        row.appendChild(createCell(link, true));

        row.addEventListener("click", () => {
            //функция для создания модального окна
            Swal.fire({
                title: `Игра: ${name}`, // заголовок
                html: ` 
                    <p><strong>ID:</strong> ${id}</p>
                    <p><strong>Описание:</strong> ${description}</p>
                    <p><strong>Рейтинг:</strong> ${rating}</p>
                    <p><a href="${link}" target="_blank">Перейти по ссылке</a></p>
                `, // html содержимое
                icon: "info",
                confirmButtonText: "Закрыть" // текст на кнопке "принять"
            });
        });

        return row;
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
                const tbody = createTable();
                games.forEach((game) => {
                    tbody.appendChild(createRow(game));
                });

                $('#gamesTable').DataTable({
                    paging: true,
                    searching: true,
                    ordering: true,
                    language: {
                        url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/ru.json"
                    }
                });
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