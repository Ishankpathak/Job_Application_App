import express from "express";
import {
  loginController,
  registerController,
} from "../controller/authController.js";
import rateLimit from "express-rate-limit";

//ip limiter

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//router object
const router = express.Router();

//routes
/**
 * @swagger
 * components:
 *   schemas:
 *   User:
 *   type:Object
 *   required:
 *       - name
 *       - lastName
 *       - email
 *       - password
 *       - location
 *    properties:
 *      id:
 *        type:string
 *        description:The Auto-generated id of user collection
 *      name:
 *        type:string
 *        description:User name
 *      lastName:
 *        type:string
 *        description:User last name
 *      email:
 *        type:string
 *        description:User email address
 *      password:
 *        type:string
 *        description:User password should be greater than 6 character
 *      location:
 *        type:string
 *        description:User location city or country
 *      example:
 *      id:OIJAOFDJOALSDJL
 *      name:John
 *      lastname:Doe
 *      email:johndoe@gmail.com
 *      password:test@123
 *      location:mumbai
 */

/**
 * @swagger
 * tags:
 *   name:auth
 *   description:authentication apis
 */

//register
router.post("/register", limiter, registerController);
//login
router.post("/login", limiter, loginController);

//export
export default router;
