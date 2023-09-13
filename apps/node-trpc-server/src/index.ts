import app from "./app";
import { dbConnect } from "./database/connectionDB";
import { APP_PORT } from "./database/config";


dbConnect();

app.listen(APP_PORT as number, () => {
    console.log("Server running on http://localhost:" + APP_PORT + "/");
});
