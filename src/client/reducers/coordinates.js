const thecity = {latitude: 37.733795, longitude: -122.446747};

export default function(coordinates = thecity, action) {
  if (action.type === 'UPDATE_COORDINATES') {
    return {
      ...action.coordinates,
    };
  }
  return coordinates;
}
