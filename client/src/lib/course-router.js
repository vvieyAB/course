/**
 * Helper utilities for course navigation
 */

/**
 * Redirect to a mission page
 * 
 * @param {string|number} realmId - The realm ID
 * @param {string|number} missionId - The mission ID
 * @param {Function} setLocation - The wouter setLocation function
 */
export function navigateToMission(realmId, missionId, setLocation) {
  // Always use the React router
  setLocation(`/realm/${realmId}/mission/${missionId}`);
}