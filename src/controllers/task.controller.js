const { getConnection } = require('../services/database');
const { v4 } = require ('uuid')

const getAll = (req, res) => {
    const products = getConnection().data.product;
    const chat = getConnection().data.chat;
    res.render('product', {products: products, msgClient: chat})
}

const allInOne = (req, res) => {
    const products = getConnection().data.product;
    const chat = getConnection().data.chat;
    res.render('allProducts', {products: products, msgClient: chat})
}

const createProduct = async (req, res) => {
    console.log(req)
    const newProduct ={
        id: v4(),
        title: req.title,
        price: req.price,
        img: req.img,
        description: req.description
    }
    getConnection().data.product.push(newProduct)
    await getConnection().write()
    console.log(req.body)
}

const createChat = async (req, res) => {
    console.log(req);
    const newChat = {
        mail: req.mail,
        time: new Date().toDateString(),
        msgClient: req.msgClient
    }
    getConnection().data.chat.push(newChat)
    await getConnection().write()
    console.log(req.body)
}

const getById = (req, res) =>{
    const product = getConnection().data.product;
    console.log(product.filter(prod => prod.id === req.params.id))
    res.render('product', {products: product.filter(prod => prod.id === req.params.id)})
} 

const updateProduct = async (req, res) => {
    const { title, price, img, description } = req.body;
    const db = getConnection();
    const prodRes = await db.data.product.find(prod=>prod.id === req.params.id);
    prodRes.title = title;
    prodRes.price = price;
    prodRes.img = img;
    prodRes.description = description;
    db.data.product.map(prod=>(prod.id === req.params.id ? prodRes : prod));
    console.log(prodRes)
    console.log(req.body)
    await db.write();
    res.json(prodRes)
}

const deleteProduct = async (req, res) => {
    const db = getConnection();
    const newProduct = db.data.product.filter(prod =>prod.id !== req.params.id);
    db.data.product = newProduct;
    await db.write();
    return res.json(newProduct);
};

module.exports = {
    allInOne,
    getAll,
    createProduct,
    createChat,
    updateProduct,
    deleteProduct,
    getById
}

