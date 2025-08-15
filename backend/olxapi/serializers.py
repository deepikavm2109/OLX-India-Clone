from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import *

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user
    
# Serializer for User Profile
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({
            'username': self.user.username,
            'email': self.user.email
        })
        return data

class SubCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model= SubCategories
        fields= ['id', 'subcategory_name']

class CategoriesSerializer(serializers.ModelSerializer):
    subcategories=SubCategoriesSerializer(many=True,read_only=True)
    
    class Meta:
        model = Categories
        fields = ['id', 'category_name', 'subcategories']

# common
class StateListSerializer(serializers.ModelSerializer):
    class Meta:
        model=StateList
        fields="__all__"

# Car 
class CarBrandTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarBrandTitle
        fields = ['id', 'name']

class CarBrandSubtitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarBrandSubtitle
        fields = ['id', 'name', 'brand_title']

class CarBrandModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarBrandModel
        fields = ['id', 'name', 'brand_subtitle']

class CarFuelTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarFuelType
        fields = ['id', 'name']

class CarTransmissionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarTransmissionType
        fields = ['id', 'name']

class CarOwnersTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarOwnersType
        fields = ['id', 'name']

# post
class CarCompleteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarCompleteData
        fields = ['image']

class CarDataSerializer(serializers.ModelSerializer):
    images = CarCompleteDataSerializer(many=True, read_only=True, source='car_images')
    carPhotos = serializers.ListField(
        child=serializers.ImageField(write_only=True),
        write_only=True
    )

    class Meta:
        model = CarData
        fields = [
            'id', 'category', 'subcategory',
            'carBrand', 'carModel', 'carYear', 'carFuel',
            'carTransmission', 'carKM', 'carOwners', 'carTitle',
            'carDescription', 'carPrice', 'carState', 'created_date','username','email',
            'carPhotos', 'images','user'
        ]
        read_only_fields = ['user']  # The user will be automatically set in the view
    def create(self, validated_data):
        carPhotos = validated_data.pop('carPhotos')
        car_profile = CarData.objects.create(**validated_data)
        for image in carPhotos:
            CarCompleteData.objects.create(car_profile=car_profile, image=image)
        return car_profile


class PetCompleteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetCompleteData
        fields = ['image']

class PetDataSerializer(serializers.ModelSerializer):
    images = PetCompleteDataSerializer(many=True, read_only=True, source='pet_images')
    petPhotos = serializers.ListField(
        child=serializers.ImageField(write_only=True),
        write_only=True
    )

    class Meta:
        model = PetData
        fields = [
            'id', 'category', 'subcategory',  'petTitle',
            'petDescription', 'petPrice', 'petState', 'created_date','username','email',
            'petPhotos', 'images','user'
        ]
        read_only_fields = ['user']  # The user will be automatically set in the view

    def create(self, validated_data):
        petPhotos = validated_data.pop('petPhotos')
        pet_profile = PetData.objects.create(**validated_data)
        for image in petPhotos:
            PetCompleteData.objects.create(pet_profile=pet_profile, image=image)
        return pet_profile

class JobCompleteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCompleteData
        fields = ['image']

class JobDataSerializer(serializers.ModelSerializer):
    images = JobCompleteDataSerializer(many=True, read_only=True, source='job_images')
    jobPhotos = serializers.ListField(
        child=serializers.ImageField(write_only=True),
        write_only=True
    )

    class Meta:
        model = JobData
        fields = [
            'id', 'category', 'subcategory','jobSalaryPeriod','jobPositionType','jobSalaryFrom','jobSalaryTo','jobTitle',
            'jobDescription', 'jobState', 'created_date','username','email',
            'jobPhotos', 'images','user'
        ]
        read_only_fields = ['user']  # The user will be automatically set in the view

    def create(self, validated_data):
        jobPhotos = validated_data.pop('jobPhotos')
        job_profile = JobData.objects.create(**validated_data)
        for image in jobPhotos:
            JobCompleteData.objects.create(job_profile=job_profile, image=image)
        return job_profile

class ElectronicApplianceCompleteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElectronicApplianceCompleteData
        fields = ['image']

class ElectronicApplianceDataSerializer(serializers.ModelSerializer):
    images = ElectronicApplianceCompleteDataSerializer(many=True, read_only=True, source='electronicAppliance_images')
    electronicAppliancePhotos = serializers.ListField(
        child=serializers.ImageField(write_only=True),
        write_only=True
    )

    class Meta:
        model = ElectronicApplianceData
        fields = [
            'id', 'category', 'subcategory', 'electronicApplianceTitle',
            'electronicApplianceDescription', 'electronicAppliancePrice', 'electronicApplianceState', 'created_date','username','email',
            'electronicAppliancePhotos', 'images','user'
        ]
        read_only_fields = ['user']  # The user will be automatically set in the view

    def create(self, validated_data):
        electronicAppliancePhotos = validated_data.pop('electronicAppliancePhotos')
        electronicAppliance_profile = ElectronicApplianceData.objects.create(**validated_data)
        for image in electronicAppliancePhotos:
            ElectronicApplianceCompleteData.objects.create(electronicAppliance_profile=electronicAppliance_profile, image=image)
        return electronicAppliance_profile

class FurnitureCompleteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FurnitureCompleteData
        fields = ['image']

class FurnitureDataSerializer(serializers.ModelSerializer):
    images = FurnitureCompleteDataSerializer(many=True, read_only=True, source='furniture_images')
    furniturePhotos = serializers.ListField(
        child=serializers.ImageField(write_only=True),
        write_only=True
    )

    class Meta:
        model = FurnitureData
        fields = [
            'id', 'category', 'subcategory',  'furnitureTitle',
            'furnitureDescription', 'furniturePrice', 'furnitureState', 'created_date','username','email',
            'furniturePhotos', 'images','user'
        ]
        read_only_fields = ['user']  # The user will be automatically set in the view

    def create(self, validated_data):
        furniturePhotos = validated_data.pop('furniturePhotos')
        furniture_profile = FurnitureData.objects.create(**validated_data)
        for image in furniturePhotos:
            FurnitureCompleteData.objects.create(furniture_profile=furniture_profile, image=image)
        return furniture_profile

class FashionCompleteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FashionCompleteData
        fields = ['image']

class FashionDataSerializer(serializers.ModelSerializer):
    images = FashionCompleteDataSerializer(many=True, read_only=True, source='fashion_images')
    fashionPhotos = serializers.ListField(
        child=serializers.ImageField(write_only=True),
        write_only=True
    )

    class Meta:
        model = FashionData
        fields = [
            'id', 'category', 'subcategory',  'fashionTitle',
            'fashionDescription', 'fashionPrice', 'fashionState', 'created_date','username','email',
            'fashionPhotos', 'images','user'
        ]
        read_only_fields = ['user']  # The user will be automatically set in the view

    def create(self, validated_data):
        fashionPhotos = validated_data.pop('fashionPhotos')
        fashion_profile = FashionData.objects.create(**validated_data)
        for image in fashionPhotos:
            FashionCompleteData.objects.create(fashion_profile=fashion_profile, image=image)
        return fashion_profile

class BooksSportsHobbiesCompleteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = BooksSportsHobbiesCompleteData
        fields = ['image']

class BooksSportsHobbiesDataSerializer(serializers.ModelSerializer):
    images = BooksSportsHobbiesCompleteDataSerializer(many=True, read_only=True, source='booksSportsHobbies_images')
    booksSportsHobbiesPhotos = serializers.ListField(
            child=serializers.ImageField(write_only=True),
            write_only=True
        )
    
    class Meta:
        model = BooksSportsHobbiesData
        fields = [
                'id', 'category', 'subcategory', 'booksSportsHobbiesTitle',
                'booksSportsHobbiesDescription', 'booksSportsHobbiesPrice', 'booksSportsHobbiesState', 'created_date','username','email',
                'booksSportsHobbiesPhotos', 'images','user'
            ]
        read_only_fields = ['user']  # The user will be automatically set in the view
    
    def create(self, validated_data):
        booksSportsHobbiesPhotos = validated_data.pop('booksSportsHobbiesPhotos')
        booksSportsHobbies_profile = BooksSportsHobbiesData.objects.create(**validated_data)
        for image in booksSportsHobbiesPhotos:
            BooksSportsHobbiesCompleteData.objects.create(booksSportsHobbies_profile=booksSportsHobbies_profile, image=image)
        return booksSportsHobbies_profile

# mobiles
# mobilephones 
# Car 
class MobileBrandTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MobileBrandTitle
        fields = ['id', 'name']

class MobileBrandSubtitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MobileBrandSubtitle
        fields = ['id', 'name', 'brand_title']

# post:mobiles- mobilephones,accessories, tablets
class MobileCompleteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MobileCompleteData
        fields = ['image']
    
class MobileDataSerializer(serializers.ModelSerializer):
    images = MobileCompleteDataSerializer(many=True, read_only=True, source='mobile_images')
    mobilePhotos = serializers.ListField(
            child=serializers.ImageField(write_only=True),
            write_only=True
        )
    
    class Meta:
        model = MobileData
        fields = [
                'id','category', 'subcategory','mobileBrand', 'mobileType','mobileTitle',
                'mobileDescription', 'mobilePrice', 'mobileState', 'created_date','username','email',
                'mobilePhotos', 'images','user'
            ]
        read_only_fields = ['user']  # The user will be automatically set in the view
    
    def create(self, validated_data):
        mobilePhotos = validated_data.pop('mobilePhotos')
        mobile_profile = MobileData.objects.create(**validated_data)
        for image in mobilePhotos:
            MobileCompleteData.objects.create(mobile_profile=mobile_profile, image=image)
        return mobile_profile

# cvs
class CvsCompleteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CvsCompleteData
        fields = ['image']
    
class CvsDataSerializer(serializers.ModelSerializer):
    images = CvsCompleteDataSerializer(many=True, read_only=True, source='cvs_images')
    cvsPhotos = serializers.ListField(
            child=serializers.ImageField(write_only=True),
            write_only=True
        )
    
    class Meta:
        model = CvsData
        fields = [
                'id', 'category', 'subcategory','cvsType','cvsYear','cvsKMDriven', 'cvsTitle',
                'cvsDescription', 'cvsPrice', 'cvsState', 'created_date','username','email',
                'cvsPhotos', 'images','user'
            ]
        read_only_fields = ['user']  # The user will be automatically set in the view
    
    def create(self, validated_data):
        cvsPhotos = validated_data.pop('cvsPhotos')
        cvs_profile = CvsData.objects.create(**validated_data)
        for image in cvsPhotos:
            CvsCompleteData.objects.create(cvs_profile=cvs_profile, image=image)
        return cvs_profile

# service
class ToursTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToursType
        fields = ['id', 'tours_name']

class ElectronicRepairTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElectronicRepairType
        fields = ['id', 'er_name']

class HomeRenovationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeRenovationType
        fields = ['id', 'hr_name']

# services
class ServiceCompleteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCompleteData
        fields = ['image']
    
class ServiceDataSerializer(serializers.ModelSerializer):
    images = ServiceCompleteDataSerializer(many=True, read_only=True, source='service_images')
    servicePhotos = serializers.ListField(
            child=serializers.ImageField(write_only=True),
            write_only=True
        )
    
    class Meta:
        model = ServiceData
        fields = [
                'id', 'category', 'subcategory','educationclassesType','tourstravelType','electronicsrepairservicesType','healthbeautyType','homerenovationrepairType','cleaningpestcontrolType','legaldocumentationType','packersmoversType','otherservicesType',  'serviceTitle',
                'serviceDescription', 'serviceState', 'created_date','username','email',
                'servicePhotos', 'images','user'
            ]
        read_only_fields = ['user']  # The user will be automatically set in the view
    
    def create(self, validated_data):
        servicePhotos = validated_data.pop('servicePhotos')
        service_profile = ServiceData.objects.create(**validated_data)
        for image in servicePhotos:
            ServiceCompleteData.objects.create(service_profile=service_profile, image=image)
        return service_profile

# bikes
#motorcycle    
class MotorcycleBrandTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MotorcycleBrandTitle
        fields = ['id', 'name']

class MotorcycleBrandModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MotorcycleBrandModel
        fields = ['id', 'name', 'brand_title']

#scooter    
class ScooterBrandTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScooterBrandTitle
        fields = ['id', 'name']

class ScooterBrandModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScooterBrandModel
        fields = ['id', 'name', 'brand_title']

#bicycle    
class BicycleBrandTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BicycleBrandTitle
        fields = ['id', 'name']

# post Bike
class BikeCompleteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = BikeCompleteData
        fields = ['image']
    
class BikeDataSerializer(serializers.ModelSerializer):
    images = BikeCompleteDataSerializer(many=True, read_only=True, source='bike_images')
    bikePhotos = serializers.ListField(
            child=serializers.ImageField(write_only=True),
            write_only=True
        )
    
    class Meta:
        model = BikeData
        fields = [
                'id', 'category', 'subcategory','bikeBrand','bikeModel','bikeYear','bikeKM','bikeTitle',
                'bikeDescription', 'bikePrice', 'bikeState', 'created_date','username','email',
                'bikePhotos', 'images','user'
            ]
        read_only_fields = ['user']  # The user will be automatically set in the view
    
    def create(self, validated_data):
        bikePhotos = validated_data.pop('bikePhotos')
        bike_profile = BikeData.objects.create(**validated_data)
        for image in bikePhotos:
            BikeCompleteData.objects.create(bike_profile=bike_profile, image=image)
        return bike_profile

# properties post
class PropertyCompleteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyCompleteData
        fields = ['image']
    
class PropertyDataSerializer(serializers.ModelSerializer):
    images = PropertyCompleteDataSerializer(many=True, read_only=True, source='property_images')
    propertyPhotos = serializers.ListField(
            child=serializers.ImageField(write_only=True),
            write_only=True
        )
    
    class Meta:
        model = PropertyData
        fields = [
                'id', 'category', 'subcategory','propertyType','propertyBHK','propertyBathrooms','propertyFurnishing',
                'propertyProjectStatus','propertyListedBy','propertySuperBuiltUpArea','propertyCarpetArea',
                'propertyMaintenance','propertyTotalFloors','propertyFloorNo',
                'propertyBachelorsAllowed','propertyCarParking','propertyFacing','propertyPlotArea','propertyLength','propertyBreadth',
                'propertyWashrooms','propertyProjectStatus','propertySubtype','propertyMealsIncluded','propertyProjectName', 'propertyTitle',
                'propertyDescription', 'propertyPrice', 'propertyState', 'created_date','username','email',
                'propertyPhotos', 'images','user'
            ]
        read_only_fields = ['user']  # The user will be automatically set in the view
    
    def create(self, validated_data):
        propertyPhotos = validated_data.pop('propertyPhotos')
        property_profile = PropertyData.objects.create(**validated_data)
        for image in propertyPhotos:
            PropertyCompleteData.objects.create(property_profile=property_profile, image=image)
        return property_profile

# class MessageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Message
#         fields = '__all__'

# class ChatRoomSerializer(serializers.ModelSerializer):
#     messages = MessageSerializer(many=True, read_only=True)

#     class Meta:
#         model = ChatRoom
#         fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class ChatRoomSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = ChatRoom
        fields = '__all__'