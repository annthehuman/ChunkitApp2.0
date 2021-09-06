from rest_framework import serializers
from .models import experement_data

class ExperementDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = experement_data
        fields = ('number', 'name')