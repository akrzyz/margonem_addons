$('<img src="http://img413.imageshack.us/img413/7572/botompanel5.gif" style="z-index:299; position: absolute; bottom: 0px; right: 14px;">').appendTo('#centerbox')
//guzik do togglowania
$('<div id="panelToggle" tip="panel toggle"></div>').css({background:"url('http://img405.imageshack.us/img405/9462/paneltgico4.gif') 13px 0",height:"19px",width:"13px",position:"absolute",bottom:"6px",right:"172px"}).css('z-index','300')
.appendTo('#centerbox')
.click(function(){panelToggle()})
.mouseover(function(){$(this).css('opacity','0.6')})
.mouseout(function(){$(this).css('opacity','1')})

var panelDir='-'
var mapSizeX = 512
var chatImg = [$('#chat').css('background'),'url("http://img266.imageshack.us/img266/395/chatpanel3.gif") repeat scroll 0 0 transparent']

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

(function()
{
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
}

g.loadQueue.push({fun:setChat,data:""})
g.loadQueue.push({fun:setGame,data:""})
})()

panelToggle = function(){

	if(panelDir == '+'){panelDir='-'; mapSizeX=512;	}
	else{panelDir='+';	mapSizeX=786; }

	$('#panel').animate({"left": panelDir+"=300px"}, "slow")
//	$('#leorn1').animate({"left": panelDir+"=274px"}, "slow").toggle()
//	$('#leorn2').animate({"left": panelDir+"=274px"}, "slow").toggle()
	$('#corners img').slice(4,8).animate({"left": panelDir+"=274px"}, "slow")
//	$('#corners img').slice(6,8).animate({"left": panelDir+"=274px"}, "slow")

	if(panelDir == '-')
	{
		$('#chatscrollbar').animate({"left": (g.chat.state != 3) ? (panelDir+"=273px") : ("-=0px")}, "slow",function()
		{
			map.resizeView(mapSizeX,512 - $("#chat").height()+4 )
			if(g.chat.state != 3)
			{$('#chat').css('width',mapSizeX+'px').css('background',chatImg[0]); }
			$('#dialog').width(mapSizeX)
			$('#dazed').width(mapSizeX)
			if($('#mailnotifier').html()!=''){$('#mailnotifier').css('top','485px').css('left','440px');}

		})
		$('#panelToggle').css('background-position','right top')
	}else
	{
		if(g.chat.state != 3)
		{
			$('#chatscrollbar').animate({"left": panelDir+"=273px"}, "slow")
			$('#chat').css('width',mapSizeX+'px').css('background',chatImg[1])
		}
		map.resizeView(mapSizeX,512 - $("#chat").height()+4 )
		$('#panelToggle').css('background-position','left top')
		$('#dialog').width(mapSizeX)
		$('#dazed').width(mapSizeX)
		if($('#mailnotifier').html()!=''){$('#mailnotifier').css('top','5px').css('left','730px');}

	}

	localStorage.panelDirection = panelDir
}

	//zapobieganie czarnemu paskowi na dole je�eli jest zwin�ty chat przy starcie.
	if($('#chat').css('display')=='none'){$('#chat').height(0);}
	//nie wiem po co to ale potrzebne :D
	if($('#chat').height()=='64'){$('#chat').height(0);}
	//start z ciastek
	if( localStorage.panelDirection == '+' ){panelDir='-'; panelToggle();}
/************************************************************************************/
showChat=function(a) {
    if (a == 3 && $(window).width() < 1068) {
        return showChat(0);
    }
    switch (parseInt(a)) {
    case 1:
        $("#chat").height(90).show();
        if (window.opera) {
            $("#chattxt").height(68);
        }
        $("#youtube").height(425);
        chatScroll(-1);
        $("#mailnotifier").fadeTo(100, 0.5);
        $("#chatMoveHandler").css({
            display: "block"
        });
        break;
    case 2:
        $("#chat").height(160).show();
        if (window.opera) {
            $("#chattxt").height(138);
        }
        $("#youtube").height(355);
        chatScroll(-1);
        $("#mailnotifier").fadeTo(100, 0.5);
        $("#chatMoveHandler").css({
            display: "block"
        });
        if (getCookie("battleLogSize") == "big") {
            toggleBattleLog();
        }
        break;
    case 3:
		$('#chat').css('background',chatImg[0]);
        makeChatLeft();
        $("#mailnotifier").fadeTo(100, 1);
        break;
	case 4:
		$("#chat").height(320).show();
		$("#chatMoveHandler").css({
            display: "block"
        });
		if(mapSizeX == 512)
			$("#chat").css( {background:'url("http://img17.imageshack.us/img17/6879/chatpanel2.png") repeat scroll 0 0 transparent'} );
		break;
	case 5:
		$("#chat").height(480).show();
		$("#chatMoveHandler").css({
            display: "block"
        });
		if(mapSizeX == 512)
			$("#chat").css( {background:'url("http://img17.imageshack.us/img17/6879/chatpanel2.png") repeat scroll 0 0 transparent'} );
		break;
    case 0:
		makeChatRight();
		if(mapSizeX == 512)
		{
			map.resizeView(mapSizeX,512 - $("#chat").height()+4 );
		}else
		{
			$('#chatscrollbar').animate({"left": panelDir+"=273px"}, "fast");
			$('#chat').css('width',mapSizeX+'px').css('background',chatImg[1]);
		}
        $("#chat").hide().height(0);
        $("#mailnotifier").fadeTo(100, 1);
        $("#youtube").height(512);
        break;
    default:
        ;
    }
	var mapSizeY=[512,425,355,512,195,35];
    g.chat.state = a;
    setCookie("cy", a);
    map.resizeView(mapSizeX,mapSizeY[a]);
    reCenter();
}

toggleChat = function() {
    g.chat.state++;
    if (g.chat.state >= 4) {
        g.chat.state = 0;
    }
	/*
	if(g.chat.state==4){g.chat.state=0;}
	else if(g.chat.state==3){g.chat.state=4;}
	else if(g.chat.state==6){g.chat.state=3;}
	*/
    showChat(g.chat.state);

}


/*******************************************/
npcTalk = function (e) {
    g.stop = true;
    if (!g.talk.id) {
        if (parseInt(e[0]) == 4) {
            return;
        }
        $("#dialog").show();
        map.resizeView(mapSizeX, 256);
    }
    var c = "",
        f = "";
    for (var a = 0; a < e.length; a += 3) {
        e[a] = parseInt(e[a]);
        if (!e[a]) {
            g.talk.name = e[a + 1];
            g.talk.id = e[a + 2];
            g.talk.type = 1;
            if (isset(g.npc[g.talk.id])) {
                g.talk.type = g.npc[g.talk.id].type;
            }
            continue;
        }
        if (e[a] == 4) {
            $("#dialog").fadeOut("fast");
            map.resizeView(mapSizeX,512 - $("#chat").height()+3);
            g.talk.id = 0;
            g.stop = false;
            return;
        }
        e[a + 1] = e[a + 1].split("~").join(",").split("[NICK]").join(hero.nick);
        if (e[a] & 1) {
            var b = "Zako\u0144cz rozmow\u0119";
            if (g.talk.type == 4 || g.talk.type == 5) {
                b = "Koniec";
            }
            c += "<h4><b>" + g.talk.name + ":</b> " + e[a + 1] + "</h4>";
            if (e[a] & 4) {
                f += "<li onclick=\"_g('talk&id=" + g.talk.id + "&c=" + e[a + 2] + "')\" class=\"endtalk2\">" + b + "</li>";
            } else {
                if (e[a + 2]) {
                    f += "<li onclick=\"_g('talk&id=" + g.talk.id + "&c=" + e[a + 2] + "')\">dalej</li>";
                }
            }
        }
        if (e[a] & 2) {
            f += "<li onclick=\"_g('talk&id=" + g.talk.id + "&c=" + e[a + 2] + "')\"" + (e[a] & 4 ? " class=endtalk" : "") + (e[a] & 4 ? " class=shoptalk" : "") + ">" + e[a + 1] + "</li>";
        }
    }
    $("#dlgin").html(c + f);
}
