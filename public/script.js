'use strict';

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


        let response2 = await fetch('http://localhost:3000/detail');
        let details = await response2.json();
        details.data.forEach(detail => {
            let option = document.createElement('option');
            option.value = detail.code;
            option.innerHTML = detail.code;
            document.getElementById('detailForBill').appendChild(option);
        });


        let response3 = await fetch('http://localhost:3000/bill');
        let bills = await response3.json();
        bills.data.forEach(bill => {
            let option = document.createElement('option');
            option.value = bill.number;
            option.innerHTML = bill.number;
            document.getElementById('billForDetail').appendChild(option);
        });
    }
}

const loadDatasInTable = (datas, object) => {
    let table = document.getElementById('table-' + object);
    let tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
    datas.data.forEach(data => {
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
        idCreate = select.value;
        data[select.name] = select.value;
    });

    const url = object === ('provider' || 'customer') ? `http://localhost:3000/${object}` : `http://localhost:3000/${object}/${idCreate}`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(response => {
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
    console.log(data)
    object === 'product' ? others(data.data[0]) : object === 'detail' ? subtotal(data.data[0]) : object === 'bill' ? total(data.data[0]) : '';
    getDetailsForBills(id);
    getBillsForCustomer(id, object);

};

const others = async (datas) => {

    let url = `http://localhost:3000/product/iva/${datas.idProduct}`
    fetch(url).then(response => response.json())
        .then(data =>
            // console.log(data.data)
            document.getElementById('iva').value = data.data
        )
        .catch(error => console.log(error))


    url = `http://localhost:3000/product/expired/${datas.idProduct}`
    fetch(url).then(response => response.json())
        .then(data =>
            document.getElementById('expired').value = data.message
        )
        .catch(error => console.log(error))

}


const subtotal = async (datas) => {
    let url = `http://localhost:3000/detail/subtotal/${datas.code}`
    fetch(url).then(response => response.json())
        .then(data =>
            document.getElementById('subtotal').value = data.data
        )
        .catch(error => console.log(error))
}

const total = async (datas) => {
    let url = `http://localhost:3000/bill/total/${datas.number}`
    fetch(url).then(response => response.json())
        .then(data =>
            document.getElementById('total').value = data.data
        )
        .catch(error => console.log(error))
}

const addDetailInBill = async (event) => {
    event.preventDefault();
    let form = document.getElementById('form-detail-bill');
    let selects = form.querySelectorAll('select');

    let idCreate = [];
    selects.forEach(select => {
        idCreate.push(select.value);
    });
    console.log(idCreate);

    let url = `http://localhost:3000/bill/${idCreate[1]}/${idCreate[0]}`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            selects[0].value = '';
            selects[1].value = '';
            alert(data.message)
        })
        .catch(error => console.log(error))
}


let idMongo = '';

const editData = async (object, id) => {
    let data = await getData(object, id);
    data = data.data;
    idMongo = data._id;
    let modal = document.getElementById('modal-' + object + '-edit');
    let form = modal.querySelector('form');
    let inputs = form.querySelectorAll('input');
    let selects = form.querySelectorAll('select');

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

const getDetailsForBills = async (id) => {
    await fetch('http://localhost:3000/bill/details/' + id)
        .then(response => response.json())
        .then(data => {
            let output = '';
            data.data.forEach(detail => {
                output += `<tr>
                <td>${detail.code}</td>
                <td>${detail.cant}</td>
                <td>${detail.subtotal}</td>
                </tr>`;
            });
            document.getElementById('tbody-detail-bill').innerHTML = output;
        })
};

const getBillsForCustomer = async (id, object) => {
    let data = await getData(object, id);
    let output = '';
    console.log(data);
    data.data.bills.forEach(bill => {
        output += `
        <tr>
            <td>${bill.number}</td>
            <td>${bill.dateBill}</td>
            <td>${bill.isPaid ? 'Si' : 'No'}</td>
        </tr>`;
    });
    document.getElementById('tbody-bill-customer').innerHTML = output;

};