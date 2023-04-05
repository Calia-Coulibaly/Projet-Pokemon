poke = document.getElementById("param")
poke.addEventListener('keyup', affiche)

recherche = document.getElementById("recherche")
recherche.addEventListener('click', getCode)
recherche.addEventListener('click', getStats)



imageDeDos = document.getElementById("image de dos")
imageDeFace = document.getElementById("image de face")
shinyDeDos = document.getElementById("shiny de dos")
shinyDeFace = document.getElementById("shiny de face")
typesInDoc = document.getElementById("types")
identity = document.getElementById("identity")
mensuration = document.getElementById("mensuration")
stats = document.getElementById('stats')


code = ""
function getCode() {
    code = poke.value

    const url = `https://pokeapi.co/api/v2/pokemon/${code}` // l’url de la ressource de l’API
    let fetchOptions = { method: 'GET' } // les optionsA de fetch
    // executer la req AJAX
    fetch(url, fetchOptions)
        .then((response) => { return response.json() })
        .then((dataJSON) => { // dataJSON = les données renvoyées


            console.log(dataJSON)
            pokeName = dataJSON.name
            pokeId = dataJSON.id
            pokeHeight = dataJSON.height / 10
            pokeWeight = dataJSON.weight / 10
            allStats = dataJSON.stats

            showTypes = "Pokemon's type are : "
            showId = `The pokemon name is ${pokeName} and he is the number ${pokeId} in the pokedex`
            showMensuration = `The pokemon height = ${pokeHeight}m and weight = ${pokeWeight}kg`
            showStat = `HP : ${allStats[0].base_stat} <br> Attack : ${allStats[1].base_stat} <br> Defense : ${allStats[2].base_stat} <br> Spe Attack : ${allStats[3].base_stat} <br> Spe Def : ${allStats[4].base_stat} <br> Speed : ${allStats[5].base_stat} `

            types = dataJSON.types
            for ([i, v] of types.entries()) {
                showTypes += v.type.name
                showTypes += " "
            }
            for ([i, v] of allStats.entries()) {
                console.log(v.base_stat)
            }


            typesInDoc.innerHTML = showTypes
            identity.innerHTML = showId
            mensuration.innerHTML = showMensuration
            stats.innerHTML = showStat

            imageDeDos.src = dataJSON.sprites.back_default
            imageDeFace.src = dataJSON.sprites.front_default
            shinyDeDos.src = dataJSON.sprites.back_shiny
            shinyDeFace.src = dataJSON.sprites.front_shiny
        })
        .catch((error) => {
            console.log(error) // gestion des erreurs
        })
}
console.log(code)



function getStats() {

    code = poke.value



    const url = `https://pokeapi.co/api/v2/pokemon/${code}` // l’url de la ressource de l’API
    let fetchOptions = { method: 'GET' } // les optionsA de fetch
    // executer la req AJAX
    fetch(url, fetchOptions)
        .then((response) => { return response.json() })
        .then((dataJSON) => { // dataJSON = les données renvoyées

            StatsPoke = []
            BgColors = []
            statistiques = dataJSON.stats
            StatsPoke.push(statistiques[0].base_stat)
            StatsPoke.push(statistiques[1].base_stat)
            StatsPoke.push(statistiques[2].base_stat)
            StatsPoke.push(statistiques[3].base_stat)
            StatsPoke.push(statistiques[4].base_stat)
            StatsPoke.push(statistiques[5].base_stat)


            // CHANGEMENT DES COULEURS DU CHART EN FONCTION DES STATS
            // EX SI MOINS DE 30 EN ROUGE 
            // for (const element in StatsPoke){
            //     if (element)
            // }

            // SUPPRESSION DE L'ANCIEN CHART ET CREATION D'UN NOUVEAU

                trucs = document.getElementById("MyChart");
                trucs.remove();

                const p = document.createElement('canvas');
                p.setAttribute('id','MyChart');
                const div = document.getElementById('trouve');
                div.appendChild(p);

            const ctx = document.getElementById('MyChart');

            StatsPoke.forEach(element => {
                if(element <= 35) {BgColors.push('red')}
                if(element > 35 && element <=70 ) {BgColors.push('orange')}
                if(element > 71 && element <= 105) {BgColors.push('yellow')}
                if(element > 105) {BgColors.push('green')}
            });

            const data = {
                labels: [
                    'HP',
                    'ATTACK',
                    'DEFENSE',
                    'SPE ATTACK',
                    'SPE DEF',
                    'VITESSE',
                ],
                datasets: [{
                    label: `Statistiques de pokemon`,
                    data: StatsPoke,
                    fill: true,
                    backgroundColor: BgColors,
                    borderColor: 'rgb(0, 0, 0, 0.8)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                },]
            };
            const config = {
                type: 'bar',
                data: data,
                options: {
                    scales: {
                        xAxis: [{
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max: 180
                            }
                        }]
                    },
                    indexAxis: 'y',
                    // Elements options apply to all of the options unless overridden in a dataset
                    // In this case, we are setting the border of each horizontal bar to be 2px wide
                    elements: {
                        bar: {
                            borderWidth: 2,
                        }
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                        },
                        title: {
                            display: true,
                            text: 'Statistique du Pokemon'
                        }
                    }
                },
            };




            new Chart(ctx, config, data);




        })
}

function affiche() {

}