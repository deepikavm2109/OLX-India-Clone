from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

state_list = StateListViewSet.as_view({
    'get': 'list',  # Handle GET requests
    'post': 'create'  # Handle POST requests
})

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),

    path('categories/', CategoriesListAPIView.as_view(), name='category-list-api'),
    path('categories/<int:pk>/', CategoriesDetailAPIView.as_view(), name='category-detail-api'),

# common
    path('statelist/', state_list, name='state-list'), #to get (list) post(create)
    # car
    path('carbrandtitle/', CarBrandTitleListView.as_view(),name='car-brand-title'),
    path('carbrandsubtitle/', CarBrandSubtitleListView.as_view(), name='car-brand-subtitle'),
    path('carbrandmodels/', CarBrandModelListView.as_view(), name='car-brand-model'),
    path('carfuel/', CarFuelTypeListView.as_view(), name='brand-model'),
    path('carowners/', CarOwnersTypeListView.as_view(), name='brand-model'),
    path('cartransmission/', CarTransmissionTypeListView.as_view(), name='brand-model'),
    path('carform/',CarDataView.as_view(), name='car-data-form'),
    path('carlist/',CarDataListView.as_view(), name='car-data-list'),
    path('carlist/<int:pk>/', CarDetailView.as_view(), name='car-detail'),

    # post car
    path('petform/',PetDataView.as_view(), name='pet-data-form'),
    path('petslist/',PetDataListView.as_view(), name='pet-data-list'),
    path('petlist/<int:pk>/', PetDetailView.as_view(), name='pet-detail'),

    # post job
    path('jobform/',JobDataView.as_view(), name='job-data-form'),
    path('joblist/',JobDataListView.as_view(), name='job-data-list'),
    path('joblist/<int:pk>/', JobDetailView.as_view(), name='job-detail'),

    # post electronicappliance
    path('electronicapplianceform/',ElectronicApplianceDataView.as_view(), name='electronicappliance-data-form'),
    path('electronicappliancelist/',ElectronicApplianceDataListView.as_view(), name='electronicappliance-data-list'),
    path('electronicappliancelist/<int:pk>/', ElectronicApplianceDetailView.as_view(), name='electronicappliance-detail'),

    # post furniture
    path('furnitureform/',FurnitureDataView.as_view(), name='furniture-data-form'),
    path('furniturelist/',FurnitureDataListView.as_view(), name='furniture-data-list'),
    path('furniturelist/<int:pk>/', FurnitureDetailView.as_view(), name='furniture-detail'),

    # post fashion
    path('fashionform/',FashionDataView.as_view(), name='fashion-data-form'),
    path('fashionlist/',FashionDataListView.as_view(), name='fashion-data-list'),
    path('fashionlist/<int:pk>/', FashionDetailView.as_view(), name='fashion-detail'),

    # post booksSportsHobbies
    path('booksportshobbiesform/',BooksSportsHobbiesDataView.as_view(), name='booksSportsHobbies-data-form'),
    path('bookSportsHobbieslist/',BooksSportsHobbiesDataListView.as_view(), name='booksSportsHobbies-data-list'),
    path('bookSportsHobbieslist/<int:pk>/', BooksSportsHobbiesDetailView.as_view(), name='booksSportsHobbies-detail'),

    path('mobilebrandtitle/', MobileBrandTitleListView.as_view(),name='mobiler-brand-title'),
    path('mobilebrandsubtitle/', MobileBrandSubtitleListView.as_view(), name='mobile-brand-subtitle'),
    path('mobileform/',MobileDataView.as_view(), name='mobile-data-form'),
    path('mobilelist/',MobileDataListView.as_view(), name='mobile-data-list'),
    path('mobilelist/<int:pk>/', MobileDetailView.as_view(), name='mobile-detail'),
    path('cvsform/',CvsDataView.as_view(), name='cvs-data-form'),
    path('cvslist/',CvsDataListView.as_view(), name='cvs-data-list'),
    path('cvslist/<int:pk>/', CvsDetailView.as_view(), name='cvs-detail'),

    path('tourstype/', ToursTypeListView.as_view(),name='tours-type'),
    path('electronicrepairtype/', ElectronicRepairTypeListView.as_view(),name='electronic-repair-type'),
    path('homerenovationtype/', HomeRenovationTypeListView.as_view(),name='home-renovation-type'),
    # post service
    path('serviceform/',ServiceDataView.as_view(), name='service-data-form'),
    path('servicelist/',ServiceDataListView.as_view(), name='service-data-list'),
    path('servicelist/<int:pk>/', ServiceDetailView.as_view(), name='service-detail'),

    path('motorcyclebrandtitle/', MotorcycleBrandTitleListView.as_view(),name='motorcycle-brand-title'),
    path('motorcyclebrandmodels/', MotorcycleBrandModelListView.as_view(), name='motorcycle-brand-model'),

    path('scooterbrandtitle/',ScooterBrandTitleListView.as_view(),name='scooter-brand-title'),
    path('scooterbrandmodels/', ScooterBrandModelListView.as_view(), name='scooter-brand-model'),

    path('bicyclebrandtitle/',BicycleBrandTitleListView.as_view(),name='bicycle-brand-title'),

    # post bike
    path('bikeform/',BikeDataView.as_view(), name='bike-data-form'),
    path('bikelist/',BikeDataListView.as_view(), name='bike-data-list'),
    path('bikelist/<int:pk>/', BikeDetailView.as_view(), name='bike-detail'),

    # post property
    path('propertyform/',PropertyDataView.as_view(), name='property-data-form'),
    path('propertylist/',PropertyDataListView.as_view(), name='property-data-list'),
    path('propertylist/<int:pk>/', PropertyDetailView.as_view(), name='property-detail'),

    # search
    path('all-search/', AllSearchView.as_view(), name="all-search"),
    # filter
    path('filter/<str:decoded_category>/', CategoryFilterView.as_view(), name='category-filter'),

    # path('chats/', ChatRoomViewSet.as_view({'get': 'list', 'post': 'create'}), name='chat-rooms'),
    # path('chats/<int:pk>/', ChatRoomViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='chat-room-detail'),

]
