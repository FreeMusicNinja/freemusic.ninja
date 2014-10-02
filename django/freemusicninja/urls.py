from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers

from artists.views import ArtistViewSet
from users.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'artists', ArtistViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
    url(r'^admin/', include(admin.site.urls)),
]
