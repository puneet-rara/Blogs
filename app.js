const express= require ("express")
const app = express();
const mongoose= require("mongoose")
const path = require('path')


mongoose.connect("mongodb://localhost:27017",{
    dbName:"blogs"
}).then(()=>{console.log("Databse Connected")})
.catch((e)=>{console.log(`Database Error: ${e}`)})

const schema=new mongoose.Schema({
    title:String,
    description:String
})
const Blog= mongoose.model('Blog',schema);

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.set('view engine','ejs')


app.get("/",(req,res)=>{
    res.render("home")
})

app.post("/blogs",async(req,res)=>{
    const{title,description}=req.body
    await Blog.create({title,description})
    res.redirect('/')
})

app.get("/allblog",async(req,res)=>{
    const blogs=await Blog.find()
    res.render('allblog',{blogs})
})

app.get("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.redirect('/allblog',)
})


app.listen(5000)