from django.contrib import admin
from .models import RoomHunter
# Register your models here.


class RoomHunterAdmin(admin.ModelAdmin):


    list_display = ("name","price","area","has_water_daily")
    list_filter =("area","has_water_daily")
    search_fields=("area","name","price")


admin.site.register(RoomHunter,RoomHunterAdmin)
