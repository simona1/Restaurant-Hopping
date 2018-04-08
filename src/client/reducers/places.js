export default function(places = [], action) {
  if (action.type === 'RECEIVE_PLACES') {
    return action.places;
  }
  return places;
}
