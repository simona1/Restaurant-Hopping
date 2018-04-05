const uluru = {latitude: -25.363, longitude: 131.044};

export default function(coordinates = uluru, action) {
  if (action.type === 'UPDATE_COORDINATES') {
    return {
      ...action.coordinates,
    };
  }
  return coordinates;
}
