
import express from "express";

const router = express.Router();

// controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  AddFoodItem,
  ViewFoodItems,
  UpdateFoodItem,
  getNotifications,
  signinWithPhone,
  uploadImage,
} = require("../controllers/auth");

router.get("/", (req, res) => {
  return res.json({
    data: "Hello, Doha Testing Main ROute",
  });
});

router.post("/upload-image", uploadImage);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signin-with-phone", signinWithPhone);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/add-food-item", AddFoodItem);
router.get("/food-items", ViewFoodItems);
router.post("/update-item", UpdateFoodItem);
router.get("/notifications", getNotifications);



export default router;
