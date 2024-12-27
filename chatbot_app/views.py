from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
import time
from django.shortcuts import render

# Serializer for validating the user message
class ChatbotRequestSerializer(serializers.Serializer):
    user_message = serializers.CharField(max_length=500, required=True)

class GenerateResponseAPIView(APIView):
    def post(self, request):
        # Validate the incoming data
        serializer = ChatbotRequestSerializer(data=request.data)
        if serializer.is_valid():
            user_message = serializer.validated_data.get('user_message')

            # Simulate processing delay for realism
            time.sleep(1)

            # Return a professional pre-defined response
            bot_response = (
                "Thank you for reaching out! Our AI system is currently being updated. "
                "We'll assist you shortly."
            )

            return Response({'bot_response': bot_response}, status=status.HTTP_200_OK)

        # Return validation errors if the data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def home(request):
    return render(request, 'index.html')
