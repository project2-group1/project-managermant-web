export async function fetchData(URL) {
    try {
        const response = await fetch(URL)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}
