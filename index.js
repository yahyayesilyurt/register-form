const express = require("express");
const upload = require("express-fileupload");
require("./db/dbConnection");
const path = require("path");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const hataMiddleware = require("./middleware/hataMiddleware");
const util = require("util");
const userRouter = require("./router/userRouter");


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(upload());
app.use(express.static("./public"));
app.use("/", userRouter);

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname,"./views"));

app.get("/",(req,res) => {
    res.json({mesaj: "Hoşgeldiniz. Kullanıcı kayıt sayfasına gitmek için 'https://localhost:3000/register' adresine, kullanıcıları görüntülemek için 'https://localhost:3000/users' adresine gidiniz"});
});

app.get("/register", (req,res) => {
    res.render("register", {layout: "./layout/auth_layout.ejs"})
});
app.get("/upload", (req,res) => {
    res.render("upload", {layout: "./layout/auth_layout.ejs"})
});



app.post("/upload", async (req,res) => {
    try {
        const file = req.files.file;
        const filename = file.name;
        const extension = path.extname(filename);

        const allowedExtensions = /png|jpeg|jpg|gif/;
        if(!allowedExtensions.test(extension)) throw "Unsupported extension";

        const md5 = file.md5;
        const URL = "/uploads/" + md5 + extension;

        await util.promisify(file.mv)("./public"+ URL);
        res.json({
            message: "Dosya yüklendi!",
            url: URL,
        });


    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
})


app.use(hataMiddleware);



app.listen(3000, () => {
    console.log("3000 portundan server ayaklandı");
});