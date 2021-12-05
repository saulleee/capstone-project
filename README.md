# triply📍

triply is an app created to provide users with unique, walkable itineraries. Users can search a city and their desired points of interest, and triply does the rest!

The app calls on the Yelp Fusion API, which it then works through the data to generate trips that have points of interest that are unique as well as being within a walkable vicinity to each other. Trips can be favorited by users as well.

Check out the app here: 

[https://triplyapp.herokuapp.com/](https://triplyapp.herokuapp.com/)

## Homepage

<img width="896" alt="triply-home" src="https://user-images.githubusercontent.com/26151666/144734666-01f473a7-6c5a-44a5-bb27-69b3309cfd8d.png">
<img width="896" alt="results page" src="https://user-images.githubusercontent.com/26151666/144734887-56d14e7b-2f01-42b1-a271-f37f8d2196f1.png">
<img width="896" alt="show page" src="https://user-images.githubusercontent.com/26151666/144734889-efccffdc-e6fe-49f6-8824-c3cec4e2fee0.png">


## Set Up and Usage
1. install gems and packages 
   
   `bundle && yarn`

2. set up a POSTGRES database
   
   `rails db:create db:migrate`

3. start up the server
   
   `rails s`

   `yarn dev:client`

4. navigate to [http://localhost:3000](http://localhost:3000) in your browser
