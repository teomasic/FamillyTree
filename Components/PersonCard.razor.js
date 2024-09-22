var personCard;

export async function Init(dotnetRef) {
    personCard = new PersonCard(dotnetRef);
}


export function StartMovingPersonCard(mouseArgs, personCardId) {
    personCard.StartMovingPersonCard(mouseArgs, personCardId);
}




class PersonCard {

    dotnetRef;
    personCard;

    constructor(dotnetRef) {
        this.dotnetRef = dotnetRef;
    }



    StartMovingPersonCard(mouseArgs, personCardId) {

        personCard = document.getElementById(personCardId);
        //personCard.addEventListener("onmousemove", movePersonCard(mouseArgs, personCard));
        personCard.addEventListener("onmouseup", this.sendNewPersonCardCoordinates(mouseArgs));



    }

    movePersonCard = (mouseArgs, personCard) => {
        console.log("movePersonCard");
        let x = mouseArgs.movementX + personCard.offsetLeft;
        let y = mouseArgs.movementY + personCard.offsetTop;
        let styles = `position: abosulute;
                      font-size: 1rem;
                      width: 5rem;
                      top:${y}px; left:${x}px;`;

        personCard.style = styles;
    }



    // CALL DOTNET METHODS WITH JS
    sendNewPersonCardCoordinates = (mouseArgs) => {
        console.log("sendNewPersonCardCoordinates", mouseArgs);
        this.dotnetRef.invokeMethodAsync("SavePesrsonCardAfterMoving", mouseArgs);
        //personCard.removeEventListener("onmouseup", this.sendNewPersonCardCoordinates);
    }

}





