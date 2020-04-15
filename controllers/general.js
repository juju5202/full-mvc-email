const express = require('express');
const router = express.Router();


//home route 
router.get("/", (req,res)=>{ // "/" 는 홈페이지 링크에서 보이는 링크?임

    //check if environment variable works
    console.log(process.env.SEND_GRID_API_KEY);

    res.render("general/home",{
        title: "Home Page"
    }); //express는 views라는 폴더에서 모든 템플렛을 가져옴. views가 root 따라서 general을 써야함
    
});

//contact us page route
router.get("/contact-us", (req,res)=>{ 
    // "/contact-us" 는 페이지에서 컨택트창에 들어갈떄 링크www.jisoo.com/contact-us <<

    res.render("general/contactUs",{
        title: "Contact Us Page"
    });

});

//when contact us form submitted then post
router.post("/contact-us", (req,res)=>{
    const {firstname,lastname,email,message} = req.body;
    console.log(req.body);

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
        to: `juju5202@hotmail.com`,
        from: `${email}`,
        subject: 'Contact Us Form Submit',
        //text&html is for message to client
        //text: 'and easy to do anywhere, even with Node.js',
        html:
        `Visitor's Full Name ${firstname} ${lastname} <br>
         Visitor's Email Address ${email} <br>
         Visitor's message : ${message} <br>
        `,
    };
    //Asynchronous operation (don't know how long this will take to execute)
    //use then and catch for synchronous! if sending email fail, page won't redirect
    sgMail.send(msg)
    .then(()=>{
        res.redirect("/");
    })
    .catch(err=>{
        console.log(`Error ${err}`);
    }); 
});

module.exports = router;