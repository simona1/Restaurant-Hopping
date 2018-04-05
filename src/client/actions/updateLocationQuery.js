export default function updateLocation(locationQuery) {
  return {
    type: 'UPDATE_LOCATION_QUERY',
    locationQuery,
  };
}
