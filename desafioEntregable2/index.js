import fs from 'fs'
import ProductModel from './class.js'

class ProductManager {
    constructor(path) {
        this.path = path
    }

    //----------------- Agrego un producto -----------------

    async addProducts(product) {
        try {
            let dataProduct = await fs.promises.readFile(this.path, 'utf-8')
            let dataProdParse = JSON.parse(dataProduct);

            if (dataProdParse.some(num => num.code == product.code) !== true
                && product.title !== ""
                && product.description !== ""
                && product.price > 0
                && product.thumbnail !== ""
                && product.stock >= 0) {
                const data = dataProdParse ? [...dataProdParse, { ...product, id: dataProdParse.length + 1 }]
                    : [{ ...product, id: dataProdParse.length + 1 }]
                const getData = await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(data, null, 2)
                );
                console.log(`producto agregado con el id: ${dataProdParse.length + 1}`);
            } else {
                const salida = dataProdParse.some(num => num.code == product.code) === true ? 'El producto ya fue agregado'
                    : 'los campos no pueden estar vacios'
                console.log(salida);
            }
        } catch (error) {
            console.log("error en la escritura", error);
        }

    }

    //----------------- Devuelvo todos los productos -----------------

    async getProducts() {
        let dataProduct = await fs.promises.readFile(this.path, "utf-8");
        let dataProdParse = JSON.parse(dataProduct)
        if (dataProdParse.length) {
            return dataProdParse
        } else {
            console.log('no hay productos');
        }

    }

    //----------------- Busco un producto por su id -----------------

    async getProductById(id) {
        try {
            let dataProduct = await fs.promises.readFile(this.path, "utf-8");
            let dataProdParse = JSON.parse(dataProduct)
            let product = dataProdParse.find(product => product.id === id);
            if (product) {
                return product
            } else {
                console.log(`no se encontro el producto con el id: ${id}`);
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }

    //----------------- Actualizo un producto por su id -----------------

    async updateProducts(id, prop, newValue) {
        try {
            let dataProduct = await fs.promises.readFile(this.path, "utf-8");
            let dataProdParse = JSON.parse(dataProduct)
            let product = dataProdParse.findIndex(product => product.id === id)
            if (product > -1) {
                dataProdParse[product][prop] = newValue
                await fs.promises.writeFile(this.path,
                    JSON.stringify(dataProdParse, null, 2))
                console.log('Actualizado con exito');
                return product;
            } else {
                console.log(`No existe el producto con el id ${id}`);
                return null
            }
        } catch (error) {
            console.log("error al actualizar el producto", error);
        }
    }

    //----------------- Elimino un producto por su id -----------------

    async deleteProduct(id) {
        try {
            let dataProduct = await fs.promises.readFile(this.path, "utf8");
            let dataProductParse = JSON.parse(dataProduct);
            let product = dataProductParse.find(product => product.id === id);
            if (product) {
                const dataProdFilter = dataProductParse.filter(
                    product => product.id !== id
                    );
                await fs.promises.writeFile(this.path,
                    JSON.stringify(dataProdFilter, null, 2)
                    );
                console.log('Producto eliminado con exito');
            } else {
                console.log(`No existe el producto con el id: ${id}`);
            }
        } catch (error) {
            console.log('Error al eliminar el producto', error);
        }
    }
}

let productos = new ProductManager("./data.txt")

let producto1 = new ProductModel('producto de prueba', 'este es un producto', 200, 'Sin Imagen1', "abc123", 25)


productos.addProducts(producto1)

productos.getProductById(2)

productos.getProducts()

productos.getProductById(9)

productos.updateProducts(1, "stock", 555)

productos.deleteProduct(3)