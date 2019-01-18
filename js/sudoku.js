var sConst={
	SIZE:3,
	BOARD_SIZE:3*3,
	BOARD:[],
	n_p:5
};

function sudoku(elm)
{
	for(var i=0; i<sConst.BOARD_SIZE; i++)
		sConst.BOARD[i]=new Array(sConst.BOARD_SIZE);
	sCreate(elm);  
	var xhrh=new XMLHttpRequest();
	xhrh.open("GET", "Ss/S"+Math.floor(Math.random()*sConst.n_p)+".txt");
	xhrh.onreadystatechange=function()
	{
		if(xhrh.readyState===4 && xhrh.status===200)
		{
			var ar=xhrh.responseText.split("");
			for(var i=0; i<sConst.BOARD_SIZE; i++)
				for(var j=0; j<sConst.BOARD_SIZE; j++)
					sConst.BOARD[i][j]=+ar[i*sConst.BOARD_SIZE+j];
			sShuffle();
			for(var i=0; i<sConst.BOARD_SIZE; i++)
				for(var j=0; j<sConst.BOARD_SIZE; j++)
					if(sConst.BOARD[i][j])
					{
						var ei=elm.getElementsByClassName("s"+i+"-"+j)[0];
						ei.value=sConst.BOARD[i][j];
						ei.style.fontWeight="bold";
						ei.readOnly=true;
					}
			elm.getElementsByTagName("table")[0].style.filter="";
		}
	};
	try
	{
		xhrh.send(null);
		elm.getElementsByTagName("table")[0].style.filter="blur(10px)";
	}
	catch(e){}
}

function sCreate(elm)
{
	var hs, vs, cnt='<table class="sudoku-table">';
	for(var i=0; i<sConst.BOARD_SIZE; i++)
	{
		cnt+="<tr>";
		hs = i%sConst.SIZE?"":"border-top: 2px solid #000;";
		for(var j=0; j<sConst.BOARD_SIZE; j++)
		{
			vs = j%sConst.SIZE?"":"border-left: 2px solid #000;";
			cnt+='<td style="'+hs+vs+'"><input class="s'+j+'-'+i+'"/></td>';
		}
		cnt+="</tr>";
	}
	cnt+='</table>';
	elm.innerHTML=cnt;
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
					sConst.BOARD[srcv[0]][srcv[1]]=0;
					sCheck(elm);
				}
				break;
			case 37:
				if(srcv[0]>0)
					elm.getElementsByClassName("s"+(srcv[0]-1)+"-"+srcv[1])[0].focus();
				break;
			case 38:
				if(srcv[1]>0)
					elm.getElementsByClassName("s"+srcv[0]+"-"+(srcv[1]-1))[0].focus();
				break;
			case 39:
				if(srcv[0]<sConst.BOARD_SIZE-1)
					elm.getElementsByClassName("s"+(srcv[0]+1)+"-"+srcv[1])[0].focus();
				break;
			case 40:
				if(srcv[1]<sConst.BOARD_SIZE-1)
					elm.getElementsByClassName("s"+srcv[0]+"-"+(srcv[1]+1))[0].focus();
				break;
			default:
				if(!src.readOnly)
				{
					if(evnt.keyCode>=49&&evnt.keyCode<=57)
						sConst.BOARD[srcv[0]][srcv[1]]=src.value=evnt.keyCode-48;
					else if(evnt.keyCode>=97&&evnt.keyCode<=105)
						sConst.BOARD[srcv[0]][srcv[1]]=src.value=evnt.keyCode-96;
					sCheck(elm);
				}
		}
	};
}

function sCheck(elm)
{
	var valid=true;
	elm.getElementsByClassName("sudoku-table")[0].classList.remove("correct");
	for(var i=0; i<sConst.BOARD_SIZE; i++)
		for(var j=0; j<sConst.BOARD_SIZE; j++)
		{
			elm.getElementsByClassName("s"+i+"-"+j)[0].classList.remove("wrong");
			var sij=sConst.BOARD[i][j];
			if(sij)
			{
				for(var k=0; k<j; k++)
					if(sij==sConst.BOARD[i][k])
					{
						elm.getElementsByClassName("s"+i+"-"+j)[0].classList.add("wrong");
						elm.getElementsByClassName("s"+i+"-"+k)[0].classList.add("wrong");
						valid=false;
					}
				for(var k=0; k<i; k++)
					if(sij==sConst.BOARD[k][j])
					{
						elm.getElementsByClassName("s"+i+"-"+j)[0].classList.add("wrong");
						elm.getElementsByClassName("s"+k+"-"+j)[0].classList.add("wrong");
						valid=false;
					}
				var k=i-i%sConst.SIZE, ls=j-j%sConst.SIZE;
				for(var kl=k+sConst.SIZE; k<kl; k++)
					for(var l=ls, ll=l+sConst.SIZE; l<ll; l++)
						if(i!=k&&j!=l&&sij==sConst.BOARD[k][l])
						{
							elm.getElementsByClassName("s"+i+"-"+j)[0].classList.add("wrong");
							elm.getElementsByClassName("s"+k+"-"+l)[0].classList.add("wrong");
							valid=false;
						}
			}
			else
				valid=false;
		}
	if(valid)
	{
		elm.getElementsByClassName("sudoku-table")[0].classList.add("correct");
//		success();
	}
}

//The following function is copyrighted under the MIT license
//Copyright 2018 Sherlock Doyle (Shekhar Dutta).
function sShuffle(){for(var A=[],B=0;B<sConst.BOARD_SIZE;B++){var D=Math.floor(Math.random()*(B+1));A[B]=A[D],A[D]=B}for(B=0;B<sConst.BOARD_SIZE;B++)for(var O=0;O<sConst.BOARD_SIZE;O++)sConst.BOARD[B][O]&&(sConst.BOARD[B][O]=A[sConst.BOARD[B][O]-1]+1);B=0;for(var R=Math.floor(4*Math.random());B<R;B++){O=0;for(var r=sConst.BOARD_SIZE/2;O<r;O++)for(var o=O,a=sConst.BOARD_SIZE-O-1;o<a;o++){var f=sConst.BOARD[O][o];sConst.BOARD[O][o]=sConst.BOARD[o][a],sConst.BOARD[o][a]=sConst.BOARD[a][sConst.BOARD_SIZE-o-1],sConst.BOARD[a][sConst.BOARD_SIZE-o-1]=sConst.BOARD[sConst.BOARD_SIZE-o-1][O],sConst.BOARD[sConst.BOARD_SIZE-o-1][O]=f}}for(B=0;B<sConst.BOARD_SIZE;B+=sConst.SIZE)for(O=1;O<sConst.SIZE;O++){var E=B+O,I=B+Math.floor(Math.random()*(O+1)),S=B+Math.floor(Math.random()*(O+1));for(o=0;o<sConst.BOARD_SIZE;o++){f=sConst.BOARD[E][o];sConst.BOARD[E][o]=sConst.BOARD[I][o],sConst.BOARD[I][o]=f}for(o=0;o<sConst.BOARD_SIZE;o++){f=sConst.BOARD[o][E];sConst.BOARD[o][E]=sConst.BOARD[o][S],sConst.BOARD[o][S]=f}}for(B=1;B<sConst.SIZE;B++){var Z=B*sConst.SIZE;for(I=Math.floor(Math.random()*(B+1))*sConst.SIZE,O=0;O<sConst.SIZE;O++)for(o=0;o<sConst.BOARD_SIZE;o++){f=sConst.BOARD[Z+O][o];sConst.BOARD[Z+O][o]=sConst.BOARD[I+O][o],sConst.BOARD[I+O][o]=f}I=Math.floor(Math.random()*(B+1))*sConst.SIZE;for(O=0;O<sConst.SIZE;O++)for(o=0;o<sConst.BOARD_SIZE;o++){f=sConst.BOARD[o][Z+O];sConst.BOARD[o][Z+O]=sConst.BOARD[o][I+O],sConst.BOARD[o][I+O]=f}}}