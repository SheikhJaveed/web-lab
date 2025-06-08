const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { title } = require('process');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/HR_DB', {})
.then(()=> console.log('MongoDB connected'))
.catch((err)=> console.error(err));


app.use(express.urlencoded({ extended: true }));

// Define Employee Schema
const employeeSchema= new mongoose.Schema({
    emp_name: String,
    email: String,
    phone: String,
    hire_date: Date,
    salary: Number,
    title: String
})

const Employee = mongoose.model('Employee', employeeSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/', async (req, res) => {
    const { emp_name, email, phone, hire_date, salary, title } = req.body;
    const employee = new Employee({
        emp_name: emp_name,
        email: email,
        phone: phone,
        hire_date: new Date(hire_date),
        salary: parseFloat(salary),
        title: title
    });

    try {
        await employee.save();
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error saving employee.");
    }
})

app.get("/employee-list", async (req, res) => {
    try {
        const employees = await Employee.find({ salary: { $gt: 50000 } });
        res.json(employees);
    } catch (err) {
        res.status(500).send("Error fetching employees.");
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});