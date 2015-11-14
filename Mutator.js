/*mute 1.4*/	   
aldiMutator = {};        

aldiMutator.mute=function()
{
    var a=$("#inpchat").val();
    if(a==''){message('Niema kogo zmutować'); return;}
    if(a[0]=='@'){a=a.substring(1);}
    a=a.trim();
    a='/mute '+$("#cbTime").attr("value")+' '+a; 
    chatSend(a);
    $("#inpchat").val('');
}
//mutowanie na ctrl + m (17 + 77), kiedy focus jest na #inpchat
aldiMutator.muteOnKeyPress = function(keyId)
{             
    if( keyId == 77 && this.previouslyPressedKey == 17)
    {
        this.mute()
    }
    this.previouslyPressedKey = keyId;      
}

aldiMutator.start = function()
{
    var muteTimes = new Array(1,2,4,6,12,24,36,48,60,72);
    var myOptions='';
    for(var i in muteTimes){myOptions+='<option value="'+muteTimes[i]+'">'+muteTimes[i]+'</option>';}
    var strToAldiMenu = $("<div/>")
    .append($('<span id="muteButton2" clear:both;">Mute</span>').click(function(){aldiMutator.mute()}))
    .append($('<select name="combo" id="cbTime" tip="czas uciszenia" size="1">'+myOptions+'</select>').attr("value","12"))

    this.previouslyPressedKey = null;    
    $("#inpchat").keydown(function(e){aldiMutator.muteOnKeyPress(parseInt(e.which))});    

    //rejestracja w menu
    $.getScript("http://addons2.margonem.pl/get/1/1689public.js",function(){aldiMenu.add(strToAldiMenu)});
}
//start dodatku
g.loadQueue.push({fun:aldiMutator.start,data:''})
        