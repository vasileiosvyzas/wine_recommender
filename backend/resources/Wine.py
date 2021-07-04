from flask_restful import Resource
from backend.common import util
from gensim import corpora, models, similarities
from nltk.corpus import stopwords
from nltk import word_tokenize
from elasticsearch import Elasticsearch
import requests
import re


class Wine(Resource):
    def get(self, wine_id):
        regional_wines = []
        similar_wines = []
        wines_dict = dict()

        print("Call for: GET /beers/%s" % wine_id)
        url = util.es_base_url['wines'] + '/' + wine_id
        resp = requests.get(url)
        data = resp.json()
        wine = data['_source']

        wines_dict['wine'] = wine

        print(wine)
        query1 = wine['region_1']
        query1 = {
            "query": {
                "match": {
                    "region_1": query1
                }
            }
        }
        client = Elasticsearch([{'host': 'localhost', 'port': 9200}])
        result1 = client.search(index='findmywine', body=query1)

        for hit in result1['hits']['hits']:
            regional_wine = hit['_source']
            print(regional_wine)
            regional_wine['id'] = hit['_id']
            regional_wines.append(regional_wine)
        wines_dict['regional_wines'] = regional_wines

        query = wine['description']
        id_list = self.find_similar_docs(query)
        query = {
            "query": {
                "terms": {
                    "_id": id_list
                }
            }
        }
        client = Elasticsearch([{'host': 'localhost', 'port': 9200}])
        result = client.search(index='findmywine', body=query)

        for hit in result['hits']['hits']:
            similar_wine = hit['_source']
            print(similar_wine)
            similar_wine['id'] = hit['_id']
            similar_wines.append(similar_wine)

        wines_dict['similar_wines'] = similar_wines
        return wines_dict

    @staticmethod
    def normalize(review):
        review_letters = re.sub('[^a-zA-Z]', ' ', str(review))
        review_letters = review_letters.lower()
        return " ".join(review_letters.split())

    @staticmethod
    def remove_stopwords(review):
        stop_words = set(stopwords.words('english'))
        ls = [word for word in review.split() if word not in stop_words]
        txt = " ".join(ls)
        return txt

    @staticmethod
    def find_similar_docs(query):
        index = similarities.MatrixSimilarity.load("backend/wines.index")
        dictionary = corpora.Dictionary.load('backend/wines.dict')
        lsi = models.LsiModel.load('backend/model.lsi')
        vec_bow = dictionary.doc2bow(word_tokenize(Wine.remove_stopwords(Wine.normalize(query))))
        vec_lsi = lsi[vec_bow]  # convert the query to LSI space
        sims = index[vec_lsi]
        sims = sorted(enumerate(sims), key=lambda item: -item[1])[:8]

        wine_titles = [doc[0] for doc in sims]
        return wine_titles