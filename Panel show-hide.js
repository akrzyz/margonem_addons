/* 
 http://img413.imageshack.us/img413/7572/botompanel5.gif
 http://img266.imageshack.us/img266/395/chatpanel3.gif
http://img831.imageshack.us/img831/7219/paneltgico2.gif
http://img522.imageshack.us/img522/8900/paneltgico3.gif
zwijanie i rozwijanie panelu
*/
//dodatkowa grafika

/*******************************************/



$('<img src="http://img413.imageshack.us/img413/7572/botompanel5.gif" style="z-index:299; position: absolute; bottom: 0px; right: 14px;">').appendTo('#centerbox');
//guzik do togglowania
$('<div id="panelToggle" tip="panel toggle"></div>').css({background:"url('http://img405.imageshack.us/img405/9462/paneltgico4.gif') 13px 0",height:"19px",width:"13px",position:"absolute",bottom:"6px",right:"172px"}).css('z-index','300')
.appendTo('#centerbox')
.click(function(){panelToggle()})
.mouseover(function(){$(this).css('opacity','0.6')})
.mouseout(function(){$(this).css('opacity','1')});

var panelDir='-';
var mapSizeX = 512;
var chatImg = [$('#chat').css('background'),'url("http://img266.imageshack.us/img266/395/chatpanel3.gif") repeat scroll 0 0 transparent'];


panelToggle = function(){
	
	if(panelDir == '+'){panelDir='-'; mapSizeX=512;	}
	else{panelDir='+';	mapSizeX=786; }
	
	$('#stats').animate({"left": panelDir+"=300px"}, "slow");
	$('#panel').animate({"left": panelDir+"=300px"}, "slow");
	$('#base3').animate({"left": panelDir+"=300px"}, "slow");
	$('#gold').animate({"left": panelDir+"=300px"}, "slow");
	$('#exp1').animate({"left": panelDir+"=300px"}, "slow");
	$('#exp2').animate({"left": panelDir+"=300px"}, "slow");
	$('#life1').animate({"left": panelDir+"=300px"}, "slow");
	$('#life2').animate({"left": panelDir+"=300px"}, "slow");
	$('#leorn1').animate({"left": panelDir+"=274px"}, "slow").toggle();
	$('#leorn2').animate({"left": panelDir+"=274px"}, "slow").toggle();
	$('#corners img').slice(4,8).animate({"left": panelDir+"=274px"}, "slow");
	$('#corners img').slice(6,8).toggle();
	if(panelDir == '-')
	{		
		$('#chatscrollbar').animate({"left": (g.chat.state != 3) ? (panelDir+"=273px") : ("-=0px")}, "slow",function()
		{	
			map.resizeView(mapSizeX,512 - $("#chat").height()+4 ); 
			if(g.chat.state != 3)
			{$('#chat').css('width',mapSizeX+'px').css('background',chatImg[0]); }
			$('#dialog').width(mapSizeX);
			$('#dazed').width(mapSizeX);
			if($('#mailnotifier').html()!=''){$('#mailnotifier').css('top','485px').css('left','440px');}
			
		});
		$('#panelToggle').css('background-position','right top');
	}else
	{
		if(g.chat.state != 3)
		{
			$('#chatscrollbar').animate({"left": panelDir+"=273px"}, "slow");		
			$('#chat').css('width',mapSizeX+'px').css('background',chatImg[1]);
		}
		map.resizeView(mapSizeX,512 - $("#chat").height()+4 ); 		
		$('#panelToggle').css('background-position','left top');
		$('#dialog').width(mapSizeX);	
		$('#dazed').width(mapSizeX);
		if($('#mailnotifier').html()!=''){$('#mailnotifier').css('top','5px').css('left','730px');}
						
	}
	
	var data = new Date();
	data.setTime(data.getTime()+30758400000);
	setCookie('AlPanelTg',panelDir, data);
}

	//zapobieganie czarnemu paskowi na dole je¿eli jest zwinêty chat przy starcie.
	if($('#chat').css('display')=='none'){$('#chat').height(0);}
	//nie wiem po co to ale potrzebne :D
	if($('#chat').height()=='64'){$('#chat').height(0);}	
	//start z ciastek
	if( getCookie('AlPanelTg') == '+' ){panelDir='-'; panelToggle();}
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
