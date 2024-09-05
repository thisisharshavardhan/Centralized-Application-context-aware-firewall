import express from "express"
import { DB_connect } from "./DB/index.db.js"
import { app } from "./app.js"
import {} from 'dotenv/config'

DB_connect().then(()=>{
  app.listen(process.env.PORT, () => {
    console.log(`Firewall Server listening on port ${process.env.PORT}`)
  })
})
.catch(()=>{
  console.log("Lisening failed, Something went Wrong");
})

