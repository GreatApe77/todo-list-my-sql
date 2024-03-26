
import { app } from "./app";
import { env } from "./config/environment";


const PORT = env.PORT

async function main() {

    app.listen(PORT,()=>{
        console.log(`Server running at ${PORT}`)
    })
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
