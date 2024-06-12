export const formatText = (text: string) => {
    return text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(); // Remove special characters and convert to lowercase
}
