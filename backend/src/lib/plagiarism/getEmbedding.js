import { pipeline } from '@xenova/transformers'
import dotenv from 'dotenv';

dotenv.config();

const HUGGINGFACE_API = process.env.HUGGINGFACE_API_KEY;
// Small but effective model

export async function getEmbedding(text) {
    try {
        console.log("Starting Embedding ... ")
        const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

        const result = await extractor(text, {
            pooling: 'mean',
            normalize: true
        })
        const embedding = result.tolist()
        return embedding[0]
    } catch (error) {
        console.log(error)
    }
}



