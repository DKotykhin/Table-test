import sumValue from "./sumValue.js";
import { constants } from "./_constants.js";

const tableBody = document.querySelector('.table__body').getElementsByTagName("tr");

const editCell = (n) => {
    for (let i = 0; i < tableBody.length; i++) {
        const td = tableBody[i].cells[n].querySelector('.editIcon');
        const tdCell = tableBody[i];
        const updatedValue = td.closest('tr').cells[n].innerText.trim();
        const updatedProductName = tableBody[i].closest('tr').cells[0].innerText.trim();
        const updatedPriceWithTax = tableBody[i].closest('tr').cells[4];
        td && td.addEventListener('click', () => {
            let div = document.createElement("div");
            td.closest('tr').cells[n].innerHTML = ''
            div.innerHTML = `
                    <input class='updateInput' type="text" value='${updatedValue}' id='updateInput' />
                    <div>
                        <button class='tableButton cancelButton'>Cancel</button>
                        <button class='tableButton updateButton'>Update</button>
                    </div>
                `;
            tdCell.cells[n].appendChild(div);
            const updateButton = document.querySelector('.updateButton');
            const cancelButton = document.querySelector('.cancelButton');
            const updateInput = document.querySelector('.updateInput');
            updateButton.addEventListener('click', () => {
                tdCell.cells[n].removeChild(div);
                tdCell.cells[n].innerHTML = `
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
                tdCell.cells[n].innerHTML = `
                        ${updatedValue}
                        ${constants.editIcon}
                    `;
                editCell(n);
            })

        })
    }
};

export default editCell;