import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// user register
export const register = async (req, res) => {
   try {
      // Check if user already exists
      const existingUser = await User.findOne({ 
         $or: [
            { email: req.body.email },
            { username: req.body.username }
         ]
      });

      if (existingUser) {
         return res.status(400).json({ 
            success: false, 
            message: "User with this email or username already exists!" 
         });
      }

      // Validate required fields
      if (!req.body.username || !req.body.email || !req.body.password) {
         return res.status(400).json({ 
            success: false, 
            message: "Please provide all required fields!" 
         });
      }

      //hashing password
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(req.body.password, salt)

      const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: hash,
         photo: req.body.photo
      })

      await newUser.save()

      res.status(200).json({ success: true, message: "Successfully created!" })
   } catch (error) {
      console.log(error);
      res.status(500).json({ 
         success: false, 
         message: "Failed to create! Try again.",
         error: error.message 
      })
   }
}

// user login
export const login = async (req, res) => {
   try {
      const email = req.body.email
      const user = await User.findOne({ email })

      // if user doesn't exist
      if (!user) {
         return res.status(404).json({ success: false, message: 'User not found!' })
      }

      // if user is exist then check the password or compare the password
      const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

      // if password incorrect 
      if (!checkCorrectPassword) {
         return res.status(401).json({ success: false, message: "Incorrect email or password!" })
      }

      const { password, role, ...rest } = user._doc

      // create jwt token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn:"15d" })

      // set token in the browser cookies and send the response to the client
      res.cookie('accessToken', token, {
         httpOnly: true,
         expires: token.expiresIn
      }).status(200).json({
         success: true,
         token,
         data: {...rest},
         role
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({ 
         success: false, 
         message: "Failed to login",
         error: error.message 
      })
   }
}