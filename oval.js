var Oval = function(color)
{
  return $('<svg height="26" width="38" id="_svg"><ellipse id="_elipse" cx="19" cy="13" rx="18" ry="12" style="fill-opacity: 0.2; stroke: '+color+'; stroke-opacity: 0.5;" /></svg>')    
    .css({position:"absolute", pointerEvents: 'none'})
}

var appendOvalBlure = function($oval, $source)
{
    $source
    .mouseenter(function(){$oval.children().css({fillOpacity : 0.5, strokeOpacity : 1.0})})
    .mouseleave(function(){$oval.children().css({fillOpacity : 0.2, strokeOpacity : 0.5})})
}

var wrapp = function(f1,f2)
{
	return function()
    {
      	f1.apply(this,arguments)
      	f2.apply(this,arguments)
    }
}

appendOvalNpc = function(npcs)
{
	for(var i in npcs)
    {
      	if(npcs[i].lvl)
        {
            var $npc = $("#npc"+i)
            var $oval = Oval(ovalNcpColor(npcs[i])).appendTo("#base")
			npcs[i].$oval = $oval
            appendOvalBlure($oval, $npc)
    		updateOval($oval, $npc)
        }
    }
}

ovalNcpColor = function(npc)
{
	if(typeof npc.type === 'undefined')
      return getOtherColor(npc)
    if(npc.type == 2 || npc.type == 3)
      return 'red'
    return 'deepskyblue'
}

getOtherColor = function(other)
{
  if(['en','cl-en','fr-en'].indexOf(other.relation) > -1)
    return 'red'
  if(['cl','cl-fr',].indexOf(other.relation) > -1)
    return 'yellow'
  if(['fr','fr-fr'].indexOf(other.relation) > -1)
    return 'limegreen'
  return 'lightgray'
}

var updateOval = function($oval, $source)
{
	$oval.css({left: parseInt($source.css("left")) - 3, top: parseInt($source.css("top")) + 32})
}

var config = {attributes: true, attributeFilter:['style']}
var createObserver = function($source,$dest)
{
    
	var observer = new MutationObserver(updateOval.bind(this,$dest,$source))
    observer.observe($source.get(0),config)
    return observer
}

var appendOvalOther = function(others)
{
    for(var i in others)
    {
        if(g.other[i] && !g.other[i].$oval)
        {
            var $other = $("#other"+i)
            var $oval = Oval(ovalNcpColor(others[i])).appendTo("#base")
            g.other[i].$oval = $oval
            appendOvalBlure($oval, $other)
            createObserver($other,$oval)
        }
    }
}

var removeOvalOther=function(others)
{
    for(var i in others)
    {
        if(others[i].del && g.other[i] && g.other[i].$oval)
             g.other[i].$oval.remove()
    }
}

var appendOvalHero = function()
{
    var $hero = $("#hero")
    var $oval = Oval('lime').appendTo("#base")
    appendOvalBlure($oval, $hero)
    createObserver($hero,$oval)
}

appendOvalHero()
newNpc = wrapp(newNpc, appendOvalNpc)
newOther = wrapp(removeOvalOther, newOther)
newOther = wrapp(newOther, appendOvalOther)

g.loadQueue.push({fun:function(){ message("oval")},data:""})

