/*outfitTester 1.2 */	
$.getScript('http://addons.margonem.pl/get/55.js',function()
{
	$('<tr style="border-bottom:1px solid #AA9950; display:block;"><td style="display:block;"><b><center><span id="dupa" tip="kliknij by zmieniæ outfit" style="font-family:Verdana Arial sans-serif; font-size:100%;">Outfit</span></center></b></td></tr>').click(function(){outFun()}).appendTo('#AlMen2');
	outFun = function()	{
		var a=$("#inpchat").val();		
			a=a.trim();
			if((a.substring(0,4)!='http')&&(a!=''))
			{
			 a='file:///'+a;
			 a=a.replace(/ /g, "%20");
					 a=a.replace(/\\/g,'/');
			}
			$("#hero").css({background: 'url('+a+')'})
			$("#inpchat").val('');
		}		
});