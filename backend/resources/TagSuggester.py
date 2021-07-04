from flask_restful import Resource
from flask_restful import reqparse
from elasticsearch import Elasticsearch
from backend.common import util
import requests
import json
parser = reqparse.RequestParser()


class TagSuggester(Resource):
    def get(self):
        parser.add_argument('q')
        query_string = parser.parse_args()
        print('Query string', query_string)
        query = {
            "query": {
                "match": {
                    "flavor": query_string['q']
                }
            }
        }
        client = Elasticsearch('localhost')
        result = client.search(index='findmyflavors', body=query)

        wines = []
        for hit in result['hits']['hits']:
            wine = hit['_source']
            wine['id'] = hit['_id']
            wines.append(wine)

        print(wines)
        return wines

