


const cartModel = require("../model/cartModel");

const calculateTotalPrice = async () => {
    const cartItems = await cartModel.find().populate("productId");
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.quantity * item.productId.price;
    }, 0);
    return totalPrice;
};

// const addToCart = async (req, res) => {
//     const { productId } = req.body;

//     try {
//         const existingCartItem = await cartModel.findOne({ productId });

//         if (existingCartItem) {
//             existingCartItem.quantity += 1;
//             await existingCartItem.save();
//             return res.send(existingCartItem);
//         }

//         const newCartItem = await cartModel.create({
//             productId,
//             quantity: 1
//         });

//         return res.send(newCartItem);
//     } catch (error) {
//         console.error("Error adding to cart:", error);
//         res.status(500).send({ message: "Error adding to cart" });
//     }
// };

const addToCart = async (req, res) => {
    const { productId } = req.body;

    try {
        const existingCartItem = await cartModel.findOne({ productId });

        if (existingCartItem) {
            existingCartItem.quantity += 1;
            await existingCartItem.save();
        } else {
            await cartModel.create({
                productId,
                quantity: 1,
            });
        }

        const totalPrice = await calculateTotalPrice();
        return res.send({ message: "Item added to cart", totalPrice });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send({ message: "Error adding to cart" });
    }
};

const getCartItems = async (req, res) => {
    try {
        const cartItems = await cartModel.find().populate("productId");
        return res.status(200).send(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).send({ message: "Error fetching cart items" });
    }
};





// const deleteFromCart = async (req, res) => {
//     const { id } = req.params;

//     try {
//         await cartModel.findByIdAndDelete(id);
//         return res.status(200).send({ message: "Item deleted from cart" });
//     } catch (error) {
//         console.error("Error deleting item from cart:", error);
//         res.status(500).send({ message: "Error deleting item from cart" });
//     }
// };

const deleteFromCart = async (req, res) => {
    const { id } = req.params;

    try {
        await cartModel.findByIdAndDelete(id);
        const totalPrice = await calculateTotalPrice();
        return res.status(200).send({ message: "Item deleted from cart", totalPrice });
    } catch (error) {
        console.error("Error deleting item from cart:", error);
        res.status(500).send({ message: "Error deleting item from cart" });
    }
};




// const incrementQuantity = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const updatedCartItem = await cartModel.findByIdAndUpdate(
//             id,
//             { $inc: { quantity: 1 } },
//             { new: true }
//         );
//         return res.status(200).send(updatedCartItem);
//     } catch (error) {
//         console.error("Error incrementing quantity:", error);
//         res.status(500).send({ message: "Error incrementing quantity" });
//     }
// };

const incrementQuantity = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedCartItem = await cartModel.findByIdAndUpdate(
            id,
            { $inc: { quantity: 1 } },
            { new: true }
        );
        const totalPrice = await calculateTotalPrice();
        return res.status(200).send({ updatedCartItem, totalPrice });
    } catch (error) {
        console.error("Error incrementing quantity:", error);
        res.status(500).send({ message: "Error incrementing quantity" });
    }
};

// const decrementQuantity = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const cartItem = await cartModel.findById(id);

//         if (cartItem.quantity > 1) {
//             cartItem.quantity -= 1;
//             await cartItem.save();
//         } else {
//             await cartModel.findByIdAndDelete(id);
//         }

//         return res.status(200).send(cartItem);
//     } catch (error) {
//         console.error("Error decrementing quantity:", error);
//         res.status(500).send({ message: "Error decrementing quantity" });
//     }
// };
const decrementQuantity = async (req, res) => {
    const { id } = req.params;

    try {
        const cartItem = await cartModel.findById(id);

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
        } else {
            await cartModel.findByIdAndDelete(id);
        }

        const totalPrice = await calculateTotalPrice();
        return res.status(200).send({ cartItem, totalPrice });
    } catch (error) {
        console.error("Error decrementing quantity:", error);
        res.status(500).send({ message: "Error decrementing quantity" });
    }
};

const getCartTotalPrice = async (req, res) => {
    try {
        const cartItems = await cartModel.find().populate("productId", "price");

        const totalPrice = cartItems.reduce((total, item) => {
            // Extract and sanitize price string
            const rawPrice = item.productId?.price || "0";
            const sanitizedPrice = rawPrice.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
            const price = parseFloat(sanitizedPrice) || 0; // Convert to a number
            const quantity = Number(item.quantity) || 0;

            console.log(`Raw Price: ${rawPrice}, Sanitized Price: ${price}, Quantity: ${quantity}`); // Debugging
            return total + quantity * price;
        }, 0);

        console.log("Total Price:", totalPrice); // Log the total price
        res.send({ totalPrice });
    } catch (error) {
        console.error("Error calculating total price:", error);
        res.status(500).send({ message: "Error calculating total price" });
    }
};






module.exports = {
    addToCart,
    getCartItems,
    deleteFromCart,
    incrementQuantity,
    decrementQuantity,
    getCartTotalPrice
};



