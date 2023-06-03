# import pandas as pd
# from pandas import DataFrame
# import matplotlib.pyplot as plt
# import numpy as np
# from scipy.sparse import csr_matrix
# from mpl_toolkits.axes_grid1 import make_axes_locatable
# from sklearn.cluster import KMeans
# from sklearn.metrics import mean_squared_error
# import itertools
# from sklearn.metrics import silhouette_samples, silhouette_score
# from sqlalchemy.orm import Session
# from models.book_users import BookUsers
# from models.books import Books
# from models.authors import Authors
# from models.book_authors import BookAuthors
# from uuid import UUID
# from sqlalchemy import func, and_
# from dependencies import settings
# import scipy

# def draw_scatterplot(x_data, x_label, y_data, y_label):
#     fig = plt.figure(figsize=(12, 12))
#     ax = fig.add_subplot(111)
#     ax.set_xlabel(x_label)
#     ax.set_ylabel(y_label)
#     ax.scatter(x_data, y_data)
#     plt.show()


# def get_data(db: Session):
#     data = db.query(BookUsers.ref_users.label('user_id'),
#                     Books.id.label('book_id'),
#                     BookUsers.evaluation,
#                     Books.rating_quantity,
#                     Books.rating_avg)\
#             .join(Books, Books.id == BookUsers.ref_books)\
#             .order_by(func.random()).all()
#     return data

# # Define the plotting heatmap function
# def draw_movies_heatmap(most_rated_movies_users_selection, axis_labels=False):

#     fig = plt.figure(figsize=(15,4))
#     ax = plt.gca()

#     # Draw heatmap
#     heatmap = ax.imshow(most_rated_movies_users_selection,  interpolation='nearest', vmin=0, vmax=5, aspect='auto')
#     if axis_labels:
#             ax.set_yticks(np.arange(most_rated_movies_users_selection.shape[0]) , minor=False)
#             ax.set_xticks(np.arange(most_rated_movies_users_selection.shape[1]) , minor=False)
#             ax.invert_yaxis()
#             ax.xaxis.tick_top()
#             labels = most_rated_movies_users_selection.columns
#             ax.set_xticklabels(labels, minor=False)
#             ax.set_yticklabels(most_rated_movies_users_selection.index, minor=False)
#             plt.setp(ax.get_xticklabels(), rotation=90)
#     else:
#         ax.get_xaxis().set_visible(False)
#         ax.get_yaxis().set_visible(False)

#     ax.grid(False)
#     ax.set_ylabel('User id')
#     # Separate heatmap from color bar
#     divider = make_axes_locatable(ax)
#     cax = divider.append_axes("right", size="5%", pad=0.05)
#     # Color bar
#     cbar = fig.colorbar(heatmap, ticks=[5, 4, 3, 2, 1, 0], cax=cax)
#     cbar.ax.set_yticklabels(['5 stars', '4 stars','3 stars','2 stars','1 stars','0 stars'])
#     plt.show()

# def get_1_rec(db: Session, limit: int = 10):
#     import seaborn as sns
#     data_db = db.query(Books.rating_avg, func.array_agg(Authors.name).label('title'))\
#                 .join(BookAuthors, BookAuthors.ref_book_id == Books.id)\
#                 .join(Authors, Authors.id == BookAuthors.ref_authors_id)\
#                 .group_by(Books.rating_avg)\
#                 .order_by(Books.rating_avg.desc()).limit(limit)
#     data = pd.DataFrame(data_db)
#     # print(data.head())
#     data['title'] = [i[0] for i in data['title']]

#     ax = sns.barplot(x=data['rating_avg'], y=data['title'], data=data, palette='deep')

#     plt.xlim(1.0, 5.0)
#     plt.title('"Best" Book by rating average', weight='bold')
#     plt.xlabel('Average Score', weight='bold')
#     plt.ylabel('Title', weight='bold')
#     plt.show()

# def get_2_rec(db: Session, limit: int = 10):
#     import seaborn as sns
#     data_db = db.query(Books.rating_quantity, func.array_agg(Authors.name).label('title'))\
#                 .join(BookAuthors, BookAuthors.ref_book_id == Books.id)\
#                 .join(Authors, Authors.id == BookAuthors.ref_authors_id)\
#                 .group_by(Books.rating_quantity)\
#                 .order_by(Books.rating_quantity.desc()).limit(limit)
#     data = pd.DataFrame(data_db)
#     print(data.head(10))
#     data['title'] = [i[0] for i in data['title']]

#     ax = sns.barplot(x=data['rating_quantity'], y=data['title'], data=data, palette='deep')

#     # plt.xlim(1.0, 5.0)
#     plt.title('"Best" Book by rating average', weight='bold')
#     plt.xlabel('Popularity', weight='bold')
#     plt.ylabel('Title', weight='bold')
#     # plt.show()

# def get_3_rec(db: Session, limit: int = 10):
#     import seaborn as sns
#     from sklearn import preprocessing

#     data_db = db.query(Books.rating_quantity, Books.rating_avg, func.array_agg(Authors.name).label('title'))\
#                 .join(BookAuthors, BookAuthors.ref_book_id == Books.id)\
#                 .join(Authors, Authors.id == BookAuthors.ref_authors_id)\
#                 .group_by(Books.rating_quantity, Books.rating_avg)\
#                 .order_by(Books.rating_avg.desc()).limit(limit)
#     data_df = pd.DataFrame(data_db)

#     min_max_scaler = preprocessing.MinMaxScaler()
#     movies_scaled = min_max_scaler.fit_transform(data_df[['rating_quantity', 'rating_avg']])
#     movies_norm = pd.DataFrame(movies_scaled, columns=['rating_quantity', 'rating_avg'])

#     data_df[['norm_rating_quantity', 'norm_rating_avg']] = movies_norm
#     v1 = 0.5
#     v2 = 0.5

#     data_df['rating'] = data_df['norm_rating_quantity'] * 0.5 + data_df['norm_rating_avg'] * 0.5

#     data = data_df.sort_values('rating', ascending=False)

#     data['title'] = [i[0] for i in data['title']]

#     ax = sns.barplot(x=data['rating'], y=data['title'], data=data, palette='deep')

#     plt.title(f'"Best" Book by rating with coefficient {int(v1 * 100)}/{int(v2 * 100)}', weight='bold')
#     plt.xlabel('rating', weight='bold')
#     plt.ylabel('Title', weight='bold')
#     plt.show()

# def calc_recommendation(db: Session, user_id: UUID):

#     # get_1_rec(db)
#     # get_2_rec(db)
#     get_3_rec(db)
#     return
#     pivot = data.pivot_table(index ='user_id',columns ='book_id', values ='evaluation')
#     del data
#     pivot.fillna(0, inplace=True)
#     # draw_movies_heatmap(pivot)
#     sparse_ratings = scipy.sparse.csr_matrix(pivot.values)

#     number_clusters = 2
#     predictions = KMeans(n_clusters=number_clusters, algorithm='full').fit_predict(sparse_ratings)

#     # distortions = []
#     # K = range(1,20)
#     # for k in K:
#     #     kmeanModel = KMeans(n_clusters=k)
#     #     kmeanModel.fit_predict(sparse_ratings)
#     #     distortions.append(kmeanModel.inertia_)
#     #     print(k)

#     # plt.figure(figsize=(16,8))
#     # plt.plot(K, distortions, 'bx-')
#     # plt.xlabel('k')
#     # plt.ylabel('Distortion')
#     # plt.title('The Elbow Method showing the optimal k')
#     # plt.show()

#     # return
#     clustered = pivot.copy()
#     clustered['group'] = predictions
#     id_cluster_user = clustered.loc[UUID(user_id), :]['group']

#     user_cluster = clustered.loc[clustered['group'] == id_cluster_user]

#     # draw_movies_heatmap(user_cluster)
#     # return
#     # draw_movies_heatmap(user_cluster)
#     user_books  = user_cluster.loc[UUID(user_id), :]

#     user_unrated_books =  user_books[user_books == 0.0]

#     avg_ratings = pd.concat([user_unrated_books, user_cluster.mean(), user_cluster.count()], axis=1, join='inner').loc[:, 0]

#     # # # Let's sort by rating so the highest rated movies are presented first
#     return avg_ratings.sort_values(ascending=False)[:settings.COUNT_BOOKS_IN_RECOMENDATION].index.to_list()
