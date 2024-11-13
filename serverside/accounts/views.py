from django.http import JsonResponse
from django.db.models import Q
from .models import RoomHunter



def Hunt(request):
    name = request.GET.get("name",None)
    price=request.GET.get("price",None)
    area=request.GET.get("area",None)
    water_daily=request.GET.get("water_daily",None)
    filters = Q()


    if area:
        filters &= Q(area=area)
    if water_daily is not None:
        filters &= Q(has_water_daily=water_daily == True)



    rooms = RoomHunter.objects.filter(filters)
    room_data = [{"has_water_daily":rooms.water_daily,"area":rooms.area}]
    return JsonResponse({"rooms":room_data})

