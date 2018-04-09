export default function(locationName = 'San Francisco', action) {
  if (action.type === 'UPDATE_LOCATION_NAME') {
    return {
      ...action.locationName,
    };
  }
  return locationName;
}
