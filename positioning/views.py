from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SensorDataSerializer
import joblib
import os
from django.conf import settings
import numpy as np
import logging
import sklearn
import sklearn.neighbors

logger = logging.getLogger(__name__)

# Load model at startup
MODEL_PATH = os.path.join(settings.BASE_DIR, 'ml_model', 'model.pkl')

try:
    if os.path.exists(MODEL_PATH):
        ML_DATA = joblib.load(MODEL_PATH)
        MODEL = ML_DATA['model']
        ROOM_CENTERS = ML_DATA['room_centers']
        logger.info("Model loaded successfully")
    else:
        logger.error(f"Model file not found at {MODEL_PATH}")
        MODEL = None
        ROOM_CENTERS = {}
except Exception as e:
    logger.error(f"Error loading model: {e}")
    MODEL = None
    ROOM_CENTERS = {}

class PredictLocationView(APIView):
    def post(self, request):
        if MODEL is None:
            return Response({"error": "Model not loaded on server"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        serializer = SensorDataSerializer(data=request.data)
        if serializer.is_valid():
            try:
                wifi = serializer.validated_data['wifi']
                bluetooth = serializer.validated_data['bluetooth']
                accelerometer = serializer.validated_data['accelerometer']
                
                # Combine features: wifi_1, wifi_2, wifi_3, bt_1, bt_2, acc_x, acc_y, acc_z
                features = np.array(wifi + bluetooth + accelerometer).reshape(1, -1)
                
                # Predict room
                predicted_room = MODEL.predict(features)[0]
                
                # Get x, y from room centers
                coords = ROOM_CENTERS.get(predicted_room, [0, 0])
                
                return Response({
                    "x": coords[0],
                    "y": coords[1],
                    "room": predicted_room
                }, status=status.HTTP_200_OK)
            except Exception as e:
                logger.error(f"Prediction error: {e}")
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
