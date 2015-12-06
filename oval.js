var wrapp = function(functions)
{
    return function()
    {
        for(var i in functions)
            functions[i].apply(this,arguments)
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
    if(npc.lvl)
    {
        if(npc.type == 2 || npc.type == 3)
            return oval.config.options['monster'].color
        return oval.config.options['npc'].color
    }
    return oval.config.options['object'].color
}
oval.npc.create = function(npc)
{
    return Oval.create(this.color(npc))
}
oval.npc.append = function(npcs)
{
    for(var i in npcs)
    {
        var $npc = $("#npc"+i)
        var $oval = this.create(npcs[i])
        npcs[i].$oval = $oval
        Oval.blure.call($oval, $npc)
        Oval.update.call($oval, $npc)
    }
}
oval.npc.remove = function(npcs)
{
    for(var i in npcs)
        if (g.npc[i] && g.npc[i].$oval)
            g.npc[i].$oval.remove()
}

//--- other ---
oval.other = {}
oval.other.color = function(other)
{
    if('fr' == other.relation)
        return oval.config.options['friend'].color
    if('en' == other.relation)
        return oval.config.options['enemy'].color
    if('cl' == other.relation)
        return oval.config.options['clan'].color
    if(['cl-fr','fr-fr'].indexOf(other.relation) > -1)
        return oval.config.options['clan_fr'].color
    if(['cl-en','fr-en'].indexOf(other.relation) > -1)
        return oval.config.options['clan_en'].color
    return oval.config.options['other'].color
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
oval.hero.color = function()
{
    return oval.config.options['hero'].color
}
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

//--- config ---
oval.config = {}

oval.config.options = {}
oval.config.options['hero']    = {color:'#00FF00',display:true}  //Lime
oval.config.options['npc']     = {color:'#00BFFF',display:true}  //DeepSkyBlue
oval.config.options['monster'] = {color:'#FF0000',display:true}  //Red
oval.config.options['object']  = {color:'#808080',display:false} //Gray
oval.config.options['friend']  = {color:'#32CD32',display:true}  //LimeGreen
oval.config.options['enemy']   = {color:'#FF0000',display:true}  //Red
oval.config.options['clan']    = {color:'#FFD700',display:true}  //Gold
oval.config.options['clan_fr'] = {color:'#B8860B',display:true}  //DarkGoldenRod
oval.config.options['clan_en'] = {color:'#B22222',display:true}  //FireBrick
oval.config.options['other']   = {color:'#D3D3D3',display:true}  //lightgray

oval.config.display = function()
{
    var $display = $("<div id='OvalConfig'>")
    for(var i in this.options)
    {
        $display.append(this.createRaw(i,this.options[i]))
    }
    $display.append(this.createResetButton())
    mAlert($display,2,[this.store.bind(this)])
}
//--- config create ---
oval.config.createRaw = function(name,opt)
{
    return $("<div>")
    .append(this.createCb(name, opt.display))
    .append(this.createColorPicker(name, opt.color))
    .append(String(name))
}
oval.config.createColorPicker = function(name,value)
{
    return $("<input>",{'type':"color", 'name':name, 'value':value})
}
oval.config.createCb = function(name,checked)
{
    return $("<input>",{'type':"checkbox", 'name':name, 'checked':checked})
}
oval.config.createResetButton = function()
{
    return $("<input>",{'type':'button', 'name':'reset', 'value' : 'reset'})
    .click(oval.config.reset.bind(this))
}
//--- config store ---
oval.config.store = function()
{
    this.storeCb()
    this.storeColors()
    this.save()
    message("saved")
}
oval.config.storeCb = function()
{
    var opt = this.options
    $("#OvalConfig").find('input[type="checkbox"]').each(function(){
        var name = $(this).attr('name')
        var checked = $(this).is(':checked')
        opt[name].display = checked
    });
}
oval.config.storeColors = function()
{
    var opt = this.options
    $("#OvalConfig").find('input[type="color"]').each(function(){
        var name = $(this).attr('name')
        var color = $(this).attr('value')
        opt[name].color = color
    });
}
//--- config save & load ---
oval.config.save = function()
{
    if(typeof localStorage != 'undefined')
        localStorage.oval_options = JSON.stringify(this.options)
}

oval.config.load = function()
{
    if(typeof localStorage != 'undefined' && localStorage.oval_options)
        this.options = JSON.parse(localStorage.oval_options)
}

oval.config.reset = function()
{
    if(typeof localStorage != 'undefined' && localStorage.oval_options)
        delete localStorage.oval_options
}
//--- start ---
oval.start = function()
{
    oval.config.load()
    oval.hero.append()
    newNpc = wrapp([oval.npc.remove, newNpc, oval.npc.append.bind(oval.npc)])
    newOther = wrapp([oval.other.remove, newOther, oval.other.append.bind(oval.other)])
}
oval.start()

