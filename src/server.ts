import app from "./app";
import {PORT} from "./utils/config";

app.listen(PORT || 3000, () => console.log(`App running on port ${PORT}`));