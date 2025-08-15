from django.contrib import admin
from .models import *

admin.site.site_header = "OLX Admin"
admin.site.site_title = "OLX Admin Dashboard"
admin.site.index_title = "Welcome to OLX Admin Panel"
# Register your models here.
admin.site.register(StateList)
admin.site.register(Categories)
admin.site.register(SubCategories)
admin.site.register(CarBrandTitle)
admin.site.register(CarBrandSubtitle)
admin.site.register(CarBrandModel)
admin.site.register(CarFuelType)
admin.site.register(CarTransmissionType)
admin.site.register(CarOwnersType)
# post
admin.site.register(CarData)
admin.site.register(CarCompleteData)
admin.site.register(PetData)
admin.site.register(PetCompleteData)
admin.site.register(JobData)
admin.site.register(JobCompleteData)
admin.site.register(FurnitureData)
admin.site.register(FurnitureCompleteData)
admin.site.register(FashionData)
admin.site.register(FashionCompleteData)
admin.site.register(BooksSportsHobbiesData)
admin.site.register(BooksSportsHobbiesCompleteData)

# mobile
admin.site.register(MobileBrandTitle)
admin.site.register(MobileBrandSubtitle)
# post mobile
admin.site.register(MobileData)
admin.site.register(MobileCompleteData)
# post cvs
admin.site.register(CvsData)
admin.site.register(CvsCompleteData)

admin.site.register(ToursType)
admin.site.register(ElectronicRepairType)
admin.site.register(HomeRenovationType)
# post services
admin.site.register(ServiceData)
admin.site.register(ServiceCompleteData)

# bikes
admin.site.register(MotorcycleBrandTitle)
admin.site.register(MotorcycleBrandModel)
admin.site.register(ScooterBrandTitle)
admin.site.register(ScooterBrandModel)
admin.site.register(BicycleBrandTitle)

# post bikes
admin.site.register(BikeData)
admin.site.register(BikeCompleteData)

# post properties
admin.site.register(PropertyData)
admin.site.register(PropertyCompleteData)

# post electronics
admin.site.register(ElectronicApplianceData)
admin.site.register(ElectronicApplianceCompleteData)