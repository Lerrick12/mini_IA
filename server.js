// Importing required modules
const express = require('express');
const mongoose = require('mongoose');

// Creating an instance of Express
const app = express();

// Connecting to the MongoDB database
mongoose.connect('mongodb+srv://takyiderrick:<password>@dcit205.5trw02j.mongodb.net//medical_records', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Defining the patient schema
const patientSchema = new mongoose.Schema({
    PatientId: String,
    Surname: String,
    Othername: String,
    Gender: String,
    Contact_number: Number,
    Residential_address: String,
    Emergency_contact_name: String,
    Emergency_contact_number: Number,
    Relationship_with_patient: String,
    vitals: {
      bloodPressure: String,
      heartRate: Number,
      temperature: Number,
    },
  });
  
  // Creating the patient model
const Patient = mongoose.model('Patient', patientSchema);

// API endpoint to get patient information on first visit
app.get('/patients/:id', (req, res) => {
  const patientId = req.params.id;

  // Retrieve patient information from the database
  Patient.findById(patientId, (err, patient) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve patient information' });
    } else {
      res.json(patient);
    }
  });
});

// API endpoint to start an encounter for a visiting patient
app.post('/encounters', (req, res) => {
  const { patientId, date, time, type } = req.body;

  // Create a new encounter for the patient
  const encounter = {
    patientId: Number,
    date: Number,
    time: Number,
    type: String,
  };

  // Save the encounter to the database
  // ...

  res.json(encounter);
});

// API endpoint to send patient vitals information to the doctor
app.post('/vitals', (req, res) => {
  const { patientId, bloodPressure, heartRate, temperature } = req.body;

  // Update the patient's vitals information in the database
  // ...

  res.json({ message: 'Vitals information sent to the doctor' });
});

// API endpoint to get a list of patients for the doctor
app.get('/patients', (req, res) => {
  // Retrieve the list of patients from the database
  Patient.find({}, (err, patients) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve patients' });
    } else {
      res.json(patients);
    }
  });
});

// API endpoint to get the details of a specific patient for the doctor
app.get('/patients/:id', (req, res) => {
  const patientId = req.params.id;

  // Retrieve the patient details from the database
  Patient.findById(patientId, (err, patient) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve patient details' });
    } else {
      res.json(patient);
    }
  });
});

// Starting the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

  