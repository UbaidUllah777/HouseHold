
import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import nanoid from "nanoid";
import FoodItem from '../models/foodItem'
import Notification from "../models/notifications"
import {v2 as cloudinary} from 'cloudinary';
          
          
cloudinary.config({ 
  cloud_name: 'drpmfcp5d', 
  api_key: '161878851329786', 
  api_secret: 'FunH6GZH_wGeNzXe_AOOxwWj0Xs' 
});



// sendgrid
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

export const signup = async (req, res) => {
  console.log("HIT SIGNUP");
  try {
    // validation
    const { username, email,phoneNumber, password } = req.body;
    if (!username) {
      return res.json({
        error: "User Full Name is required",
      });
    }
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!phoneNumber) {
      return res.json({
        error: "Phone Number is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be atleast 6 characters long",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }
    const phoneNumberexist = await User.findOne({ phoneNumber });
    if (phoneNumberexist) {
      return res.json({
        error: "Phone Number is taken",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);

    try {
      const user = await new User({
        username,
        email,
        phoneNumber,
        password: hashedPassword,
      }).save();

      // create signed token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      //   console.log(user);
      const { password, ...rest } = user._doc;
      return res.json({
        token,
        user: rest,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};


export const signinWithPhone = async (req, res) => {
  // console.log(req.body);
  try {
    const { phoneNumber, password } = req.body;
    // check if our db has user with that phoneNumber
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // find user by email
  const user = await User.findOne({ email });
  console.log("USER ===> ", user);
  if (!user) {
    return res.json({ error: "User not found" });
  }
  // generate code
  const resetCode = nanoid(5).toUpperCase();
  // save to db
  user.resetCode = resetCode;
  user.save();
  // prepare email
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "Password reset code",
    html: "<h1>Your password  reset code is: {resetCode}</h1>"
  };
  // send email
  try {
    const data = await sgMail.send(emailData);
    console.log(data);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.json({ ok: false });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password, resetCode } = req.body;
    // find user based on email and resetCode
    const user = await User.findOne({ email, resetCode });
    // if user not found
    if (!user) {
      return res.json({ error: "Email or reset code is invalid" });
    }
    // if password is short
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetCode = "";
    user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};



export const AddFoodItem = async (req, res) => {
  console.log("HIT Add Food Item");
  try {
    // validation
    const {
      category,
      itemName,
      expiryDate,
      quantityORweight,
      creator,
      creatorName,
      image
    } = req.body;

    if (!image) {
      return res.json({
        error: "Please Select an Image",
      });
    }
    if (!category) {
      return res.json({
        error: "category Full Name is required",
      });
    }
    if (!itemName) {
      return res.json({
        error: "item Name is required",
      });
    }
    if (!expiryDate) {
      return res.json({
        error: "Expiry date   is required",
      });
    }
    if (!quantityORweight) {
      return res.json({
        error: "quantityORweight  is Required",
      });
    }

    const foodItem = new FoodItem({
      category,
      itemName,
      expiryDate,
      quantityORweight,
      creator,
      image: {
        public_id: image.public_id,
        url: image.url
      }
    });

    // Save the food item
    await foodItem.save();


    // Add a notification
    const notification = new Notification({
      itemName,
      creator,
      creatorName
  });

    await notification.save();

    // Send a response back to the client
    res.json({ success: true, foodItem });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};


// Previously for Fetching all items

// export const ViewFoodItems = async (req, res) => {
//   try {
//     const foodItems = await FoodItem.find();
//     res.json(foodItems);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };


// export const AddNotification = async (req, res) => {
//   console.log("HIT Add Notification");
//   try {
//     // validation
//     const {
//       itemName,
//       creator,
//       creatorName
//     } = req.body;

   

//     const notification = new Notification({
//       itemName,
//       creator,
//       creatorName
//     });

//     await notification.save();

//     // Send a response back to the client
//     res.json({ success: true, notification });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };




export const ViewFoodItems = async (req, res) => {
  try {
    // Extract the creator's ID from the query parameters
    const { creator } = req.query;

    // Check if the creator ID is provided
    if (!creator) {
      return res.status(400).json({ error: "Creator ID is required" });
    }

    // Fetch food items that belong to the specified creator
    const foodItems = await FoodItem.find({ creator });

    // Send the filtered food items as the response
    res.json(foodItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};




// server/controllers/auth.js

export const UpdateFoodItem = async (req, res) => {
  console.log("HIT Update Item");
 
  try {
    // Extract the food item details from the request body
    const { id, updatedItem } = req.body;
    console.log("id:",id)
    console.log("Item:",updatedItem)

    // Check if the food item ID is provided
    if (!id) {
      return res.status(400).json({ error: "Food item ID is required" });
    }

    // Check if the updated food item details are provided
    if (!updatedItem) {
      return res.status(400).json({ error: "Updated food item details are required" });
    }

    // Update the food item details in the database
    await FoodItem.findByIdAndUpdate(id, updatedItem, { new: true });

    // Send a success response back to the client
    res.json({ success: true, message: "Food item updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};



// Fetch notifications
export const getNotifications = async (req, res) => {
  try {
    // Fetch notifications from the database
    const notifications = await Notification.find();

    // Send the notifications as a response
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const uploadImage = async (req, res) => {
  console.log("ENTERED UPLOAD  IMAGE");
  console.log("Entered Upload iMage and Image in Req Body is => ", req.body);
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: nanoid()
    });
    console.log("CLOUDINARY RESULT result => ", result);
    res.json(result); // Sending the Cloudinary upload result as JSON response
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};



export const getFoodItemById = async (req, res) => {
  try {

    // Extract the ID from the request parameters
    const { id } = req.params;
    console.log("ENETRED The FIND FOOD ITEM BY SCANNING AND THE ID IS =====>", id)

    // Fetch the item from the database based on the provided ID
    const item = await FoodItem.findById(id);

    // Check if the item exists
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Send the item details as a response
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};