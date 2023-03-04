
const table = document.getElementById('table').getElementsByTagName('tbody')[0];
const total = document.querySelector('#total');

const sumValue = () => {
    let sumVal = 0;
    for (const row of table.rows) {
      sumVal = sumVal + parseFloat(row.cells[4].innerHTML);
    }
    total.innerHTML = sumVal;
};

export default sumValue;