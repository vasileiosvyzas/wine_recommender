# Find my wine
This app is a simple content based recommender system for wines and beers. It has the following functionality:
	- Uses Elasticsearch to provide search functionality for the user to look for wines based on flavour notes
	- recommendation functionality. When the user selects a wine, the system provides a recommendation for similar wines based on the description of the wine by the sommeliers.The recommendation uses cosine similarity and TFIDF to search wines on the corpus and a Word2Vec model to find the semantically similar wines.


## Architecture
The architecture of the system will consist of three components:

    • Elasticsearch: used as data storage and for its search capabilities.
    
    • Python/Flask Microservice: the backend component that has access to Elasticsearch and provides a RESTful API for the frontend.
    
    • AngularJS UI: the frontend that requests data to the backend microservice.


Endpoints of the service:

	- http://[hostname]/findmywine/api/v1.0/wines
	
	- http://[hostname]/findmywine/api/v1.0/wines/[wine_id]



## Data
The data were taken from Kaggle from the following location: https://www.kaggle.com/zynicide/wine-reviews
Prior to this work I had done some exploration to this dataset, if interested it can be found here: https://www.kaggle.com/vasileios/way-to-deep-understanding-of-the-wine-production






