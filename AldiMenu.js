/* Menu do innych dodatków */
if($('#AldiMenu').length < 1)
{
    //style css
    $('html > head').append($(
    "<style>\
        .AldiMenu {border:3px double #AA9950; background: url(/img/fr-window.jpg) repeat scroll 0 -30px transparent; color: #FFCA37; font-family:Verdana Arial sans-serif; font-size:100%;}\
        .AldiMenuHead {background: url(img/panel.png) repeat scroll -35px 0 transparent; border-bottom: 1px solid #AA9950;}\
        .AldiMenuItem {border-bottom:1px solid #AA9950;}\
    </style>"));
    
    //opcje z ciastek
	AlMenSettings = getCookie('AlMenVis');
    if(AlMenSettings == null ){AlMenSettings ='';}
	AlMenSettings = AlMenSettings.split('|');

    //szkielet menu
    var head = $("<tr id='AldiMenuHead' class='AldiMenuHead'>\
                    <th>\
                        <img align='left' src='/obrazki/itemy/ble/blo06.gif' width='20px' height='20px'>\
                        <span valign='center' id='AldiMenuHeadText'>Dodatki</span>\
                    </th>\
                 </tr>")
    .dblclick(function()
    {
        $('#AldiMenuHeadText, #AldiMenu .AldiMenuItem').toggle();
        AlMenSettings[0]=$('#AldiMenuHeadText').css('display');
        var data = new Date(); data.setTime(data.getTime()+30758400000);
        setCookie('AlMenVis', AlMenSettings.join("|"), data);
    })

	$("<table id='AldiMenu' class='AldiMenu'/>")    
    .append(head)
    .appendTo('body')
    .draggable()
    .css('position','absolute')
    .css('zIndex','400')
    .css('left',(AlMenSettings[2] == null ? "8px" : AlMenSettings[2]))
    .css('top',(AlMenSettings[1] == null ? "8px" : AlMenSettings[1]));   
    
    //hide what was hiden b4
    if(AlMenSettings[0] == 'none') {$("#AldiMenuHeadText").hide()}

    //przeciąganie
	$("#AldiMenu").bind("dragstop", function()
    {
        AlMenSettings[1]=$('#AldiMenu').css('top');
        AlMenSettings[2]=$('#AldiMenu').css('left');
        var data = new Date();
        data.setTime(data.getTime()+30758400000);
        setCookie('AlMenVis', AlMenSettings.join("|"), data);
    });	
    
    //dodawanie nowych elementów
    aldiMenuAdd = function(a)
    {
      	 var item = $("<tr/>")
         .addClass("AldiMenuItem")
         .append($("<th/>").append(a))
         .hover(function(){$(this).css('color','#FFFF99')},
                function(){$(this).css('color','#FFCA37')})
         if(AlMenSettings[0] == 'none'){item.hide();}
         $("#AldiMenu").append(item);         
    }
    
    //załadowanie elementów z innych dodatków
    if(typeof aldiMenu == "undefined")
    {
        aldiMenu={};
    }else
    {
        for(i in aldiMenu.list)
            aldiMenuAdd(aldiMenu.list[i]);
            delete aldiMenu.list;
    }
    aldiMenu.add = function(o){aldiMenuAdd(o);}
}

