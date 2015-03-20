import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

def images(request):
  images = [
    {"thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg' },
    {"thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg' },    
    {"thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1729.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1729.jpg' },    
    {"thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1549.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1549.jpg' },
    {"thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1724.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1724.jpg' },    
    {"thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg' }, 
    {"thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg' },
    {"thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg' },    
    {"thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg' }, 
    {"thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg' },
    {"thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg' },    
    {"thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg' },             
  ]
  return HttpResponse(json.dumps(images), mimetype="application/json")

@csrf_exempt
@require_POST
def image_upload(request):
  image = {
    "filelink":"http://adibaron.folyou.com/f-users/user_101578/website_101704/images/10010140_10152345637587375_1812037195_o.jpg",
    "id": 1
  }
  return HttpResponse(json.dumps(image), mimetype="application/json")
