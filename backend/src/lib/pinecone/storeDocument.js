import pinecone from "../pinecone/pinecone.js";
import { getEmbedding } from "../plagiarism/getEmbedding.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid'

dotenv.config();

export async function storeDocument(embedding, metadata) {
    const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

    console.log(embedding)
    await index.upsert([{ id: uuidv4(), values: embedding, metadata }]);
    console.log(`Stored document `);
}


