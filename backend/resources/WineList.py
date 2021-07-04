from flask_restful import Resource
from elasticsearch import Elasticsearch


class WineList(Resource):
    def get(self):
        print('Call for: GET /wines')
        query = {
            "query": {
                "match_all": {}
            },
            "size": 100
        }

        client = Elasticsearch([{'host': 'localhost', 'port': 9200}])
        result = client.search(index='findmywine', body=query)

        wines = []
        for hit in result['hits']['hits']:
            wine = hit['_source']
            wine['id'] = hit['_id']
            wines.append(wine)
        return wines
