from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# defining categories to display in Sell of AppBar 
class Categories(models.Model):
    category_name=models.CharField(max_length=100)

    def __str__(self):
        return f"{self.category_name}"

# defining Subcategories to display in Sell of AppBar 
class SubCategories(models.Model):
    subcategory_name = models.CharField(max_length=100)
    category = models.ForeignKey(Categories, related_name='subcategories', on_delete=models.CASCADE)

    def __str__(self):
        return self.subcategory_name
    
# common - States
class StateList(models.Model):
    state_name=models.CharField(max_length=50)

    def __str__(self):
        return self.state_name

# carBrands
class CarBrandTitle(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    


class CarBrandSubtitle(models.Model):
    name = models.CharField(max_length=100)
    brand_title = models.ForeignKey(CarBrandTitle, related_name='brandsubtitle', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    

class CarBrandModel(models.Model):
    name = models.CharField(max_length=100)
    brand_subtitle = models.ForeignKey(CarBrandSubtitle, related_name='brandmodel', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class CarFuelType(models.Model):
    name=models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
class CarTransmissionType(models.Model):
    name=models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
class CarOwnersType(models.Model):
    name=models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
#car post
class CarData(models.Model):
    category=models.CharField(max_length=100, blank=True, null=True)
    subcategory=models.CharField(max_length=100, blank=True, null=True)
    carBrand=models.CharField(max_length=50)
    carModel=models.CharField(max_length=50)
    carYear=models.PositiveIntegerField()
    carFuel=models.CharField(max_length=50)
    carTransmission=models.CharField(max_length=50)
    carKM=models.CharField(max_length=50)
    carOwners=models.CharField(max_length=50)
    carTitle=models.CharField(max_length=150)
    carDescription=models.TextField()
    carPrice=models.PositiveIntegerField()
    carState=models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    username=models.CharField(max_length=50, null=True, blank=True)
    email=models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Car: {self.carBrand} - {self.carModel}"
    
class CarCompleteData(models.Model):
    car_profile = models.ForeignKey(CarData, related_name='car_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='car_images/')

# pet post
class PetData(models.Model):
    category=models.CharField(max_length=100, blank=True, null=True)
    subcategory=models.CharField(max_length=100, blank=True, null=True)
    petTitle=models.CharField(max_length=150)
    petDescription=models.TextField()
    petPrice=models.PositiveIntegerField()
    petState=models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    username=models.CharField(max_length=50, null=True, blank=True)
    email=models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Pet: {self.petTitle} - {self.petDescription}"
    
class PetCompleteData(models.Model):
    pet_profile = models.ForeignKey(PetData, related_name='pet_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='pet_images/')

# job post
class JobData(models.Model):
    category=models.CharField(max_length=100, blank=True, null=True)
    subcategory=models.CharField(max_length=100, blank=True, null=True)
    jobSalaryPeriod=models.CharField(max_length=50)
    jobPositionType=models.CharField(max_length=50)
    jobSalaryFrom=models.PositiveIntegerField()
    jobSalaryTo=models.PositiveIntegerField()
    jobTitle=models.CharField(max_length=255)
    jobDescription=models.TextField()
    jobState=models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    username=models.CharField(max_length=50, null=True, blank=True)
    email=models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.jobTitle
    
class JobCompleteData(models.Model):
    job_profile = models.ForeignKey(JobData, related_name='job_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='job_images/')

# electronicappliance post
class ElectronicApplianceData(models.Model):
    category=models.CharField(max_length=100, blank=True, null=True)
    subcategory=models.CharField(max_length=100, blank=True, null=True)
    electronicApplianceTitle=models.CharField(max_length=150)
    electronicApplianceDescription=models.TextField()
    electronicAppliancePrice=models.PositiveIntegerField()
    electronicApplianceState=models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    username=models.CharField(max_length=50, null=True, blank=True)
    email=models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Electronics & Appliances: {self.electronicApplianceTitle} - {self.electronicApplianceDescription}"
    
class ElectronicApplianceCompleteData(models.Model):
    electronicAppliance_profile = models.ForeignKey(ElectronicApplianceData, related_name='electronicAppliance_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='electronicAppliance_images/')

# furniture post
class FurnitureData(models.Model):
    category=models.CharField(max_length=100, blank=True, null=True)
    subcategory=models.CharField(max_length=100, blank=True, null=True)
    furnitureTitle=models.CharField(max_length=150)
    furnitureDescription=models.TextField()
    furniturePrice=models.PositiveIntegerField()
    furnitureState=models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    username=models.CharField(max_length=50, null=True, blank=True)
    email=models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Furniture: {self.furnitureTitle} - {self.furnitureDescription}"
    
class FurnitureCompleteData(models.Model):
    furniture_profile = models.ForeignKey(FurnitureData, related_name='furniture_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='furniture_images/')

# fashion post
class FashionData(models.Model):
    category=models.CharField(max_length=100, blank=True, null=True)
    subcategory=models.CharField(max_length=100, blank=True, null=True)
    fashionTitle=models.CharField(max_length=150)
    fashionDescription=models.TextField()
    fashionPrice=models.PositiveIntegerField()
    fashionState=models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    username=models.CharField(max_length=50, null=True, blank=True)
    email=models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Fashion: {self.fashionTitle} - {self.fashionDescription}"
    
class FashionCompleteData(models.Model):
    fashion_profile = models.ForeignKey(FashionData, related_name='fashion_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='fashion_images/')

class BooksSportsHobbiesData(models.Model):
    category=models.CharField(max_length=100, blank=True, null=True)
    subcategory=models.CharField(max_length=100, blank=True, null=True)
    booksSportsHobbiesTitle=models.CharField(max_length=150)
    booksSportsHobbiesDescription=models.TextField()
    booksSportsHobbiesPrice=models.PositiveIntegerField()
    booksSportsHobbiesState=models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    username=models.CharField(max_length=50, null=True, blank=True)
    email=models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Books, Sports & Hobbies: {self.booksSportsHobbiesTitle} - {self.booksSportsHobbiesDescription}"
    
class BooksSportsHobbiesCompleteData(models.Model):
    booksSportsHobbies_profile = models.ForeignKey(BooksSportsHobbiesData, related_name='booksSportsHobbies_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='booksSportsHobbies_images/')

# mobile:
# mobile phones
class MobileBrandTitle(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class MobileBrandSubtitle(models.Model):
    name = models.CharField(max_length=100)
    brand_title = models.ForeignKey(MobileBrandTitle, related_name='brandsubtitle', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
# post
# mobiles
# mobile phones, accessories, tablets
class MobileData(models.Model):
    category=models.CharField(max_length=100, blank=True, null=True)
    subcategory=models.CharField(max_length=100, blank=True, null=True)
    mobileBrand=models.CharField(max_length=50, blank=True, null=True)
    mobileType=models.CharField(max_length=50, blank=True, null=True)
    mobileTitle=models.CharField(max_length=50)
    mobileDescription=models.TextField()
    mobilePrice=models.PositiveIntegerField()
    mobileState=models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    username=models.CharField(max_length=50, null=True, blank=True)
    email=models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Mobile: {self.mobileTitle} - {self.mobileDescription}"
    
class MobileCompleteData(models.Model):
    mobile_profile = models.ForeignKey(MobileData, related_name='mobile_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='mobile_images/')

# Commercial vehicles & spare parts
class CvsData(models.Model):
    category=models.CharField(max_length=100, blank=True, null=True)
    subcategory=models.CharField(max_length=100, blank=True, null=True)
    cvsType=models.CharField(max_length=50, blank=True, null=True)
    cvsYear=models.CharField(max_length=50, blank=True, null=True)
    cvsKMDriven=models.CharField(max_length=50, blank=True, null=True)
    cvsTitle=models.CharField(max_length=255)
    cvsDescription=models.TextField()
    cvsPrice=models.PositiveIntegerField()
    cvsState=models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    username=models.CharField(max_length=50, null=True, blank=True)
    email=models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Cvs: {self.cvsTitle} - {self.cvsDescription}"
    
class CvsCompleteData(models.Model):
    cvs_profile = models.ForeignKey(CvsData, related_name='cvs_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='cvs_images/')

# services
class ToursType(models.Model):
    tours_name = models.CharField(max_length=100)

    def __str__(self):
        return self.tours_name

class ElectronicRepairType(models.Model):
    er_name = models.CharField(max_length=100)

    def __str__(self):
        return self.er_name
    
class HomeRenovationType(models.Model):
    hr_name = models.CharField(max_length=100)

    def __str__(self):
        return self.hr_name
    
class ServiceData(models.Model):
    category=models.CharField(max_length=100, blank=True, null=True)
    subcategory=models.CharField(max_length=100, blank=True, null=True)
    educationclassesType=models.CharField(max_length=50, blank=True, null=True)
    tourstravelType=models.CharField(max_length=50, blank=True, null=True)
    electronicsrepairservicesType=models.CharField(max_length=50, blank=True, null=True)
    healthbeautyType=models.CharField(max_length=50, blank=True, null=True)
    homerenovationrepairType=models.CharField(max_length=50, blank=True, null=True)
    cleaningpestcontrolType=models.CharField(max_length=50, blank=True, null=True)
    legaldocumentationType=models.CharField(max_length=50, blank=True, null=True)
    packersmoversType=models.CharField(max_length=50, blank=True, null=True)
    otherservicesType=models.CharField(max_length=50, blank=True, null=True)
    serviceTitle=models.CharField(max_length=255)
    serviceDescription=models.TextField()
    serviceState=models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    username=models.CharField(max_length=50, null=True, blank=True)
    email=models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"service: {self.serviceTitle} - {self.serviceDescription}"
    
class ServiceCompleteData(models.Model):
    service_profile = models.ForeignKey(ServiceData, related_name='service_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='service_images/')

# bikes

# motorcycle
class MotorcycleBrandTitle(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class MotorcycleBrandModel(models.Model):
    name = models.CharField(max_length=100)
    brand_title = models.ForeignKey(MotorcycleBrandTitle, related_name='brandmodel', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# Scooter
class ScooterBrandTitle(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class ScooterBrandModel(models.Model):
    name = models.CharField(max_length=100)
    brand_title = models.ForeignKey(ScooterBrandTitle, related_name='brandmodel', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
# bicycle
class BicycleBrandTitle(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
# post Bike
class BikeData(models.Model):
    category=models.CharField(max_length=100, blank=True, null=True)
    subcategory=models.CharField(max_length=100, blank=True, null=True)
    bikeBrand=models.CharField(max_length=50, blank=True, null=True)
    bikeModel=models.CharField(max_length=50, blank=True, null=True)
    bikeYear=models.PositiveIntegerField(blank=True, null=True)
    bikeKM=models.CharField(max_length=50, blank=True, null=True)
    bikeTitle=models.CharField(max_length=50)
    bikeDescription=models.TextField()
    bikePrice=models.PositiveIntegerField()
    bikeState=models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    username=models.CharField(max_length=50, null=True, blank=True)
    email=models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"bike: {self.bikeTitle} - {self.bikeDescription}"
    
class BikeCompleteData(models.Model):
    bike_profile = models.ForeignKey(BikeData, related_name='bike_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='bike_images/')

# post property
class PropertyData(models.Model):
    category=models.CharField(max_length=100, blank=True, null=True)
    subcategory=models.CharField(max_length=100, blank=True, null=True)
    propertyType=models.CharField(max_length=50, blank=True, null=True)
    propertyBHK=models.CharField(max_length=50, blank=True, null=True)
    propertyBathrooms=models.CharField(max_length=50, blank=True, null=True)
    propertyFurnishing=models.CharField(max_length=50, blank=True, null=True)
    propertyProjectStatus=models.CharField(max_length=50, blank=True, null=True)
    propertyListedBy=models.CharField(max_length=50, blank=True, null=True)
    propertySuperBuiltUpArea=models.CharField(max_length=50, blank=True, null=True)
    propertyCarpetArea=models.CharField(max_length=50, blank=True, null=True)
    propertyMaintenance=models.CharField(max_length=50, blank=True, null=True)
    propertyTotalFloors=models.CharField(max_length=50, blank=True, null=True)
    propertyFloorNo=models.CharField(max_length=50, blank=True, null=True)
    propertyBachelorsAllowed=models.CharField(max_length=50, blank=True, null=True)
    propertyCarParking=models.CharField(max_length=50, blank=True, null=True)
    propertyFacing=models.CharField(max_length=50, blank=True, null=True)
    propertyPlotArea=models.CharField(max_length=50, blank=True, null=True)
    propertyLength=models.CharField(max_length=50, blank=True, null=True)
    propertyBreadth=models.CharField(max_length=50, blank=True, null=True)
    propertyWashrooms=models.CharField(max_length=50, blank=True, null=True)
    propertySubtype=models.CharField(max_length=50, blank=True, null=True)
    propertyMealsIncluded=models.CharField(max_length=50, blank=True, null=True)
    propertyProjectName=models.CharField(max_length=50, blank=True, null=True)
    propertyTitle=models.CharField(max_length=255)
    propertyDescription=models.TextField()
    propertyPrice=models.PositiveIntegerField()
    propertyState=models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    username=models.CharField(max_length=50, null=True, blank=True)
    email=models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"property: {self.propertyTitle} - {self.propertyDescription}"
    
class PropertyCompleteData(models.Model):
    property_profile = models.ForeignKey(PropertyData, related_name='property_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='property_images/')

# class ChatRoom(models.Model):
#     buyer = models.ForeignKey(User, related_name='buyer_chats', on_delete=models.CASCADE)
#     seller = models.ForeignKey(User, related_name='seller_chats', on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)

# class Message(models.Model):
#     chat_room = models.ForeignKey(ChatRoom, related_name='messages', on_delete=models.CASCADE)
#     sender = models.ForeignKey(User, on_delete=models.CASCADE)
#     content = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)

class ChatRoom(models.Model):
    participants = models.ManyToManyField(User, related_name='chatrooms')

class Message(models.Model):
    chat_room = models.ForeignKey(ChatRoom, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)



    