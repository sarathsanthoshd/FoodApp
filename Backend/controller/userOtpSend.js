const User = require("../models/UserSchema");
const userotp = require("../models/userOtpSchema");
const emailValidator = require("email-validator");
const nodemailer = require("nodemailer");

// email config
const tarnsporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.userOtpSend = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });
  }
  const validEmail = emailValidator.validate(email);

  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Please enter valid email id",
    });
  }

  try {
    const preuser = await User.findOne({ email });

    if (preuser) {
      const OTP = Math.floor(100000 + Math.random() * 900000);
      console.log(OTP);

      const existEmail = await userotp.findOne({ email });
      console.log(existEmail);

      if (existEmail) {
        const updateOtp = await userotp.findByIdAndUpdate(
          { _id: existEmail._id },
          { otp: OTP },
          { new: true }
        );
        await updateOtp.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Mom's Magic User Verification",
          html: `
    <html>
      <head>
        <style>
          .container {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          .footer {
            background-color: #f8f8f8;
            padding: 20px;
            margin-top: 20px;
            border-top: 1px solid #ccc;
            font-size: 14px;
            color: #555;
          }
          .footer p {
            margin: 5px 0;
          }
          .footer a {
            color: #004aad;
            text-decoration: none;
            margin-right: 15px;
          }
          .footer a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2 style="color: #004aad;">Mom's Magic User Verification</h2>
          <p>Hello ${preuser.name} ,</p>
          <p>Your OTP for Account Verification is:</p>
          <div style="background-color: #f4f4f4; border-radius: 5px; padding: 10px; margin-bottom: 20px;">
            <h1 style="font-size: 36px; color: #004aad; margin: 0;">${OTP}</h1>
          </div>
          <p>This OTP is valid for 10 minutes only.</p>
        </div>
        <div class="footer">
          <p>
            <a href="#">About</a> | 
            <a href="#">Accessibility</a> | 
            <a href="#">Help Center</a>
          </p>
          <p>
            <a href="#">Privacy & Terms</a> | 
            <a href="#">Ad Choices</a> | 
            <a href="#">Advertising</a>
          </p>
          <p>
            <a href="#">Business Services</a> | 
            <a href="#">Get the Mom's Magic app</a>
          </p>
          <p>Mom's Magic Corporation © 2024</p>
        </div>
      </body>
    </html>
  `,
        };
        tarnsporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            return res.status(400).json({
              success: false,
              message: "email not send",
              error: "email not send",
            });
          } else {
            console.log("Email sent", info.response);
            return res
              .status(200)
              .json({ success: true, message: "OTP sent Successfully !" });
          }
        });
      } else {
        const otpInfo = userotp({
          email,
          otp: OTP,
        });

        await otpInfo.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Mom's Magic User Verification",
          html: `
    <html>
      <head>
        <style>
          .container {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          .footer {
            background-color: #f8f8f8;
            padding: 20px;
            margin-top: 20px;
            border-top: 1px solid #ccc;
            font-size: 14px;
            color: #555;
          }
          .footer p {
            margin: 5px 0;
          }
          .footer a {
            color: #004aad;
            text-decoration: none;
            margin-right: 15px;
          }
          .footer a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2 style="color: #004aad;">Mom's Magic User Verification</h2>
          <p>Hello ${preuser.name} ,</p>
          <p>Your OTP for Account Verification is:</p>
          <div style="background-color: #f4f4f4; border-radius: 5px; padding: 10px; margin-bottom: 20px;">
            <h1 style="font-size: 36px; color: #004aad; margin: 0;">${OTP}</h1>
          </div>
          <p>This OTP is valid for 10 minutes only.</p>
        </div>
        <div class="footer">
          <p>
            <a href="#">About</a> | 
            <a href="#">Accessibility</a> | 
            <a href="#">Help Center</a>
          </p>
          <p>
            <a href="#">Privacy & Terms</a> | 
            <a href="#">Ad Choices</a> | 
            <a href="#">Advertising</a>
          </p>
          <p>
            <a href="#">Business Services</a> | 
            <a href="#">Get the Mom's Magic app</a>
          </p>
          <p>Mom's Magic Corporation © 2024</p>
        </div>
      </body>
    </html>
  `,
        };

        tarnsporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            return res.status(400).json({
              success: false,
              message: "email not send",
              error: "email not send",
            });
          } else {
            console.log("Email sent", info.response);
            return res
              .status(200)
              .json({ success: true, message: "Email sent Successfully" });
          }
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Account Does Not exits with this Email id Please Continue to Register",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: "Internal Server Error !",
    });
  }
};
