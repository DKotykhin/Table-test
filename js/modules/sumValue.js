
const table = document.getElementById('table').getElementsByTagName('tbody')[0];
const total = document.querySelector('#total');

const sumValue = () => {
    let sumVal = 0;
    for (let i = 0; i < table.rows.length; i++) {
      sumVal = sumVal + parseFloat(table.rows[i].cells[4].innerHTML);
    }
    total.innerHTML = sumVal;
};

export default sumValue;