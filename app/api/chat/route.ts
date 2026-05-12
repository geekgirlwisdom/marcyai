/*import OpenAI from "openai"
import { OpenAIStream, StreamingTextResponse} from "ai"
import {DataAPIClient} from "@datastax/astro-db-ts" */
//import { openai } from '@ai-sdk/openai';
//import { openai as openaisdk } from '@ai-sdk/openai';

import OpenAI from 'openai';
import { OpenAIStream  } from 'ai'; //, streamText
import { StreamingTextResponse } from 'ai';
import { DataAPIClient } from '@datastax/astra-db-ts'; 

/* Grab .env values */
const {
      ASTRA_DB_NAMESPACE,ASTRA_DB_COLLECTION,
      ASTRA_DB_API_ENDPOINT,ASTRA_DB_APPLICATION_TOKEN, OPENAI_API_KEY  
      } = process.env
 const openai = new OpenAI ({
    apiKey: OPENAI_API_KEY,
 })

 /* Grab DB connection */
 const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
 const db = client.db(ASTRA_DB_API_ENDPOINT, {namespace: ASTRA_DB_NAMESPACE})

 export async function POST(req: Request) {
    try 
    {
        console.log("********************************* ROUTE.Post() *******************");
        const { messages} = await req.json();

        console.log("ROUTE.MESSAGES");
        console.table(messages);        
        const latestMessage = messages[messages.length - 1]?.content

        let docContext = "";

        const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
              input: latestMessage,
              encoding_format: "float"
        })

        try 
        {
            /* Grab results from db */
            const collection = await db.collection(ASTRA_DB_COLLECTION)
            const cursor = collection.find(null, {
                sort: {$vector: embedding.data[0].embedding,
                },
                limit: 10
            });
            
            //console.log("ROUTE.RESULTS");
            //console.table(cursor);
            const documents = await cursor.toArray();
            const docsMap = documents?.map((doc) => doc.text);
            docContext = JSON.stringify(docsMap);

            console.log("ROUTE.DOCCONTEXT");            
            console.table(docContext);
        }
        catch(err) 
        {
            console.log("Route.ts: Error Grabbing Data from DB");
            console.log(err);
            docContext = "";
        }

        /* Establish AI Template */
        const template = {
            role: "system",
            content:  `You are an AI Assistant who knows everything about web development.
            -------------------------
            START CONTEXT
            ${docContext}
            END CONTEXT
            -------------------------
            QUESTION: ${latestMessage}
            -------------------------
            `,
        };

        /* Get data   response */
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            stream: true,
            messages: [template, ...messages]
        })
        //console.log("ROUTE: MESSAGES" );
        //console.table(messages);
 
        const stream  =  OpenAIStream(response.toReadableStream());
        //console.log("ROUTE:RESPONSE   " );
        //console.table(response);
        //console.log("ROUTE: STREAM " );
        //console.table(stream);

        return new StreamingTextResponse(stream);
    } 
    catch (err) 
    {
        console.log('Route.ts - Error');
        console.log(err)
        throw err
    }
 }