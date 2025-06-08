const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentFees',{})
.then(()=>console.log('MongoDB connected'))
.catch((err)=>console.error(err));

app.use(express.urlencoded({ extended: true }));

// Define Student Schema
const studentSchema=new mongoose.Schema({
    usn:String,
    name:String,
    fees_paid:Boolean
});

const Student = mongoose.model('Student', studentSchema);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})

// Handle form submission
// Handle form submission
app.post('/',async (req,res)=>{
    const {usn,name,fees_paid} = req.body;
    const student = new Student({
    	usn:usn,
        name:name,
        fees_paid:fees_paid=='true'
     })
	
      try{
        await student.save();
        res.redirect("/");
      }
	catch(err){
	    res.status(500).send("error 500");	
	}	
})

app.get("/exam-fee",async (req,res)=>{
	try{	
		const fees=await Student.find({fees_paid:false})
		res.json(fees)
	}
	catch(error){
		res.status(500).send("error 500")	
	}
});

const PORT=3000;
app.listen(PORT,()=>{
	console.log(`Server listening on ${PORT}`);
});