export default async function detectText(data) {
    const worker = await createWorker('eng')
    const ret = await worker.recognize(data.publicUrl)
    const studentAnswer = ret.data.text;
    await worker.terminate();
    return studentAnswer
}