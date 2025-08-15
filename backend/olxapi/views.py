import logging
from django.db.models import Q
from rest_framework import generics, permissions, viewsets
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import *
from urllib.parse import unquote

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# Custom Token View to use CustomTokenObtainPairSerializer
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# User Profile View
class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
class CategoriesListAPIView(generics.ListAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer

class CategoriesDetailAPIView(generics.RetrieveAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer

# common
class StateListViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = StateList.objects.all()
        print(queryset)  # Add this to see if the query is returning data
        serializer = StateListSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = StateListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# Car
class CarBrandTitleListView(generics.ListAPIView):
    queryset = CarBrandTitle.objects.all()
    serializer_class = CarBrandTitleSerializer

class CarBrandSubtitleListView(generics.ListAPIView):
    serializer_class = CarBrandSubtitleSerializer

    def get_queryset(self):
        brand_title_id = self.request.query_params.get('brand_title_id')
        return CarBrandSubtitle.objects.filter(brand_title_id=brand_title_id)
    
class CarBrandModelListView(generics.ListAPIView):
    serializer_class = CarBrandModelSerializer

    def get_queryset(self):
        brand_subtitle_id = self.request.query_params.get('brand_subtitle_id')
        return CarBrandModel.objects.filter(brand_subtitle_id=brand_subtitle_id)
    
class CarFuelTypeListView(generics.ListAPIView):
    queryset=CarFuelType.objects.all()
    serializer_class =CarFuelTypeSerializer

class CarTransmissionTypeListView(generics.ListAPIView):
    queryset=CarTransmissionType.objects.all()
    serializer_class = CarTransmissionTypeSerializer

class CarOwnersTypeListView(generics.ListAPIView):
    queryset=CarOwnersType.objects.all()
    serializer_class = CarOwnersTypeSerializer

# post
    
class CarDataView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def post(self, request, *args, **kwargs):
        serializer = CarDataSerializer(data=request.data)
        if serializer.is_valid():
            # Attach the authenticated user to the car data
            serializer.save(user=request.user)  # Save with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Log the error details for debugging
        logging.error(f"Form errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CarDataListView(APIView):
    # def get(self, request):
    #     car_data = CarData.objects.all()
    #     serializer = CarDataSerializer(car_data, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)
    def get(self, request):
        # Fetch all CarData
        car_data = CarData.objects.all()
        car_serializer = CarDataSerializer(car_data, many=True)
        
        # Fetch all PetData
        pet_data = PetData.objects.all()
        pet_serializer = PetDataSerializer(pet_data, many=True)

        # Fetch all JobData
        job_data = JobData.objects.all()
        job_serializer = JobDataSerializer(job_data, many=True)

        # Fetch all ElectronicApplianceData
        electronicappliance_data = ElectronicApplianceData.objects.all()
        electronicappliance_serializer = ElectronicApplianceDataSerializer(electronicappliance_data, many=True)
        
        # Fetch all furnitureData
        furniture_data = FurnitureData.objects.all()
        furniture_serializer = FurnitureDataSerializer(furniture_data, many=True)

        # Fetch all fashionData
        fashion_data = FashionData.objects.all()
        fashion_serializer = FashionDataSerializer(fashion_data, many=True)

        # Fetch all booksSportsHobbiesData
        booksportshobbies_data = BooksSportsHobbiesData.objects.all()
        booksportshobbies_serializer = BooksSportsHobbiesDataSerializer(booksportshobbies_data, many=True)

        # Fetch all mobileData
        mobile_data = MobileData.objects.all()
        mobile_serializer = MobileDataSerializer(mobile_data, many=True)

        # Fetch all mobileData
        cvs_data = CvsData.objects.all()
        cvs_serializer = CvsDataSerializer(cvs_data, many=True)

        # Fetch all serviceData
        service_data = ServiceData.objects.all()
        service_serializer = ServiceDataSerializer(service_data, many=True)

        # Fetch all propertyData
        bike_data = BikeData.objects.all()
        bike_serializer = BikeDataSerializer(bike_data, many=True)

         # Fetch all propertyData
        property_data = PropertyData.objects.all()
        property_serializer = PropertyDataSerializer(property_data, many=True)

        # Combine both datasets in a single response
        data = {
            'car_data': car_serializer.data,
            'pet_data': pet_serializer.data,
            'job_data': job_serializer.data,
            'electronicappliance_data': electronicappliance_serializer.data,
            'furniture_data': furniture_serializer.data,
            'fashion_data': fashion_serializer.data,
            'booksportshobbies_data': booksportshobbies_serializer.data,
            'mobile_data': mobile_serializer.data,
            'cvs_data': cvs_serializer.data,
            'service_data': service_serializer.data,
            'bike_data': bike_serializer.data,
            'property_data': property_serializer.data,
        }
        return Response(data, status=status.HTTP_200_OK)
 
# individual    
class CarDetailView(generics.RetrieveAPIView):
    queryset = CarData.objects.all()
    serializer_class = CarDataSerializer

# pets
class PetDataView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def post(self, request, *args, **kwargs):
        serializer = PetDataSerializer(data=request.data)
        if serializer.is_valid():
            # Attach the authenticated user to the car data
            serializer.save(user=request.user)  # Save with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Log the error details for debugging
        logging.error(f"Form errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PetDataListView(APIView):
    def get(self, request):
        pet_data = PetData.objects.all()
        serializer = PetDataSerializer(pet_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
 
# individual    
class PetDetailView(generics.RetrieveAPIView):
    queryset = PetData.objects.all()
    serializer_class = PetDataSerializer

# jobs
class JobDataView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def post(self, request, *args, **kwargs):
        serializer = JobDataSerializer(data=request.data)
        if serializer.is_valid():
            # Attach the authenticated user to the car data
            serializer.save(user=request.user)  # Save with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Log the error details for debugging
        logging.error(f"Form errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JobDataListView(APIView):
    def get(self, request):
        job_data = JobData.objects.all()
        serializer = JobDataSerializer(job_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
 
# individual    
class JobDetailView(generics.RetrieveAPIView):
    queryset = JobData.objects.all()
    serializer_class = JobDataSerializer

# electronicAppliances
# class ElectronicApplianceDataListView(APIView):
#     permission_classes = [IsAuthenticated]  # Ensure authentication is required

#     def get(self, request):
#         electronicAppliance_data = ElectronicApplianceData.objects.all()
#         serializer = ElectronicApplianceDataSerializer(electronicAppliance_data, many=True)
#         return Response(serializer.data, status=200)

class ElectronicApplianceDataView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def post(self, request, *args, **kwargs):
        serializer = ElectronicApplianceDataSerializer(data=request.data)
        if serializer.is_valid():
            # Attach the authenticated user to the car data
            serializer.save(user=request.user)  # Save with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Log the error details for debugging
        logging.error(f"Form errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ElectronicApplianceDataListView(APIView):
    # permission_classes = [IsAuthenticated]  # Ensure authentication is required
    def get(self, request):
        electronicAppliance_data = ElectronicApplianceData.objects.all()
        serializer = ElectronicApplianceDataSerializer(electronicAppliance_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
 
# individual    
class ElectronicApplianceDetailView(generics.RetrieveAPIView):
    queryset = ElectronicApplianceData.objects.all()
    serializer_class = ElectronicApplianceDataSerializer

#furniture
class FurnitureDataView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def post(self, request, *args, **kwargs):
        serializer = FurnitureDataSerializer(data=request.data)
        if serializer.is_valid():
            # Attach the authenticated user to the car data
            serializer.save(user=request.user)  # Save with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Log the error details for debugging
        logging.error(f"Form errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FurnitureDataListView(APIView):
    # permission_classes = [IsAuthenticated]  # Ensure authentication is required
    def get(self, request):
        furniture_data = FurnitureData.objects.all()
        serializer = FurnitureDataSerializer(furniture_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
 
# individual    
class FurnitureDetailView(generics.RetrieveAPIView):
    queryset = FurnitureData.objects.all()
    serializer_class = FurnitureDataSerializer

# fashion
class FashionDataView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def post(self, request, *args, **kwargs):
        serializer = FashionDataSerializer(data=request.data)
        if serializer.is_valid():
            # Attach the authenticated user to the car data
            serializer.save(user=request.user)  # Save with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Log the error details for debugging
        logging.error(f"Form errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FashionDataListView(APIView):
    # permission_classes = [IsAuthenticated]  # Ensure authentication is required
    def get(self, request):
        fashion_data = FashionData.objects.all()
        serializer = FashionDataSerializer(fashion_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
 
# individual    
class FashionDetailView(generics.RetrieveAPIView):
    queryset = FashionData.objects.all()
    serializer_class = FashionDataSerializer


# booksSportsHobbies
class BooksSportsHobbiesDataView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def post(self, request, *args, **kwargs):
        serializer = BooksSportsHobbiesDataSerializer(data=request.data)
        if serializer.is_valid():
            # Attach the authenticated user to the car data
            serializer.save(user=request.user)  # Save with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Log the error details for debugging
        logging.error(f"Form errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BooksSportsHobbiesDataListView(APIView):
    # permission_classes = [IsAuthenticated]  # Ensure authentication is required
    def get(self, request):
        booksSportsHobbies_data = BooksSportsHobbiesData.objects.all()
        serializer = BooksSportsHobbiesDataSerializer(booksSportsHobbies_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
 
# individual    
class BooksSportsHobbiesDetailView(generics.RetrieveAPIView):
    queryset = BooksSportsHobbiesData.objects.all()
    serializer_class = BooksSportsHobbiesDataSerializer

# Mobile
# mobile phones
class MobileBrandTitleListView(generics.ListAPIView):
    queryset = MobileBrandTitle.objects.all()
    serializer_class =  MobileBrandTitleSerializer

class MobileBrandSubtitleListView(generics.ListAPIView):
    serializer_class = MobileBrandSubtitleSerializer

    def get_queryset(self):
        brand_title_id = self.request.query_params.get('brand_title_id')
        return MobileBrandSubtitle.objects.filter(brand_title_id=brand_title_id)
    
# post mobile-mobilephones,accessories,tablets
class MobileDataView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def post(self, request, *args, **kwargs):
        serializer = MobileDataSerializer(data=request.data)
        if serializer.is_valid():
            # Attach the authenticated user to the car data
            serializer.save(user=request.user)  # Save with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Log the error details for debugging
        logging.error(f"Form errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MobileDataListView(APIView):
    # permission_classes = [IsAuthenticated]  # Ensure authentication is required
    def get(self, request):
        mobile_data = MobileData.objects.all()
        serializer = MobileDataSerializer(mobile_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
 
# individual    
class MobileDetailView(generics.RetrieveAPIView):
    queryset = MobileData.objects.all()
    serializer_class = MobileDataSerializer

# cvs
class CvsDataView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def post(self, request, *args, **kwargs):
        serializer = CvsDataSerializer(data=request.data)
        if serializer.is_valid():
            # Attach the authenticated user to the car data
            serializer.save(user=request.user)  # Save with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Log the error details for debugging
        logging.error(f"Form errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CvsDataListView(APIView):
    # permission_classes = [IsAuthenticated]  # Ensure authentication is required
    def get(self, request):
        cvs_data = CvsData.objects.all()
        serializer = CvsDataSerializer(cvs_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
 
# individual    
class CvsDetailView(generics.RetrieveAPIView):
    queryset = CvsData.objects.all()
    serializer_class = CvsDataSerializer

# services
class ToursTypeListView(generics.ListAPIView):
    queryset = ToursType.objects.all()
    serializer_class =  ToursTypeSerializer

class ElectronicRepairTypeListView(generics.ListAPIView):
    queryset = ElectronicRepairType.objects.all()
    serializer_class =  ElectronicRepairTypeSerializer

class HomeRenovationTypeListView(generics.ListAPIView):
    queryset = HomeRenovationType.objects.all()
    serializer_class =  HomeRenovationTypeSerializer

# service
class ServiceDataView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def post(self, request, *args, **kwargs):
        serializer = ServiceDataSerializer(data=request.data)
        if serializer.is_valid():
            # Attach the authenticated user to the car data
            serializer.save(user=request.user)  # Save with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Log the error details for debugging
        logging.error(f"Form errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ServiceDataListView(APIView):
    # permission_classes = [IsAuthenticated]  # Ensure authentication is required
    def get(self, request):
        service_data = ServiceData.objects.all()
        serializer = ServiceDataSerializer(service_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
 
# individual    
class ServiceDetailView(generics.RetrieveAPIView):
    queryset = ServiceData.objects.all()
    serializer_class = ServiceDataSerializer


# bikes
# motorcycles
class MotorcycleBrandTitleListView(generics.ListAPIView):
    queryset = MotorcycleBrandTitle.objects.all()
    serializer_class = MotorcycleBrandTitleSerializer
    
class MotorcycleBrandModelListView(generics.ListAPIView):
    serializer_class = MotorcycleBrandModelSerializer

    def get_queryset(self):
        brand_title_id = self.request.query_params.get('brand_title_id')
        return MotorcycleBrandModel.objects.filter(brand_title_id=brand_title_id)
    
# scooter
class ScooterBrandTitleListView(generics.ListAPIView):
    queryset = ScooterBrandTitle.objects.all()
    serializer_class = ScooterBrandTitleSerializer
    
class ScooterBrandModelListView(generics.ListAPIView):
    serializer_class = ScooterBrandModelSerializer

    def get_queryset(self):
        brand_title_id = self.request.query_params.get('brand_title_id')
        return ScooterBrandModel.objects.filter(brand_title_id=brand_title_id)
    
# bicycle
class BicycleBrandTitleListView(generics.ListAPIView):
    queryset = BicycleBrandTitle.objects.all()
    serializer_class = BicycleBrandTitleSerializer

# post bike
class BikeDataView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def post(self, request, *args, **kwargs):
        serializer = BikeDataSerializer(data=request.data)
        if serializer.is_valid():
            # Attach the authenticated user to the car data
            serializer.save(user=request.user)  # Save with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Log the error details for debugging
        logging.error(f"Form errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BikeDataListView(APIView):
    # permission_classes = [IsAuthenticated]  # Ensure authentication is required
    def get(self, request):
        bike_data = BikeData.objects.all()
        serializer = BikeDataSerializer(bike_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
 
# individual    
class BikeDetailView(generics.RetrieveAPIView):
    queryset = BikeData.objects.all()
    serializer_class = BikeDataSerializer

# property
class PropertyDataView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def post(self, request, *args, **kwargs):
        serializer = PropertyDataSerializer(data=request.data)
        if serializer.is_valid():
            # Attach the authenticated user to the car data
            serializer.save(user=request.user)  # Save with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Log the error details for debugging
        logging.error(f"Form errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PropertyDataListView(APIView):
    # permission_classes = [IsAuthenticated]  # Ensure authentication is required
    def get(self, request):
        property_data = PropertyData.objects.all()
        serializer = PropertyDataSerializer(property_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
 
# individual    
class PropertyDetailView(generics.RetrieveAPIView):
    queryset = PropertyData.objects.all()
    serializer_class = PropertyDataSerializer

logger = logging.getLogger(__name__)


class AllSearchView(APIView):
    def get(self, request):
        query = request.query_params.get("q", None)
        if not query:
            return Response({"error": "No query provided"}, status=400)

        # Filter each model by the query
        # mobile_results = MobileData.objects.filter(mobileTitle__icontains=query) #single
        # logger.info(f"Mobile Results Count: {mobile_results.count()}")
        mobile_results = MobileData.objects.filter(Q(mobileTitle__icontains=query) | Q(mobileDescription__icontains=query) )
        car_results = CarData.objects.filter(Q(carTitle__icontains=query) | Q(carDescription__icontains=query))
        pet_results = PetData.objects.filter(Q(petTitle__icontains=query) | Q(petDescription__icontains=query) )
        job_results = JobData.objects.filter(Q(jobTitle__icontains=query) | Q(jobDescription__icontains=query))
        electronicappliance_results = ElectronicApplianceData.objects.filter(Q(electronicApplianceTitle__icontains=query) | Q(electronicApplianceDescription__icontains=query) )
        furniture_results = FurnitureData.objects.filter(Q(furnitureTitle__icontains=query) | Q(furnitureDescription__icontains=query) )
        fashion_results = FashionData.objects.filter(Q(fashionTitle__icontains=query) | Q(fashionDescription__icontains=query))
        cvs_results = CvsData.objects.filter(Q(cvsTitle__icontains=query) | Q(cvsDescription__icontains=query))
        booksportshobbies_results = BooksSportsHobbiesData.objects.filter(Q(booksSportsHobbiesTitle__icontains=query) | Q(booksSportsHobbiesDescription__icontains=query))
        service_results = ServiceData.objects.filter(Q(serviceTitle__icontains=query) | Q(serviceDescription__icontains=query))
        bike_results = BikeData.objects.filter(Q(bikeTitle__icontains=query) | Q(bikeDescription__icontains=query))
        property_results = PropertyData.objects.filter(Q(propertyTitle__icontains=query) | Q(propertyDescription__icontains=query))

        # Serialize the results
        mobile_serializer = MobileDataSerializer(mobile_results, many=True)
        car_serializer = CarDataSerializer(car_results, many=True)
        pet_serializer = PetDataSerializer(pet_results, many=True)
        job_serializer = JobDataSerializer(job_results, many=True)
        electronicappliance_serializer = ElectronicApplianceDataSerializer(electronicappliance_results, many=True)
        furniture_serializer = FurnitureDataSerializer(furniture_results, many=True)
        fashion_serializer = FashionDataSerializer(fashion_results, many=True)
        cvs_serializer = CvsDataSerializer(cvs_results, many=True)
        booksportshobbies_serializer = BooksSportsHobbiesDataSerializer(booksportshobbies_results, many=True)
        service_serializer = ServiceDataSerializer(service_results, many=True)
        bike_serializer = BikeDataSerializer(bike_results, many=True)
        property_serializer = PropertyDataSerializer(property_results, many=True)

        # Combine the results in a structured way
        combined_results = {
            "mobiles": mobile_serializer.data,
            "cars": car_serializer.data,
            "pets": pet_serializer.data,
            "jobs": job_serializer.data,
            "electronicappliances": electronicappliance_serializer.data,
            "furniture": furniture_serializer.data,
            "fashion": fashion_serializer.data,
            "cvs": cvs_serializer.data,
            "booksports": booksportshobbies_serializer.data,
            "services": service_serializer.data,
            "bikes": bike_serializer.data,
            "properties": property_serializer.data,
        }

        return Response(combined_results)
    
# filter
class CategoryFilterView(APIView):
    
    def get(self, request, decoded_category):
        category = unquote(decoded_category)
        if category == "Fashion":
            data = FashionData.objects.all()
            serializer = FashionDataSerializer(data, many=True)
        elif category == "Books, Sports & Hobbies":
            data = BooksSportsHobbiesData.objects.all()
            serializer = BooksSportsHobbiesDataSerializer(data, many=True)
        elif category == "Jobs":
            data = JobData.objects.all()
            serializer = JobDataSerializer(data, many=True)
        else:
            return Response({"error": "Invalid category"}, status=400)
        
        return Response(serializer.data)
    

# from django.shortcuts import render
# from django.contrib.auth.models import User
# from django.db.models import Count
# from django.contrib.admin.views.decorators import staff_member_required
# @staff_member_required
# def dashboard_view(request):
#     # Example Metrics
#     total_users = User.objects.count()
#     active_users = User.objects.filter(is_active=True).count()

#     # Chart Data (e.g., Monthly User Signups)
#     monthly_user_signups = (
#         User.objects.extra(select={'month': "EXTRACT(month FROM date_joined)"})
#         .values('month')
#         .annotate(count=Count('id'))
#         .order_by('month')
#     )
#     chart_labels = [item['month'] for item in monthly_user_signups]
#     chart_data = [item['count'] for item in monthly_user_signups]

#     context = {
#         'total_users': total_users,
#         'active_users': active_users,
#         'chart_labels': chart_labels,
#         'chart_data': chart_data,
#     }
#     return render(request, 'admin/custom_dashboard.html', context)


# class ChatRoomListCreateView(generics.ListCreateAPIView):
#     queryset = ChatRoom.objects.all()
#     serializer_class = ChatRoomSerializer

# class MessageListCreateView(generics.ListCreateAPIView):
#     queryset = Message.objects.all()
#     serializer_class = MessageSerializer

#     def get_queryset(self):
#         buyer = self.request.query_params.get('buyer')
#         seller = self.request.query_params.get('seller')
#         if buyer and seller:
#             return Message.objects.filter(
#                 sender__in=[buyer, seller], 
#                 receiver__in=[buyer, seller]
#             ).order_by('timestamp')
#         return Message.objects.none()

class ChatRoomViewSet(viewsets.ModelViewSet):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer