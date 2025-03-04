import urllib.request #url getter
import re #get from pattern
import os
from bs4 import BeautifulSoup
from datetime import datetime

isProd = True

if isProd:
    req = urllib.request.urlopen('https://celiktafsir.net/') 
    data = req.read()

index = data.find("Senarai Surah".encode("utf-8"))

# Get the substring from the index to the end of the string
substring = data[index:len(data)]

#get all list
indexS = substring.find("<ul>".encode("utf-8"))
indexE = substring.find("</ul>".encode("utf-8"))
substring2 = substring[indexS:indexE+5]

#get all list of surah
index3 = substring2.find("al-fatihah/".encode("utf-8"))
index4 = substring2.find("an-nas/".encode("utf-8"))
ss = substring2[index3-90 : index4+20]
decoded_ss = ss.decode("utf-8")

#get all href in Array
nums = re.findall(r'href="(.+?)"', decoded_ss)

#print(nums[0])

#Date
today = datetime.today().strftime("%Y%m%d-%H%M")

#get all link and store it inside .txt file
if False :
    txt = ""
    for f in nums:
        txt += (f + "\n")

    filename = "output python/output" + today + ".txt"
    with open(filename, "a") as f:
        print(txt, file=f)
  
    exit()


#links
txt = ""
for link in nums:
    req = urllib.request.urlopen(link)
    data = req.read()
    
    print(link)
     
    #idx = data.find("entry-title")
    #soup = BeautifulSoup(data, 'html.parser')
    #get all Surah's inside pages
    data = str(data)
    idx = data.find('entry-title')
    s = data[idx:len(data)]
    idx2 = s.find('</ul>')
    s = s[0:idx2]
    #print(s)
    
    #get all href in Array
    pages = re.findall(r'href="(.+?)"', s)
    #print(pages)
    
    #put all inside txt variable
    for f in pages:
        txt += (f + " ")
    
    #albaqarah ada 3 part
    if (not (link == 'https://celiktafsir.net/surah-002-al-baqarah/' or link == 'https://celiktafsir.net/surah-002-bahagian-2/')):
        #remove last space
        txt = txt[:-1]
        #add newline foreach surah
        txt += ";\n"

#remove last space
# txt = txt[:-1]
# txt += ";\n"

#20-Feb-2025
date = datetime.now()
formatted_date = date.strftime('%d-%b-%Y')
txt += formatted_date

#create file
filename = "output python/output" + today + ".txt"
os.makedirs(os.path.dirname(filename), exist_ok=True)

with open(filename, "w") as f:
  print(txt, file=f)

print(f"Successfully created file {filename}")

exit()

