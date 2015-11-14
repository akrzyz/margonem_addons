var isAFCrunning = getCookie('isAFCrunning');
isAFCrunning = (isAFCrunning ? isAFCrunning : "true|true");
isAFCrunning = isAFCrunning.split("|") ;
isAFCrunning = (isAFCrunning.length == 2 ? isAFCrunning : [true, true]);
for(i in isAFCrunning)
	isAFCrunning[i] = eval(isAFCrunning[i]);

{
var menuStr = $('<div/>')
    .append($('<span tip="automatyczne zamykanie walki">AFC</span>'))
    .append($('<input type="checkbox" tip="zamykanie on/off"/>')
        .attr('checked',isAFCrunning[0])
        .change(function()
            {
                isAFCrunning[0] = $(this).attr('checked');
                data = new Date(); data.setTime(data.getTime()+3600000*24*31);
                setCookie("isAFCrunning", isAFCrunning.join("|"), data);
            }))
	.append($('<input type="checkbox" tip="zbieranie lotu on/off"/>')
        .attr('checked', isAFCrunning[1])
        .change(function()
            {
                isAFCrunning[1] = $(this).attr('checked');
                data = new Date(); data.setTime(data.getTime()+3600000*24*31);
                setCookie("isAFCrunning", isAFCrunning.join("|"), data);
            }))

//rejestracja w menu
$.getScript("http://addons2.margonem.pl/get/1/1689verified.js",function(){aldiMenu.add(menuStr)});                        
}

var tmpBattleMsg = battleMsg;
battleMsg = function(c,t)
{
  var ret = tmpBattleMsg(c,t);
  if ((isAFCrunning[0] || isAFCrunning[1]) && c.search(/winner=/) >= 0)
  {
    if(isAFCrunning[0])
    	$("#battleclose").click();
    if(isAFCrunning[1])
    	$("#loots_button").click();
  }
  return ret;
}