from lxml import html
import requests
import json
import urllib
import sys

if len(sys.argv) < 2:
  print "Usage: scapper.py <url>"
  sys.exit()

# retreive page content and load it into HTML DOM
page = requests.get( sys.argv[1] )
tree = html.fromstring(page.content)

# locate the features section
features = tree.xpath( "//section[@class='app']/section" )

result = []

for feature in features:
  # extract text from HTML DOM
  img = feature.xpath( "img/@src" )[0]
  title =  feature.xpath( ".//h4/text()" )[0]
  sub = feature.xpath( ".//div[@class='content']/text()" )[0]
  # format the output, strip string, encode the url
  result.append({ "title" : title.strip(), "sub_title":sub.strip(), "image_url" : urllib.quote_plus(img) })

# output the result in JSON format
print json.dumps(result)
