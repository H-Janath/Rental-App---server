import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import tenantRoute from './route/tenantRoute'
import managerRoute from './route/managerRoute';
import { authMiddleware } from './middleware/authMiddleware';
// ROUTE IMPORT

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.get('/',authMiddleware(['manager']),(req,res)=>{
    res.send("This is home route")
})

app.use('/tenants',authMiddleware(['tenant']),tenantRoute);
app.use('/managers',authMiddleware(['manager']),managerRoute);

// SERVER
const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})