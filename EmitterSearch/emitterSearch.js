const form = document.getElementById('vector-form');

const combinedDistanceBetween = (currentPos, targetPos) => {
    return Math.sqrt((currentPos.X - targetPos.X) ** 2 + (currentPos.Y - targetPos.Y) ** 2);
}

const validateInput = (input) => {
    let errors = [];

    if (!input) {
        errors.push('Missing input')
    }

    if (!input.startsWith('vector')) {
        errors.push('Missing vector')
    }

    if (!input.includes('(') || ! input.includes(')')) {
        errors.push('Missing parentheses')
    }

    if (splitCoords.length > 2) {
        errors.push('Missing coordinates')
    }

    return errors;
}

const splitCoords = (vectorString) => {
    return vectorString.match(/\((.*)\)/i)[1].split(',');
}

const getDiff = (vector3String, key = 20) => {
    const coords = splitCoords(vector3String);

    const currentPos = Object.create({
        X: Number(coords[0]),
        Y: Number(coords[1]),
    })

    const targetPos = emitters[key].Position;

    return combinedDistanceBetween(currentPos, targetPos);
}

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const input = evt.target[0].value;
    const inputValidationErrors = validateInput(input)

    if (inputValidationErrors.length > 0) {
        return alert(`Invalid input. Please enter a vector2 or vector3 or vector4 string.\r\n ⚠️ ${inputValidationErrors.join('\r\n ⚠️ ')}`)
    }

    const diffList = []
    emitters.forEach((emitter, index) => {
        const diff = getDiff(input, index);
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
    }).render(document.getElementById("results"))

});