const User = require("../model/userModel");


const registerFormu = (req,res,next) => {
    res.render("register", {layout: "./layout/auth_layout.ejs"})
}


const users = async (req,res,next) => {
    const tümUserlar = await User.find({});
    res.json(tümUserlar);
}


const register = async (req,res,next) => {
    


    try {
        const _user = await User.findOne({email:req.body.email});

        if(!_user) {
            const newUser = new User({
                email:req.body.email,
                isim: req.body.isim,
                kullanıcı_adı: req.body.kullanıcı_adı,
                şifre: req.body.şifre
            });
            await newUser.save();
            console.log("Kullanıcı kaydedildi");
            res.redirect("/register");
        }
    }catch(err) {

    }
}




module.exports = {
    registerFormu,
    register,
    users
}