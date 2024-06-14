let lootItemCount = -1;
let totalPercent = 0;

function addLootItem() {
    lootItemCount++;
    const lootItemsDiv = document.getElementById('lootItems');
    const lootItemDiv = document.createElement('div');
    lootItemDiv.className = 'loot-item';
    lootItemDiv.id = `lootItem${lootItemCount}`;
    lootItemDiv.innerHTML = `
        <label for="itemTemplate${lootItemCount}">Item Template:</label>
        <input type="text" id="itemTemplate${lootItemCount}" name="itemTemplate${lootItemCount}">
        <label for="weight${lootItemCount}">Weight (%):</label>
        <input type="number" class="weight-input" id="weight${lootItemCount}" name="weight${lootItemCount}" min="0" max="${100 - totalPercent}" value="0" step="0.01" onchange="updateTotalWeight()">
        <label for="exclude${lootItemCount}">Exclude from Split:</label>
        <input type="checkbox" id="exclude${lootItemCount}" name="exclude${lootItemCount}">
    `;
    lootItemsDiv.appendChild(lootItemDiv);

    if (totalPercent === 100) {
        splitWeights();
    } else if (totalPercent === 0 && lootItemCount === 0) {
        document.getElementById(`weight${lootItemCount}`).value = 100;
        totalPercent = 100;
    }

    updateTotalWeight();
}

function removeLootItem() {
    if (lootItemCount >= 0) {
        const lootItemsDiv = document.getElementById('lootItems');
        const lootItemDiv = document.getElementById(`lootItem${lootItemCount}`);
        const weightValue = parseFloat(document.getElementById(`weight${lootItemCount}`).value);
        totalPercent -= weightValue;
        lootItemsDiv.removeChild(lootItemDiv);
        lootItemCount--;
        updateTotalWeight();
    }
}

function splitWeights() {
    let adjustableItems = [];
    let excludedItemsWeight = 0;

    for (let i = 0; i <= lootItemCount; i++) {
        if (!document.getElementById(`exclude${i}`).checked) {
            adjustableItems.push(`weight${i}`);
        } else {
            excludedItemsWeight += parseFloat(document.getElementById(`weight${i}`).value);
        }
    }
	
    if (adjustableItems.length === 0) {
        return;
    }

    let remainingWeight = 100 - excludedItemsWeight;
	
    if (remainingWeight <= 0) {
        return;
    }

    let splitValues = adjustableItems.map(() => 0);

    while (remainingWeight > 0) {
        for (let i = 0; i < adjustableItems.length && remainingWeight > 0; i++) {
            splitValues[i] += 1;
            remainingWeight -= 1;
        }
    }

    let totalAssignedWeight = 0;

    for (let i = 0; i < adjustableItems.length; i++) {
        const weightInput = document.getElementById(adjustableItems[i]);
        if (weightInput) {
            weightInput.value = splitValues[i];
            totalAssignedWeight += splitValues[i];
        }
    }

    updateTotalWeight();
}

function updateTotalWeight() {
    totalPercent = 0;

    for (let i = 0; i <= lootItemCount; i++) {
        const weightInput = document.getElementById(`weight${i}`);
        if (weightInput) {
            totalPercent += parseFloat(weightInput.value) || 0;
        }
    }

    document.getElementById('totalWeight').innerText = `${totalPercent.toFixed(2)}%`;

    for (let i = 0; i <= lootItemCount; i++) {
        const weightInput = document.getElementById(`weight${i}`);
        if (weightInput) {
            weightInput.max = (100 - totalPercent + parseFloat(weightInput.value)).toFixed(2);
        }
    }
}

function generateScript() {
    const lootGroupName = document.getElementById('lootGroupName').value;

    let lootItems = '';
    let totalWeight = 0;
	const itemCount = lootItemCount;

    for (let i = 0; i <= lootItemCount; i++) {
        const itemTemplate = document.getElementById(`itemTemplate${i}`).value;
        const weightPercent = parseFloat(document.getElementById(`weight${i}`).value);

        if (isNaN(weightPercent) || weightPercent < 0 || weightPercent > 100) {
            alert('Please enter valid weights for all items.');
            return;
        }

        const weight = Math.round((weightPercent / 100) * 10000000);
        totalWeight += weight;

        lootItems += `{itemTemplate = "${itemTemplate}", weight = ${weight}}`;
		if (i <= itemCount - 1) {
            lootItems += ',\n        ';
        }
    }

    if (totalWeight !== 10000000) {
        alert('Total weight must add up to 10,000,000.');
        return;
    }
	
	const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;

    const script = `--Made with Skys Loot Tool ${formattedDate}
${lootGroupName} = {
    description = "",
    minimumLevel = 0,
    maximumLevel = 0,
    lootItems = {
        ${lootItems}
    }
}

addLootGroupTemplate("${lootGroupName}", ${lootGroupName});
`;

    document.getElementById('generatedScript').innerText = script;
}

function generateLuaFile() {
    const lootGroupName = document.getElementById('lootGroupName').value;

    let lootItems = '';
    let totalWeight = 0;
	const itemCount = lootItemCount;

    for (let i = 0; i <= lootItemCount; i++) {
        const itemTemplate = document.getElementById(`itemTemplate${i}`).value;
        const weightPercent = parseFloat(document.getElementById(`weight${i}`).value);

        if (isNaN(weightPercent) || weightPercent < 0 || weightPercent > 100) {
            alert('Please enter valid weights for all items.');
            return;
        }

        const weight = Math.round((weightPercent / 100) * 10000000);
        totalWeight += weight;

        lootItems += `{itemTemplate = "${itemTemplate}", weight = ${weight}}`;
		if (i <= itemCount - 1) {
            lootItems += ',\n        ';
        }
    }

    if (totalWeight !== 10000000) {
        alert('Total weight must add up to 10,000,000.');
        return;
    }
	
	const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;

    const script = `--Made with Skys Loot Tool ${formattedDate}
${lootGroupName} = {
    description = "",
    minimumLevel = 0,
    maximumLevel = 0,
    lootItems = {
        ${lootItems}
    }
}

addLootGroupTemplate("${lootGroupName}", ${lootGroupName});
`;

    const blob = new Blob([script], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${lootGroupName}.lua`;
    downloadLink.click();
}
