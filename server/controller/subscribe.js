require('dotenv').config(); 
const nodemailer = require("nodemailer");
const User = require("../models/User");
const subscribe = require("../models/subscribe");
const { isValidDomain } = require("../middleware/checkEmail");


const sendEmail = async (data) => {
    try {
      // Set up the email transporter
      const transporter = nodemailer.createTransport({
        service: "gmail", // Or your preferred email service
        auth: {
          user: process.env.EMAIL, 
          pass: process.env.APP_PASSWORD, 
        },
      });
  
      // User Email
      const userEmailOptions = {
        from: process.env.Email, // Replace with your email
        to: data.email,
        subject: "Welcome to Foreshore",
        // text: `Dear ,\n\nThank you for listing your property with us. We are reviewing your details and will get back to you shortly.\n\nBest regards,\nYour Team`,
        html : `<div style="margin:auto;width: 500px;color:black; border-radius:12px;background-color: white;border: 1px solid black;">
        <div style="background: black;border-top-left-radius:12px;border-top-right-radius:12px;padding:10px ; ">
            <div style="margin: auto;text-align: center;">
                <img style="height: 100px;" src="https://mahaaboassi.github.io/images/foreshore.png" alt="foreshore-logo" />

            </div>
            
        </div>
        <div style="padding:10px ;">
            <h1 style="text-align: center;color: #27cbbe;line-height: 3px;">Welcome To Foreshore</h1>
            <h4 style="text-align: center;color:black; ;line-height: 3px;">Holidays Home Rental</h4>
            <p style="color:black">Dear Subscriber</p>
            <p style="color:black">Welcome to Foreshore – We're Glad to Have You!</p>
            <div style="color:black">
                <p style="line-height: 1px;color:black">Best regards,</p>
                <p style="line-height: 2px;color:black"> Foreshore Team</p>
            </div>
        </div>
        <div class="text-align:center">
            <div style="margin: auto;width: 120px;padding-bottom: 10px;">
                <a href="https://foreshore.ae/" >
                    <button style="background-color: #27cbbe;cursor: pointer;color: white;border: none  !important;padding: 10px;border-radius: 12px;">Go To Foreshore</button>
                </a>
            </div>
        </div>
        

    </div>`
    };
  
      // Admin Email
      const adminEmailOptions = {
        from: process.env.Email, 
        to: process.env.ADMIN_EMAIL, 
        subject: "New subscriber From foreshore Website",
        html:  `<div style="margin:auto;width: 500px;color:black; border-radius:12px;background-color: white;border: 1px solid black;">
        <div style="background: black;border-top-left-radius:12px;border-top-right-radius:12px;padding:10px;">
            <div style="margin: auto;text-align: center;">
                <img style="height: 100px;" src="https://mahaaboassi.github.io/images/foreshore.png" alt="foreshore-logo" />
            </div>
        </div>
        <div style="padding:10px;color:black;">
            <h1 style="text-align: center;color: #27cbbe;line-height: 3px;">Foreshore</h1>
            <h4 style="text-align: center;color:black;line-height: 3px;">Holidays Home Rental</h4>
            <p style="color:black;">Dear Admin</p>
            <p style="color:black;">A new Message has been received</p>
            <div>
                <h4 style="color:black;">From User</h4>
                <ul style="color:black;">
                    <li style="color:black;">Email: <span>${data.email}</span></li>
                </ul>
            </div>
            <div>
                <p style="color:black;line-height: 1px;">Best regards,</p>
                <p style="color:black;line-height: 2px;">Foreshore Team</p>
            </div>
        </div>
        <div style="text-align:center;">
            <div style="margin: auto;width: 120px;padding-bottom: 10px;">
                <a href="https://foreshore.ae/" style="text-decoration:none;">
                    <button style="background-color: #27cbbe;cursor: pointer;color: white;border: none;padding: 10px;border-radius: 12px;">Go To Foreshore</button>
                </a>
            </div>
        </div>
      </div>`
      };
  
      // Send Emails
    //   await transporter.sendMail(userEmailOptions);
      await transporter.sendMail(adminEmailOptions);
      console.log("Emails sent successfully.");
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };
const SendSubscribe = async (req,res)=>{

    const { email } = req.body

    try {

         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(email)) {
             return res.status(400).json({
                 error: 1,
                 data: [],
                 message: "Please provide a valid email address.",
                 status: 400
             });
         }
        const emailExists = await isValidDomain(email);
        if (!emailExists) {
            return res.status(400).json({
                error: 1,
                data: [],
                message: "The domain of this email address is not valid or doesn't exist.",
                status: 400,
            });
        }
        const data = {email};

        const roleExist = await User.findOne({ email })
        if(roleExist) {
            if(['admin', 'user'].includes(roleExist.role)){
                data["role"] = roleExist.role
            }else{
                return res.status(400).json({
                    error: 1,
                    data: [],
                    message: "Please provide a valid Role.",
                    status: 400
                });
            }
        
        }else{
            data["role"] = "user"
        }
        // Check if already subscribed
        const alreadySubscribed = await subscribe.findOne({ email });
        if (alreadySubscribed) {
        return res.status(400).json({
            error: 1,
            data: [],
            message: "This email is already subscribed.",
            status: 400,
        });
        }
           const subscribeSave = new subscribe(data);
           await subscribeSave.save();
           // Send Emails
           await sendEmail(data);
           res.status(200).json({
               error : 0,
               data : subscribeSave,
               message : "Thanks for subscribing! We're excited to keep you in the loop."
           });
   } catch (error) {
   // Handle other errors
   console.error(error);
   res.status(500).json({
       error: 1,
       data: [],
       message: "Server error."
   });
   }
}
module.exports = {
    SendSubscribe
}