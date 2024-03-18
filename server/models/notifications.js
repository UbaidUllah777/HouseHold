
import mongoose from "mongoose";
const { Schema } = mongoose;



const notificationShcema = new Schema(
  {
    itemName: {
      type: String,
      trim: true,
      required: true,
  
    },
    
    
    creator: {
        type: String,
        required: true,
   
      },
      
    creatorName: {
        type: String,
        required: true,

        },

  
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationShcema);
