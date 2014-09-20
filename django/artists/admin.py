from django.contrib import admin

from .models import Artist, JamendoArtist, MagnatuneArtist


admin.site.register(Artist)
admin.site.register(JamendoArtist)
admin.site.register(MagnatuneArtist)
