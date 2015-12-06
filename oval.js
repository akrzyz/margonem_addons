var wrapp = function(f1,f2)
{
    return function()
    {
        f1.apply(this,arguments)
      	f2.apply(this,arguments)
    }
}

//--- Oval ---
var Oval = {}
Oval.create = function(color)
{
    return $('<svg height="26" width="38"><ellipse id="_elipse" cx="19" cy="13" rx="18" ry="12" style="fill-opacity: 0.2; stroke: '+color+'; stroke-opacity: 0.5;" /></svg>')    
    .css({position:"absolute", pointerEvents: 'none'})
    .appendTo("#base")
}
Oval.blure = function($source)
{
    $source
    .mouseenter(function(){this.children().css({fillOpacity : 0.5, strokeOpacity : 1.0})}.bind(this))
    .mouseleave(function(){this.children().css({fillOpacity : 0.2, strokeOpacity : 0.5})}.bind(this))
}
Oval.update = function($source)
{
	this.css({left: parseInt($source.css("left")) - 3, top: parseInt($source.css("top")) + 32})
}

//--- oval ---
var oval = {}
//--- npc ---
oval.npc = {}
oval.npc.color = function(npc)
{
    if(npc.type == 2 || npc.type == 3)
      return 'red'
    return 'deepskyblue'
}
oval.npc.create = function(npc)
{
    return Oval.create(this.color(npc))
}
oval.npc.append = function(npcs)
{
	for(var i in npcs)
    {
      	if(npcs[i].lvl)
        {
            var $npc = $("#npc"+i)
            var $oval = this.create(npcs[i])
			npcs[i].$oval = $oval
            Oval.blure.call($oval, $npc)
    		Oval.update.call($oval, $npc)
        }
    }
}
//--- other ---
oval.other = {}
oval.other.color = function(other)
{
  if(['en','cl-en','fr-en'].indexOf(other.relation) > -1)
    return 'red'
  if(['cl','cl-fr',].indexOf(other.relation) > -1)
    return 'yellow'
  if(['fr','fr-fr'].indexOf(other.relation) > -1)
    return 'limegreen'
  return 'lightgray'
}
oval.other.create = function(other)
{
    return Oval.create(this.color(other))
}
oval.other.append = function(others)
{
    for(var i in others)
    {
        if(g.other[i] && !g.other[i].$oval)
        {
            var $other = $("#other"+i)
            var $oval = this.create(others[i])
            g.other[i].$oval = $oval
            Oval.blure.call($oval, $other)
            ObserverFactory.create($other,$oval)
        }
    }
}
oval.other.remove = function(others)
{
    for(var i in others)
    {
        if(others[i].del && g.other[i] && g.other[i].$oval)
             g.other[i].$oval.remove()
    }
}
//--- hero ---
oval.hero = {}
oval.hero.color = function(){return "lime"}
oval.hero.create = function(hero)
{
    return Oval.create(this.color(hero)) 
}
oval.hero.append = function()
{
    var $hero = $("#hero")
    var $oval = this.create(hero)
    Oval.blure.call($oval, $hero)
    ObserverFactory.create($hero,$oval)
}

//--- observers ---
var ObserverFactory = {}
ObserverFactory.config = {attributes: true, attributeFilter:['style']}
ObserverFactory.create = function($source,$dest)
{
	return this.create2($source, Oval.update.bind($dest, $source))
}
ObserverFactory.create2 = function($subject, update)
{
	var observer = new MutationObserver(update)
    observer.observe($subject.get(0),this.config)
    return observer
}

//--- start ---
oval.start = function()
{
    oval.hero.append()
//    newNpc = wrapp(newNpc, function(o){oval.npc.append(o)})
    newNpc = wrapp(newNpc, oval.npc.append.bind(oval.npc))
    newOther = wrapp(oval.other.remove, newOther)
//    newOther = wrapp(newOther, function(o){oval.other.append(o)})
    newOther = wrapp(newOther, oval.other.append.bind(oval.other))
}
oval.start()

//--- config ---
oval.config = {}
oval.config.display = function()
{
    mAllert("config",2)
}
