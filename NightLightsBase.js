try
{

nightLights = {};
nightLights.nightLightsTypes = {
    "S"  : { url : "http://www.wrzucajtu.pl/wrz/1a541d4db906e88685ad1434e92673f2141.101.88.185miniokno64.png", x : "64px", y : "64px", type : "S" },
    "M"  : { url : "http://www.wrzucajtu.pl/wrz/1a541d4db906e88685ad1434e92673f2141.101.88.185maleokno96.png",  x : "96px", y : "96px", type : "M" },
    "L"  : { url : "http://www.wrzucajtu.pl/wrz/1a541d4db906e88685ad1434e92673f2141.101.88.185duzeokno160.png", x : "160px", y : "160px", type : "L" },
    "XL" : { url : "http://www.wrzucajtu.pl/wrz/1a541d4db906e88685ad1434e92673f2141.101.88.185wielkieokno192.png", x : "192px", y : "192px", type : "XL"}
};

nightLights.addNightLight = function(light, x, y)
{
    return $('<div/>')
    .css({background:'url('+ light.url +')',
          width : light.x,
          height : light.y,
          zIndex : 280,
          position:'absolute',
          left : x,
          top : y,
          pointerEvents : "none"})
    .addClass("nightLight")
    .attr("type", light.type)
    .appendTo("#ground")
}

nightLights.makeLightTestable = function(light)
{
    light
    .css({pointerEvents : "auto",
          border : "1px solid yellow"})
    .dblclick(function(){light.remove();})
    .draggable();
}

nightLights.addTestNightLight = function(light, x, y)
{
    this.makeLightTestable(this.addNightLight(light, x, y));          
}

nightLights.dumpLights = function()
{
    log("//"+map.name)
    log("nightLightsConfig[" + map.id + "] = [")
    $("#base .nightLight").each(function()
        {
            var pos = $(this).position()
            log("{x : " + parseInt(pos.left) + ", y : " + parseInt(pos.top) + ", type : \"" + $(this).attr("type") + "\"},")
        });
    log("];")
    message("dumping done");
}

nightLights.giveMeTheLight = function()
{
    $("#base .nightLight").css({pointerEvents : "auto"}).each(function(){nightLights.makeLightTestable($(this))});
    var dumpLight = $("<span>dump lights</span>").click(function(){nightLights.dumpLights()});
    var addBorder = $("<span>add border</span>").click(function(){$("#base .nightLight").css("border","1px solid yellow")});
    var delBorder = $("<span>del border</span>").click(function(){$("#base .nightLight").css("border","")});
    var togglemouseMove = $("<span>toggle move</span>").click(function(){hero.opt ^= 64; message("blocked: " + Boolean(hero.opt & 64))});
    $.getScript("http://addons2.margonem.pl/get/1/1689public.js",function()
    {
        for(i in nightLights.nightLightsTypes)
             aldiMenu.add($("<span>light "+i+"</span>").attr("type",i).click(function(){nightLights.addTestNightLight(nightLights.nightLightsTypes[$(this).attr("type")], hero.x*32, hero.y*32)}));
        aldiMenu.add(dumpLight);
        aldiMenu.add(addBorder);
        aldiMenu.add(delBorder);
        aldiMenu.add(togglemouseMove);
    });
}

function giveMeTheLight()
{
    nightLights.giveMeTheLight()
}

}catch(err)
{
    log('NightLights Error: '+ err.message ,1)
}
