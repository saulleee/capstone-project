# triply

triply is an app created to provide users with unique, walkable itineraries. Users can search a city and their desired points of interest, and triply does the rest!

The app calls on the Yelp Fusion API, which it then works through the data to generate trips that have points of interest that are unique as well as being within a walkable vicinity to each other. Trips can be favorited by users as well.

Check out the app here: 

[https://triplyapp.herokuapp.com/](https://triplyapp.herokuapp.com/)

## Set Up and Usage
1. install gems and packages 
   `bundle && yarn`
2. set up a POSTGRES database
   `rails db:create db:migrate`
3. start up the server
   `rails `
   `yarn dev:client`
4. navigate to [http://localhost:3000](http://localhost:3000) in your browser