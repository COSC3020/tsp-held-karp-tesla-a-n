//used CoPilot to transform pcode
function tsp_hk(distance_matrix) {
  // Handle base cases
  if (!distance_matrix || distance_matrix.length <= 1) {
    return 0;
  }
  
  const n = distance_matrix.length;
  
  // Special case: if all distances are 0
  if (distance_matrix.every(row => row.every(val => val === 0))) {
    return 0;
  }
  
  // Create a cache for memoization
  const memo = {};
  
  // The recursive function that implements Held-Karp
  function heldKarp(cities, start) {
    // Convert cities set to a string for the key
    const citiesKey = [...cities].sort().join(',');
    const key = `${citiesKey}-${start}`;
    
    // Check if we've already computed this
    if (key in memo) {
      return memo[key];
    }
    
    // Base case: if there are only 2 cities (start and one other)
    if (cities.size === 2) {
      // Find the other city
      const otherCity = [...cities].find(city => city !== start);
      return distance_matrix[start][otherCity];
    }
    
    // Try all possible next cities and find the minimum distance
    let minDistance = Infinity;
    
    for (const city of cities) {
      if (city !== start) {
        // Create new set without the start city
        const newCities = new Set([...cities]);
        newCities.delete(start);
        
        // Calculate the distance
        const distance = heldKarp(newCities, city) + distance_matrix[start][city];
        minDistance = Math.min(minDistance, distance);
      }
    }
    
    // Store the result in the memo
    memo[key] = minDistance;
    return minDistance;
  }
  
  // Try each city as starting point
  let minTour = Infinity;
  const allCities = new Set(Array.from({ length: n }, (_, i) => i));
  
  for (let start = 0; start < n; start++) {
    const tourLength = heldKarp(allCities, start);
    minTour = Math.min(minTour, tourLength);
  }
  
  return minTour;
}
