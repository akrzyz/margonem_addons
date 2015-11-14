	/** skróty klawiszowe by Aldi **/
	/**obiekt MHK - Margonem Hot Keys */
	function MHK()
	{
	/** POLA **/
		this.optionTextArr = [' Mapa: ',' Zamknij walke: ',' Chat: ',' Toggle chat: ',' Przejdź: ',' Podnieś: ',' Weź loot: ','Zam. walke i weź loot',' Walka szybka: ',' Walka turowa: ',"Toggle Skills: "];	
		this.optionsN = this.optionTextArr.length;
		this.shortKeysCode=new Array();
		this.menuStyle ="border:3px double #AA9950; background:#0D3D01; color:gold; margin: 2px 2px 2px 2px; z-index: 400; position: absolute;";
		this.optionStyle="border:1px solid #AA9950;";	
		this.myButStyle ="font-family:Verdana Arial sans-serif; font-size:100%;";	
		this.menuMade = false;
		this.menuFuncArr=new Array();
		MHTcanAttack=true;
	/** METODY **/	


		
		this.codeToLowerCase = function(q)
		{
			if((q>64) && (q<91)){q+=32;}
			return q*1;
		}
	/** sprawdzanie klawisz i odpalanie jego f-cji **/
		this.KeyAction = function(keyP)
		{
			keyP=this.codeToLowerCase(keyP);
			for(i=3 ; i<this.shortKeysCode.length ; i++)
			{
				if(keyP == this.shortKeysCode[i])
					{	
						this.optionFuncArr[i]();
						return;
					}
			}
		}
	/** podstawowe funckje do obsługi klawiszy **/	
		this.op3=function()
		{
			$("#chat").toggle();
			map.resizeView();
		}
		this.op4=function()
		{
			if (g.gw[hero.x+"."+hero.y]==true) 
				_g("walk");
		}
		this.op5=function()
		{	
			_g("takeitem"); 
		}
		this.op6=function()
		{	
			sendLoots(1);	
		}
		this.op7=function()
		{
			$("#loots_button").click();
			$("#battleclose").click();
		}	
		this.op8=function()
		{
			if(!g.battle && MHTcanAttack)
			{
				for(var i in g.npc){ if ((Math.abs(hero.rx - g.npc[i].x) <= 1 && Math.abs(hero.ry - g.npc[i].y) <= 1) && (g.npc[i].type == 2 || g.npc[i].type == 3)){ _g( "fight&a=attack&id=-" + i + "&ff=1"); break; } }
				setTimeout('MHTcanAttack=true',400);
				MHTcanAttack=false;
			}
		}	
		this.op9=function()
		{
			if(!g.battle && MHTcanAttack )
			{
				for(var i in g.npc){ if ((Math.abs(hero.rx - g.npc[i].x) <= 1 && Math.abs(hero.ry - g.npc[i].y) <= 1) && (g.npc[i].type == 2 || g.npc[i].type == 3)){ _g("fight&a=attack&id=-"+i); break; } }
				setTimeout('MHTcanAttack=true',400);
				MHTcanAttack=false;
			}	
		}	
        this.op10=function()
        {
            changeSkillSet();
        }
		
	/** tworzenie stringu menu **/
		this.makeKeysMenuString = function()
		{		
			var optionString='';
			for(i =0 ; i<this.optionTextArr.length ; i++)
			optionString+='<tr style="'+this.optionStyle+'"><td>'+this.optionTextArr[i]+'</td><td><input type="text" id="hotKeyOp'+i+'" size="1" maxlength="1" /></td></tr>';
		
			optionString += '<tr style="'+this.optionStyle+'"><td><div id="saveKeysButton"><center><b>Zapisz</b></center></div></td></tr>';		
			return '<table style="'+this.menuStyle+'" id="keyMainBox">'+optionString+'</table>';
		}
	/** tworzenie menue **/
		this.makeMenu = function()
		{
			$( this.makeKeysMenuString() ).appendTo('body').draggable().absCenter().hide();
			$("#saveKeysButton").click(function(){MyMHT.saveKeys()}).mouseenter(function(){$(this).css('background-color','#AA9950')}).mouseleave(function(){$(this).css('background-color','#0D3D01')}).mousedown(function(){$(this).css('background-color','olive')});
			for(i=0 ; i<this.optionTextArr.length ; i++ )
			{
				if( (! isNaN(this.shortKeysCode[i])) && (this.shortKeysCode[i]!=null))
					$('#hotKeyOp'+i).attr('value',String.fromCharCode(this.shortKeysCode[i]));					
			}
			
			for(i in this.menuFuncArr)
			{
				this.menuFuncArr[i]();
			}
		}
	/** tworzenie przycisku do pokazywanie menue **/
		this.makeMHTbutton=function()
		{
            //rejestracja w menu
          	$.getScript("http://addons2.margonem.pl/get/1/1689public.js",function()
            {
			    aldiMenu.add($('<span id="MHTButton" tip="show/hide menu" style="'+this.myButStyle+' width:132px;">Skróty</span>').click(function(){if(! this.menuMade){MyMHT.makeMenu(); this.menuMade=true;} $('#keyMainBox').toggle();}));
            });
		}
			
	/** f-cja do zapisyu ciastek **/
		this.setMyCookie = function(cName,cVal)
		{		
			data = new Date(); data.setTime(data.getTime()+3600000*24*31);
			setCookie(cName, cVal, data);
		}		
	/** zapisywanie f-cji keyów **/
		this.saveKeys = function()
		{	
			for(i=0 ; i<this.optionTextArr.length ; i++ )
			{
				this.shortKeysCode[i]=$('#hotKeyOp'+i).attr('value').charCodeAt(0)*1;
				this.setMyCookie('MHK'+i,this.shortKeysCode[i]);						
			}	
			this.setMyCookie('MHKn',this.optionTextArr.length);
			
			this.wyjatki();		
			$('#keyMainBox').hide();	
			log('Zapisano skróty klawiszowe;');	
			message('Zapisano');			
		}
		
	/** ładowanie f-cji keyów**/
		this.loadKeys = function()
		{
			this.optionsN = getCookie('MHKn')*1;
			if(this.optionN == 0){this.optionN = 10}
			
			for(i=0 ; i<this.optionsN ; i++ )
				this.shortKeysCode[i]=getCookie('MHK'+i)*1;
			
			this.wyjatki();		

			log('Wczytano skróty klawiszowe;');	
		}
		
	/** wyjątki battle close, minimapa, chat **/
		this.wyjatki=function()
			{
			if(isNaN(this.shortKeysCode[0]) || this.shortKeysCode[0] == 0)
				{
					g.keys.minimap = 109;
					this.shortKeysCode[0] = 109;
				}
			else{g.keys.minimap = this.shortKeysCode[0]*1;}	
			if(isNaN(this.shortKeysCode[1]) || this.shortKeysCode[1] == 0)
				{
					g.keys.battleclose = 122;
					this.shortKeysCode[1] = 122;	
				}
			else{g.keys.battleclose = this.shortKeysCode[1]*1;}		
			if(isNaN(this.shortKeysCode[2]) || this.shortKeysCode[2] == 0)
				{
					g.keys.chat = 99;
					this.shortKeysCode[2] = 99;	
				}
			else{g.keys.chat = this.shortKeysCode[2]*1;}
		}

	/** start **/
		this.start=function()
		{
			this.loadKeys();
			this.makeMHTbutton();
		}
		
		this.funcAdd = function(fName,fFunc)
		{
			this.optionTextArr[this.optionTextArr.length]=fName;
			this.optionFuncArr[this.optionFuncArr.length]=fFunc;
		}
		
		this.menuFuncAdd = function(mFunc)
		{
			this.menuFuncArr[this.menuFuncArr.length]=mFunc;
		}

	//a to jest tu bo JS jest głupi i sobie inaczej nie radzi albo ja nie wiem jak to działa co jest bardzoej prawdopodobne bo w c++ to to jakoś inaczej działa:D
		this.optionFuncArr = [0,0,0,this.op3,this.op4,this.op5,this.op6,this.op7,this.op8,this.op9,this.op10];
	} //MHK:~~

	//właściwy skrypt
	var MyMHT=new MHK();
	MyMHT.start();

	$(document).keyup(function(e){if (e.target.tagName=="INPUT" || e.target.tagName=="TEXTAREA"){}else {MyMHT.KeyAction(e.which*1);}});
	
	//MHT Attack players
	function MHTplayerAttack()
	{
		this.attack = function()
		{
			if(!g.battle)
			{
				for(var i in g.other){ if ((Math.abs(hero.rx - g.other[i].x) <= 1 && Math.abs(hero.ry - g.other[i].y) <= 1) ){ _g("fight&a=attack&id="+i); break; } }
			}	
		}
		MyMHT.funcAdd("Player attack:",this.attack);
		
	}	
	MHTplayerAttack();
	
	
	//** MHTmix
	function MHTmix()
	{
		this.itemName="";
		this.mixMenuStr;
		this.saveMix=function()
		{
			this.itemName=$('#mixName').attr('value');
			MyMHT.setMyCookie('MHTmixId',this.itemName);
			message('zapisano mixa');
			log('zapisano mixa');
		}
		this.loadMix=function()
		{
			this.itemName=getCookie('MHTmixId');
			this.mixMenuStr='<button id="mixId" tip="zapisz mix" style="border:1px solid #AA9950; background:#0D3D01; color:gold;">Mix:</button><input type="text" id="mixName" value="'+this.itemName+'"/>';
			log('wczytano mixa');
		}
		this.MixMenuFunc=function()
		{
			$('#mixId').click(function(){MyMHTmix.saveMix()});
		}
		this.useMix=function()
		{   
			for(var i in g.item)
			{
				if(g.item[i].name == MyMHTmix.itemName && g.item[i].loc == 'g')
				{	
					$("#item" + i).dblclick();
					return;	
				}
			}
			message('Nie znaleziono itemu');
		}
		this.start=function()
		{
			this.loadMix();
			MyMHT.funcAdd(this.mixMenuStr,this.useMix);
			MyMHT.menuFuncAdd(this.MixMenuFunc);
		}
	}	
	MyMHTmix = new MHTmix();
	MyMHTmix.start();