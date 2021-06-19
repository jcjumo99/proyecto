const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Routes
const userRoutes = require('./routes/user.routes');
const serviceRoutes = require('./routes/services.routes');
const userServicesRoutes = require('./routes/userServices.routes');

// Database
require('./config/database');

// Settings
app.set('PORT', process.env.PORT || 4000);
app.use( express.urlencoded({ extended : false }) );
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/uploads/:image', (req, res) => {
    const {image} = req.params;
    const filePath = './src/uploads/'+image;
    fs.exists(filePath, function(exists) {
        if(exists){
            res.sendFile(path.resolve(filePath));
        }else{
            res.json({ status: "error", message: "Image do not found" });
        }
    });
});

// Routes
app.use(userRoutes);
app.use(serviceRoutes);
app.use(userServicesRoutes);

// Listen server
app.listen(app.get('PORT'), () => {
    console.log('Server on port: ', app.get('PORT'));
});