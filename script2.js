const API_BASE = "https://api.aredl.net/v2/api/aredl";
const LEVELS_URL = `${API_BASE}/levels`;

const tableBody = document.querySelector("#levels-table tbody");

async function loadLevels() {
    try {
        const response = await fetch(LEVELS_URL);
        const levels = await response.json();

        // Ordenar por posición
        levels.sort((a, b) => a.position - b.position);

        levels.forEach(level => {
            const row = document.createElement("tr");

            const saved = localStorage.getItem("aredl_" + level.id) === "true";

            row.innerHTML = `
                <td>
                    <input type="checkbox" ${saved ? "checked" : ""}>
                </td>
                <td>#${level.position ?? "-"}</td>
                <td>${level.name ?? "Sin nombre"}</td>
                <td>${level.level_id ?? "Sin ID"}</td>
                <td>${level.description ?? "Sin descripción"}</td>
            `;

            const checkbox = row.querySelector("input");

            checkbox.addEventListener("change", () => {
                localStorage.setItem("aredl_" + level.id, checkbox.checked);
            });

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error cargando niveles:", error);
        tableBody.innerHTML = `
            <tr>
                <td colspan="5">Error cargando niveles.</td>
            </tr>
        `;
    }
}

loadLevels();
