let url = 'https://api.weatherapi.com/v1/current.json?key=ca4e848fd77245d3b35183833231808&q=london',
    i = 0;
const form = document.querySelector('form'),
      mycities = [];


async function json(name) {
    url = `https://api.weatherapi.com/v1/current.json?key=ca4e848fd77245d3b35183833231808&q=${name}`
    const response = await fetch(url, {mode: 'cors'});
    const cityData = await response.json();
    function InformationCity (name, tempCelsius, tempFahrenheit) {
        this.name = name,
        this.tempCelsius = tempCelsius,
        this.tempFahrenheit = tempFahrenheit
    }
    let newObject = new InformationCity(cityData.location.name, cityData.current.temp_c, cityData.current.temp_f);
    mycities.push(newObject);
    appendCard(newObject);
}


function affichageForm (){
    form.style.visibility = 'visible';
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const cityName = e.target.cityName.value.toLowerCase();
    json(cityName)
    form.style.visibility = 'hidden';
})

function appendCard(object) {
    const content = document.querySelector('.content');
    const card = document.createElement('div');
    card.classList.add('card');
    const title = document.createElement('h1');
    title.textContent = object.name;
    card.appendChild(title);
    const newDiv = document.createElement('div');
    newDiv.classList.add('temperature')
    const title2 = document.createElement('p');
    title2.textContent = "Temperature :"
    newDiv.appendChild(title2);
    const button = document.createElement('button');
    button.setAttribute("id", `${object.name}`);
    button.textContent = `${object.tempCelsius}°C`;
    button.setAttribute('onclick', 'temperature(this.id)')
    newDiv.appendChild(button)
    card.appendChild(newDiv);
    content.appendChild(card);
}

function temperature (id) {
    const button = document.getElementById(`${id}`);
    for (const cities in mycities) {
        if (mycities[cities].name === id && i === 0) {
            button.textContent = `${mycities[cities].tempFahrenheit}°F`;
            i++
        } else if (mycities[cities].name === id && i === 1) {
            button.textContent = `${mycities[cities].tempCelsius}°C`;
            i = 0
        }
    }
}
