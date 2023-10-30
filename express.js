const express = require("express")
const mongoose = require("mongoose")
var app = express()

app.use(express.json())
app.use(express.static(__dirname))

mongoose.connect("mongodb://127.0.0.1:27017/mobiledb")
var conn = mongoose.connection
conn.on('connected',function(){
    console.log("Connected to mongoDB")
})

const mobschema = new mongoose.Schema({
    mid: Number,
    mname: String,
    brand: String,
    price: Number,
    p: String,
    s: String,
    img: String,
    qty: Number
});

const mobile = mongoose.model("mobiledb",mobschema,"mdb");

app.get("/",function(req, res){
    res.sendFile(__dirname+"/home.html")
})

app.get("/api/mobile", function(req, res){
    mobile.find({}).then((data)=>{
        res.json(data)

      
    })
})


app.post('/api/addmb',(req,res)=>{
    mobile.create({
        mid: req.body.mid,
        mname: req.body.mname,
        brand: req.body.brand,
        price: req.body.price,
        p: req.body.p,
        s: req.body.s,
        img: req.body.img,
        qty: req.body.qty
    }).then((newData)=>{
        res.json(newData)
    })
    
})

app.put('/api/update/',(req,res)=>{
    // let id = req.params.id
    // let updateData = req.body.mid
   
    
    mobile.updateOne(
        {mid:req.body.mid},
        {$set:
            {
                mname: req.body.mname,
                brand:req.body.brand,
                price:req.body.price,
                p:req.body.p,
                s:req.body.s,
                img:req.body.img,
                qty:req.body.qty
            }}).then((date)=>{
        res.json(date)

         
    // mobile.updateOne({mid:req.body.mid},{$set:{$set: mname.req.body.mname,brand:req.body.brand,price:req.body.price,
    //     p:req.body.p,s:req.body.s,img:req.body.$set,qty:req.body.qty}}).then((date)=>{
    //     res.json(date)
    })
})




app.delete("/api/mobile/:id", function(req, res){
    const id = req.params.id
        mobile.deleteOne({mid:id}).then((err,data)=>{
        res.json(data)
    })
})

app.listen(1234, ()=>{
    console.log("Server Running on PORT Number: 1234");
    console.log('http://localhost:1234/api/mobile')
    console.log('http://localhost:1234')
})