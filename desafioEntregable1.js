class ProductManager {
    constructor (){
        this.products = []
    }
    static id = 0
    addProduct (title,description, price, thumbnail,code, stock){
        for (let i = 0; i < this.products.length; i ++){
            if (this.products[i].code=== code){
                console.log (`El codigo ${code}está repetido `);
                break;
            }
        }

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        if ( !Object.values (newProduct).includes(undefined) ) {
            ProductManager.id++;
        this.products.push ({
            ...newProduct,
            id:ProductManager.id
        });

        }else{
            console.log ("Todos los campos son requeridos")
        }

        

    }
    getProduct (){
        return this.products;
    }

    productoEncontrado (id){
        return this.products.find((producto)=>producto.id===id)
    }
    getProductById (id){
        !this.productoEncontrado (id) ? console.log ("Not Found") : console.log (this.productoEncontrado(id));
        }
    }


const productos = new ProductManager
/* Primera llamada = arreglo vacio*/
console.log (productos.getProduct ())
/* agregamos productos */

productos.addProduct('producto de prueba1', 'Este es un producto1', 200, "Sin Imagen1", 'abc123',25);
productos.addProduct('producto de prueba2', 'Este es un producto2', 250, "Sin Imagen2", 'abc124',25);
productos.addProduct('producto de prueba3', 'Este es un producto3', 110, "Sin Imagen3", 'abc125',25);
productos.addProduct('producto de prueba4', 'Este es un producto', 130, "Sin Imagen4", 'abc126',25);
/* Segunda llamado = array con producto */

console.log (productos.getProduct ());

/* Validacion de code repetido*/
productos.addProduct ('producto de prueba3', 'Este es un producto3', 110, "Sin Imagen3", 'abc125',25)

/* Busqueda de prodcuto por ID */
productos.getProductById (8),

productos.getProductById (2)