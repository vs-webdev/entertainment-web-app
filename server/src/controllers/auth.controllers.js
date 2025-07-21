import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"

export const register = async (req, res) => {
  const {username, email, password} = req.body
  console.log(username, email, password)

  if (!username || !email || !password){
    return res.json({success: false, message: 'Missing Details'})
  }

  try {
    // Check if the user exists
    const userExist = await userModel.findOne({email})
    if (userExist){
      return res.json({success: false, message: "User already exists"})
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new userModel({username, password: hashedPassword, email})
      await user.save()

      generateToken(res, user._id)
    }

    return res.json({success: true})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}

export const login = async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password){
    return res.json({success: false, message: 'Missing Email or Password'})
  }
  
  try {
    // Check if email exists
    const user = await userModel.findOne({email})
    if (!user){
      return res.json({success: false, message: 'Email does not exists'})
    }  
    // If password doesn't matches
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
      return res.json({success: false, message: 'Wrong Password'})
    }

    generateToken(res, user._id)
    
    return res.status(200).json({
      success: true,
      message: 'Access Granted'
    })
    
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    })
    return res.status(200).json({success: true, message: "Logged out successfully"})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}

export const isAuthenticated = async (req, res) => {
  try {
    return res.status(200).json({success: true})
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
}