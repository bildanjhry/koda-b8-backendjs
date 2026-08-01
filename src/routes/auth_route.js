import { Router } from "express";

const authRoutes = Router()
authRoutes.get("", function(req, res){
  res.status(200).json({
    success:true,
    message:"Hello World"
  })  
})

export default authRoutes