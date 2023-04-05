bg = []
let normalPv = []
let normalAtk = []
let normalDef = []
let normalSpeA = []
let normalSpeD = []
let normalSpee = []
normalo = []
statnormal = []


// BgColors =[]



async function normal(number) {
  normalo = []
  const url = `https://pokeapi.co/api/v2/type/${number}` // l’url de la ressource de l’API
  let fetchOptions = { method: 'GET' } // les options de fetch
  // executer la req AJAX
  fetch(url, fetchOptions)
  var response = await fetch(url, fetchOptions);
  var dataJSON = await response.json();
  
  normalPv = []
  normalAtk = []
  normalDef = []
  normalSpeA = []
  normalSpeD = []
  normalSpee = []
  
  
  for (k of dataJSON.pokemon) {
    code = k.pokemon.url
    const url2 = code // l’url de la ressource de l’API
    let fetchOptions = { method: 'GET' } // les options de fetch
    // executer la req AJAX
    fetch(url2, fetchOptions)
    var response2 = await fetch(url2, fetchOptions);
    var dataJSON2 = await response2.json();
    
    normalPv.push(dataJSON2.stats[0].base_stat)
    normalAtk.push(dataJSON2.stats[1].base_stat)
    normalDef.push(dataJSON2.stats[2].base_stat)
    normalSpeA.push(dataJSON2.stats[3].base_stat)
    normalSpeD.push(dataJSON2.stats[4].base_stat)
    normalSpee.push(dataJSON2.stats[5].base_stat)

  }
  normalo = [normalPv, normalAtk, normalDef, normalSpeA, normalSpeD, normalSpee]
  return normalo
}

// POUR RAJOUTER DES LAYERS AU CHART VERIFIER LA VALUE DU TRUC CHOISI
// SI PAS LA MEME FAIRE UN AUTRE DATASET
// CREER DES VARIABLES AVEC UN COMPTEUR POSSIBLE ?



function fait(numtype) {

  // RÉCUPERE LE NOM DU TYPE CLIQUÉ

    const url = `https://pokeapi.co/api/v2/type/${numtype}` // l’url de la ressource de l’API
    let fetchOptions = { method: 'GET' } // les options de fetch
    // executer la req AJAX
    fetch(url, fetchOptions)
    .then((response) => { return response.json() })
    .then((dataJSON) => { // dataJSON = les données renvoyées
  
    Alltypes = dataJSON.name
    })

  // console.log(numtype)
  normalTabStats = []
      normalTabStats = normal(numtype)
      normalTabStats.then((tab) => {
        // console.log('tab chargé', tab)
        statnormal = []
        for (k of tab) {
          statnormal.push((k.reduce((res, v) => res + v, 0)) / k.length);
          
          //console.log(k.reduce((res, v) => res + v, 0))
          //console.log(k)
          // statnormal.push(k.reduce((res,v) =>res+v, 0)/k.length)
          
          // ANCIEN TRUC DE FABIAN QUI FONCTIONNE MAIS QU'UNE FOIS
          
          // normalTabStats.then((tab) => {
            //   tab.forEach(element => {
              //     statnormal.push(element.reduce((res, v) => res + v, 0) / element.length)
              //   });
              
              // if (event.target.value != ""){
                //   if 
                
                
                // console.log(statnormal)
              }
              
              
              
              
              
              
        var data = {
        labels: [
          'HP',
          'ATTACK',
          'DEFENSE',
          'SPE ATTACK',
          'SPE DEF',
          'VITESSE',
        ],
      datasets: [{
        label: Alltypes,
        data: statnormal,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    };
    var config = {
      type: 'radar',
      data: data,
      options: {
        scales: {
          r: {
            angleLines: {
              display: false
            },
            suggestedMin: 30,
            suggestedMax: 100
          }
        },
        elements: {
          line: {
            borderWidth: 1
          }
        }
      },
    };
    const ctx = document.getElementById('myChart');
    var Radar = new Chart(ctx, config, data)
  
    
    // FONCTION QUI PERMET D'AJOUTER UN LAYER AU RADAR


    a = document.getElementsByClassName("a");
    
    for (var i = 0 ; i < a.length; i++) {
      a[i].addEventListener('change' , newDataset ) ; 
    }

    
    function newDataset(event){
      

      
      normalTabStats2 = []
      normalTabStats2 = normal(event.target.value)
      normalTabStats2.then((tab) => {
        
        statnormal2 = []
        
        for (k of tab) {
          statnormal2.push((k.reduce((res, v) => res + v, 0)) / k.length);
          
        }
        
        
        var newdataset = {
          label: Alltypes,
          backgroundColor: 'rgba(99, 255, 132, 0.2)',
          borderColor: 'rgba(99, 255, 132, 1)',
          borderWidth: 1,
          data: statnormal2,
        }
        
        data.datasets.push(newdataset);

        // TENTATIVE DE FAIRE FONCTIONNER LA SUPPRESSION

        // You add the newly created dataset to the list of `data`
          // if (bg != ""){
          // console.log(bg)
          // console.log(statnormal2)
          // test = 0
          // for(i in statnormal2){if (
          //   (bg[i]-2)<statnormal2[i]<(bg[i]+2)){
          //     test++
          //   }
          // }
          // if (test == statnormal2.length){
            // let removalIndex = data.datasets.indexOf(newdataset , {data : statnormal2})
            // removalIndex = removalIndex -1
            // console.log(removalIndex)
            // if(removalIndex >= 0) { //make sure this element exists in the array
            //   console.log("bonjour")
            //   data.datasets.splice(removalIndex);
            //   console.log(data.datasets)
            //   }
            // }

            Radar.update()
            bg = statnormal2
          })
   

        // You update the chart to take into account the new dataset
        // else{
          // ;}


        }});

  }// FERME LA FONCTION NEWDATASET
  // }) // FERME LE .THEN
  // } // FERME LA FONCTION FAIT
  
  // normalTabStats = normal(1)
  // normalTabStats.then((tab)=>{for(k of tab){
  //     statnormal.push(k.reduce((res,v) =>res+v, 0)/k.length)  