listcheck = document.getElementById("wew");
let listetype = [];
let ok = false;

montre= true
// FONCTION QUI DONNE TOUS LES TYPES

if (montre = true){
  getTypes()
}

function getTypes() {

  if (ok == false) {

    const url = `https://pokeapi.co/api/v2/type/` // l’url de la ressource de l’API
    let fetchOptions = { method: 'GET' } // les options de fetch
    // executer la req AJAX
    fetch(url, fetchOptions)
      .then((response) => { return response.json() })
      .then((dataJSON) => { // dataJSON = les données renvoyées

        console.log(dataJSON)
        Alltypes = dataJSON.results

        Alltypes.forEach(element => {
          listetype.push(element.name);
        });

        console.log(listetype)

        numtype = 1;

        listetype.forEach(element => {

          // console.log(element)

          li = document.createElement("li")
          
          
          option = document.createElement("input");
          option.setAttribute("type", "checkbox")
          option.setAttribute("class", "a")
          option.setAttribute("onclick", `fait(${numtype})`)
          option.setAttribute("value", numtype)
          option.setAttribute("name", element)
          
          label = document.createElement("label")
          label.setAttribute("for", element)
          label.innerHTML = `${element}`

          listcheck.appendChild(label)

          // option.setAttribute("value", numtype);
          // option.innerHTML = element;
          listcheck.appendChild(option);
          numtype = numtype + 1;
          
          listcheck.appendChild(li)
        })
        ok = true;
      })
  }
}