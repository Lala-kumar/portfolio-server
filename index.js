const router = Router();
import express, { Router, json } from "express";
import cors from "cors";
import { createTransport } from "nodemailer";

// server used to send send emails
const app = express();
app.use(cors());
app.use(json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));
// console.log(process.env.EMAIL_USER);
// console.log(process.env.EMAIL_PASS);

const contactEmail = createTransport({
  service: "gmail",
  auth: {
    user: "lalakumar4099@gmail.com",
    pass: "cgcgmivbsluvhcdx",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.get("/", (req, res) => {
    res.json("hello world!")
  });
  

router.post("/", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: "lalakumar4099@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});
