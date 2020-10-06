var send = document.getElementById("search_btn");
var saisie_movie = document.getElementById("search_input");
var success = document.getElementById("success");
var contenu = document.createElement("tbody");
var cardgroup = document.getElementById("cardg");
var toprated = document.getElementById("top_rated");
var upcoming = document.getElementById("upcoming");

(function () {
  Lang();
})();

var xhr = new XMLHttpRequest(); //* Nouvel objet xhr [Envoi de requête AJAX]
var key = "8dd536bbbf7c8d2bf05ad77b56566c1d"; //* API KEY
var baseURL = "https://api.themoviedb.org/3/";
var lang = "fr-FR";

/**
 * Appel API Recherche Films [GET Search]
 * @function getMovies
 */
function getMovies() {
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //* Si la requete est terminée et que la réponse est prête||Status OK
      let data = JSON.parse(this.response); //* Objet JSON de données[Tableau de données]/This->Objet XHR
      for (i = 0; i < data.results.length; i++) {
        Aff_cardMovies(data);
        valid_msg(success);
      }
    } else if (this.readyState == 4 && this.status == 404) {
      //* Affichage d'un message d'erreur si status invalide
      alert("Erreur 404 :/");
    }
  };

  xhr.open(
    "GET",
    baseURL +
      "search/movie?api_key=" +
      key +
      "&language=" +
      lang +
      "&query=" +
      saisie_movie.value,
    true
  ); //* Initialisation de l'objet avant de l'envoyé | Asynchrone
  xhr.send(); //* Envoi de la requête vers serveur
}

var urlYtb = "https://www.youtube.com/embed/";

/**
 * Appel API Movies pour Trailer [GET Video]
 * Paramètre(s) id
 * @function getTrailer
 */
function getTrailer(id) {
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var dataVideo = JSON.parse(this.response);
      for (i = 0; i < dataVideo.results.length; i++) {
        var video = dataVideo.results[i].key;
        window.open(urlYtb + video);
      }
    } else if (this.readyState == 4 && this.status == 404) {
      alert("Erreur 404 :/");
    }
  };
  xhr.open("GET", baseURL + "movie/" + id + "/videos?api_key=" + key, true);
  xhr.send();
}

var urlImdb = "https://www.imdb.com/title/";
/**
 * Appel API Movies pour Details [GET Details]
 * Paramètre(s) id
 * @function getDetails
 */
function getDetails(id) {
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var dataDetails = JSON.parse(this.response);
      var details = dataDetails.imdb_id;
      window.open(urlImdb + details);
    } else if (this.readyState == 4 && this.status == 404) {
      alert("Erreur 404 :/");
    }
  };
  xhr.open("GET", baseURL + "movie/" + id + "?api_key=" + key, true);
  xhr.send();
}
/**
 * Appel API Movies pour Top Rated [GET Top Rated]
 * @function getTopRated
 */
function getTopRated() {
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var dataRated = JSON.parse(this.response);
      for (i = 0; i < dataRated.results.length; i++) {
        Aff_cardMovies(dataRated);
      }
    } else if (this.readyState == 4 && this.status == 404) {
      alert("Erreur 404 :/");
    }
  };

  xhr.open("GET", baseURL + "movie/top_rated" + "?api_key=" + key, true);
  xhr.send();
}
/**
 * Appel API Movies pour Top Rated [GET Top Rated]
 * @function Upcoming
 */
function getUpcoming() {
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var dataRated = JSON.parse(this.response);
      for (i = 0; i < dataRated.results.length; i++) {
        Aff_cardMovies(dataRated);
      }
    } else if (this.readyState == 4 && this.status == 404) {
      alert("Erreur 404 :/");
    }
  };

  xhr.open("GET", baseURL + "movie/upcoming" + "?api_key=" + key, true);
  xhr.send();
}

upcoming.addEventListener("click", function () {
  cardgroup.innerHTML = "";
  getUpcoming();
});

toprated.addEventListener("click", function () {
  cardgroup.innerHTML = "";
  getTopRated();
});

saisie_movie.addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    if (saisie_movie.value == "") {
      alert("Veuillez saisir un titre de film");
    } else {
      cardgroup.innerHTML = "";
      getMovies();
    }
  }
});

send.addEventListener("click", function (e) {
  if (saisie_movie.value == "") {
    e.preventDefault();
    alert("Veuillez saisir un titre de film");
    saisie_movie.focus();
  } else {
    cardgroup.innerHTML = "";
    getMovies();
  }
});

/**
 * Option filtrage des différentes traduction possible de la recherche
 * @function Lang
 */
function Lang() {
  let language = document.getElementsByName("lang");
  for (let i = 0; i < language.length; i++) {
    language[i].addEventListener("click", function (e) {
      if (this.target == "en-US") {
        cardgroup.innerHTML = "";
        lang = "en-US";
        getMovies();
      } else if (this.target == "fr-FR") {
        cardgroup.innerHTML = "";
        lang = "fr-FR";
        getMovies();
      }
    });
  }
}

/**
 * Fonction d'affichage poster film (card)
 * @function Aff_cardMovies
 */
function Aff_cardMovies(dataSearch) {
  var card = document.createElement("div");
  card.className = "card";
  // card.id = "card" + i;

  var affiche = document.createElement("img");
  affiche.className = "card-img-top";
  affiche.src =
    "https://image.tmdb.org/t/p/w300" + dataSearch.results[i].poster_path;
  affiche.style.height = "400px";

  var body = document.createElement("div");
  body.className = "card-body ";

  var titre = document.createElement("h5");
  titre.className = "film-title";
  titre.innerText = dataSearch.results[i].title;

  var synopsis = document.createElement("p");
  synopsis.className = "synopsis";
  synopsis.innerText = dataSearch.results[i].overview;

  var sortie = document.createElement("p");
  sortie.className = "sortie";
  sortie.innerText = "Sortie en " + dataSearch.results[i].release_date;

  //* Récupération de l'id pour getTrailer et getImdb
  var id = dataSearch.results[i].id;

  var btnD = document.createElement("button");
  btnD.type = "button";
  btnD.innerText = "Details ";
  btnD.className = " row btn_D";
  var i_Detail = document.createElement("i");
  i_Detail.className = "fas fa-info i";
  btnD.addEventListener("click", function () {
    getDetails(id);
  });

  var btnT = document.createElement("button");
  btnT.type = "button";
  btnT.innerText = "Trailer on Youtube ";
  btnT.className = "btn_T";
  var i_Ytb = document.createElement("i");
  i_Ytb.className = "fab fa-youtube i";
  btnT.addEventListener("click", function () {
    getTrailer(id);
  });

  card.appendChild(affiche);
  card.appendChild(body);
  body.appendChild(titre);
  body.appendChild(synopsis);
  body.appendChild(sortie);
  body.appendChild(btnD);
  body.appendChild(btnT);
  btnT.appendChild(i_Ytb);
  btnD.appendChild(i_Detail);

  cardgroup.appendChild(card);
}

function valid_msg(confirm) {
  confirm.style.display = "block";
  confirm.textContent = "Recherche " + saisie_movie.value + " effectuée..";

  var time = setInterval(function () {
    confirm.style.display = "none";
    clearInterval(time);
  }, 2500);
}

//* Animation Jquery
$(".input").keyup(function () {
  $("#cardg").animate(
    {
      left: 1,
    },
    2500
  );
});
$(".search-btn").click(function () {
  $("#cardg").animate(
    {
      left: 1,
    },
    2500
  );
});
