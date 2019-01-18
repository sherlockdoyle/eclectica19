var cConst={
	BOARD:[],
	n_p:1
};

function crswrd(elm)
{
	elm.innerHTML='<div><div class="board"></div><div class="clue"><div class="across"><h3>Across:</h3><div class="data"></div></div><div class="down"><h3>Down:</h3><div class="data"></div></div></div></div><nobr><button>CHECK</button> <i>Wrong boxes will<br>be highlighted.</i></nobr>';
	var xhrh=new XMLHttpRequest();
	xhrh.open("GET", "Cs/C"+Math.floor(Math.random()*cConst.n_p)+".json");
	xhrh.onreadystatechange=function()
	{
		if(xhrh.readyState===4 && xhrh.status===200)
		{
			var cwo=JSON.parse(xhrh.responseText), c=1;
			cConst.BOARD=new Array(cwo.x*cwo.y);
			cCreate(elm, cwo);
			for(var i=0; i<cwo.y; i++)
				for(var j=0; j<cwo.x; j++)
				{
					var ei=elm.getElementsByClassName("c"+j+"-"+i)[0], n=cwo.b[i*cwo.x+j];
					if(n==0)
					{
						ei.classList.add("black");
						ei.readOnly=true;
					}
					else if(n==1)
						ei.parentElement.innerHTML+='<div style="position: absolute; transform: translate(3px,-'+ei.style.height+')">'+(c++)+"</div>";
				}
			var ch=elm.querySelectorAll(".across .data")[0];
			for(var i in cwo.ca)
				ch.innerHTML+='<span class="ca'+i+'"><b>'+i+': </b>'+cwo.ca[i]+'</span><br>';
			ch=elm.querySelectorAll(".down .data")[0];
			for(var i in cwo.cd)
				ch.innerHTML+='<span class="ca'+i+'"><b>'+i+': </b>'+cwo.cd[i]+'</span><br>';
			var btn=elm.getElementsByTagName("button")[0];
			btn.onclick=function()
			{
				cCheck(elm, cwo);
			};
		}
	};
	try
	{
		xhrh.send(null);
	}
	catch(e){}
}

function cCreate(elm, cwo)
{
	var cnt='<table>';
	for(var i=0; i<cwo.y; i++)
	{
		cnt+="<tr>";
		for(var j=0; j<cwo.x; j++)
		{
			var lpx=Math.round(272.857313289073204*Math.pow(Math.max(cwo.x,cwo.y),-0.736965594166227));
			cnt+='<td><input class="c'+j+'-'+i+'" style="width: '+lpx+'px;height: '+lpx+'px;font-size: '+lpx+'px;"/></td>';
		}
		cnt+="</tr>";
	}
	cnt+='</table>';
	elm.getElementsByClassName("board")[0].innerHTML=cnt;
	 clue=elm.getElementsByClassName("clue")[0], w=clue.offsetWidth=elm.getElementsByClassName("board")[0].offsetWidth;
	clue.getElementsByClassName("across")[0].offsetWidth=(w-1)/2;
	clue.getElementsByClassName("down")[0].offsetWidth=(w-1)/2;
	elm.onkeydown=function(evnt)
	{
		evnt.preventDefault();
		var src=evnt.srcElement, srcv=src.classList[0].slice(1).split("-").map(function(x)
		{
			return+x;
		});
		switch(evnt.keyCode)
		{
			case 8:
			case 46:
				if(!src.readOnly)
				{
					src.value="";
					cConst.BOARD[srcv[1]*cwo.x+srcv[0]]=2;
				}
				break;
			case 37:
				if(srcv[0]>0)
					elm.getElementsByClassName("c"+(srcv[0]-1)+"-"+srcv[1])[0].focus();
				break;
			case 38:
				if(srcv[1]>0)
					elm.getElementsByClassName("c"+srcv[0]+"-"+(srcv[1]-1))[0].focus();
				break;
			case 39:
				if(srcv[0]<cwo.x-1)
					elm.getElementsByClassName("c"+(srcv[0]+1)+"-"+srcv[1])[0].focus();
				break;
			case 40:
				if(srcv[1]<cwo.y-1)
					elm.getElementsByClassName("c"+srcv[0]+"-"+(srcv[1]+1))[0].focus();
				break;
			default:
				if(!src.readOnly&&evnt.keyCode>=65&&evnt.keyCode<=90)
					cConst.BOARD[srcv[1]*cwo.x+srcv[0]]=src.value=String.fromCharCode(evnt.keyCode);
		}
	};
}

function cCheck(elm, cwo)
{
	var valid=cEnsure(elm, cwo);
	if(valid)
		for(var i=0; i<cwo.y; i++)
			for(var j=0; j<cwo.x; j++)
			{
				var ei=elm.getElementsByClassName("c"+j+"-"+i)[0], n=i*cwo.x+j, a=cwo.a[n];
				
				ei.classList.remove("wrong");
				if(a!=0&&ei.value!=""&&ei.value!=a)
				{
					ei.classList.add("wrong");
					valid=false;
				}
                if(ei.value=="")
                    valid=false;
			}
	if(valid)
	{
		elm.getElementsByTagName("table")[0].classList.add("correct");
		var inps=elm.getElementsByTagName("input");
		for(var i in inps)
			inps[i].readOnly=true;
//		success();
	}
}
function cEnsure(elm, cwo)
{
	for(var i=0; i<cwo.y; i++)
		for(var j=0; j<cwo.x; j++)
		{
			var ei=elm.getElementsByClassName("c"+j+"-"+i)[0], n=i*cwo.x+j, a=cwo.a[n];
			if(a!=0&&ei.value=="")
				return confirm("Sure to check before completing the crossword?");
		}
	return true;
}