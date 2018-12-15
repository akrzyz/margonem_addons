(function()
{

bindTo = function(elements, parent)
{
    for(var i in elements)
    {
        var parent_position = parent.position()
        var element_position = elements[i].position()
        parent.append(elements[i].css({left : element_position.left - parent_position.left, top : element_position.top - parent_position.top}))
    }
}

bindTo([$("#stats"), $("#base3"), $("#gold"), $("#exp1"), $("#exp2"), $("#life1"), $("#life2"), $("#premiumbut"), $("#logoutbut"), $('#leorn1'), $('#leorn2')], $("#panel"));
bindTo([$("#pvpmode"), $("#bchat"), $("#botloc"), $("#lagmeter")], $("#bottombar"));

var GAME_BOX = $("<div id='GAME_BOX'/>").css({display:"flex", height:"100vh"})
var CHAT = $("<div id='GAME_CHAT'/>").css({display:"flex", width:"300px", backgroundColor:"green"})
var GAME = $("<div id='GAME_BODY'/>").css({display:"flex", flex:1, backgroundColor:"blue"})
var PANEL = $("<div id='GAME_PANEL'/>").css({display:"flex", width:"300px", backgroundColor:"red"})
GAME_BOX.append(CHAT).append(GAME).append(PANEL).appendTo("body")

const GREEN_BG_URL = 'url("https://raw.githubusercontent.com/akrzyz/margonem_addons/master/green_background.png")'
const BORDER_SIZE = "6px"

let setChat = function()
{
    $("#GAME_CHAT").css({border:BORDER_SIZE +" double darkgoldenrod", background:GREEN_BG_URL})
    $("#chat")
    .removeAttr("style")
    .css({position:"relative", top:0, left:0, width:300, height:"100vh",
          margin:BORDER_SIZE,
          background:GREEN_BG_URL})
    .appendTo("#GAME_CHAT")
}

let setPanel = function()
{
    $("#GAME_PANEL").css({border:BORDER_SIZE +" double darkgoldenrod", background:GREEN_BG_URL})
    $("#panel").css({position:"relative","left":0}).appendTo("#GAME_PANEL")
}()

let setGame = function()
{
    const GAME_WIDTH = $("#GAME_BODY").width()
    const GAME_HEIGHT = $("#GAME_BODY").height()
    $("#centerbox2").toggle() //chowa dziwne ramki
    $("#centerbox").appendTo("#GAME_BODY").css({position:"relative", top:0, left:0, width:GAME_WIDTH, height:GAME_HEIGHT})
    $("#base").css({width:GAME_WIDTH, height:GAME_HEIGHT})
    $("#bottombar").css({position:"absolute", bottom:0, top:'unset'})
    map.resizeView(GAME_WIDTH,GAME_HEIGHT)

    showChat = function(){} //disable chat resize
    map.resizeView = function(){} //disable chat resize
}

g.loadQueue.push({fun:setChat,data:""})
g.loadQueue.push({fun:setGame,data:""})

})()

