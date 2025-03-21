"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const tenantRoute_1 = __importDefault(require("./route/tenantRoute"));
const managerRoute_1 = __importDefault(require("./route/managerRoute"));
const authMiddleware_1 = require("./middleware/authMiddleware");
// ROUTE IMPORT
// CONFIGURATIONS
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.get('/', (0, authMiddleware_1.authMiddleware)(['manager']), (req, res) => {
    res.send("This is home route");
});
app.use('/tenants', (0, authMiddleware_1.authMiddleware)(['tenant']), tenantRoute_1.default);
app.use('/managers', (0, authMiddleware_1.authMiddleware)(['manager']), managerRoute_1.default);
// SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
