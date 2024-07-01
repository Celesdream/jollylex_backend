
//index main page project

require('dotenv').config();
const moduleBODYPARSER  =   require('body-parser');
const moduleEXPRESS     =   require('express');
const moduleCORS        =   require('cors');





//------------------ROUTES IMPORTS---------------------------------------------------|
const routeAUTHusers           =   require('./src/users/routes/authRoutes');

const routeREQUESTusers = require('./src/users/routes/requestRoutes');
const routeWORDSusers = require('./src/users/routes/wordRoutes');
const routeACCOUNTusers = require('./src/users/routes/accountRoutes');



const routeREQUESTreviewers = require('./src/reviewers/routes/requestRoutes');
const routeCONTRIBUTIONreviewers = require('./src/reviewers/routes/contributionRoutes');
const routeACCOUNTreviewers = require('./src/reviewers/routes/accountRoutes');
//------------------ROUTES IMPORTS---------------------------------------------------|





//---------------------Cors Config & Other Stuff-------------------------------------|

const app   = moduleEXPRESS();
const PORT  = process.env.PORT || 3000;

const corsOptions = { origin: [process.env.SERVER_HOST], };
app.use(moduleEXPRESS.json());
app.use(moduleCORS(corsOptions));
app.use(moduleBODYPARSER.json());
app.use(moduleBODYPARSER.urlencoded({ extended: true }));

//---------------------Cors Config & Other Stuff-------------------------------------|





//-----------APIs SECTION-------------------------------------------------------------|
app.use('/api/users',routeAUTHusers);
app.use('/api/users',routeREQUESTusers);
app.use('/api/users',routeWORDSusers);
app.use('/api/users',routeACCOUNTusers);


app.use('/api/reviewers',routeREQUESTreviewers);
app.use('/api/reviewers',routeCONTRIBUTIONreviewers);
app.use('/api/reviewers',routeACCOUNTreviewers);

//-----------APIs SECTION------------------------------------------------------------------|





//--------------------SERVER SECTION-------------------------------|

app.use((err, req, res, next) => 
{
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});


//se inicia el servidor
app.listen(PORT, () => 
{
    console.log(`Server is running on port ${PORT}`);
});

//--------------------SERVER SECTION-------------------------------|