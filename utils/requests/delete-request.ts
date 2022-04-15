export const deleteRequest = async <T>(
  url: string,
) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
    const data = await response.json()

    return data
  } catch (error) {
    throw error
  }
}