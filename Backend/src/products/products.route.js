const products = require('./products.model');
const express = require('express');
const router = express.Router();
const Reviews = require('../reviews/review.models');
const Products = require('./products.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');


// Post a product
router.post('/create-product', async (req, res) => {
    try {
        const newProduct = new products({
            ...req.body
        });

        const savedProduct = await newProduct.save();
        // Calculate review
        const reviews = await Reviews.find({ productId: savedProduct._id });
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            savedProduct.rating = averageRating;
        }
        res.status(201).send(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query; // Destructuring
        let filter = {};
        if (category && category !== "all") {
            filter.category = category;
        }
        if (color && color !== "all") {
            filter.color = color;
        }
        if (minPrice && minPrice !== "all") {
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            if (!isNaN(min) && !isNaN(max)) {
                filter.price = { $gte: min, $lte: max };
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalProducts = await products.countDocuments(filter);
        const totalPage = Math.ceil(totalProducts / parseInt(limit));
        const productsList = await products.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .populate("author", "email")  // Populating the email field of the author
            .sort({ createdAt: -1 });
        
        res.status(200).send({ products: productsList, totalPage, totalProducts });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
});

//get single products
router.get("/:id", async(req,res)=>{
    try{
        const productId=req.params.id;
        const product =await Products.findById(productId).populate('author','email username');
        if(!product){
            return res.status(404).send({message:"Product not found"});
        }
        const reviews=await Reviews.find({productId}).populate("userId",'email username');
        res.status(200).send({product,reviews});


    }catch(error){
        console.error("Error fetching product");
        res.status(500).send({message:"Failed to fetch"});
    }
});

//update a product
router.patch('/update-product/:id',verifyToken,verifyAdmin,async(req,res)=>{
    try{
        const productId=req.params.id;
        const updateProduct=await Products.findByIdAndUpdate(productId,{...req.body},{new:true});
        if(!updateProduct){
            return res.status(404).send({message:"Product not found"});
        }
        res.status(200).send({message:"Product updated Sucessfully",product:updateProduct});
    }catch(error){
        console.error("Error fetching product");
        res.status(500).send({message:"Failed to update the product"});
    }
});

//delete a products
router.delete("/:id",async(req,res)=>{
    try{
        const productId=req.params.id;
        const deleteProduct=await products.findByIdAndDelete(productId);
        if(!deleteProduct){
            return res.status(404).send({message:"Prodcut Not Found"});
        }
        //delete reviews related to product
        await Reviews.deleteMany({productId:productId});
        res.status(200).send({message:"Product Deleted sucessfully"});

    }catch (error){
        console.error("Error in Deleting products");
        res.status(500).send({message:"Failed to Delete the product"});
    }
});


// get related products
router.get("/related/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: "Product ID is required" });
        }

        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        const titleRegex = new RegExp(
            product.name
                .split(" ")
                .filter((word) => word.length > 1)
                .join("|"),
            "i"
        );

        const relatedProducts = await Products.find({
            _id: { $ne: id }, // Exclude the current product
            $or: [
                { name: { $regex: titleRegex } }, // Match similar names
                { category: product.category }, // Match the same category
            ],
        });

        res.json(relatedProducts);
    } catch (error) {
        console.error("Error fetching the related products", error);
        res.status(500).send({ message: "Failed to fetch related products" });
    }
});

module.exports = router;
