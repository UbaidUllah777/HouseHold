
import mongoose from "mongoose";
const { Schema } = mongoose;



const foodItemShcema = new Schema(
  {
    category: {
      type: String,
      trim: true,
      required: true,
    },
    itemName: {
      type: String,
      trim: true,
      required: true,
  
    },
    
    expiryDate: {
      type: String,
      trim: true,
      required: true,
  
    },
    quantityORweight: {
      type: Number,
      trim: true,
      required: true,
  
    },
    creator: {
      type: String,
      required: true,
 
    },
    image: {
      public_id: "",
      url: "",
    },
  
  },
  { timestamps: true }
);

export default mongoose.model("FoodItem", foodItemShcema);
