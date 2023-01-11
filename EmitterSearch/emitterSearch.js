const form = document.getElementById('vector-form');

const combinedDistanceBetween = (currentPos, targetPos) => {
    return Math.sqrt((currentPos.X - targetPos.X) ** 2 + (currentPos.Y - targetPos.Y) ** 2);
}

const getDiff = (vector3String, key = 20) => {
    const re = /\((.*)\)/i;
    const coords = vector3String.match(re)[1].split(',');

    const currentPos = Object.create({
        X: Number(coords[0]),
        Y: Number(coords[1]),
    })

    const targetPos = emitters[key].Position;

    return combinedDistanceBetween(currentPos, targetPos);
}

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const diffList = []
    emitters.forEach((emitter, index) => {
        const diff = getDiff(evt.target[0].value, index);
        diffList[index] = {
            name: emitters[index].Name,
            distance: diff,
            // coords: emitters[index].Position.X + ', ' + emitters[index].Position.Y
        };
    });
    
    const results = new gridjs.Grid({
        columns: ["name", "distance"],
        fixedHeader: true,
        data: Object.values(diffList).sort((a, b) => a.distance - b.distance)
    }).render(document.getElementById("results"));

});