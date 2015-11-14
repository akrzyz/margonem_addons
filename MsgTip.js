msgTips = {}
 
msgTips.start = function()
{  
  //style do tipów
  var style = $("<style>\
  .msgTipIner {margin: 3px}\
  .msgTipBase {background-color: white; border: 1px black solid; border-radius: 5px; width: 100px; color: black; font-size: 13px; opacity: 0.8; position: relative; left: -34px;}\
  .msgTipPriv {background-color: DarkGreen; border: 1px black solid; border-radius: 5px; width: 100px; color: Gold; font-size: 13px; opacity: 0.8; position: relative; left: -34px;}\
  .msgTipGroup {background-color: Purple; border: 1px black solid; border-radius: 5px; width: 100px; color: Gold; font-size: 13px; opacity: 0.8; position: relative; left: -34px;}\
  .msgTipClan {background-color: SaddleBrown ; border: 1px black solid; border-radius: 5px; width: 100px; color: Gold; font-size: 13px; opacity: 0.8; position: relative; left: -34px;}\
  .msgTipRelFr{color : DarkGreen;}\
  .msgTipRelCl{color : Chocolate;}\
  .msgTipRelEn{color : Red;}\
  </style>");
    $('html > head').append(style);
 
    //zwraca true jezeli mamy wyswietlic dymek na danym chacie
    msgTips.apply = function(i)
    {
        switch (i)
        {
            case 0: return this.setings[0];
            case 1: return this.setings[1];
            case 2: return this.setings[2];
            case 3: return this.setings[3];
            default: return false;
        } 
    }
 
	//apply do przychodzących wiadomości
	msgTips.display = function(ch)
	{    
        if( ! this.apply(ch.k) )
            return;     
        
        if(ch.n == hero.nick)
        {
            this.showTip(ch.t, this.getClass(ch.k, ""), "#hero");
            return;
        }

		for (var i in g.other)
		{
			if (g.other[i].nick == ch.n)
			{             
   			    this.showTip(ch.t, this.getClass(ch.k, g.other[i].relation), "#other"+i)
                return;
			}
		}
	}
    
	//pokazanie tipa
    msgTips.showTip = function(text, p_class, parent)
	{
        var tip = $("<div class='msgTipBase'><div class='msgTipIner'>"+text+"</div></div>");
        tip.addClass(p_class).appendTo(parent).css('top',-(parseInt(tip.height())+4)).delay(this.setings[4]).fadeOut(1000, function(){$(this).remove()});
        return tip;
	}
    
    //dodatkowa class'a dla tipa
    msgTips.getClass = function(i, rel)
    {
        switch (i)
        {
            case 1: return "msgTipClan";
            case 2: return "msgTipGroup";
            case 3: return "msgTipPriv";
            default: return "msgTipBase"+this.getRelClass(rel);
        }  
    }
    
    //kolorek textu na publicznym w zależnośi od relacji
    msgTips.getRelClass = function(rel)
    {
        switch (rel)
        {
            case "fr": return " msgTipRelFr";
            case "cl": return " msgTipRelCl";
            case "en": return " msgTipRelEn";
            default: return "";
        } 
    }

    //menu
    msgTips.showMenu = function()
    {
        mAlert(
        $('<table>\
            <tr><td><input type="checkbox" id="msgTipsO"/>Chat ogólny</td></tr>\
            <tr><td><input type="checkbox" id="msgTipsC"/>Chat klanowy</td></tr>\
            <tr><td><input type="checkbox" id="msgTipsG"/>Chat grupowy</td></tr>\
            <tr><td><input type="checkbox" id="msgTipsP"/>Chat prywatny</td></tr>\
            <tr><td>Czas wyświetlania dymku <input type="text" size="2" id="msgTipsTime"/> ms</td></tr>\
           </table>'),2,[function(){msgTips.save()},]);
        $("#msgTipsO").attr("checked",this.setings[0]);
        $("#msgTipsC").attr("checked",this.setings[1]);
        $("#msgTipsG").attr("checked",this.setings[2]);
        $("#msgTipsP").attr("checked",this.setings[3]);
        $("#msgTipsTime").attr("value",this.setings[4]);
    } 

    //zapis ustawien
    msgTips.save = function()
    {
        this.setings[0] = eval($("#msgTipsO").attr("checked"));
        this.setings[1] = eval($("#msgTipsC").attr("checked"));
        this.setings[2] = eval($("#msgTipsG").attr("checked"));
        this.setings[3] = eval($("#msgTipsP").attr("checked"));
        this.setings[4] = eval($("#msgTipsTime").attr("value"));      
        data = new Date(); data.setTime(data.getTime()+3600000*24*31);
		setCookie("msgTipsCookie", msgTips.setings.join("|"), data);
        message("zapisano ustawienia");
    }

    //wczytanie ustawien z ciastek
    msgTips.load = function()
    {
        var setings = getCookie('msgTipsCookie');
        setings = (setings ? setings : "true|true|true|true|3000");
        msgTips.setings = setings.split("|");
        for( i in msgTips.setings)
            msgTips.setings[i] = eval(msgTips.setings[i]);
    }     
    
    //start dodatku
    msgTips.load();
	g.chat.parsers.push(function(ch){ msgTips.display(ch);});
  
    //rejestracja w menu
    $.getScript("http://addons2.margonem.pl/get/1/1689public.js",function()
    {
        aldiMenu.add($("<span>Msg Tips</span>").click(function(){msgTips.showMenu();}))
    });
}
g.loadQueue.push({fun:msgTips.start,data:''})
