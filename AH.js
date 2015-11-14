/* AutoHeal by Aldi */
	function AutoHeal()
	{
		this.healPots = new Array();
		this.mix = '';
		this.treshold = 100;
		this.run = false;
		this.isMenu = false;
		this.menuStyle ="border:3px double #AA9950; background:#0D3D01; color:gold; margin: 2px 2px 2px 2px; z-index: 405; position: absolute;";
		this.myButStyle ="font-family:Verdana Arial sans-serif; font-size:100%;";
 
	//wyszukiwanie mixów i wkładaie ich naz do tablicy
		this.searchMix = function()
		{
			for(i in g.item)
			{
			//	if((g.item[i].stat.search('leczy')>=0) || (g.item[i].stat.search('fullheal')>=0))
			if(g.item[i].cl==16)	
			{
					if(this.healPots.indexOf(g.item[i].name)<0)
					{
						this.healPots.push(g.item[i].name)
					}
				}
			}
		}
	//lista do comboboxa	
		this.makeOptionsList = function()
		{
			var list='';
			for(i in this.healPots)
				list+='<option value="'+this.healPots[i]+'">'+this.healPots[i]+'</option>';	
			return list;	
		}
 
	//używanie mixa
		this.useMix = function()
		{
			if(hero.hp/hero.maxhp*100 < this.treshold) //próg użycia
			{
				for(var i in g.item)
				{
					if(g.item[i].name == this.mix && g.item[i].loc == 'g')
					{	
						$("#item" + i).dblclick();
                        setTimeout(function(){myAH.useMix()}, 300);
						return;	
					}
				}
				message('Auto Heal: koniec miksów');
			}

		}
	// f-cja do zapisyu ciastek 
		this.setMyCookie = function(cName,cVal)
		{		
			data = new Date(); data.setTime(data.getTime()+3600000*24*31);
			setCookie(cName, cVal, data);
		}	
	//tworzenie menue
		this.makeMenu = function()
		{		
			this.searchMix();
			$('<table id="AHmenu" style="'+this.menuStyle+'">\
                    <tr style="border:1px solid #AA9950;">\
                        <td><center><b>Auto Heal menu:</b></td>\
                    </tr>\
                    <tr style="border:1px solid #AA9950;">\
                        <td>próg użycia HP poniżej:<input type="text" id="AHtresh" size="1" maxlength="3" value="'+this.treshold+'"/>%</td>\
                    </tr>\
                    <tr style="border:1px solid #AA9950;">\
                        <td></center>Mix: <span id="AHmixName" style="font-weight: bold;">'+this.mix+'</span><br><select id="AHmixList">'+this.makeOptionsList()+'</option></select></td>\
                    </tr>\
                    <tr style="border:1px solid #AA9950;">\
                        <td><center><span id="AHSaveSetings"><b>Zapisz</b></span></center></td>\
                    </tr>\
               </table>').appendTo('body').draggable().absCenter().hide();
			$('#AHmixList').change(function()
			{
				$('#AHmixName').html($('#AHmixList').attr('value')); 				
            });
            $('#AHSaveSetings').click(function()
			{
                myAH.mix=$('#AHmixName').html(); 
				myAH.treshold=$('#AHtresh').attr('value')*1; 
				myAH.saveCookie();
				$('#AHmenu').hide(); 
				message('AutoHeal: zapisano miksture');
            });
		}
	//tworzenie buttona
		this.makeAHbutton = function()
		{
            var strToAldiMenu=$("<div/>")           
            .append($('<span id="AHbuttonText"><b>AutoHeal</b></span>').click(function(){if(!myAH.isMenu){myAH.makeMenu()} myAH.isMenu=true; $('#AHmenu').toggle()}))            
            .append($('<input type="checkbox" id="AHrun" tip="AH on/off"/>').attr('checked',myAH.run).change(function(){myAH.run=$('#AHrun').attr('checked'); myAH.saveCookie(); }));

            //rejestracja w menu        		                                 
            $.getScript("http://addons2.margonem.pl/get/1/1689public.js",function(){aldiMenu.add(strToAldiMenu)});
	
			$("#battleclose").click(function(){if(myAH.run){myAH.useMix();}});
		}
	//load cookie
		this.loadCookie = function()
		{
			try{
					tmp=getCookie('AHcookie');
					tmp=tmp.split('|');
					if(tmp[0]){this.run=eval(tmp[0])==true;}
					if(tmp[1]){this.mix=tmp[1];}
					else{this.mix='';}
					if(tmp[2]){this.treshold=tmp[2]*1;}
					else{this.treshold=100;}
			}catch(e){}
		}		
	//save cookie
		this.saveCookie = function()
		{
 
			cookieVal = ''+myAH.run+'|'+myAH.mix+'|'+myAH.treshold;
			myAH.setMyCookie('AHcookie',cookieVal)	
 
		}		
	//start
		this.start = function()
		{
			this.loadCookie();
			this.makeAHbutton();
		}	
	}//AutoHeal:~~	
	myAH=new AutoHeal();
	myAH.start();