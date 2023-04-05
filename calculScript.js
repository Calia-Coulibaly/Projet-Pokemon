checkboxes = document.getElementsByClassName("typeList")
checked = []
for(checkboxe of checkboxes){
    checkboxe.addEventListener('change', action)
}
function action(event){
    double_damage_from = []
    half_damage_from = []
    double_damage_to = []
    half_damage_to = []
    no_damage_from = []
    no_damage_to = []
    if (checked.includes(event.srcElement.name)){
        checked.splice(checked.indexOf(event.srcElement.name),1)
    }
    else{
        checked.push(event.srcElement.name)
    }
    for([i, v] of checked.entries()){
    const url = `https://pokeapi.co/api/v2/type/${v}` // l’url de la ressource de l’API
    let fetchOptions = { method: 'GET' } // les optionsA de fetch
    // executer la req AJAX
    fetch(url, fetchOptions)
        .then((response) => { return response.json() })
        .then((dataJSON) => { // dataJSON = les données renvoyées
            for( value of dataJSON.damage_relations.double_damage_from){
                double_damage_from.push(value.name)
            }
            for( value of dataJSON.damage_relations.half_damage_from){
                half_damage_from.push(value.name)
            }
            for( value of dataJSON.damage_relations.double_damage_to){
                double_damage_to.push(value.name)
            }
            for( value of dataJSON.damage_relations.half_damage_to){
                half_damage_to.push(value.name)
            }
            for( value of dataJSON.damage_relations.no_damage_from){
                no_damage_from.push(value.name)
            }
            for( value of dataJSON.damage_relations.no_damage_to){
                no_damage_to.push(value.name)
            }
            if(i == (checked.length - 1) ){
                listType = {
                    "normal" : 1,
                    "fighting" : 1,
                    "flying" : 1,
                    "poison" : 1,
                    "ground" : 1,
                    "rock" : 1,
                    "bug" : 1,
                    "ghost" : 1,
                    "steel" : 1,
                    "fire" : 1,
                    "water" : 1,
                    "grass" : 1,
                    "electric" : 1,
                    "psychic" : 1,
                    "ice" : 1,
                    "dragon" : 1,
                    "dark" : 1,
                    "fairy" : 1
                }
                for(value of half_damage_from){
                    listType[value] *= 0.5
                }
                for(value of double_damage_from){
                    listType[value] *= 2
                }
                for(value of no_damage_from){
                    listType[value] *= 0
                }
                fillDef = ""
                fillDef += "<table><tr><td><strong> Defense </strong></td></tr>"
                for(key in listType){
                    fillDef +=  `<tr><td>${key}</td><td>${listType[key]}</td></tr>`
                }
                fillDef +="</table>"
                document.getElementById("defense").innerHTML = fillDef
                listType = {
                    "normal" : -1,
                    "fighting" : -1,
                    "flying" : -1,
                    "poison" : -1,
                    "ground" : -1,
                    "rock" : -1,
                    "bug" : -1,
                    "ghost" : -1,
                    "steel" : -1,
                    "fire" : -1,
                    "water" : -1,
                    "grass" : -1,
                    "electric" : -1,
                    "psychic" : -1,
                    "ice" : -1,
                    "dragon" : -1,
                    "dark" : -1,
                    "fairy" : -1
                }
                for(value of no_damage_to){
                    if(listType[value]<0){
                        listType[value] = 0
                    }
                }
                for(value of half_damage_to){
                    if(listType[value]<0.5){
                        listType[value] = 0.5
                    }
                }
                for(value of double_damage_to){
                    if(listType[value]<2){
                        listType[value] = 2
                    }
                }
                for(key in listType){
                    if(listType[key] == -1){
                        listType[key] = 1
                    }
                }
                fillOff = ""
                fillOff += "<table><tr><td><strong> Offense </strong></td></tr>"
                for(key in listType){
                    fillOff +=  `<tr><td>${key}</td><td>${listType[key]}</td></tr>`
                }
                fillOff +="</table>"
                document.getElementById("offense").innerHTML = fillOff
            }
        })
        .catch((error) => {
            console.log(error) // gestion des erreurs
        })
    }
    }


