# README
Restaurant Hopping is containerized inside a Vagrant VM. It uses Google Maps
API, specifically nearby places search to retrieve a list of restaurants based on user input (location). For creating the itinerary for restaurant-hopping, it uses these results to implement the solution to the `Traveling Salesman Problem`. The results are drawn on map and shown on a list with ratings.
A Google Maps API key is required.

## Instructions

1. Obtain API key for Google Maps.
2. It should be stored in `api_key.js`

Run:
1. `vagrant up`
2. `vagrant ssh`
3. `cd /vagrant`.
4. `yarn install`
5. `yarn run build`
6. `yarn run server`

In the browser, go to `//localhost:5000`
and type your preferred location for restaurant hopping in the search text box to see the recommended `open now` restaurants, their ratings and the shortest path itinerary.
Test with `yarn run test`.

#### TODOs
* add more tests
* allow search by address
* add loading indicator
* add links
* add flow
* deploy
