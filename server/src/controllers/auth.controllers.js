import userModel from "../models/userModel.js"

export const register = async (req, res) => {
  const {username, email, password} = req.body
  console.log(username, email, password)

  if (!username || !email || !password){
    res.json({success: false, message: 'Missing Details'})
  }

  try {
    // Check if the user exists
    const userExist = await userModel.findOne({email})
    if (userExist){
      res.json({success: false, message: "User already exists"})
    } else {
      const user = new userModel({username, password, email})
      await user.save()
    }

    return res.json({success: true})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}