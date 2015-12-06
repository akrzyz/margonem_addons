function newOther(e)
{
    for(k in e)
    {
        if(isset(e[k].del))
        {
            if(isset(g.other[k])&&isset(g.other[k].pet))
            {
                g.other[k].pet.remove();
                delete g.other[k].pet
            }
            delete g.other[k];
            $("#other"+k).remove();
            $("#otherWanted"+k).remove();
            continue
        }
    var a=isset(e[k].pet) ? e[k].pet : null;
    if(isset(e[k].pet))
    {
        delete e[k].pet
    }
    if(!isset(g.other[k]))
    {
        g.other[k]=e[k];
        g.other[k].id=k;
        g.other[k].fw=32;
        g.other[k].fh=48;
        g.other[k].rx=e[k].x;
        g.other[k].ry=e[k].y;
        g.other[k].step=0;
        var b="t_other";
        if(e[k].relation!="")
        {
            b+=" t_"+e[k].relation
        }
        $("#base").append("<div class=other id=other"+k+' ctip="'+b+'"></div>');
        if(isset(e[k].wanted)&&parseInt(e[k].wanted)==1)
        {
            $("#base").append("<div class=otherWanted id=otherWanted"+k+"></div>")
        }
        $("#other"+k).click(function(l){var h=this.id.substr(5);if(h==g.playerCatcher.activePlayer){g.playerCatcher.startFollow();return}if(Math.abs(g.other[h].x-hero.x)>1||Math.abs(g.other[h].y-hero.y)>1){hero.mClick(l);return}var d=[];if(hero.x==g.other[h].x&&hero.y==g.other[h].y){if(_l()=="pl"){d.push([_t("take",null,"menu"),'_g("takeitem")'])}if(isset(g.gw[hero.x+"."+hero.y])){d.push([_t("go",null,"menu"),'_g("walk")'])}}var i=g.pvp?7:5;if(Math.abs(hero.x-g.other[h].x)<i&&Math.abs(hero.y-g.other[h].y)<i){d[3]=[_t("attack",null,"menu"),'_g("fight&a=attack&id='+h+'")']}if(Math.abs(hero.x-g.other[h].x)<2&&Math.abs(hero.y-g.other[h].y)<2){d[4]=[_t("trade",null,"menu"),"trade_start("+h+")"];if(hero.lvl>29){d[5]=[_t("kiss",null,"menu"),'_g("emo&a=kiss&id='+h+'")']}if(isset(hero.vip)&&!isset(g.other[h].vip)){d[6]=[_t("crimson_bless",null,"menu"),'_g("emo&a=bless&id='+h+'")']}var j=g.other[h].relation;var f=("wph").search(hero.prof)>=0?"wph":"mtb";if((!g.pvp||(g.pvp&&f.search(g.other[h].prof)>=0))&&(!(g.other[h].attr&4)||(j=="fr"||j=="cl"||j=="fr-fr"))&&(!g.party||g.party[hero.id].r)){d[7]=[_t("team_invite",null,"menu"),'_g("party&a=inv&id='+h+'")']}}if(d.length>0){showMenu(l,d)}})
    }
    else
    {
        for(var c in e[k])
        {
            g.other[k][c]=e[k][c]
        }
    }
    if(isset(e[k].lvl)&&(!isset(e[k].ble)&&isset(g.other[k].ble)))
    {
        delete (g.other[k].ble)
    }
    if(a)
    {
        if(isset(g.other[k].pet))
        {
            g.other[k].pet.update(a)
        }
        else
        {
            g.other[k].pet=new Pet(a,g.other[k]);
            g.other[k].pet.update(a,true)
        }
    }
    else
    {
        if(isset(e[k].nick)&&isset(g.other[k].pet))
        {
            g.other[k].pet.remove();
            delete g.other[k].pet
        }
    }
    if(!isset(g.tips.other))
    {
        g.tips.other=function(d)
        {
            var f="<b"+(isset(d.vip)?' style="color:#f63"':"")+">"
                +d.nick+"</b>";
            f+=isset(d.guest)&&d.guest?'<i style="color:#f1f1f1">'+_t("deputy")+"</i>":"";
            if(isset(d.wanted)&&parseInt(d.wanted)==1)
            {
                f+="<b class=wanted>"+_t("wanted_info",null,"pklist")+"</b>"
            }
            if(isset(d.ble))
            {
                f+='<b class="bless">'+d.ble+"</b>"
            }
            if(d.clan!="")
            {
                f+="["+d.clan+"]<br>"
            }
            if(d.lvl)
            {
                f+="Lvl: "+d.lvl+d.prof
            }
            if(d.rights)
            {
                var h=-1;
                if(d.rights&1)
                {
                    h=0
                }
                else
                {
                    if(d.rights&16)
                    {
                        h=1
                    }
                    else
                    {
                        if(d.rights&2)
                        {
                            h=2
                        }
                        else
                        {
                            if(d.rights&4)
                            {
                                h=4
                            }
                            else
                            {
                                h=3
                            }
                        }
                    }
                }
                f+="<i>"+g.names.ranks[h]+"</i>"
            }
            if(d.attr&1)
            {
                f+="<br><img src=img/mute.gif>"
            }
            if(d.attr&2)
            {
                f+=" <img src=img/warning.gif>"
            }
            return f
        }
    }
    if(isset(e[k].lvl))
    {
        $("#other"+k).attr("tip",g.tips.other(g.other[k]))
    }
    if(isset(e[k].icon))
    {
        if(e[k].icon.charAt(0)!="/")
        {
            e[k].icon="/"+e[k].icon
        }
        loadImg("postacie"+e[k].icon,k,function(){k=$(this).attr("dest");if(!isset(k)||!isset(g.other[k])){}else{g.other[k].fw=this.width/4;g.other[k].fh=this.height/4;$("#other"+k).css({backgroundImage:"url("+$(this).attr("src")+")",width:g.other[k].fw});moveOther(k);if(isset(g.checklist["other"+k])){g.checklist["other"+k](g.other[k])}}})
    }
    if(g.other[k].x-g.other[k].rx>2)
    {
        g.other[k].rx=g.other[k].x-2
    }
    if(g.other[k].y-g.other[k].ry>2)
        g.other[k].ry=g.other[k].y-2
    }
    if(g.other[k].x-g.other[k].rx<-2)
    {
        g.other[k].rx=g.other[k].x+2
    }
    if(g.other[k].y-g.other[k].ry<-2)
    {
        g.other[k].ry=g.other[k].y+2
    }
    moveOther(k)
}
