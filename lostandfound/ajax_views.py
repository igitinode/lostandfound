#coding=utf-8
from dlnubuy import models
from django.http import HttpResponse
from django.conf import settings
import redis
import json, pdb


# Create your views here.
def register(request):
    rsdic = {}

    mobile = request.POST[u'mobile']
    # pdb.set_trace()
    password = request.POST[u'password']
    nickname = request.POST[u'nickname']
    user = models.Users()
    user.userphone = mobile
    user.username = nickname
    user.password = password

    try:
        user.save()
        rsdic['ret'] = 'success'
    except:
        rsdic['ret'] = 'error'

    return HttpResponse(json.dumps(rsdic))

def loginuser(request):
    rsdic = {}
    mlsUser = request.POST['mlsUser'].encode('utf-8')
    password = request.POST['password'].encode('utf-8')
    username = models.Users.objects.all().filter(password=password, username=mlsUser)
    if(username.count()!=0):
        rsdic['ret'] = 'success'
        Uid = models.Users.objects.get(username=mlsUser).id
        write_to_cache(Uid)
        rsdic['id'] = Uid
    else:
        rsdic['ret'] = 'error'
        pdb.set_trace()
    return HttpResponse(json.dumps(rsdic))

def loginTag(request):
    rsdic = {}
    user_id = int(request.POST['uid'])
    user = models.Users.objects.all().filter(id=user_id)
    rdata = read_from_cache(user_id)
    if(rdata!=None):
        rsdic['ret'] = 'online'
        for u in user:
            rsdic['phone'] = u.userphone
            rsdic['school'] = u.schoolAddress
            rsdic['img'] = str(u.userimg)
            rsdic['id'] = u.id
            rsdic['username'] = u.username
    else:
        rsdic['ret'] = 'outline'
    return HttpResponse(json.dumps(rsdic))


def addproduct(request):
    pass


def modifyPassword(request):
    rsdic = {}
    uid = int(request.POST['uid'])
    oldpassword = request.POST['oldp'].encode('utf-8')
    newpassword = request.POST['newp'].encode('utf-8')
    try:
        user = models.Users.objects.get(id=uid)
        if(oldpassword == user.password):
            user.password = newpassword
            user.save()
            rsdic['ret'] = 'success'
        else:
            rsdic['ret'] = 'passerror'
    except:
        rsdic['ret'] = 'error'
    return HttpResponse(json.dumps(rsdic))


def modifyPhone(request):
    rsdic = {}
    uid = int(request.POST['uid'])
    uphone = request.POST['newphone'].encode('utf-8')
    try:
        user = models.Users.objects.get(id=uid)
        user.userphone = uphone
        user.save()
        rsdic['ret'] = 'success'
    except:
        rsdic['ret'] = 'error'
    return HttpResponse(json.dumps(rsdic))


def modifyuserinfo(request):
    rsdic = {}
    uid = int(request.POST['uid'])
    uschool = request.POST['news'].encode('utf-8')
    img = request.FILES['newuserimg']
    import re
    pattern1 = re.compile(r'开发区')
    match = pattern1.match(uschool)
    if match is not None:
        newschooladd = '开发区校区'
    else:
        newschooladd = '金石滩校区'

    userimgadd = write_to_infoimg(img, request.POST['uid'].encode('utf-8'), 'user')
    try:
        pdb.set_trace()
        usernew = models.Users.objects.get(id=uid)
        usernew.userimg = userimgadd
        usernew.schoolAddress = newschooladd
        usernew.save()
        rsdic['ret'] = 'success'
    except:
        rsdic['ret'] = 'error'
    HttpResponse(json.dumps(rsdic))


# 取得宝贝分类的方法
def getClassification(request):

    rsdic = {}
    try:
        parent = int(request.POST['parent'])
        level = int(request.POST['level'])
        # pdb.set_trace()
        cfobjs = models.Classification.objects.all().filter(parent=parent, level=level)
        cf = []
        for cfobj in cfobjs:
            temp = []
            temp.append(cfobj.CFname)
            temp.append(cfobj.CFnumber)
            cf.append(temp)
        rsdic['cf'] = cf
        rsdic['ret'] = 'success'
    except:
        rsdic['ret'] = 'error'
    return HttpResponse(json.dumps(rsdic))


#read cache user id
def read_from_cache(user_id):
    r = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=settings.REDIS_DB)
    key = 'user_id_of_'+str(user_id)
    value = r.get(key)
    if value == None:
        data = None
    else:
        data = value
    return data


#write cache user id
def write_to_cache(user_id):
    r = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=settings.REDIS_DB)
    key = 'user_id_of_' + str(user_id)
    r.set(key, key)


# 保存用户上传的图片
def write_to_infoimg(file, uid, type):
    pdb.set_trace()
    if type == 'user':
        with open('static\\images\\users\\user_'+uid+'.jpg', 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
            return 'static/images/users/user_'+uid+'.jpg'
    if type == 'product':
        with open('static/images/warp/'+uid+',jpg', 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
            return 'static/images/warp/'+uid+',jpg'
