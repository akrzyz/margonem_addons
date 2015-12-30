/**
  Colicion menager. To start type in console colision_mgr.start() to finish colision_mgr.stop()
**/

String.prototype.replaceAt = function(index, character)
{
    return this.substr(0, index) + character + this.substr(index+character.length);
}

colision_mgr = {}

colision_mgr.display_colision_at = function(x,y)
{
    $('<div id="col-'+x+'-'+y+'"></div>').css({backgroundColor:"red",opacity:"0.4",height:"32px",width:"32px",position:"absolute",top:""+32*y+"px",left:""+32*x+"px"})
    .appendTo('#ground')
}

colision_mgr.show_colisions = function()
{
    for(var x = 0; x < map.x; x++)
    {
        for(var y = 0; y < map.y; y++)
        {
            if(map.col[y*map.x + x] == "1")
            {
                this.display_colision_at(x,y);
            }
        }
    }
}

colision_mgr.start = function()
{
    this.oldMClick = hero.mClick;	
    hero.mClick = function (j)
    {
        var k = $("#ground").offset();
        var x = (j.clientX - k.left) >> 5,
            y = (j.clientY - k.top) >> 5;
        message("add colision at:" + x + "," + y);
        colision_mgr.add_colision(x,y);
        colision_mgr.display_colision_at(x,y);
    };
}

colision_mgr.add_colision = function(x,y)
{
    map.col = map.col.replaceAt(y*map.x + x, "1");
}

colision_mgr.stop = function ()
{
    hero.mClick = this.oldMClick;
}

colision_mgr.add_water = function(x,y,depth)
{
    map.water[x+256*y]=depth;
}

{
var menu_str = $("<div>")
    .append($("<div tip='show colisions'>show</div>").click(colision_mgr.show_colisions.bind(colision_mgr)))
    .append($("<div>start<div>").click(colision_mgr.start.bind(colision_mgr)))
    .append($("<div>stop<div>").click(colision_mgr.stop.bind(colision_mgr)))
//rejestracja w menu
$.getScript("http://addons2.margonem.pl/get/1/1689verified.js",function(){aldiMenu.add(menu_str)});                        
}

