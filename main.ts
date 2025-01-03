import * as sdk from "https://deno.land/x/appwrite/mod.ts";
import "jsr:@std/dotenv/load";

let client = new sdk.Client();

client
    .setEndpoint(Deno.env.get("END_POINT")) // Your API Endpoint
    .setProject(Deno.env.get("PROJECT_ID")) // Your project ID
    .setKey(Deno.env.get("SECRET_KEY")) // Your secret API key
;



console.log("done");