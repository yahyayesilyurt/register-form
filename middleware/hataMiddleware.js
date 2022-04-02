const hataYakalayıcı = (err,req,res,next) => {
    if(err.code === 11000){
        return res.json(
            {
                mesaj: Object.keys(err.keyValue) +" için girdiğiniz "+ Object.values(err.keyValue) + " unique olmalıdır.",
                hataKodu: 400
            }
        )
    }
    if(err.code === 66){
        return res.json({
            mesaj: "Değiştirilemez bir alanı değiştirmeye çalıştınız.",
            hataKodu: 400
        })
    }
    res.status(err.statusCode || 500);
    res.json({
        hataKodu: err.statusCode || 400,
        mesaj: err.message
    });
}

module.exports = hataYakalayıcı;