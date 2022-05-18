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

const newProduct =(req, res) => {
    console.log('aca')
}

const createProduct = async (req, res) => {
    const newProduct ={
        id: v4(),
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        description: req.body.description
    }
    getConnection().data.product.push(newProduct)
    await getConnection().write()
    res.render('newProduct')
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
    JSON.parse(req.params.id).id == '' ? 
        res.render('allProducts', {products: product}) : 
        res.render('allProducts', {products: product.filter(prod => prod.title=== JSON.parse(req.params.id).id)})
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
    newProduct,
    getAll,
    createProduct,
    createChat,
    updateProduct,
    deleteProduct,
    getById
}

