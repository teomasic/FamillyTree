export function mouseMoveOnCard(event, id) {
    event.preventDefault;

    console.log("mouseMoveOnCard: here#######");

    let card = document.getElementById(id);

    let x = event.movementX + card.offsetLeft;
    let y = event.movementY + card.offsetTop;
    let styles = `position: abosulute;
                  font-size: 1rem;
                  width: 5rem;
                  top:${y}px; left:${x}px;`;

    card.style = styles;


}

window.TrackCoordinates = (e) => {
    console.log(e);
}