import sumValue from "./sumValue.js";
import { constants } from "./_constants.js";

const tableBody = document.querySelector('.table__body').getElementsByTagName("tr");

const editCell = (n) => {
    for (const row of tableBody) {
        const cell = row.cells[n];
        if (cell) {
            const editIcon = cell.querySelector('.editIcon');
            if (editIcon) {
                const updatedValue = cell.innerText.trim();
                const updatedProductName = row.cells[0].innerText.trim();
                const updatedPriceWithTax = row.cells[4];
                editIcon.addEventListener('click', () => {
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
                            if (n === 0) {
                                modifiedItem.name = updateInput.value;
                            } else if (n === 2) {
                                modifiedItem.quantity = updateInput.value;
                                updatedPriceWithTax.innerHTML = modifiedItem.quantity * modifiedItem.price * 1.25
                                sumValue();
                            } else if (n === 3) {
                                modifiedItem.price = updateInput.value;
                                updatedPriceWithTax.innerHTML = modifiedItem.quantity * modifiedItem.price * 1.25
                                sumValue();
                            }
                            const newArray = [modifiedItem, ...restArray];
                            localStorage.setItem('tableData', JSON.stringify(newArray));
                            editCell(n);
                        }
                    })
                    cancelButton.addEventListener('click', () => {
                        cell.innerHTML = `
                                ${updatedValue}
                                ${constants.editIcon}
                            `;
                        editCell(n);
                    });                    
                })
            }
        }
    }
};

export default editCell;