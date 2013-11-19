# Scrapy settings for navspider project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#

BOT_NAME = 'navspider'

SPIDER_MODULES = ['navspider.spiders']
NEWSPIDER_MODULE = 'navspider.spiders'

# Crawl responsibly by identifying yourself (and your website) on the user-agent
USER_AGENT = 'navspider (+http://hao.dongyuezhao.cn)'


import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'navsrv.settings'
