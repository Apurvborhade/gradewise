import pinecone from "../pinecone/pinecone.js";
import { getEmbedding } from './getEmbedding.js'


export default async function checkPlagiarism(embedding, next) {
    const index = pinecone.index(process.env.PINECONE_INDEX_NAME)
    try {
        const queryResult = await index.query({
            vector: embedding,
            topK: 3,  // Get top 3 matches
            includeMetadata: false
        });

        return queryResult.matches
            .filter((match) => match.score >= 0.7)
            .map(match => ({
                id: match.id,
                similarity: match.score,
                metadata: match.metadata
            }));
    } catch (error) {
        next(error)
    }
}