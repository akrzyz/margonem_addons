/* hero.tip */
heroTipFunction=function()
{
	var tip = "<b><font color='white'>" + hero.nick + "</font></b>";
    tip += hero.clan ? "<center>[" + hero.clan.name + "]</center>" : ""
    tip += "<div ALIGN=CENTER>Lvl: " + hero.lvl + hero.prof+"</div>";

	if (hero.uprawnienia )
	{
        var d = -1;
        if (hero.uprawnienia & 1) {d = 0;}
		else { if (hero.uprawnienia & 16) {d = 1;}
		else { if (hero.uprawnienia & 2) {d = 2;}
		else { d = 3;}
             }
             }
		tip += "<i><font color='red'>" + g.names.ranks[d] + "</font></i>"
    }

    return tip
}
zmienOpis=function(){
$("#hero").attr('tip',heroTipFunction());
}
g.loadQueue.push({fun:zmienOpis,data:''})
