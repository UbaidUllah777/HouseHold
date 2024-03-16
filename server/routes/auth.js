
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
} = require("../controllers/auth");

router.get("/", (req, res) => {
  return res.json({
    data: "Hello, Doha Testing Main ROute",
  });
});
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/add-food-item", AddFoodItem);
router.get("/food-items", ViewFoodItems);
router.post("/update-item", UpdateFoodItem);


export default router;
