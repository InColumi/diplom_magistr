from models.centroid import Centroid
import torch
from models.test import Test
from sqlalchemy import any_, func
from sentence_transformers import SentenceTransformer, util
from sqlalchemy.orm import Session


def get_clusters_list(query_embedding, sentence_embeddings):
    search_results = util.semantic_search(query_embedding, sentence_embeddings,  query_chunk_size=100, corpus_chunk_size=500000, top_k=len(sentence_embeddings))
    return search_results[0]


def get_books_id_by_smart_search(db: Session, query: str) -> list:
    model = SentenceTransformer('all-MiniLM-L6-v2')
    query = query.strip().lower()
    query_embedding = model.encode(query)
    centroids_db_all = db.query(Centroid).order_by(Centroid.id).all()
    centroids_db = [i.value for i in centroids_db_all]
    centroids = []
    for centroid in centroids_db:
        centroids.append(torch.Tensor(list(map(lambda i: float(i), centroid.split(',')))))
    res = get_clusters_list(query_embedding, centroids)
    
    trashold = 0.3
    for i in res[:5]:
        print(i)
    id_centoird_results = [i['corpus_id'] for i in res if i['score'] >= trashold] 
    id_centroid_db = [centroids_db_all[i].id for i in id_centoird_results]
    books_id = db.query(Test.id_book, Test.centroid_id).where(Test.centroid_id == any_(id_centroid_db)).group_by(Test.id_book, Test.centroid_id).all()

    result = []
    for i in books_id:
        centroid_id = id_centroid_db.pop(0)
        if i[0] not in result:
            if i[1] == centroid_id:
                result.append(i[0])
    return result
