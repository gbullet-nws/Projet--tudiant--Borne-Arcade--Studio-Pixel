///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("keydown",fKeyDown,false);
document.addEventListener("keyup",fKeyUp,false);

var joystick=0;


/////---// FONCTION touche appuyée //--/////

function fKeyDown(event) {
	//alert(event.keyCode);
	switch(event.keyCode) {
		case 37:	// left
			joystick|=8;
			break;
		case 38:	// up
			joystick|=1;
			break;
		case 39:	// right
			joystick|=2;
			break;
		case 40:	// down
			joystick|=4;
			break;
		case 77:	// m
			joystick|=16;
			break;
		default:
			return;
	}
	event.preventDefault();
	event.stopPropagation();
}

/////---// FONCTION touche relevée //--/////

function fKeyUp(event) {
	switch(event.keyCode) {
		case 37:	// left
			joystick&=0xffff-8;
			break;
		case 38:	// up
			joystick&=0xffff-1;
			break;
		case 39:	// right
			joystick&=0xffff-2;
			break;
		case 40:	// down
			joystick&=0xffff-4;
			break;
		case 77:	// m
			joystick&=0xffff-16;
			break;
		default:
			return;
	}
	event.preventDefault();
	event.stopPropagation();
}
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////---// FONCTION LOAD IMAGE //--/////

function loadImage(list, endLoad) 
{

	var imgLoad = new Array();
	imgLoad.isReady = false;
	imgLoad.remainsToLoad = list.length;
    for (var i = 0; i < list.length; i++) 
    {
		imgLoad[i] = new Image();
		imgLoad[i].isReady = false;
		imgLoad[i].parent = imgLoad;
		//imgLoad[i].crossOrigin = 'file://';
		imgLoad[i].onload = function () 
		{
			this.onload = null;
			this.isReady = true;
			this.parent.remainsToLoad--;
			if (this.parent.remainsToLoad == 0) 
			{
				this.parent.isReady = true;
				if(typeof endLoad !== 'undefined') endLoad();
			}
		};
		imgLoad[i].src = list[i];
	}
	return imgLoad;
}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////--- FONCTION GameOver ---/////

function popUpGameOver()
{
    // sélection de la div de la popup
    var popupGameOver = document.getElementById("popupGameOver");

    // sélection du <span> de la popup pour la refermer
    var fermerPopUp = document.getElementById("fermerPopUp");

    // Si (pacman.mort == true) alors affiche la Popup
    function gameOver()
    {
        popupGameOver.style.display = "block";
    }
    // condition d'affichage de la popup
    if( pacman.mort == true )
	{
		gameOver();
		document.getElementById("popupHigherScore").innerHTML= higherScore ;
        document.getElementById("popupScore").innerHTML = score ;
		document.getElementById("chronotime2").innerHTML = min + ":" + sec + ":" + msec ;
    }
    
    // Refermer la Popup
    fermerPopUp.onclick = function() 
    {
        popupGameOver.style.display = "none";
    }
    // en cliquant en dehors
    window.onclick = function(event) 
    {
        if (event.target == popupGameOver) 
        {
            popupGameOver.style.display = "none";
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function afficherClassementHighScores()	// Fonction d'affichage sur la page Tableau des Scores
{
	document.getElementById("highScore1").innerHTML=  localStorage.getItem("oldHigherScore") ;
	document.getElementById("highScore2").innerHTML=  localStorage.getItem("highScore2") ;
	document.getElementById("highScore3").innerHTML=  localStorage.getItem("highScore3") ;
	document.getElementById("highScore4").innerHTML=  localStorage.getItem("highScore4") ;
	document.getElementById("highScore5").innerHTML=  localStorage.getItem("highScore5") ;
}


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
