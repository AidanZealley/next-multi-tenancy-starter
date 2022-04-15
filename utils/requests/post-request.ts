export const postRequest = async <T>(
  url: string,
  body: Partial<T>
) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body),
    })
    const data = await response.json()

    return data
  } catch (error) {
    throw error
  }
}