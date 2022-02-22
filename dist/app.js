"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST TODO CRUD",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["**/*.ts"]
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.json());
app.use('/v1', todo_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
