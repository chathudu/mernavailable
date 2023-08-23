const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL, PASSWORD } = require("../env");

/* send mail using testing account */
const signup = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com",
    subject: "Hello", // Subject line
    text: "Hello world",
    html: "<b>hello World</b>",
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    });
    
    // .catch((error) => {
    //   return res.status(500).json({ error });
    // });

  //   res.status(201).json("Signup Successfully...!");
};

/* send mail using real gmail account */
const getbill = (req, res) => {
  const { userEmail ,emailBody} = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerater = new Mailgen({
    theme: "default",
    product: {
      name: "Boxing Association of Sri Lanka",
      link: "https://mailgen.js",
    },
  });

  let response = {
    body: {
      name: "Plyer",
    //   intro: "this is a test message",
    intro: emailBody,
      table: {
        data:[
            {
                // item: "Nodemailer Stack Book",
                // description: "A Backend Application",
                // price: "$10.99",
            }
        ]
        
      },
    },
  };

  let mail = MailGenerater.generate(response);

  let massage = {
    from: EMAIL,
    to: userEmail,
    subject: "Check Availability",
    html: mail,
  };

  transporter
    .sendMail(massage)
    .then(() => {
      return res.status(201).json({
        msg: "You should recive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  //   res.status(201).json("getbill successfully...!");
};

module.exports = {
  signup,
  getbill,
};
