export default function escapeforJson(text) {
    try {
        const escapedString = text.split("\n").join(" ").trim().replace(/[\\"']/g, '\\$&').replace(/[«+]/g, "") ; // Escapes backslashes, quotes
        const validJson = JSON.stringify(escapedString)
        return escapedString
    } catch (error) {
        console.log(error)
        console.log("Not valid Json")
    }
}