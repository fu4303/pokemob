export const fetchAPI = async (apiToFetch) => {
    const response = await fetch(apiToFetch);
    const data = await response.json();
    return data;
} 