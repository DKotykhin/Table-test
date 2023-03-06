const productColumn = document.querySelector("#productColumn");
const priceColumn = document.querySelector("#priceColumn");
const table = document.querySelector(".table__body");

const sortTable = (n, sortRule) => {
    let switchcount = 0;
    let switching = true;
    let dir = "asc";
    const rows = table.rows;
    while (switching) {
        let i, shouldSwitch;
        switching = false;
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            const x = rows[i].getElementsByTagName("td")[n];
            const y = rows[i + 1].getElementsByTagName("td")[n];
            if (sortRule === 'number') {
                if (dir == "asc") {
                    if (Number(x.innerText) > Number(y.innerText)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (Number(x.innerText) < Number(y.innerText)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else {
                if (dir == "asc") {
                    if (x.innerText.toLowerCase() > y.innerText.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x.innerText.toLowerCase() < y.innerText.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
};

productColumn.addEventListener('click', () => sortTable(0, 'text'));
priceColumn.addEventListener('click', () => sortTable(3, 'number'));

