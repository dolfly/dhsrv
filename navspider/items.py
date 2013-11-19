# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

from scrapy.item import Item, Field
from scrapy.contrib.djangoitem import DjangoItem

from navsrv.video.models import VGroup

class NavspiderItem(Item):
    # define the fields for your item here like:
    # name = Field()
    pass

class VGroupItem(DjangoItem):
    django_model = VGroup
    pass
