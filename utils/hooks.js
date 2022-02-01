import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

const {
    VERIFICATION_TOKEN_SECRET,
    VERIFICATION_TOKEN_EXPIRES,
    BASE_URL,
    SENDGRID_API_KEY
} = require('../config');

// https://stackoverflow.com/questions/39092822/how-to-confirm-email-address-using-express-node
export const handleVerification = async (userID, email) => {
    const verification_token = jwt.sign({ user_id: userID }, VERIFICATION_TOKEN_SECRET, { expiresIn: `${VERIFICATION_TOKEN_EXPIRES}m` });
    const url = BASE_URL + 'api/auth/verify/' + verification_token;

    let transporter = nodemailer.createTransport(sgTransport({
        auth: {
            api_key: SENDGRID_API_KEY,
        }
    }));

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: '"NEEM SOCIAL" <no_reply@neem.gq>',
        to: email,
        subject: "Account Verification",
        text: "Click on the link below to veriy your account \n\n" + url,
        trackingSettings: {
            clickTracking: {
              enable: false,
              enableText: false
            },
            openTracking: {
              enable: false
            }
        }
    }, (error, info) => {
        if (error) {
            console.log(error)
            return;
        }
        transporter.close();
    });
}

export const errorMessage = (res, msg) => {
    res.status(401);
    return res.json({ 
        status: 'fail',
        message: msg 
    });
}