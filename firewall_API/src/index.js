import { DB_connect } from "./DB/index.db.js"
import { server } from "./sockets.js"
import {} from 'dotenv/config'

DB_connect().then(()=>{
  server.listen(process.env.PORT, () => {
    console.log(`Firewall Server listening on port ${process.env.PORT}`)
  })
})
.catch(()=>{
  console.log("Lisening failed, Something went Wrong");
})

