export function StartMovingPersonCard(mouseArgs, personCardId) {

    //console.log("mouseMoveOnCard: here#######");
    //console.log(mouseArgs);

    var personCard = document.getElementById(personCardId);
    console.log("PersonCard:", personCard);
    personCard.addEventListener("onmouseup", sendNewPersonCardCoordinates(mouseArgs))

    //let card = document.getElementById(id);

    //let x = event.movementX + card.offsetLeft;
    //let y = event.movementY + card.offsetTop;
    //let styles = `position: abosulute;
    //              font-size: 1rem;
    //              width: 5rem;
    //              top:${y}px; left:${x}px;`;

    //card.style = styles;


}

 
 function sendNewPersonCardCoordinates(mouseArgs) {
     console.log("sendNewPersonCardCoordinates", mouseArgs);

}
