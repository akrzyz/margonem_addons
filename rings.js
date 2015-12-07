(function(){ //namespace

var wrapp = function(functions)
{
    return function()
    {
        for(var i in functions)
            functions[i].apply(this,arguments)
    }
}

//--- Ring ---
var Ring = {}
Ring.create = function(color)
{
    return $('<svg height="26" width="38"><ellipse id="_elipse" cx="19" cy="13" rx="18" ry="12" style="fill-opacity: 0.2; stroke: '+color+'; stroke-opacity: 0.5;" /></svg>')
    .css({position:"absolute", pointerEvents: 'none'})
    .appendTo("#base")
}
Ring.blure = function($source)
{
    $source
    .mouseenter(function(){this.children().css({fillOpacity : 0.5, strokeOpacity : 1.0})}.bind(this))
    .mouseleave(function(){this.children().css({fillOpacity : 0.2, strokeOpacity : 0.5})}.bind(this))
}
Ring.update = function($source)
{
    this.css({left: parseInt($source.css("left")) - 3, top: parseInt($source.css("top")) + 32})

}
//bo nikt nie lubi dzielenia..
Ring.updateWithSize = function($source)
{
    var xOffset = parseInt(($source.width() - 38)/2)
    var yOffset = parseInt($source.height() - 16)
    this.css({left: parseInt($source.css("left")) + xOffset, top: parseInt($source.css("top")) + yOffset})
}

//--- rings ---
var rings = {}
//--- npc ---
rings.npc = {}
rings.npc.isEnabled = function()
{
    var opt = ['npc','monster','object']
    for(var i in opt)
        if(rings.config.options[opt[i]].display)
            return true
    return false
}
rings.npc.color = function(npc)
{
    if(npc.lvl)
    {
        if(npc.type == 2 || npc.type == 3)
            return rings.config.color('monster')
        return rings.config.color('npc')
    }
    return rings.config.color('object')
}
rings.npc.create = function(npc)
{
    var color = this.color(npc)
    return (color ? Ring.create(color) : null)
}
rings.npc.append = function(npcs)
{
    for(var i in npcs)
    {
        var $ring = this.create(npcs[i])
        if($ring)
        {
            var $npc = $("#npc"+i)
            npcs[i].$ring = $ring
            Ring.blure.call($ring, $npc)
            Ring.updateWithSize.call($ring, $npc)
        }
    }
}
rings.npc.remove = function(npcs)
{
    for(var i in npcs)
        if (g.npc[i] && g.npc[i].$ring)
            g.npc[i].$ring.remove()
}
rings.npc.run = function()
{
    if(this.isEnabled())
        newNpc = wrapp([this.remove, newNpc, this.append.bind(this)])
}
//--- other ---
rings.other = {}
rings.other.isEnabled = function()
{
    var opt = ['friend','enemy','clan','clan_fr','clan_en','other']
    for(var i in opt)
        if(rings.config.options[opt[i]].display)
            return true
    return false
}
rings.other.color = function(other)
{
    if('fr' == other.relation)
        return rings.config.color('friend')
    if('en' == other.relation)
        return rings.config.color('enemy')
    if('cl' == other.relation)
        return rings.config.color('clan')
    if(['cl-fr','fr-fr'].indexOf(other.relation) > -1)
        return rings.config.color('clan_fr')
    if(['cl-en','fr-en'].indexOf(other.relation) > -1)
        return rings.config.color('clan_en')
    return rings.config.color('other')
}
rings.other.create = function(other)
{
    var color = this.color(other)
    return (color ? Ring.create(color) : null)
}
rings.other.append = function(others)
{
    for(var i in others)
    {
        if(g.other[i] && !g.other[i].$ring)
        {
            var $ring = this.create(others[i])
            if($ring)
            {
                var $other = $("#other"+i)
                g.other[i].$ring = $ring
                Ring.blure.call($ring, $other)
                ObserverFactory.create($other,$ring)
            }
        }
    }
}
rings.other.remove = function(others)
{
    for(var i in others)
        if(others[i].del && g.other[i] && g.other[i].$ring)
             g.other[i].$ring.remove()
}
rings.other.run = function()
{
    if(this.isEnabled())
        newOther = wrapp([this.remove, newOther, this.append.bind(this)])
}
//--- item ---
rings.item = {}
rings.item.isEnabled = function()
{
    return rings.config.options['item'].display
}
rings.item.color = function()
{
    return rings.config.color('item')
}
rings.item.create = function(other)
{
    var color = this.color(other)
    return (color ? Ring.create(color) : null)
}
rings.item.append = function(items)
{
    for(var i in items)
    {
        if(g.item[i] && g.item[i].loc == "m" && !g.item[i].$ring)
        {
            var $ring = this.create(items[i])
            if($ring)
            {
                var $item = $("#item"+i)
                g.item[i].$ring = $ring
                Ring.blure.call($ring, $item)
                Ring.updateWithSize.call($ring, $item)
            }
        }
    }
}
rings.item.remove = function(items)
{
    for(var i in items)
        if(g.item[i] && g.item[i].loc != "a" && g.item[i].$ring)
             g.item[i].$ring.remove()
}
rings.item.run = function()
{
    if(this.isEnabled())
        newItem = wrapp([this.remove, newItem, this.append.bind(this)])
}
//--- hero ---
rings.hero = {}
rings.hero.isEnabled = function()
{
    return rings.config.options['hero'].display
}
rings.hero.color = function()
{
    return rings.config.color('hero')
}
rings.hero.create = function(hero)
{
    var color = this.color(hero)
    return (color ? Ring.create(color) : null)
}
rings.hero.append = function()
{
    var $ring = this.create(hero)
    if($ring)
    {
        var $hero = $("#hero")
        hero.$ring = $ring
        Ring.blure.call($ring, $hero)
        ObserverFactory.create($hero,$ring)
    }
}
rings.hero.run = function()
{
    if(this.isEnabled())
        this.append()
}
//--- observers ---
var ObserverFactory = {}
ObserverFactory.config = {attributes: true, attributeFilter:['style']}
ObserverFactory.create = function($source,$dest)
{
    return this.create2($source, Ring.update.bind($dest, $source))
}
ObserverFactory.create2 = function($subject, update)
{
    var observer = new MutationObserver(update)
    observer.observe($subject.get(0),this.config)
    return observer
}

//--- config ---
rings.config = {}

rings.config.options = {}
rings.config.options['hero']    = {color:'#00FF00',display:true}  //Lime
rings.config.options['npc']     = {color:'#00BFFF',display:true}  //DeepSkyBlue
rings.config.options['monster'] = {color:'#FF0000',display:true}  //Red
rings.config.options['object']  = {color:'#808080',display:false} //Gray
rings.config.options['friend']  = {color:'#32CD32',display:true}  //LimeGreen
rings.config.options['enemy']   = {color:'#FF0000',display:true}  //Red
rings.config.options['clan']    = {color:'#FFD700',display:true}  //Gold
rings.config.options['clan_fr'] = {color:'#B8860B',display:true}  //DarkGoldenRod
rings.config.options['clan_en'] = {color:'#B22222',display:true}  //FireBrick
rings.config.options['other']   = {color:'#D3D3D3',display:true}  //LightGray
rings.config.options['item']    = {color:'#DA70D6',display:false} //Orchid

rings.config.color = function(option)
{
    var opt = this.options[option]
    return (opt && opt.display ? opt.color : null)
}

rings.config.display = function()
{
    var $display = $("<div id='RingConfig'>")
    for(var i in this.options)
    {
        $display.append(this.createRaw(i,this.options[i]))
    }
    $display.append(this.createResetButton())
    mAlert($display,2,[this.store.bind(this)])
}
//--- config create ---
rings.config.createRaw = function(name,opt)
{
    return $("<div>")
    .append(this.createCb(name, opt.display))
    .append(this.createColorPicker(name, opt.color))
    .append(String(name))
}
rings.config.createColorPicker = function(name,value)
{
    return $("<input>",{'type':"color", 'name':name, 'value':value})
}
rings.config.createCb = function(name,checked)
{
    return $("<input>",{'type':"checkbox", 'name':name, 'checked':checked})
}
rings.config.createResetButton = function()
{
    return $("<input>",{'type':'button', 'name':'reset', 'value' : 'reset'})
    .click(rings.config.reset.bind(this))
}
//--- config store ---
rings.config.store = function()
{
    this.storeCb()
    this.storeColors()
    this.save()
    message("saved")
}
rings.config.storeCb = function()
{
    var opt = this.options
    $("#RingConfig").find('input[type="checkbox"]').each(function(){
        var name = $(this).attr('name')
        var checked = $(this).is(':checked')
        opt[name].display = checked
    });
}
rings.config.storeColors = function()
{
    var opt = this.options
    $("#RingConfig").find('input[type="color"]').each(function(){
        var name = $(this).attr('name')
        var color = $(this).attr('value')
        opt[name].color = color
    });
}
//--- config save & load ---
rings.config.save = function()
{
    if(typeof localStorage != 'undefined')
        localStorage.rings_options = JSON.stringify(this.options)
}

rings.config.load = function()
{
    if(typeof localStorage != 'undefined' && localStorage.rings_options)
        this.options = JSON.parse(localStorage.rings_options)
}

rings.config.reset = function()
{
    if(typeof localStorage != 'undefined' && localStorage.rings_options)
        delete localStorage.rings_options
}
rings.config.run = function(){}
//--- start ---
var start = function()
{
    rings.config.load()
    for(var module in rings)
        rings[module].run()
    $("#pvpmode").dblclick(rings.config.display.bind(rings.config))
}
start()

})() //namespace

