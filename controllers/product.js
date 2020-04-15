const express = require('express');
const router = express.Router();

//load product model
const productModel = require('../models/product'); //루트에서 모델폴더,프로덕트로 가야하니 ..을 붙인다

//show all product list 
router.get("/list", (req,res)=>{

    res.render("products/productList",{
        title : "Product Listing Page",
        products: productModel.getAllProducts()
    });

});

//add product form
router.get("/add", (req,res)=>{
    res.render("products/productAdd",{
        title: "Product Add Form"
    });
});

//when user submits product form then post
router.post("/add", (req,res)=>{
    // res.render();
})

module.exports = router;