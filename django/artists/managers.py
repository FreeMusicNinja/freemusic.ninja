from django.db.models.query import QuerySet
from django.db.models.manager import Manager
from django.db.models.sql.query import Query


class LimitableQuery(Query):
    def can_filter(self):
        return True


class ArtistQuerySet(QuerySet):
    def __init__(self, model=None, query=None, using=None, hints=None):
        if not query:
            query = LimitableQuery(model)
        super().__init__(model, query, using, hints)


class ArtistManager(Manager):
    _queryset_class = ArtistQuerySet
