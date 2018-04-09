export default function(locationQuery = '', action) {
  if (action.type === 'UPDATE_LOCATION_QUERY') {
    return action.locationQuery;
  }
  return locationQuery;
}
