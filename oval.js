(function(){ //namespace

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
//bo nikt nie lubi dzielenia..
Oval.updateWithSize = function($source)
{
    var xOffset = parseInt(($source.width() - 38)/2)
    var yOffset = parseInt($source.height() - 16)
    this.css({left: parseInt($source.css("left")) + xOffset, top: parseInt($source.css("top")) + yOffset})
}

//--- oval ---
var oval = {}
//--- npc ---
oval.npc = {}
oval.npc.isEnabled = function()
{
    var opt = ['npc','monster','object']
    for(var i in opt)
        if(oval.config.options[opt[i]].display)
            return true
    return false
}
oval.npc.color = function(npc)
{
    if(npc.lvl)
    {
        if(npc.type == 2 || npc.type == 3)
            return oval.config.color('monster')
        return oval.config.color('npc')
    }
    return oval.config.color('object')
}
oval.npc.create = function(npc)
{
    var color = this.color(npc)
    return (color ? Oval.create(color) : null)
}
oval.npc.append = function(npcs)
{
    for(var i in npcs)
    {
        var $oval = this.create(npcs[i])
        if($oval)
        {
            var $npc = $("#npc"+i)
            npcs[i].$oval = $oval
            Oval.blure.call($oval, $npc)
            Oval.updateWithSize.call($oval, $npc)
        }
    }
}
oval.npc.remove = function(npcs)
{
    for(var i in npcs)
        if (g.npc[i] && g.npc[i].$oval)
            g.npc[i].$oval.remove()
}
oval.npc.run = function()
{
    if(this.isEnabled())
        newNpc = wrapp([this.remove, newNpc, this.append.bind(this)])
}
//--- other ---
oval.other = {}
oval.other.isEnabled = function()
{
    var opt = ['friend','enemy','clan','clan_fr','clan_en','other']
    for(var i in opt)
        if(oval.config.options[opt[i]].display)
            return true
    return false
}
oval.other.color = function(other)
{
    if('fr' == other.relation)
        return oval.config.color('friend')
    if('en' == other.relation)
        return oval.config.color('enemy')
    if('cl' == other.relation)
        return oval.config.color('clan')
    if(['cl-fr','fr-fr'].indexOf(other.relation) > -1)
        return oval.config.color('clan_fr')
    if(['cl-en','fr-en'].indexOf(other.relation) > -1)
        return oval.config.color('clan_en')
    return oval.config.color('other')
}
oval.other.create = function(other)
{
    var color = this.color(other)
    return (color ? Oval.create(color) : null)
}
oval.other.append = function(others)
{
    for(var i in others)
    {
        if(g.other[i] && !g.other[i].$oval)
        {
            var $oval = this.create(others[i])
            if($oval)
            {
                var $other = $("#other"+i)
                g.other[i].$oval = $oval
                Oval.blure.call($oval, $other)
                ObserverFactory.create($other,$oval)
            }
        }
    }
}
oval.other.remove = function(others)
{
    for(var i in others)
        if(others[i].del && g.other[i] && g.other[i].$oval)
             g.other[i].$oval.remove()
}
oval.other.run = function()
{
    if(this.isEnabled())
        newOther = wrapp([this.remove, newOther, this.append.bind(this)])
}
//--- item ---
oval.item = {}
oval.item.isEnabled = function()
{
    return oval.config.options['item'].display
}
oval.item.color = function()
{
    return oval.config.color('item')
}
oval.item.create = function(other)
{
    var color = this.color(other)
    return (color ? Oval.create(color) : null)
}
oval.item.append = function(items)
{
    for(var i in items)
    {
        if(g.item[i] && g.item[i].loc == "m" && !g.item[i].$oval)
        {
            var $oval = this.create(items[i])
            if($oval)
            {
                var $item = $("#item"+i)
                g.item[i].$oval = $oval
                Oval.blure.call($oval, $item)
                Oval.updateWithSize.call($oval, $item)
            }
        }
    }
}
oval.item.remove = function(items)
{
    for(var i in items)
        if(g.item[i] && g.item[i].loc != "a" && g.item[i].$oval)
             g.item[i].$oval.remove()
}
oval.item.run = function()
{
    if(this.isEnabled())
        newItem = wrapp([this.remove, newItem, this.append.bind(this)])
}
//--- hero ---
oval.hero = {}
oval.hero.isEnabled = function()
{
    return oval.config.options['hero'].display
}
oval.hero.color = function()
{
    return oval.config.color('hero')
}
oval.hero.create = function(hero)
{
    var color = this.color(hero)
    return (color ? Oval.create(color) : null)
}
oval.hero.append = function()
{
    var $oval = this.create(hero)
    if($oval)
    {
        var $hero = $("#hero")
        hero.$oval = $oval
        Oval.blure.call($oval, $hero)
        ObserverFactory.create($hero,$oval)
    }
}
oval.hero.run = function()
{
    if(this.isEnabled())
        this.append()
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
oval.config.options['other']   = {color:'#D3D3D3',display:true}  //LightGray
oval.config.options['item']    = {color:'#DA70D6',display:false} //Orchid

oval.config.color = function(option)
{
    var opt = this.options[option]
    return (opt && opt.display ? opt.color : null)
}

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
oval.config.run = function(){}
//--- start ---
var start = function()
{
    oval.config.load()
    for(var module in oval)
        oval[module].run()
    $("#pvpmode").dblclick(oval.config.display.bind(oval.config))
}
start()

})() //namespace
