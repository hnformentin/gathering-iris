# Ultimate Weathertron 3000

## Data from the following API:
* [https://api.met.no/!](api.met.no)
## Built on the following frameworks and languages:
* Python
* Pandas
* Matplotlib
* Flask

## Ideas
We have a general collection and aggregation of weather data and then we try to take user data and fit it onto our collection of data and do mathemagics to try to find interesting connections for over 9000 usecases. 

"We want to see how cold it was? Was it wind in one direction or the other?"
"If I own an electric car and I know that it is raining or snowing, then I know to what percentage I need to charge the car."

TSNE can be used to pick out interesting things from the data.

## The Workflow
* Get data from the API
  * Accept some user data and load from our storage of the prepared metereological data.
    * We need to get met data for the time and position of the user data.
* Process the data using Python and Pandas
  * Do we need caching?
* Send this data to a frontend via Flask
  * Are we going to allow data to be received from the user on the frontend?
  * We want to take our collection data and discover usecases. 
* Visualize the data in the frontend

## Data requirements
* User provided data should be a table with rows being timestamps and columns being measurements.
  ** If all the rows share timestamps we can just slice it there (?)
*


(
# SI Gathering Challenge: Template

To run the project locally, you need docker:

```
docker build -t <name> .
docker run -p 8000:8000 <name>
```
)
