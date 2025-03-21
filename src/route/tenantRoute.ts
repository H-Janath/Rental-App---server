import express from 'express';
import {
    getTenant,
    createTenant
} from '../controller/tenantControllers';
const router = express.Router();

router.get('/:cognitoId',getTenant);
router.post('/',createTenant);

export default router;