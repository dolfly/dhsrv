from django.db import models

# Create your models here.

class GSite(models.Model):
	site_name       = models.CharField(max_length = 128)
	site_short_name = models.CharField(max_length = 64)


class GSpider(models.Model):
	site = models.ForeignKey(GSite)
	api_url = models.URLField(max_length   = 255)
	version = models.CharField(max_length  = 16)
	weight  = models.FloatField(max_length = 8)
	uptime  = models.DateField()

class GCate(models.Model):

	cate_name       = models.CharField(max_length = 128)
	cate_short_name = models.CharField(max_length = 64)
	cate_show_name  = models.CharField(max_length = 128)
	#cate_parent_id = models.ForeignKey(self)

class GData(models.Model):
	spider     = models.ForeignKey(GSpider)
	cate       = models.ForeignKey(GCate)
	#tags	   = models.
	name       = models.CharField(max_length    = 128)
	icon_link1 = models.URLField(max_length     = 255)
	icon_link2 = models.URLField(max_length     = 255)
	img_link1  = models.URLField(max_length     = 255)
	img_link2  = models.URLField(max_length     = 255)
	size       = models.IntegerField(max_length = 16)
	pubtime    = models.DateField()
	original   = models.IntegerField(max_length = 16)
	start      = models.CharField(max_length    = 128)
	intro      = models.TextField()
	target     = models.CharField(max_length    = 128)
	view_link  = models.URLField(max_length     = 255)
	play_link  = models.URLField(max_length     = 255)
	score      = models.IntegerField(max_length = 16)
	click      = models.IntegerField(max_length = 16)
	rank       = models.IntegerField(max_length = 16)
	hot_rank   = models.IntegerField(max_length = 16)

class GTag(models.Model):
	name=models.CharField(max_length    = 128)
	rank=models.IntegerField(max_length = 16)
	is_girl=models.BooleanField()
