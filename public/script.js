'use strict';

// object = ['provider', 'product', 'detail', 'customer', 'bill']

const getDatas = async (url, object) => {
    let response = await fetch(url);
    let data = await response.json();
    loadDatasInTable(data, object);
    loadSelects(object);
}

const loadSelects = async (object) => {
    let form = document.getElementById('form-' + object);
    let inputs = form.querySelectorAll('input');
    let selects = form.querySelectorAll('select');

    if (object === 'product') {
        let response = await fetch('http://localhost:3000/provider');
        let providers = await response.json();
        providers.data.forEach(provider => {
            let option = document.createElement('option');
            option.value = provider.idProvider;
            option.innerHTML = provider.idProvider + ' : ' + provider.name + ' ' + provider.lastName;
            selects[1].appendChild(option);
        });
    } else if (object === 'detail') {
        let response = await fetch('http://localhost:3000/product');
        let products = await response.json();
        products.data.forEach(product => {
            let option = document.createElement('option');
            option.value = product.idProduct;
            option.innerHTML = product.idProduct + ' : ' + product.description
            selects[0].appendChild(option);
        });
    } else if (object === 'bill') {
        let response = await fetch('http://localhost:3000/customer');
        let customers = await response.json();
        customers.data.forEach(customer => {
            let option = document.createElement('option');
            option.value = customer.idCustomer;
            option.innerHTML = customer.idCustomer + ' : ' + customer.name + ' ' + customer.lastName;
            selects[1].appendChild(option);
        });
    }
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
    console.log(datas);
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
                <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal-provider-edit" onclick="editData('${object}', '${data.idProvider}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteData('${object}', '${data.idProvider}')">Eliminar</button>
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
                data-target="#modal-product-edit" onclick="editData('${object}', '${data.idProduct}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteData('${object}', '${data.idProduct}')">Eliminar</button>
            </td>
        `
                    : object === 'detail' ?
                        `
            <td>${data.code}</td>
            <td>${data.cant}</td>
            <td>${data.product.description}</td>
            <td>
                <button class="btn btn-primary btn-sm" data-toggle="modal"
                data-target="#modal-detail-edit" onclick="editData('${object}', '${data.code}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteData('${object}', '${data.code}')">Eliminar</button>
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
                data-target="#modal-customer-edit" onclick="editData('${object}', '${data.idCustomer}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteData('${object}', '${data.idCustomer}')">Eliminar</button>
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
                data-target="#modal-bill-edit" onclick="editData('${object}', '${data.number}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteData('${object}', '${data.number}')">Eliminar</button>
            </td>
        `
                                : '';

        tbody.appendChild(tr);
    });
}

const createData = async (event, object) => {
    event.preventDefault();
    let data = {};
    let form = document.getElementById('form-' + object);
    let inputs = form.querySelectorAll('input');
    let selects = form.querySelectorAll('select');

    inputs.forEach(input => {
        data[input.name] = input.value;
    });

    let idCreate = '';
    selects.forEach(select => {
        console.log(select.value);
        idCreate = select.value;
        data[select.name] = select.value;
    });


    console.log(data);
    // alert('Se ha creado un nuevo ' + JSON.stringify(data));
    console.log(object);
    const url = object === ('provider' || 'customer')  ? `http://localhost:3000/${object}` : `http://localhost:3000/${object}/${idCreate}`;
    console.log(url);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(response => {
            console.log(response);
            getDatas('http://localhost:3000/' + object, object);
            const close = document.getElementById('close-modal-' + object);
            close.click();
        });
};

const deleteData = (object, id) => {
    let url = `http://localhost:3000/${object}/${id}`;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            alert('Se elimino correctamente');
            getDatas('http://localhost:3000/' + object, object);

        })

        .catch(err => console.log(err));
};

const getData = async (object, id) => {
    let response = await fetch(`http://localhost:3000/${object}/${id}`);
    let data = await response.json();
    return data;
}

const filterDataAndLoadTable = async (object) => {
    const id = document.getElementById('search-' + object).value;
    let data = await getData(object, id);
    let datos = data.data;
    let array = [];
    array.push(datos);
    data.data = array;
    loadDatasInTable(data, object);
};

let idMongo = '';

const editData = async (object, id) => {
    let data = await getData(object, id);
    data = data.data;
    idMongo = data._id;
    console.log(data);
    let modal = document.getElementById('modal-' + object + '-edit');
    let form = modal.querySelector('form');
    let inputs = form.querySelectorAll('input');
    let selects = form.querySelectorAll('select');

    console.log(selects);

    if (object === 'provider') {
        inputs[0].value = data.idProvider;
        inputs[1].value = data.name;
        inputs[2].value = data.lastName;
        inputs[3].value = data.address;
        inputs[4].value = data.phone;
        inputs[5].value = data.email;
    } else if (object === 'product') {
        inputs[0].value = data.idProduct;
        inputs[1].value = data.description;
        inputs[2].value = data.value;
        inputs[3].value = data.stock;
        inputs[4].value = new Date(data.dateExpired).toISOString().substr(0, 10);
        selects[0].value = data.typeProduct;

        let response = await fetch('http://localhost:3000/provider');
        let providers = await response.json();
        providers.data.forEach(provider => {
            let option = document.createElement('option');
            option.value = provider._id;
            option.innerHTML = provider.idProvider + ' : ' + provider.name + ' ' + provider.lastName;
            selects[1].appendChild(option);
        });
        console.log(data.provider);


    } else if (object === 'detail') {
        inputs[0].value = data.code;
        let response = await fetch('http://localhost:3000/product');
        let products = await response.json();
        products.data.forEach(product => {
            let option = document.createElement('option');
            option.value = product._id;
            option.innerHTML = product.idProduct + ' : ' + product.description;
            selects[0].appendChild(option);
        });

        inputs[1].value = data.cant;
    } else if (object === 'customer') {
        inputs[0].value = data.idCustomer;
        inputs[1].value = data.name;
        inputs[2].value = data.lastName;
        inputs[3].value = data.address;
        inputs[4].value = data.phone;
        inputs[5].value = data.email;
    } else if (object === 'bill') {
        inputs[0].value = data.number;
        let response = await fetch('http://localhost:3000/customer');
        let customers = await response.json();

        customers.data.forEach(customer => {
            let option = document.createElement('option');
            option.value = customer._id;
            option.innerHTML = customer.idCustomer + ' : ' + customer.name + ' ' + customer.lastName;
            selects[1].appendChild(option);
        });


        inputs[1].value = new Date(data.dateBill).toISOString().substr(0, 10);
        selects[0].value = data.isPaid;
    }
}

const replaceData = async (event, object) => {
    event.preventDefault();
    let modal = document.getElementById('modal-' + object + '-edit');
    let form = modal.querySelector('form');
    let inputs = form.querySelectorAll('input');
    let selects = form.querySelectorAll('select');
    let data = {};
    inputs.forEach(input => {
        data[input.name] = input.value;
    });

    selects.forEach(select => {
        data[select.name] = select.value;
    });

    let response = await fetch(`http://localhost:3000/${object}/${idMongo}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let dataResponse = await response.json();
    console.log(dataResponse.message.split(' ')[0]);
    if (dataResponse.message.split(' ')[0] !== 'Failed') {
        alert('Actualizado');
        getDatas('http://localhost:3000/' + object, object);
        const close = document.getElementById('close-modal-edit-' + object);
        close.click();

    } else {
        alert('Error');
    }

}

const onload = async object => {
    await getDatas('http://localhost:3000/' + object, object);
}