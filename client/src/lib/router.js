/**
 * Helper utilities for navigation within the application
 */

/**
 * Navigate to a path using the provided setLocation function
 * 
 * @param {string} path - The path to navigate to
 * @param {Function} setLocation - The wouter setLocation function
 */
export function navigate(path, setLocation) {
  setLocation(path);
}

/**
 * Navigate to a realm home page
 * 
 * @param {string|number} realmId - The realm ID
 * @param {Function} setLocation - The wouter setLocation function
 */
export function navigateToRealm(realmId, setLocation) {
  // Navigate to story first, which will then redirect to home
  setLocation(`/realm/${realmId}`);
}

/**
 * Navigate to a realm missions page
 * 
 * @param {string|number} realmId - The realm ID
 * @param {Function} setLocation - The wouter setLocation function
 */
export function navigateToMissions(realmId, setLocation) {
  // Special case for realm 7 which has a custom missions page
  if (realmId === 7 || realmId === '7') {
    setLocation(`/realm7/missions`);
  } else {
    setLocation(`/realm/${realmId}`);
  }
}

/**
 * Navigate to a specific mission
 * 
 * @param {string|number} realmId - The realm ID
 * @param {string|number} missionId - The mission ID
 * @param {Function} setLocation - The wouter setLocation function
 */
export function navigateToMission(realmId, missionId, setLocation) {
  setLocation(`/realm/${realmId}/mission/${missionId}`);
}