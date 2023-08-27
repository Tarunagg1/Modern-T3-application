import "dotenv/config";

import App from "./app";
import UserController from './user/user.controller'
import AuthenticationController from "./authentication/auth.controller";

const app = new App([
    new UserController(),
    new AuthenticationController(),
]);

app.listen();