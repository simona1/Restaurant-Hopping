/* global google */
export default function updateCoordinates(coordinates) {
  return {
    type: 'UPDATE_COORDINATES',
    coordinates,
  };
}
