from django.urls import path
from .views import PredictLocationView

urlpatterns = [
    path('predict-location/', PredictLocationView.as_view(), name='predict_location'),
]
