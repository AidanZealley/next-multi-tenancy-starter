export const patchRequest = async <T>(url: string, changes: Partial<T>) => {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(changes),
    })
    const data = await response.json()

    return data
  } catch (error) {
    throw error
  }
}
