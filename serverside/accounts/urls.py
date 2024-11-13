from django.urls import path
from . import views
from .views import Hunt

urlpatterns = [





path('api/accounts/',views.Hunt,name="huntroomss")

]