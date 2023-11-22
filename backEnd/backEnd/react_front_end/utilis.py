# utils.py

from django.http import JsonResponse

def get_token_from_request(request):
    auth_header = request.META.get('HTTP_AUTHORIZATION')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None
    return auth_header.replace('Bearer ', '')
