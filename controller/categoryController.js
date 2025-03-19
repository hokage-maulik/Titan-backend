

const categorymodel=require("../model/categoryModel")

const addCategory = async (req, res) => {
    const data = await categorymodel.create(req.body)
    return res.send(data)
 }
 const getCategory = async (req, res) => {
     const data = await categorymodel.find()
     return res.send(data)
    
 }
 
 const deleteCategory = async (req, res) => {
    // const id  = req.params.id;
    // const data = await categorymodel.findByIdAndDelete(id)
    // return res.send("deletedata" , data)
    const { id } = req.params;
    try {
        await categorymodel.findByIdAndDelete(id);
        return res.status(200).send({ message: "Item deleted from cart" });
    } catch (error) {
        console.error("Error deleting item from cart:", error);
        res.status(500).send({ message: "Error deleting item from cart" });
    }
}

const updateCategory = async (req,res) => {
    const id = req.params.id
    const data = await categorymodel.findByIdAndUpdate(id,(req.body))
    return res.send(data)
}

const getSingleCategory = async (req, res) => {
    const { id } = req.params; // Get the ID from the request params
    try {
        const data = await categorymodel.findById(id);
        
        if (!data) {
            return res.status(404).send({ message: "Category not found" });
        }
        return res.status(200).send(data);
    } catch (error) {
        // console.error("Error fetching category:", error);
        return res.status(500).send({ message: "Error fetching category" });
    }
    
};


  
 module.exports={
    addCategory,getCategory,deleteCategory,updateCategory,getSingleCategory
 }
