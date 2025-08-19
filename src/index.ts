import config from "./api/config";
import app from "./app";


async function main() {
    try {
        app.listen(config.port, () => {
            console.log(`love ayaka on http://localhost:${config.port}`);
        });
    } catch (err) {
        console.log(err);
    }
}
main();