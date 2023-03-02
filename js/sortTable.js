const productColumn = document.querySelector("#productColumn");
const priceColumn = document.querySelector("#priceColumn");
const table = document.querySelector("#table");

const sortTable = (n, sortRule) => {
    let switchcount = 0;
    let switching = true;
    let dir = "asc";
    while (switching) {
        let i, shouldSwitch;
        switching = false;
        const rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            const x = rows[i].getElementsByTagName("td")[n];
            const y = rows[i + 1].getElementsByTagName("td")[n];
            if (sortRule === 'number') {
                if (dir == "asc") {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else {
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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

const sortTableFn = () => {
    productColumn.addEventListener('click', () => sortTable(0, 'text'));
    priceColumn.addEventListener('click', () => sortTable(3, 'number'));
}

export default sortTableFn;