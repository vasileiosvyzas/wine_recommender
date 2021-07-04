from flask_restful import Resource
from backend.common import util
from gensim import corpora, models, similarities
from nltk.corpus import stopwords
from nltk import word_tokenize
from elasticsearch import Elasticsearch

import requests
import re


class SimilarWines(Resource):
    def get(self, wine_id):
        print("Call for: GET /beers/%s" % wine_id)
        url = util.es_base_url['wines'] + '/' + wine_id
        resp = requests.get(url)
        data = resp.json()
        wine = data['_source']

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

        wines = []
        for hit in result['hits']['hits']:
            wine = hit['_source']
            wine['id'] = hit['_id']
            wines.append(wine)
        return wines

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
        vec_bow = dictionary.doc2bow(word_tokenize(SimilarWines.remove_stopwords(SimilarWines.normalize(query))))
        vec_lsi = lsi[vec_bow]  # convert the query to LSI space
        sims = index[vec_lsi]
        sims = sorted(enumerate(sims), key=lambda item: -item[1])[:8]

        wine_titles = [doc[0] for doc in sims]
        return wine_titles
