from .models import draft_data

#docker run -it -v chunkitapp/use_case.py:/use_case.py -p 8888:8888 48036f184997

def get_draf_data():
    draft = draft_data.objects.all()
    print(draft)

