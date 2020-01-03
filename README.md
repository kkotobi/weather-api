# weather-api
Simple RESTful api that collects weather metrics from raspberry pi. 

*Important disclaimer:* The raspberry pi lives inside our internal network and, none of the endpoints are exposed to the outside world, 
 so things like authorization are not needed.

The data saved on this app is only stored in memory and lives as long as the app is running. 
If the server stops or restarts all the data is lost (by design). 

## Up and running
- Make sure you have node 10.x+ installed locally. 
- From the command line run `npm i;`
- While developing run: `npm run dev;` this command will auto reload your code changes.
- To run it outside of dev-mode: `npm start;`

*Please note:* That when you start the app you will see a directory of current endpoints on the console.

## Routes 
- As an added convenience there's a postman collection on the root folder of this repo
under /postman-collection, it contains inputs and query strings so you can play around with this app.

#### POST 
    /measurements
    
Takes in a request body with a snapshot of the weather measurements collected e.g:
   
   ```json
   {
       "timestamp": "2015-09-01T16:00:00.000Z",
       "temperature": 27.1,
       "dewPoint": 16.7,
       "precipitation": 0
   }
   ```
   
- `timestamp` is a required key and it's an ISO 8601 formatted date.
- All the other metrics such as temperature or dewPoint can change or be omitted, 
new ones can be sent in their place. 
- Every metric needs to have a float as it's value. 
- The return value for this endpoint if it's successfull is a 201 with very same req.body 
  
#### GET 
     /stats
 
You need to pass a query date range (required) and optional stats and metrics e.g: 

`http://localhost:8000/stats?stat=min&stat=max&stat=average&metric=temperature&metric=dewPoint&metric=precipitation&fromDateTime=2015-09-01T16:00:00.000Z&toDateTime=2015-11-01T16:00:00.000Z`

Returns (if query string matches data in store, otherwise you get back 404): 

```json
{
    "temperature": {
        "min": 27.1,
        "max": 27.1,
        "average": 27.1
    },
    "dewPoint": {
        "min": 16.7,
        "max": 16.7,
        "average": 16.7
    },
    "precipitation": {
        "min": 0,
        "max": 0,
        "average": 0
    }
}
```


#### GET 
     /measurements
 
You need to pass a query date (required) e.g:

`http://localhost:8000/measurements/2015-09-01T16:00:00.000Z`

Returns (if query string matches data in store, otherwise you get back 404): 

```json
{
    "timestamp": "2015-09-01T16:00:00.000Z",
    "temperature": 27.1,
    "dewPoint": 16.7,
    "precipitation": 0,
    "a": 0
}
```
    
     