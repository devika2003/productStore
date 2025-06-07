import Product from "../models/product.js";
export const getProducts =async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json({success:true,data:products});

    }
    catch(error){
        console.log("error in fetching ",error.message);
        res.status(500).json({success:false,message:"server error"});
    }
}
export const createProduct=async (req,res)=>{
    const product =req.body;
    if(!product.name || !product.price ||!product.image){
        return res.status(400).json({success:false,message:"please provide all fields"})
    }
    const newProduct =new Product(product)

    try{
        await newProduct.save();
        res.status(201).json({success:true,data:newProduct});
    }catch(error){
        console.error("error in create product:",error.message);
        res.status(500).json({scucess:false,message:"server Error"});
    }
}
export const updateProduct=async (req,res)=>{
    const {id} =req.params;
    const product =req.body;
    // if(!product.name || !product.price ||!product.image){
    //     return res.status(400).json({success:false,message:"please provide all fields"})
    // }
    try{
        const updatedProduct =await Product.findByIdAndUpdate(id,product,{new:true,runValidators:true});
        if(!updatedProduct){
            return res.status(404).json({success:false,message:"product not found"});
        }
        res.status(200).json({success:true,data:updatedProduct});

    }catch(error){
        console.error("error in update product:",error.message);
        res.status(500).json({scucess:false,message:"server Error"});
    }
}
export const deleteProduct=async (req,res)=>{
    const {id} =req.params;
    try{
        const product =await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({success:false,message:"product not found"});
        }
        res.status(200).json({success:true,data:{}});

    }catch(error){
        console.error("error in delete product:",error.message);
        res.status(500).json({scucess:false,message:"server Error"});
    }
}