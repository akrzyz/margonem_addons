from urllib.request import *
import traceback
import re
import sys
import time

try:
    addons = {};
    addons["MHT.js"] = "http://addons2.margonem.pl/get/1/1266dev.js";
    addons["AH.js"] = "http://addons2.margonem.pl/get/1/1319dev.js";
    addons["HeroTip.js"] = "http://addons2.margonem.pl/get/1/1321dev.js";
    addons["MonstersGroupTip.js"] = "http://addons2.margonem.pl/get/1/1323dev.js";
    addons["MsgTip.js"] = "http://addons2.margonem.pl/get/1/1525dev.js";
    addons["Mutator.js"] = "http://addons2.margonem.pl/get/1/1718dev.js";
    addons["AldiMenu.js"] = "http://addons2.margonem.pl/get/1/1689dev.js";
    addons["AFC.js"] = "http://addons2.margonem.pl/get/2/2069dev.js";
    addons["PPM2Chat.js"] = "http://addons2.margonem.pl/get/2/2230dev.js";
    addons["Blogator.js"] = "http://addons2.margonem.pl/get/3/3991dev.js";

    for key, value in addons.items():
        print('downlanding ' + key + " from: " + value)
        urlretrieve(value, key)   

    print('All work Done')
    time.sleep(2)
except:
    traceback.print_exc()
    sys.exit(1)
    print('press any key to continue..')
    input()