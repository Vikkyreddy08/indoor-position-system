from rest_framework import serializers

class SensorDataSerializer(serializers.Serializer):
    wifi = serializers.ListField(
        child=serializers.FloatField(),
        min_length=3,
        max_length=3
    )
    bluetooth = serializers.ListField(
        child=serializers.FloatField(),
        min_length=2,
        max_length=2
    )
    accelerometer = serializers.ListField(
        child=serializers.FloatField(),
        min_length=3,
        max_length=3
    )
