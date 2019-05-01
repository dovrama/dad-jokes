const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

const card = document.createElement('div')
card.setAttribute('class', 'card')

const h1 = document.createElement('h1')
h1.setAttribute("id", "headeris")

const p = document.createElement('p')
p.setAttribute("id", "joke")

app.appendChild(container)
container.appendChild(card)
card.appendChild(h1)
card.appendChild(p)

function callJoke(){
	var request = new XMLHttpRequest()
	request.open('GET', 'https://icanhazdadjoke.com/', true)
	request.setRequestHeader('Accept', 'application/json')
	request.onload = function() {
	var data = JSON.parse(this.response)
	if (data.status >= 200 && data.status < 400) {
		h1.textContent = "Supposedly a funny joke (ID: " + data.id + ")" 
		p.textContent = data.joke

	} else {
		h1.textContent = "Supposedly a funny joke (No joke for you!)" 
		p.textContent = "Gah, it's not working! Try again!"
	  }
	}
	request.send()
}

callJoke()

document.getElementById("searchJoke").onclick = function (){
	var ID = document.getElementById("jokeID").value
	var request = new XMLHttpRequest()
	request.open('GET', 'https://icanhazdadjoke.com/j/' + ID, true)
	request.setRequestHeader('Accept', 'application/json')
	request.onload = function() {
	var data = JSON.parse(this.response)
	if (data.status >= 200 && data.status < 400) {
		h1.textContent = "Supposedly a funny joke (ID: " + data.id + ")" 
		p.textContent = data.joke

	} else {
		h1.textContent = "Supposedly a funny joke (No joke for you!)"
		p.textContent = "Gah, it's not working! Probably a bad joke ID!"
	  }
	}
	request.send()
	document.getElementById("jokeID").value = ""
}

document.getElementById("downloadJoke").onclick = function (){
	if (document.getElementById("headeris").innerHTML != "Supposedly a funny joke (No joke for you!)") {
		var data = document.getElementById("joke").innerHTML
		var link = document.createElement("a");
		link.setAttribute("download", "joke");
		link.setAttribute("href", "data:" + "text/plain"  +  ";charset=utf-8," + encodeURIComponent(data));
		link.click();
	} else {
		alert("This is not a joke!")
	}
}