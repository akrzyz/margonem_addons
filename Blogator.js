blogator = {}
blogator.timer = null;
blogator.isRunning = false;
blogator.blogo = function()
{
    for(var i in g.other)
    {
        if ( !isset(g.other[i].vip) && !isset(g.other[i].ble) && !(g.other[i].attr & 1) && !(g.other[i].attr & 2) && (Math.abs(hero.rx - g.other[i].x) <= 1 && Math.abs(hero.ry - g.other[i].y) <= 1) )
           _g("emo&a=bless&id="+i);
    }	
}
		
blogator.run = function()
{
    this.timer = setInterval(function(){blogator.blogo()}, 5000);
}

blogator.stop = function()
{
    if(this.timer)
        clearInterval(this.timer);
}

blogator.start = function()
{
    blogator.isRunning = getCookie('_blogator');
    blogator.isRunning = (blogator.isRunning ? eval(blogator.isRunning) : true);
  	if(blogator.isRunning)
      this.run()
    var menuStr = $('<div/>')
    .append($('<span>Błogator</span>'))
    .append($('<input type="checkbox" tip="automatyczne błogosławienie on/off"/>')
        .attr('checked',blogator.isRunning)
        .change(function()
            {
                blogator.isRunning = $(this).attr('checked');
                if(blogator.isRunning)
                    blogator.run();
                else
                    blogator.stop();
                data = new Date(); data.setTime(data.getTime()+3600000*24*31);
                setCookie("_blogator", blogator.isRunning, data);                
            }))
    $.getScript("http://addons2.margonem.pl/get/1/1689verified.js",function(){aldiMenu.add(menuStr)});
}

blogator.start();