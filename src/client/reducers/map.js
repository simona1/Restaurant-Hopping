export default function(map = null, action) {
  if (action.type === 'MAP_LOADED') {
    return action.map;
  }
  return map;
}
