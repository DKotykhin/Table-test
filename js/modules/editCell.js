import sumValue from "./sumValue.js";
import { constants } from "./_constants.js";

const table = document.querySelector('.table__body');

const editCell = () => {
    table.addEventListener('click', (e) => {
        if (e.target.closest('.editIcon')) {
            const row = e.target.closest('tr');
            const cell = e.target.closest('td');
            if (cell) {
                const updatedValue = cell.innerText.trim();
                const updatedProductName = row.cells[0].innerText.trim();
                const updatedPriceWithTax = row.cells[4];
                let div = document.createElement("div");
                cell.innerHTML = '';
                div.innerHTML = `
                    <input class='updateInput' type="text" value='${updatedValue}' id='updateInput' />
                    <div>
                        <button class='tableButton cancelButton'>Cancel</button>
                        <button class='tableButton updateButton'>Update</button>
                    </div>
                `;
                cell.appendChild(div);
                const updateButton = document.querySelector('.updateButton');
                const cancelButton = document.querySelector('.cancelButton');
                const updateInput = document.querySelector('.updateInput');
                updateButton.addEventListener('click', () => {
                    cell.removeChild(div);
                    cell.innerHTML = `
                        ${updateInput.value}
                        ${constants.editIcon}
                    `;
                    const localStorageData = localStorage.getItem('tableData');
                    const dataArray = JSON.parse(localStorageData);
                    if (dataArray) {
                        const modifiedItem = dataArray.find(item => item.name === updatedProductName);
                        const restArray = dataArray.filter(item => item.name !== updatedProductName);
                        if (cell.cellIndex === 0) {
                            modifiedItem.name = updateInput.value;
                        } else if (cell.cellIndex === 2) {
                            modifiedItem.quantity = updateInput.value;
                            updatedPriceWithTax.innerHTML = Math.round(parseFloat(modifiedItem.quantity * modifiedItem.price * 1.25) * 100) / 100;
                            sumValue();
                        } else if (cell.cellIndex === 3) {
                            modifiedItem.price = updateInput.value;
                            updatedPriceWithTax.innerHTML = Math.round(parseFloat(modifiedItem.quantity * modifiedItem.price * 1.25) * 100) / 100;
                            sumValue();
                        }
                        const newArray = [modifiedItem, ...restArray];
                        localStorage.setItem('tableData', JSON.stringify(newArray));
                    }
                })
                cancelButton.addEventListener('click', () => {
                    cell.innerHTML = `
                        ${updatedValue}
                        ${constants.editIcon}
                    `;
                });
            }
        }
    })
};

export default editCell;