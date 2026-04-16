const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAllCountries = async () => {
  // załaduj wszystkie dane krajów raz
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch {
    return [];
  }
};

export default getAllCountries;