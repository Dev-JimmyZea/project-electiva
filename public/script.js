const getProvidersApi = () => {
    document.getElementById('title').innerHTML = 'Proveedores';
    const url = 'http://localhost:3000/provider';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const providers = data.providers;
            loadTableProviders(providers);
        })
        .catch(error => console.log(error));
};

// const providers = [
//     {
//         "idProvider": "01",
//         "name": "Juan",
//         "lastName": "Zea Guarín",
//         "address": "Calle 1A #2-21 3piso",
//         "phone": "3213456789",
//         "email": "juanito02@gmail.com",
//     }
// ];

const loadTableProviders = (providers) => {
    const table = document.getElementById('table');
    table.innerHTML = '';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const th_id = document.createElement('th');
    th_id.innerHTML = 'Id Proveedor';
    const th_name = document.createElement('th');
    th_name.innerHTML = 'Nombre';
    const th_lastName = document.createElement('th');
    th_lastName.innerHTML = 'Apellido';
    const th_address = document.createElement('th');
    th_address.innerHTML = 'Dirección';
    const th_phone = document.createElement('th');
    th_phone.innerHTML = 'Teléfono';
    const th_email = document.createElement('th');
    th_email.innerHTML = 'Email';
    const th_actions = document.createElement('th');
    th_actions.innerHTML = 'Acciones';
    tr.appendChild(th_id);
    tr.appendChild(th_name);
    tr.appendChild(th_lastName);
    tr.appendChild(th_address);
    tr.appendChild(th_phone);
    tr.appendChild(th_email);
    tr.appendChild(th_actions);
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    providers.forEach(provider => {
        console.log(provider);
        const tr = document.createElement('tr');
        const td_id = document.createElement('td');
        td_id.innerHTML = provider.idProvider;
        const td_name = document.createElement('td');
        td_name.innerHTML = provider.name;
        const td_lastName = document.createElement('td');
        td_lastName.innerHTML = provider.lastName;
        const td_address = document.createElement('td');
        td_address.innerHTML = provider.address;
        const td_phone = document.createElement('td');
        td_phone.innerHTML = provider.phone;
        const td_email = document.createElement('td');
        td_email.innerHTML = provider.email;
        const td_actions = document.createElement('td');
        const btn_edit = document.createElement('button');
        btn_edit.innerHTML = 'Editar';
        btn_edit.classList.add('btn', 'btn-primary');
        // btn_edit.setAttribute('onclick', 'editProvider(this)');        
        btn_edit.setAttribute('data-toggle', 'modal');
        btn_edit.setAttribute('data-target', '#modal-object-edit');                                
        btn_edit.addEventListener('click', () => {
            editProvider(provider);
        });
        const btn_delete = document.createElement('button');
        btn_delete.innerHTML = 'Eliminar';
        btn_delete.classList.add('btn', 'btn-danger');
        btn_delete.addEventListener('click', () => {
            deleteProvider(provider);
        }
        );
        td_actions.appendChild(btn_edit);
        td_actions.appendChild(btn_delete);
        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_lastName);
        tr.appendChild(td_address);
        tr.appendChild(td_phone);
        tr.appendChild(td_email);
        tr.appendChild(td_actions);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
};

// crear formulario de proveedores para agregar al modal con id modal-add
const addProvider = () => {
    const modal = document.getElementById('modal-add');
    const form = document.createElement('form');
    form.setAttribute('id', 'form-add');
    form.onsubmit = onSubmitAddProvider;
    const div_form = document.createElement('div');
    div_form.classList.add('form-group');
    const label_id = document.createElement('label');
    label_id.innerHTML = 'Id Proveedor';
    const input_id = document.createElement('input');
    input_id.setAttribute('type', 'text');
    input_id.setAttribute('name', 'idProvider');
    input_id.setAttribute('id', 'idProvider');
    input_id.setAttribute('class', 'form-control');
    const label_name = document.createElement('label');
    label_name.innerHTML = 'Nombre';
    const input_name = document.createElement('input');
    input_name.setAttribute('type', 'text');
    input_name.setAttribute('name', 'name');
    input_name.setAttribute('class', 'form-control');
    const label_lastName = document.createElement('label');
    label_lastName.innerHTML = 'Apellido';
    const input_lastName = document.createElement('input');
    input_lastName.setAttribute('type', 'text');
    input_lastName.setAttribute('name', 'lastName');
    input_lastName.setAttribute('class', 'form-control');
    const label_address = document.createElement('label');
    label_address.innerHTML = 'Dirección';
    const input_address = document.createElement('input');
    input_address.setAttribute('type', 'text');
    input_address.setAttribute('name', 'address');
    input_address.setAttribute('class', 'form-control');
    const label_phone = document.createElement('label');
    label_phone.innerHTML = 'Teléfono';
    const input_phone = document.createElement('input');
    input_phone.setAttribute('type', 'text');
    input_phone.setAttribute('name', 'phone');
    input_phone.setAttribute('class', 'form-control');
    const label_email = document.createElement('label');
    label_email.innerHTML = 'Email';
    const input_email = document.createElement('input');
    input_email.setAttribute('type', 'text');
    input_email.setAttribute('name', 'email');
    input_email.setAttribute('class', 'form-control');
    const btn_submit = document.createElement('button');
    btn_submit.innerHTML = 'Agregar';
    btn_submit.classList.add('btn', 'btn-primary');
    btn_submit.setAttribute('type', 'submit');
    div_form.appendChild(label_id);
    div_form.appendChild(input_id);
    div_form.appendChild(label_name);
    div_form.appendChild(input_name);
    div_form.appendChild(label_lastName);
    div_form.appendChild(input_lastName);
    div_form.appendChild(label_address);
    div_form.appendChild(input_address);
    div_form.appendChild(label_phone);
    div_form.appendChild(input_phone);
    div_form.appendChild(label_email);
    div_form.appendChild(input_email);
    div_form.appendChild(btn_submit);
    form.appendChild(div_form);
    modal.appendChild(form);
};

// onsubmit del formulario de agregar proveedor
const onSubmitAddProvider = (event) => {
    event.preventDefault();
    const form = document.getElementById('form-add');
    const formData = new FormData(form);
    const provider = {
        idProvider: formData.get('idProvider'),
        name: formData.get('name'),
        lastName: formData.get('lastName'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        email: formData.get('email')
    };
    fetch('http://localhost:3000/provider', {
        method: 'POST',
        body: JSON.stringify(provider),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())

        .then(response => {
            if (response.message === 'Provider created successfully') {
                alert('Proveedor agregado correctamente');
                form.reset();
                getProvidersApi();
            } else {
                alert('Error al agregar proveedor');
            }
            const close = document.getElementById('close-modal-add');
            close.click();
        });
};

// crear formulario de proveedores para editar al modal con id modal-edit
const editProvider = (provider) => {
    console.log(provider);
    const modal = document.getElementById('modal-edit');
    modal.innerHTML = '';
    const form = document.createElement('form');
    form.setAttribute('id', 'form-edit');
    form.onsubmit = onSubmitEditProvider;
    const div_form = document.createElement('div');
    div_form.classList.add('form-group');
    const input_id_mongo = document.createElement('input');
    input_id_mongo.setAttribute('type', 'hidden');
    input_id_mongo.setAttribute('name', '_id');
    input_id_mongo.setAttribute('id', '_id');
    input_id_mongo.setAttribute('value', provider._id);

    const label_id = document.createElement('label');
    label_id.innerHTML = 'Id Proveedor';
    const input_id = document.createElement('input');
    input_id.setAttribute('type', 'text');
    input_id.setAttribute('name', 'idProvider');
    input_id.setAttribute('id', 'idProvider');
    input_id.setAttribute('class', 'form-control');
    input_id.value = provider.idProvider;
    const label_name = document.createElement('label');
    label_name.innerHTML = 'Nombre';
    const input_name = document.createElement('input');
    input_name.setAttribute('type', 'text');
    input_name.setAttribute('name', 'name');
    input_name.setAttribute('class', 'form-control');
    input_name.value = provider.name;
    const label_lastName = document.createElement('label');
    label_lastName.innerHTML = 'Apellido';
    const input_lastName = document.createElement('input');
    input_lastName.setAttribute('type', 'text');
    input_lastName.setAttribute('name', 'lastName');
    input_lastName.setAttribute('class', 'form-control');
    input_lastName.value = provider.lastName;
    const label_address = document.createElement('label');
    label_address.innerHTML = 'Dirección';
    const input_address = document.createElement('input');
    input_address.setAttribute('type', 'text');
    input_address.setAttribute('name', 'address');
    input_address.setAttribute('class', 'form-control');
    input_address.value = provider.address;
    const label_phone = document.createElement('label');
    label_phone.innerHTML = 'Teléfono';
    const input_phone = document.createElement('input');
    input_phone.setAttribute('type', 'text');
    input_phone.setAttribute('name', 'phone');
    input_phone.setAttribute('class', 'form-control');
    input_phone.value = provider.phone;
    const label_email = document.createElement('label');
    label_email.innerHTML = 'Email';
    const input_email = document.createElement('input');
    input_email.setAttribute('type', 'text');
    input_email.setAttribute('name', 'email');
    input_email.setAttribute('class', 'form-control');
    input_email.value = provider.email;
    const btn_submit = document.createElement('button');
    btn_submit.innerHTML = 'Editar';
    btn_submit.classList.add('btn', 'btn-primary');
    btn_submit.setAttribute('type', 'submit');
    div_form.appendChild(input_id_mongo);
    div_form.appendChild(label_id);
    div_form.appendChild(input_id);
    div_form.appendChild(label_name);
    div_form.appendChild(input_name);
    div_form.appendChild(label_lastName);
    div_form.appendChild(input_lastName);
    div_form.appendChild(label_address);
    div_form.appendChild(input_address);
    div_form.appendChild(label_phone);
    div_form.appendChild(input_phone);
    div_form.appendChild(label_email);
    div_form.appendChild(input_email);
    div_form.appendChild(btn_submit);
    form.appendChild(div_form);
    modal.appendChild(form);    
};

// onsubmit del formulario de editar proveedor
const onSubmitEditProvider = (event) => {
    console.log(event);
    event.preventDefault();
    const form = document.getElementById('form-edit');
    const formData = new FormData(form);
    const provider = {
        _id: formData.get('_id'),
        idProvider: formData.get('idProvider'),
        name: formData.get('name'),
        lastName: formData.get('lastName'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        email: formData.get('email')
    };
    fetch(`http://localhost:3000/provider/${provider._id}`, {
        method: 'PUT',
        body: JSON.stringify(provider),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())

        .then(response => {
            if (response.message === 'Provider replaced successfully') {
                alert('Proveedor editado correctamente');
                form.reset();
                getProvidersApi();
            } else {
                alert('Error al editar proveedor');
            }
            const btn_close = document.getElementById('close-modal-edit');
            btn_close.click();
        })
    .catch(error => console.log(error));

};

const getProductsApi = () => {
    document.getElementById('title').innerHTML = 'Productos';

    const url = 'http://localhost:3000/product';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            console.log(products);
            loadTableProducts(products);
        });
};

// const products = [
//     {
//         "idProduct": "01",
//         "description": "Guarapo",
//         "value": 2000,
//         "stock": 250,
//         "dateExpired": "2025-01-01T00:00:00.000Z",
//         "typeProduct": "VIVERES",
//         "provider": {
//             "idProvider": "01",
//             "name": "Juan",
//             "lastName": "Zea Guarín",
//         },
//     }
// ];

const loadTableProducts = (products) => {
    const table = document.getElementById('table');
    table.innerHTML = '';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const th_id = document.createElement('th');
    th_id.innerHTML = 'Id Producto';
    const th_description = document.createElement('th');
    th_description.innerHTML = 'Descripción';
    const th_value = document.createElement('th');
    th_value.innerHTML = 'Valor';
    const th_stock = document.createElement('th');
    th_stock.innerHTML = 'Stock';
    const th_dateExpired = document.createElement('th');
    th_dateExpired.innerHTML = 'Fecha Vencimiento';
    const th_typeProduct = document.createElement('th');
    th_typeProduct.innerHTML = 'Tipo Producto';
    const th_provider = document.createElement('th');
    th_provider.innerHTML = 'Proveedor';
    const th_actions = document.createElement('th');
    th_actions.innerHTML = 'Acciones';
    tr.appendChild(th_id);
    tr.appendChild(th_description);
    tr.appendChild(th_value);
    tr.appendChild(th_stock);
    tr.appendChild(th_dateExpired);
    tr.appendChild(th_typeProduct);
    tr.appendChild(th_provider);
    tr.appendChild(th_actions);
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    products.forEach(product => {
        console.log(product);
        const tr = document.createElement('tr');
        const td_id = document.createElement('td');
        td_id.innerHTML = product.idProduct;
        const td_description = document.createElement('td');
        td_description.innerHTML = product.description;
        const td_value = document.createElement('td');
        td_value.innerHTML = product.value;
        const td_stock = document.createElement('td');
        td_stock.innerHTML = product.stock;
        const td_dateExpired = document.createElement('td');
        td_dateExpired.innerHTML = product.dateExpired;
        const td_typeProduct = document.createElement('td');
        td_typeProduct.innerHTML = product.typeProduct;
        const td_provider = document.createElement('td');
        td_provider.innerHTML = product.provider.name + ' ' + product.provider.lastName;
        const td_actions = document.createElement('td');
        const btn_edit = document.createElement('button');
        btn_edit.innerHTML = 'Editar';
        btn_edit.classList.add('btn', 'btn-primary');
        btn_edit.addEventListener('click', () => {
            editProduct(product);
        }
        );
        const btn_delete = document.createElement('button');
        btn_delete.innerHTML = 'Eliminar';
        btn_delete.classList.add('btn', 'btn-danger');
        btn_delete.addEventListener('click', () => {
            deleteProduct(product);
        }
        );
        td_actions.appendChild(btn_edit);
        td_actions.appendChild(btn_delete);
        tr.appendChild(td_id);
        tr.appendChild(td_description);
        tr.appendChild(td_value);
        tr.appendChild(td_stock);
        tr.appendChild(td_dateExpired);
        tr.appendChild(td_typeProduct);
        tr.appendChild(td_provider);
        tr.appendChild(td_actions);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
};


const getDetailsApi = () => {
    document.getElementById('title').innerHTML = 'Detalles';

    const url = `http://localhost:3000/detail`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const details = data.details;
            console.log(details);
            loadTableDetails(details);
        });
};

// const details = [
//     {
//         "code": "01",
//         "cant": 50,
//         "subtotal": 119000,
//         "product": {
//             "idProduct": "01",
//             "description": "Guarapo",
//         },
//     }
// ];

const loadTableDetails = (details) => {
    const table = document.getElementById('table');
    table.innerHTML = '';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const th_code = document.createElement('th');
    th_code.innerHTML = 'Código';
    const th_cant = document.createElement('th');
    th_cant.innerHTML = 'Cantidad';
    const th_subtotal = document.createElement('th');
    th_subtotal.innerHTML = 'Subtotal';
    const th_product = document.createElement('th');
    th_product.innerHTML = 'Producto';
    const th_actions = document.createElement('th');
    th_actions.innerHTML = 'Acciones';
    tr.appendChild(th_code);
    tr.appendChild(th_cant);
    tr.appendChild(th_subtotal);
    tr.appendChild(th_product);
    tr.appendChild(th_actions);
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    details.forEach(detail => {
        console.log(detail);
        const tr = document.createElement('tr');
        const td_code = document.createElement('td');
        td_code.innerHTML = detail.code;
        const td_cant = document.createElement('td');
        td_cant.innerHTML = detail.cant;
        const td_subtotal = document.createElement('td');
        td_subtotal.innerHTML = detail.subtotal;
        const td_product = document.createElement('td');
        td_product.innerHTML = detail.product.description;
        const td_actions = document.createElement('td');
        const btn_edit = document.createElement('button');
        btn_edit.innerHTML = 'Editar';
        btn_edit.classList.add('btn', 'btn-primary');
        btn_edit.addEventListener('click', () => {
            editDetail(detail);
        }
        );
        const btn_delete = document.createElement('button');
        btn_delete.innerHTML = 'Eliminar';
        btn_delete.classList.add('btn', 'btn-danger');
        btn_delete.addEventListener('click', () => {
            deleteDetail(detail);
        }
        );
        td_actions.appendChild(btn_edit);
        td_actions.appendChild(btn_delete);
        tr.appendChild(td_code);
        tr.appendChild(td_cant);
        tr.appendChild(td_subtotal);
        tr.appendChild(td_product);
        tr.appendChild(td_actions);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
};

const getCustomersApi = () => {
    document.getElementById('title').innerHTML = 'Clientes';
    const url = 'http://localhost:3000/customer';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const customers = data.customers;
            console.log(customers);
            loadTableCustomers(customers);
        });
};

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

const loadTableCustomers = (customers) => {
    const table = document.getElementById('table');
    table.innerHTML = '';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const th_idCustomer = document.createElement('th');
    th_idCustomer.innerHTML = 'ID';
    const th_name = document.createElement('th');
    th_name.innerHTML = 'Nombre';
    const th_lastName = document.createElement('th');
    th_lastName.innerHTML = 'Apellido';
    const th_address = document.createElement('th');
    th_address.innerHTML = 'Dirección';
    const th_phone = document.createElement('th');
    th_phone.innerHTML = 'Teléfono';
    const th_email = document.createElement('th');
    th_email.innerHTML = 'Email';
    const th_actions = document.createElement('th');
    th_actions.innerHTML = 'Acciones';
    tr.appendChild(th_idCustomer);
    tr.appendChild(th_name);
    tr.appendChild(th_lastName);
    tr.appendChild(th_address);
    tr.appendChild(th_phone);
    tr.appendChild(th_email);
    tr.appendChild(th_actions);
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    customers.forEach(customer => {
        console.log(customer);
        const tr = document.createElement('tr');
        const td_idCustomer = document.createElement('td');
        td_idCustomer.innerHTML = customer.idCustomer;
        const td_name = document.createElement('td');
        td_name.innerHTML = customer.name;
        const td_lastName = document.createElement('td');
        td_lastName.innerHTML = customer.lastName;
        const td_address = document.createElement('td');
        td_address.innerHTML = customer.address;
        const td_phone = document.createElement('td');
        td_phone.innerHTML = customer.phone;
        const td_email = document.createElement('td');
        td_email.innerHTML = customer.email;
        const td_actions = document.createElement('td');
        const btn_edit = document.createElement('button');
        btn_edit.innerHTML = 'Editar';
        btn_edit.classList.add('btn', 'btn-primary');
        btn_edit.addEventListener('click', () => {
            editCustomer(customer);
        }
        );
        const btn_delete = document.createElement('button');
        btn_delete.innerHTML = 'Eliminar';
        btn_delete.classList.add('btn', 'btn-danger');
        btn_delete.addEventListener('click', () => {
            deleteCustomer(customer);
        }
        );
        td_actions.appendChild(btn_edit);
        td_actions.appendChild(btn_delete);
        tr.appendChild(td_idCustomer);
        tr.appendChild(td_name);
        tr.appendChild(td_lastName);
        tr.appendChild(td_address);
        tr.appendChild(td_phone);
        tr.appendChild(td_email);
        tr.appendChild(td_actions);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
};


const getBillsApi = () => {
    document.getElementById('title').innerHTML = 'Facturas';
    const url = 'http://localhost:3000/bill';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const bills = data.bills;
            console.log(bills);
            loadTableBills(bills);
        });
};


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

const loadTableBills = (bills) => {
    const table = document.getElementById('table');
    table.innerHTML = '';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const th_number = document.createElement('th');
    th_number.innerHTML = 'Número';
    const th_dateBill = document.createElement('th');
    th_dateBill.innerHTML = 'Fecha';
    const th_isPaid = document.createElement('th');
    th_isPaid.innerHTML = 'Pagada';
    const th_customer = document.createElement('th');
    th_customer.innerHTML = 'Cliente';
    const th_actions = document.createElement('th');
    th_actions.innerHTML = 'Acciones';
    tr.appendChild(th_number);
    tr.appendChild(th_dateBill);
    tr.appendChild(th_isPaid);
    tr.appendChild(th_customer);
    tr.appendChild(th_actions);
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    bills.forEach(bill => {
        console.log(bill);
        const tr = document.createElement('tr');
        const td_number = document.createElement('td');
        td_number.innerHTML = bill.number;
        const td_dateBill = document.createElement('td');
        td_dateBill.innerHTML = bill.dateBill;
        const td_isPaid = document.createElement('td');
        td_isPaid.innerHTML = bill.isPaid ? 'Si' : 'No';
        const td_customer = document.createElement('td');
        td_customer.innerHTML = bill.customer.name + ' ' + bill.customer.lastName;
        const td_actions = document.createElement('td');
        const btn_edit = document.createElement('button');
        btn_edit.innerHTML = 'Editar';
        btn_edit.classList.add('btn', 'btn-primary');
        btn_edit.addEventListener('click', () => {
            editBill(bill);
        }
        );
        const btn_delete = document.createElement('button');
        btn_delete.innerHTML = 'Eliminar';
        btn_delete.classList.add('btn', 'btn-danger');
        btn_delete.addEventListener('click', () => {
            deleteBill(bill);
        }
        );
        td_actions.appendChild(btn_edit);
        td_actions.appendChild(btn_delete);
        tr.appendChild(td_number);
        tr.appendChild(td_dateBill);
        tr.appendChild(td_isPaid);
        tr.appendChild(td_customer);
        tr.appendChild(td_actions);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
};

const getProductsByProviderApi = (id) => {
    const url = `http://localhost:3000/product/provider/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            loadDatesTable(products);
        });
};


getProvidersApi();
addProvider();