const fs = require('fs/promises');

async function lerLegenda(file) {
    try {
        const data = await fs.readFile(`./legendas/${file}`, 'utf8');
        return tratarLegenda(data);
    } catch (error) {
        throw error;
    }
}

function tratarLegenda(legenda) {
    const result = {};
    legenda.toString().split(String.fromCharCode(10)).forEach(element => {
        element.replace(/[0-9]/g, '')
            .replace("<i>", " ")
            .replace("\r", " ")
            .replace("</i>", " ")
            .replace(/[&\/\\#,+()$~%.":*?<>{}]/g, "")
            .split(String.fromCharCode(10))
            .forEach(a => {
                a.split(/[ ,]+/).forEach(b => {
                    if (!b.includes("-") && b !== "" && b !== "﻿") {
                        result[b] = result[b] || { qnt: 0 };
                        result[b].qnt++;
                    }
                });
            });
    });
    return result;
}

async function tratarTodasLegendas(array) {
    try {
        const promises = array.map(legenda => lerLegenda(legenda));
        return await Promise.all(promises);
    } catch (error) {
        throw error;
    }
}

async function exec() {
    try {
        const files = await fs.readdir("./legendas/");
        const results = await tratarTodasLegendas(files);
        await fs.writeFile('./resultado/resultado.json', JSON.stringify(results, null, '\t'), 'utf8');
        console.log('Processing complete!');
    } catch (error) {
        console.error('Error:', error);
    }
}

exec();
