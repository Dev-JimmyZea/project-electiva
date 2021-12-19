#Taller colaborativo Electiva II

Integrantes: Jimmy Zea, Felipe Suárez, Esteban Duarte

Instrucciones para el correcto funcionamiento:

Una vez clonado el repositorio, se accederá a la carpeta de este y se hara un "npm i" para instalar las dependencias correspondientes, y posterior a esto se hará un "npm run start" para ejecutarlo, con estos dos comandos quedará listo para consumir los servicios de la API.

La API está escuchando por el puerto 3000

Link rutas en postman: https://documenter.getpostman.com/view/12901523/UVJiiuDP

Rutas Objeto product: 

1. localhost:3000/product tipo POST (crear producto):
    Para crear un producto se necesita que en el body se envie como raw y formato JSON los siguientes campos:
        {
            "idProduct": "01",
            "description": "Cocacola",
            "value": 2500,
            "stock": 100,
            "dateExpired": "2025-01-01",
            "typeProduct": "VIVERES"
        }

    El typeProduct puede ir tanto en minusculas como mayusculas y solo acepta VIVERES, ASEO, MEDICAMENTOS y LICORES
    Y el idProduct es un campo unico, si se repite arrojara un error indicando que está duplicado su valor

2. localhost:3000/product tipo GET (obtener todos los productos)
    Para obtener todos los productos solo se necesita enviar la ruta anteriormente mencionada, si se encuentra vacio traerá un arreglo vacío.

3. localhost:3000/product/:idProduct tipo GET (Obtener un producto)
    Para obtener un producto se necesita del idProdcut de este, ejemplo: obtener el producto con el idProduct="01", la ruta sería localhost:3000/product/01

    Si el idProduct indicado no se encuentra mostrará un mensaje indicado esto.

4. localhost:3000/product/:id tipo PUT (reemplazar un producto):
    Para reemplazar el producto se necesita el id del producto que asigna mongo y enviar los campos a reemplazar en el body como raw tipo JSON, ejemplo: reemplazar el producto con id="61b204432d37195b6fc641d5" lo que se hace es enviar la ruta como localhost:3000/product/61b204432d37195b6fc641d5 y en el body:
        {
            "idProduct": "02",
            "description": "Cerveza",
            "value": 2200,
            "stock": 120,
            "dateExpired": "2026-01-01",
            "typeProduct": "LICORES"
        }

    Si el idProduct indicado no se encuentra mostrará un mensaje indicado esto.


5. localhost:3000/product/:id tipo PATCH (actualizar un producto):
    Para actualizar el producto se necesita el id del producto que asigna mongo y enviar los campos a reemplazar en el body como raw tipo JSON, ejemplo: actualizar el producto con id="61b204432d37195b6fc641d5" lo que se hace es enviar la ruta como localhost:3000/product/61b204432d37195b6fc641d5 y en el body:
        {
            "description": "Cerveza Poker",
            "value": 2600,
            "stock": 180
        }    

6. localhost:3000/product/:idProduct tipo DELETE (eliminar un producto):
    Para eliminar un producto se necesita del idProdcut de este, ejemplo: eliminar el producto con el idProduct="02", la ruta sería localhost:3000/product/01

    Si el idProduct indicado no se encuentra mostrará un mensaje indicado esto.

7. localhost:3000/product/expired/:idProduct tipo GET (Saber si un producto ha expirado o no)
    Para saber si un producto ha expirado o no se necesita del idProduct de este, ejemplo: saber si el producto con el idProduct="01", ya expiró la ruta sería localhost:3000/product/expired/01

    Esto mostrará un mensaje indicando si ya vencio y hace cuantos días, si no ha expirado indicará cuantos días faltan para que este expire.

    Si el idProduct indicado no se encuentra mostrará un mensaje indicado esto.

8. localhost:3000/product/iva/:idProduct tipo GET (calcular el iva de un producto)
    Para calcular el iva de un producto se necesita del idProduct de este, ejemplo: calcular el iva del producto con el idProduct="01", la ruta sería localhost:3000/product/iva/01

    Esto mostrará un mensaje indicando el iva del producto

    Si el idProduct indicado no se encuentra mostrará un mensaje indicado esto.

Rutas Objeto Detail: 

1. localhost:3000/detail/:idProduct tipo POST (crear detalle):
    Para crear un detalle se necesita del idProduct en la ruta y que en el body se envie como raw y formato JSON los campos correspondientes, ej: agregar un detalle para el producto con idProduct="01", la ruta sería localhost:3000/detail/01 y en el body:
        {
            "code": "01",
            "cant": 15
        }
    
    El campo cant no puede superar la cantidad de stock que tiene el producto ni puede superar el STOCK MINIMO que es de 5, si pasa esto mostrará un error indicando lo anterior

    Y el code es un campo unico, si se repite arrojara un error indicando que está duplicado su valor

2. localhost:3000/detail tipo GET (obtener todos los detalles)
    Para obtener todos los detalles solo se necesita enviar la ruta anteriormente mencionada, si se encuentra vacio traerá un arreglo vacío.

3. localhost:3000/detail/:code tipo GET (Obtener un detalle)
    Para obtener un detalle se necesita del code de este, ejemplo: obtener el detalle con el code="01", la ruta sería localhost:3000/detail/01

    Si el code indicado no se encuentra mostrará un mensaje indicado esto.

4. localhost:3000/detail/:id tipo PUT (reemplazar un detalle):
    Para reemplazar el detalle se necesita el id del detalle que asigna mongo y enviar los campos a reemplazar en el body como raw tipo JSON, ejemplo: reemplazar el detalle con id="61b204432d371235b6fc641d5" lo que se hace es enviar la ruta como localhost:3000/detail/61b204432d371235b6fc641d5 y en el body:
        {
            "code": "001",
            "cant": 15
        }

    Si el code indicado no se encuentra mostrará un mensaje indicado esto.


5. localhost:3000/detail/:id tipo PATCH (actualizar un detalle):
    Para actualizar el detalle se necesita el id del detalle que asigna mongo y enviar los campos a actualizar en el body como raw tipo JSON, ejemplo: actualizar el detalle con id="61b204432d371235b6fc641d5" lo que se hace es enviar la ruta como localhost:3000/detail/61b204432d371235b6fc641d5 y en el body:
        {
            "cant": 20
        }
    

6. localhost:3000/detail/:code tipo DELETE (eliminar un detalle):
    Para eliminar un detalle se necesita del code de este, ejemplo: eliminar el detalle con el code="001", la ruta sería localhost:3000/detail/001

    Si el code indicado no se encuentra mostrará un mensaje indicado esto.


7. localhost:3000/detail/subtotal/:code tipo GET (calcular el subtotal de un detalle)
    Para calcular el subtotal de un detalle se necesita del code de este, ejemplo: calcular el subtotal del detalle con el code="001", la ruta sería localhost:3000/detail/subtotal/001

    Esto mostrará un mensaje indicando el subtotal del detalle

    Si el code indicado no se encuentra mostrará un mensaje indicado esto.

Rutas Objeto Bill: 

1. localhost:3000/bill/ tipo POST (crear factura):
    Para crear una factura se necesita que en el body se envie como raw y formato JSON los siguientes campos:
        {
            "number": "01",
            "dateBill": "2022-10-01",
            "isPaid": false    
        }    

    El campo number es un campo unico, si se repite arrojara un error indicando que está duplicado su valor

2. localhost:3000/bill tipo GET (obtener todas las facturas)
    Para obtener todas las facturas solo se necesita enviar la ruta anteriormente mencionada, si se encuentra vacio traerá un arreglo vacío.

3. localhost:3000/detail/:number tipo GET (Obtener una factura)
    Para obtener una factura se necesita del number de esta, ejemplo: obtener la factura con el number="01", la ruta sería localhost:3000/bill/01

    Si el number indicado no se encuentra mostrará un mensaje indicado esto.

4. localhost:3000/bill/:number tipo PUT (reemplazar una factura):
    Para reemplazar la factura se necesita el id de la factura que asigna mongo y enviar los campos a reemplazar en el body como raw tipo JSON, ejemplo: reemplazar la factura con id="61b204432d371235b6fc641d5" lo que se hace es enviar la ruta como localhost:3000/bill/61b204432d371235b6fc641d5 y en el body:
        {
            "number": "0001",
            "dateBill": "2021-31-12",
            "isPaid": false    
        }  

    Si el number indicado no se encuentra mostrará un mensaje indicado esto.


5. localhost:3000/bill/:id tipo PATCH (actualizar una factura):
    Para actualizar la factura se necesita el id de la factura que asigna mongo y enviar los campos a actualizar en el body como raw tipo JSON, ejemplo: actualizar la factura con id="61b204432d371235b6fc641d5" lo que se hace es enviar la ruta como localhost:3000/bill/61b204432d371235b6fc641d5 y en el body:
        {
            "isPaid": true
        }
    

6. localhost:3000/bill/:number tipo DELETE (eliminar una factura):
    Para eliminar una factura se necesita del number de esta, ejemplo: eliminar la factura con el number="0001", la ruta sería localhost:3000/bill/0001

    Cuando se elimina una factura se eliminan todos los detalles que esta tenía agregados ya que asi se indica en el diagrama de clases.

    Si el number indicado no se encuentra mostrará un mensaje indicado esto.

7. lcoalhost:3000/bill/:number/:codeDetail tipo POST (agregar un detalle a una factura)
    Para agregar un detalle a una factura se necesita del number de la factura y el code del detalle a agregar, ejemplo: agregar a la factura con number="0001" el detalle con code="001", la ruta sería localhost:3000/bill/0001/001 

    Si el number no se encuentra mostrará un mensaje indicando esto.
    Si el codeDetail no se encuentra mostrará un mensaje indincando esto.

8. localhost:3000/bill/details/:number tipo GET (obtener los detalles de una factura)
    Para obtener los detalles que tiene una factura se necesita del number de esta, ejemplo: obtener los detalles que tiene la factura con el number="0001", la ruta sería localhost:3000/bill/details/0001

    Esto mostrará los detalles que tiene la factura.

    Si el number indicado no se encuentra mostrará un mensaje indicado esto.

9. localhost:3000/bill/total/:number tipo GET (calcular el total de la factura)
    Para calcular el total de la factura se necesita del number de esta, ejemplo: calcular el total de la factura con number="0001", la ruta sería localhost:3000/bill/total/0001

    Esto mostrará un mensaje indicando el total de la factura.

    Si el number no se encuentra mostrará un mensaje indicando esto.
