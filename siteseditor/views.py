import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

def images(request):
  images = [
    {"id":1, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    {"id":2, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    {"id":3, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "txt":'' },
    {"id":4, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    {"id":5, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1729.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1729.jpg', "txt":'' },
    {"id":6, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1549.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1549.jpg', "txt":'' },
    {"id":7, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1724.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1724.jpg', "txt":'' },
    {"id":8, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    {"id":9, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "txt":'' },
    {"id":10, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    {"id":11, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    {"id":12, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "txt":'' },
    {"id":13, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    {"id":14, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    {"id":15, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "txt":'' },
    {"id":16, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    {"id":17, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1729.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1729.jpg', "txt":'' },
    {"id":18, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1549.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1549.jpg', "txt":'' },
    {"id":19, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1724.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1724.jpg', "txt":'' },
    {"id":20, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    {"id":21, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "txt":'' },
    {"id":22, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
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
