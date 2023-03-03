import sumValue from "./modules/sumValue.js";
import { modalFn, closeModal } from "./modules/modal.js";

import "./modules/dropdown.js";
import "./modules/sortTable.js";
import './modules/dragNDrop.js';

window.addEventListener('DOMContentLoaded', () => {

    const table = document.getElementById('table').getElementsByTagName('tbody')[0];
    const tableBody = document.querySelector('.table__body').getElementsByTagName("tr");
    const warning = document.querySelector('#warning');
    const form = document.querySelector("form");

    const emptyMessage = 'There is no products yet';
    const defaultRow = `<td colspan="6" class="table__default">${emptyMessage}</td>`;

    modalFn();

    const removeDefaultRow = () => {
        if (tableBody[0] && tableBody[0].innerText === emptyMessage) {
            tableBody[0].remove()
        }
    };

    const deleteRow = () => {
        for (let i = 0; i < tableBody.length; i++) {
            const td = tableBody[i].querySelector('.deleteButton');
            td && td.addEventListener('click', () => {
                const deletedProductName = td.closest('tr').cells[0].innerText.trim();
                td.closest('tr').remove();
                const localStorageData = localStorage.getItem('tableData');
                const dataArray = JSON.parse(localStorageData);
                if (dataArray) {
                    sumValue();
                    const newArray = dataArray.filter(item => item.name !== deletedProductName);
                    localStorage.setItem('tableData', JSON.stringify(newArray));
                }
                if (tableBody.length === 0) {
                    const newRow = table.insertRow(table.rows.length);
                    newRow.innerHTML = defaultRow;
                    localStorage.removeItem('tableData');
                }
            })
        }
    };

    const formData = (data) => {
        const myHtmlContent = `
            <td>
                ${data.name}
                <img class="editIcon" src='icons/edit.webp' alt='edit' height="15px">
            </td>
            <td>${data.country}</td>
            <td>${data.quantity}</td>
            <td>${+data.price}</td>
            <td>${+data.quantity * +data.price * 1.25}</td>
            <td>
                <button class='deleteButton'>Delete</button>
            </td>
        `;
        return myHtmlContent;
    };

    const addRow = (e) => {
        e.preventDefault();
        const name = document.forms['form']['name'].value;
        const quantity = document.forms['form']['quantity'].value;
        const price = document.forms['form']['price'].value;
        const country = document.querySelector('#country').innerHTML;
        if (country === '...') {
            warning.classList.remove('hide-warning')
            warning.classList.add('show-warning')
            return
        };
        const newData = {
            name,
            country,
            quantity,
            price,
        };
        const myHtmlContent = formData(newData);
        removeDefaultRow();
        const newRow = table.insertRow(table.rows.length);
        newRow.innerHTML = myHtmlContent;

        const localStorageData = localStorage.getItem('tableData');
        if (localStorageData) {
            const dataArray = JSON.parse(localStorageData);
            dataArray.push(newData);
            localStorage.setItem('tableData', JSON.stringify(dataArray));
        } else {
            localStorage.setItem('tableData', JSON.stringify([newData]));
        };
        sumValue();
        deleteRow();
        closeModal();
        editCell();
    }
    form.addEventListener("submit", addRow);

    const localStorageData = localStorage.getItem('tableData');
    const dataArray = JSON.parse(localStorageData);
    if (dataArray && dataArray.length) {
        removeDefaultRow();
        dataArray.forEach(element => {
            const newRow = table.insertRow(table.rows.length);
            newRow.innerHTML = formData(element);
        });
        sumValue();
        deleteRow();
    } else {
        const newRow = table.insertRow(table.rows.length);
        newRow.innerHTML = defaultRow;
    };


    const editCell = () => {
        for (let i = 0; i < tableBody.length; i++) {
            const td = tableBody[i].querySelector('.editIcon');
            const tdCell = tableBody[i];
            td && td.addEventListener('click', () => {
                const updatedProductName = td.closest('tr').cells[0].innerText.trim();
                let div = document.createElement("div");
                if (!tdCell.cells[0].querySelector('input')) {
                    div.innerHTML = `
                        <input class='updateInput' type="text" value='${updatedProductName}' id='updateInput' />
                        <div><button class='updateButton'>Update</button></div>
                    `;
                    tdCell.cells[0].appendChild(div);
                    const updateButton = document.querySelector('.updateButton');
                    const updateInput = document.querySelector('.updateInput');
                    updateButton.addEventListener('click', () => {
                        tdCell.cells[0].removeChild(div);
                        tdCell.cells[0].innerHTML = `
                                ${updateInput.value}
                                <img class="editIcon" src='icons/edit.webp' alt='edit' height="15px">
                            `;
                        const localStorageData = localStorage.getItem('tableData');
                        const dataArray = JSON.parse(localStorageData);
                        if (dataArray) {
                            const restArray = dataArray.filter(item => item.name !== updatedProductName);
                            const modifiedItem = dataArray.find(item => item.name === updatedProductName);
                            modifiedItem.name = updateInput.value;
                            const newArray = [modifiedItem, ...restArray];
                            localStorage.setItem('tableData', JSON.stringify(newArray));
                        }
                    })

                } 
            })
        }
    };
    editCell()

});

