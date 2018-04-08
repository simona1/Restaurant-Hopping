/*global google*/
import googlePlacesService from 'google-places-autocomplete-service';

export default function(places = [], action) {
  if (action.type === 'FETCH_PLACES') {
    return action.places;
  }
  return places;
}

