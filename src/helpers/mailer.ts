import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email,emailType,userId}:any)=>{
    try {
        //create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(),10);


        if (emailType==="VERIFY") {
            await User.findByIdAndUpdate(userId,{
                verifyToken: hashedToken,verifyTokenExpiry:Date.now()+360000
            }) 
        } else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: hashedToken,forgotPasswordTokenExpiry:Date.now()+360000
            })
        }
        
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "c3b1f001e96faf",
              pass: "586ab3d2be12e5"
            }
          });


          const mailOptions={
            from: 'aviarnav567@gmail.com',
            to:email,
            subject: emailType==="VERIFY"?"Verify your email":"Reset your password",
            html:`<p>Click <a href ="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY"?"Verify your email":"Reset your password"}</p>`
          }

          const mailresponse = await transport.sendMail(mailOptions);
          return mailresponse;
    } catch (error:any) {
        throw new Error(error.message);
    }
}