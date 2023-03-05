import sumValue from "./modules/sumValue.js";
import editCell from "./modules/editCell.js";
import formRowData from "./modules/formRowData.js";
import { modalFn, closeModal } from "./modules/modal.js";
import { constants } from "./modules/_constants.js";

import "./modules/dropdown.js";
import "./modules/sortTable.js";
import './modules/dragNDrop.js';

window.addEventListener('DOMContentLoaded', () => {

    const table = document.querySelector('#table').getElementsByTagName('tbody')[0];
    const tableBody = document.querySelector('.table__body').getElementsByTagName("tr");
    const warning = document.querySelector('#warning');
  
    const defaultRow = `<td colspan="6" class="table__default">${constants.emptyMessage}</td>`;

    modalFn();

    const removeDefaultRow = () => {
        if (tableBody[0] && tableBody[0].innerText === constants.emptyMessage) {
            tableBody[0].remove()
        }
    };

    const deleteRow = () => {
        table.addEventListener('click', (e) => {
            if (e.target.closest('.deleteButton')) {
                const deletedProductName = e.target.closest('tr').cells[0].innerText.trim();
                console.log(deletedProductName);
                e.target.closest('tr').remove();
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
            }
        })
    };

    const addRow = (e) => {
        e.preventDefault();
        const name = document.forms.form.name.value;
        const quantity = document.forms.form.quantity.value;
        const price = document.forms.form.price.value;
        const country = document.querySelector('#country').innerHTML;
        if (country === '') {
            warning.classList.add('show-warning')
            return
        };
        const newData = {
            name,
            country,
            quantity,
            price,
        };
        const newRowContent = formRowData(newData);
        removeDefaultRow();
        const newRow = table.insertRow(table.rows.length);
        newRow.innerHTML = newRowContent;

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
        editCell(0);
        editCell(2);
        editCell(3);
    }
    document.forms.form.addEventListener("submit", addRow);

    const localStorageData = localStorage.getItem('tableData');
    const dataArray = JSON.parse(localStorageData);
    if (dataArray && dataArray.length) {
        removeDefaultRow();
        dataArray.forEach(element => {
            const newRow = table.insertRow(table.rows.length);
            newRow.innerHTML = formRowData(element);
        });
        sumValue();
        deleteRow();
    } else {
        const newRow = table.insertRow(table.rows.length);
        newRow.innerHTML = defaultRow;
    };

    editCell(0);
    editCell(2);
    editCell(3);
});
