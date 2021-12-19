'use strict';

// object = ['provider', 'product', 'detail', 'customer', 'bill']

const getDatas = (url, object) => {
    fetch(url)
        .then(response => response.json())
        .then(datas => loadDatasInTable(datas, object))
        .catch(error => console.error(error));
}

// <!-- const providers = [
//     {
//     "idProvider": "01",
//     "name": "Juan",
//     "lastName": "Zea Guarín",
//     "address": "Calle 1A #2-21 3piso",
//     "phone": "3213456789",
//     "email": "juanito02@gmail.com",
//     }
//     ]; -->

// <!-- const products = [
//     {
//     "idProduct": "01",
//     "description": "Guarapo",
//     "value": 2000,
//     "stock": 250,
//     "dateExpired": "2025-01-01T00:00:00.000Z",
//     "typeProduct": "VIVERES",
//     "provider": {
//     "idProvider": "01",
//     "name": "Juan",
//     "lastName": "Zea Guarín",
//     },
//     }
//     ]; -->

// <!-- 
// const details = [
// {
// "code": "01",
// "cant": 50,
// "product": {
// "idProduct": "01",
// "description": "Guarapo",
// },
// }
// ]; -->

// const customers = [
//     {
//         "idCustomer": "01",
//         "name": "Patricia",
//         "lastName": "teheran",
//         "address": "Carrera 3 con calle 4 #3-32",
//         "phone": "3103458976",
//         "email": "patico@gmail.com",
//     }
// ]; 


// const bills= [
//     {
//         "number": "01",
//         "dateBill": "2022-10-01T00:00:00.000Z",
//         "isPaid": true,
//         "customer": {
//             "idCustomer": "01",
//             "name": "Patricia",
//             "lastName": "teheran",
//         }
//     }
// ];

const loadDatasInTable = (datas, object) => {
    let table = document.getElementById('table-' + object);
    let tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
    datas.data.forEach(data => {
        console.log(data);
        let tr = document.createElement('tr');
        tr.innerHTML =
            object === 'provider' ?
                `
            <td>${data.idProvider}</td>
            <td>${data.name}</td>
            <td>${data.lastName}</td>
            <td>${data.address}</td>
            <td>${data.phone}</td>
            <td>${data.email}</td>
            <td>
                <button class="btn btn-primary btn-sm" data-toggle="modal"
                data-target="#modal-provider-edit" onclick="editData('${object}', '${JSON.stringify(data)}')"> Editar </button>
                <button class="btn btn-danger btn-sm" onclick="deleteData('${object}', '${data.id}')">Eliminar</button>
            </td>
        `
                :
                object === 'product' ?
                    `
            <td>${data.idProduct}</td>
            <td>${data.description}</td>
            <td>${data.value}</td>
            <td>${data.stock}</td>
            <td>${data.dateExpired}</td>
            <td>${data.typeProduct}</td>
            <td>${data.provider.name + ' ' + data.provider.lastName}</td>
            <td>
                <button class="btn btn-primary btn-sm" data-toggle="modal"
                data-target="#modal-product-edit" onclick="editData('${object}', '${JSON.stringify(data)}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteData('${object}', '${data.id}')">Eliminar</button>
            </td>
        `
                    : object === 'detail' ?
                        `
            <td>${data.code}</td>
            <td>${data.cant}</td>
            <td>${data.product.description}</td>
            <td>
                <button class="btn btn-primary btn-sm" data-toggle="modal"
                data-target="#modal-detail-edit" onclick="editData('${object}', '${JSON.stringify(data)}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteData('${object}', '${data.id}')">Eliminar</button>
            </td>
        `
                        : object === 'customer' ?
                            `
            <td>${data.idCustomer}</td>
            <td>${data.name}</td>
            <td>${data.lastName}</td>
            <td>${data.address}</td>
            <td>${data.phone}</td>
            <td>${data.email}</td>
            <td>
                <button class="btn btn-primary btn-sm" data-toggle="modal"
                data-target="#modal-customer-edit" onclick="editData('${object}', '${JSON.stringify(data)}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteData('${object}', '${data.id}')">Eliminar</button>
            </td>
        `
                            : object === 'bill' ?
                                `
            <td>${data.number}</td>
            <td>${data.dateBill}</td>
            <td>${data.isPaid ? 'Si' : 'No'}</td>
            <td>${data.customer.name + ' ' + data.customer.lastName}</td>
            <td>
                <button class="btn btn-primary btn-sm" data-toggle="modal"
                data-target="#modal-bill-edit" onclick="editData('${object}', '${JSON.stringify(data)}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteData('${object}', '${data.id}')">Eliminar</button>
            </td>
        `
                                : '';


        tbody.appendChild(tr);

    });
}



const editData = (object, data) => {
    console.log(data);
    console.log(object);
    console.log(JSON.parse(data));
    data = JSON.parse(data);
    let modal = document.getElementById('modal-' + object + '-edit');
    let form = modal.querySelector('form');
    let inputs = form.querySelectorAll('input');
    let selects = form.querySelectorAll('select');
    let textAreas = form.querySelectorAll('textarea');
    let idInput = form.querySelector(`input[name="id-${object}-edit"]`);
    // id-provider-edit
    let idSelect = form.querySelector('select[name="id"]');
    let idTextArea = form.querySelector('textarea[name="id"]');
    let idButton = form.querySelector('button[type="submit"]');

    if (object === 'provider') {
        idInput.value = data.idProvider;
        inputs[0].value = data.name;
        inputs[1].value = data.lastName;
        inputs[2].value = data.address;
        inputs[3].value = data.phone;
        inputs[4].value = data.email;
        idButton.innerHTML = 'Actualizar';
    } else if (object === 'product') {
        idSelect.value = data.idProvider;
        idInput.value = data.idProduct;
        inputs[0].value = data.description;
        inputs[1].value = data.value;
        inputs[2].value = data.stock;
        inputs[3].value = data.dateExpired;
        selects[0].value = data.typeProduct;
        idButton.innerHTML = 'Actualizar';
    } else if (object === 'detail') {
        idInput.value = data.code;
        idSelect.value = data.product.idProduct;
        inputs[0].value = data.cant;
        idButton.innerHTML = 'Actualizar';
    } else if (object === 'customer') {
        idInput.value = data.idCustomer;
        inputs[0].value = data.name;
        inputs[1].value = data.lastName;
        inputs[2].value = data.address;
        inputs[3].value = data.phone;
        inputs[4].value = data.email;
        idButton.innerHTML = 'Actualizar';
    } else if (object === 'bill') {
        idInput.value = data.number;
        idSelect.value = data.customer.idCustomer;
        inputs[0].value = data.dateBill;
        inputs[1].value = data.isPaid;
        idButton.innerHTML = 'Actualizar';
    }
}

const onload = object => {
    getDatas('http://localhost:3000/' + object, object);
}