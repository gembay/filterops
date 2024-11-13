from django.db import models

# Create your models here.
class RoomHunter(models.Model):
    area_choices = [
        ('kay','kayole'),
        ('buru','buruburu'),
        ('lucky','luckysummer'),
        ('kan','kangemi'),
        ('baba','babadogo'),


    ]
    name = models.CharField(max_length=50)
    price=models.IntegerField()
    area=models.CharField(max_length=50,choices=area_choices)
    has_water_daily= models.BooleanField(default=True)

    def __str__(self):
        return "{self.get_area_display()}"