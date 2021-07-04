from flask_restful import Resource
from flask_restful import reqparse
from elasticsearch import Elasticsearch

parser = reqparse.RequestParser()


class Search(Resource):
    def get(self):
        # parse the query: ?q=[something]
        parser.add_argument('q')
        query_string = parser.parse_args()
        print('Query string', query_string)
        query = {
            "query": {
                "multi_match": {
                    "fields": ["description"],
                    "query": query_string['q'],
                    "type": "cross_fields",
                    "use_dis_max": False
                }
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

        print(wines)
        return wines


