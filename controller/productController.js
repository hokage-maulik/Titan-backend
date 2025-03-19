
const productModel=require("../model/productModel")

const addProduct = async (req, res) => {
    const data = await productModel.create(req.body)
    return res.send(data)
 }


 const get= async (req,res)=> {
    try{
        const {categoryId}=req.query
        const query=categoryId ? {categoryId} : {}

        const productdata=await productModel.find(query).populate("categoryId")
        return res.send(productdata)
    }catch (error){
        console.log("error")
    }
 }

 const updateProduct = async (req,res) => {
     const id = req.params.id
     const data = await productModel.findByIdAndUpdate(id,(req.body))
     return res.send(data)
 }
 
 const deleteProduct = async (req, res) => {
    //  const id  = req.params.id;
    //  const data = await productModel.findByIdAndDelete(id)
    //  return res.send("deletedata", data)
    const { id } = req.params;
    try {
        await productModel.findByIdAndDelete(id);
        return res.status(200).send({ message: "Item deleted from cart" });
    } catch (error) {
        console.error("Error deleting item from cart:", error);
        res.status(500).send({ message: "Error deleting item from cart" });
    }
 }

 const getproductbyid = async (req, res) => {
    const {id}=req.params
    try{
        const product =await productModel.findById(id).populate('categoryId')
        if (!product) {
            return res.status(404).send({ message: "Product Not Found" });
            
        }
         res.status(200).send(product)
    }catch{
        console.log("error")
    }

    }




module.exports = {
    addProduct,deleteProduct,get,getproductbyid
};
