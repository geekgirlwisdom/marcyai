/* Code for RAG DB  populated via npm run seed */
import { DataAPIClient } from "@datastax/astra-db-ts"
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer"
import OpenAI from "openai"
import {RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import "dotenv/config"
type SimilarityMetric = "dot_product" | "cosine" | "euclidean"

/* Grab values from .env */
const { ASTRA_DB_NAMESPACE,ASTRA_DB_COLLECTION,ASTRA_DB_API_ENDPOINT,ASTRA_DB_APPLICATION_TOKEN, OPENAI_API_KEY  } = process.env
const openai = new OpenAI({apiKey: OPENAI_API_KEY})

//define data sources to read into vector db
const marcyData = [
    'https://marcylabschool.gitbook.io/marcy-lab-school-docs',
    'https://marcylabschool.gitbook.io/marcy-lab-school-docs/mod-0-command-line-interfaces-git-and-github/2-git-github',
    'https://marcylabschool.gitbook.io/marcy-lab-school-docs/mod-3-html-css/1-html'
    /*'https://github.com/The-Marcy-Lab-School/marcy-curriculum-docs',
    'https://marcylabschool.gitbook.io/marcy-lab-school-docs/environment-setup/local-environment-setup-mac',
    'https://marcylabschool.gitbook.io/marcy-lab-school-docs/environment-setup/local-environment-setup-windows',
    'https://marcylabschool.gitbook.io/marcy-lab-school-docs/environment-setup/github-setup',
    'https://marcylabschool.gitbook.io/marcy-lab-school-docs/environment-setup/loom',
    'https://marcylabschool.gitbook.io/marcy-lab-school-docs/environment-setup/postgres-setup'*/
]

//Define db 
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE})

//grab data in chunks
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 100
})

//create collection here 
const createCollection  = async( similarityMetric:  SimilarityMetric = "dot_product" ) => {
    const res = await db.createCollection(ASTRA_DB_COLLECTION, {
        vector: {
            dimension: 1536,
            metric: similarityMetric 
        }
    })
    console.log(res)
}

//load data
const loadSampleData = async () => {
    const collection = await db.collection(ASTRA_DB_COLLECTION)
    for await (const url of marcyData) {
        const content = await scrapePage(url)
        const chunks = await splitter.splitText(content)
        for await (const chunk of chunks) {
            const embedding = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: chunk,
                encoding_format: "float"
            } )
            const vector = embedding.data[0].embedding
            const res = await collection.insertOne({
                $vector: vector,
                text: chunk
            })
            console.log(res)
        }
    }
}

//scraper
const scrapePage = async (url: string) => {
    const loader = new PuppeteerWebBaseLoader(url, {
        launchOptions: {
            headless: true
        },
        gotoOptions: {
            waitUntil: "domcontentloaded"
        },
        evaluate: async(page, browser) => {
            const result = await  page.evaluate(() => document.body.innerHTML)
            await browser.close()
            return result
        }
    })
    //regex strip html tags 
    return (await loader.scrape())?.replace(/<[^>]*>?/gm, '')
}

createCollection().then(() => loadSampleData())