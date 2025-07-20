import jwt from "jsonwebtoken"

const protect = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token){
    return res.status(401).json({success: false, message: "Not Authorized, Login Again. Token is not in the cookie"})
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

    if (tokenDecode.userId){
      req.userId = tokenDecode.userId
    } else {
      return res.status(401).json({success: false, message: "Invalid token"})
    }

    next()
  } catch (error) {
    return res.json({success: false, message: error.message})
  }
}

export default protect;