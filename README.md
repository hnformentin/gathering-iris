# Ultimate Weathertron 3000

## Purpose
Insert weather data and vizualise the correlation between the user data and weather data.

## Data from the following API:
* [api.met.no](https://api.met.no/)

## Built on the following frameworks and languages (and who's responsible):
* Python ( Espen and Rafael )
* Pandas
* Matplotlib
* Flask (backend) (Kjell and Dafferianto)
* D3 (frontend) (Jens and Daniel)

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
  
## MVP1
One flask service running with different endpoints. One of the gets you the met data, one of them combines and also depends on the met one and takes user input.

### Frontend:
We need:
* Location service: [geolocation API!](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
* Line charts
* A way to input user data and send to the backend.
* Try to think about what data format to get back.
* Think about user design.
* Make graphs for temperature and energy usage.
	How to visualize these.
	The temp is a cont time series, while every trip is a dot in the same plot.
	Add a "gadget" to visualize a set of timesequences. Data from the car. Data from temp. From Weather.
	

## The Team:
### Espen Stokkereit:
Team Solum, working with the Omnia platform, governance and administration related tasks. Implementing solutions and policies for all of Omnia Classic. Setting restrictions etc. Producing subnets and so on.

Main subject is Math! Phd. In maths with some courses in IT. Started this august! 
	
### Jens Gåsemyr Magnus:
Background in visualization. Shellvis.  Does bouldering. Plays Among Us. 
	
### Kjell Wilhelm Kongsvik:
Missing Shellvis… Last half year I've been doing some API in Go. Some security stuff there. Not using radix yet. In the team he's the expert in Radix. One::pac team - baking. 
	
### Tor Erik Rabben
POSO in Trondheim, well planning.
Working with wellplans as compared to REP we're doing drilled wells. Working with adjusting data and presenting data and running with rpesenting APIs for planned wells. .NET and c# all way, with an Angular client. 
Background as a mathematician and geophysicist. Worked almost 10 years as a geophysicist in Equinor. For close to 3 years I've been in SI. Tend to pick up the math problems in the team and mainly work with back-end stuff. Did numerics, so it's always been computers. 
	
### Dafferianto Trinugroho
Used to work in the Radix team but now it's in the SUMO team.
Work in SIS. Work with bringing FMU to SSDL. 
	
### Rafael Garcia
Working in the SUMO team, in SIS. Working with providing the API with python to allow the engineers and geophysics to use an easier programming language.
Also a graduate, started in August. 
Background: Master degree CS: Machine learning.

(
# SI Gathering Challenge: Template

To run the project locally, you need docker:

```
docker build -t <name> .
docker run -p 8000:8000 <name>
```
)
