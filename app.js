var send = document.getElementById("searchM");
var saisie_movie = document.getElementById("searchMovie");
var success = document.getElementById("success");
var contenu = document.createElement("tbody");
var cardgroup = document.getElementById("cardg");
var toprated = document.getElementById("top_rated");
var upcoming = document.getElementById("upcoming");

(function () {
  Lang();
})();

var xhr = new XMLHttpRequest(); //Nouvel objet xhr [Envoi de requête AJAX]
//var urlOMDB = "http://www.omdbapi.com/?apikey=c2337af3&s=" + saisie_movie.value;
var key = "8dd536bbbf7c8d2bf05ad77b56566c1d"; //API KEY
var baseURL = "https://api.themoviedb.org/3/";
var lang = "fr-FR";

/**
 * Appel API Recherche Films [GET Search]
 * @function getMovies
 */
function getMovies() {
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //si la requete est terminée et que la réponse est prête||Status OK
      var dataSearch = JSON.parse(this.response); //Objet JSON de données[Tableau de données]/This Objet XHR
      console.log(dataSearch);
      for (i = 0; i < dataSearch.results.length; i++) {
        //Tableau_Données(dataSearch);
        Aff_cardMovies(dataSearch);
        valid_msg(success);
      }
    } else if (this.readyState == 4 && this.status == 404) {
      //Affichage d'un message d'erreur si status invalide
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
  ); //Initialisation de l'objet avant de l'envoyé | Asynchrone
  xhr.send(); //Envoi de la requête vers serveur
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
      //si la requete est terminée et que la réponse est prête||Status OK
      var dataVideo = JSON.parse(this.response); //Objet JSON de données[Tableau de données]/This Objet XHR
      for (i = 0; i < dataVideo.results.length; i++) {
        var video = dataVideo.results[i].key;
        window.open(urlYtb + video);
      }
    } else if (this.readyState == 4 && this.status == 404) {
      //Affichage d'un message d'erreur si status invalide
      alert("Erreur 404 :/");
    }
  };

  xhr.open("GET", baseURL + "movie/" + id + "/videos?api_key=" + key, true); //Initialisation de l'objet avant de l'envoyé | Asynchrone
  xhr.send(); //Envoi de la requête vers serveur
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
      //si la requete est terminée et que la réponse est prête||Status OK
      var dataDetails = JSON.parse(this.response); //Objet JSON de données[Tableau de données]/This Objet XHR
      var details = dataDetails.imdb_id;
      window.open(urlImdb + details);
    } else if (this.readyState == 4 && this.status == 404) {
      //Affichage d'un message d'erreur si status invalide
      alert("Erreur 404 :/");
    }
  };

  xhr.open("GET", baseURL + "movie/" + id + "?api_key=" + key, true); //Initialisation de l'objet avant de l'envoyé | Asynchrone
  xhr.send(); //Envoi de la requête vers serveur
}
/**
 * Appel API Movies pour Top Rated [GET Top Rated]
 * @function getTopRated
 */
function getTopRated() {
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //si la requete est terminée et que la réponse est prête||Status OK
      var dataRated = JSON.parse(this.response); //Objet JSON de données[Tableau de données]/This Objet XHR
      for (i = 0; i < dataRated.results.length; i++) {
        Aff_cardMovies(dataRated);
      }
    } else if (this.readyState == 4 && this.status == 404) {
      //Affichage d'un message d'erreur si status invalide
      alert("Erreur 404 :/");
    }
  };

  xhr.open("GET", baseURL + "movie/top_rated" + "?api_key=" + key, true); //Initialisation de l'objet avant de l'envoyé | Asynchrone
  xhr.send(); //Envoi de la requête vers serveur
}
/**
 * Appel API Movies pour Top Rated [GET Top Rated]
 * @function Upcoming
 */
function getUpcoming() {
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //si la requete est terminée et que la réponse est prête||Status OK
      var dataRated = JSON.parse(this.response); //Objet JSON de données[Tableau de données]/This Objet XHR
      for (i = 0; i < dataRated.results.length; i++) {
        Aff_cardMovies(dataRated);
      }
    } else if (this.readyState == 4 && this.status == 404) {
      //Affichage d'un message d'erreur si status invalide
      alert("Erreur 404 :/");
    }
  };

  xhr.open("GET", baseURL + "movie/upcoming" + "?api_key=" + key, true); //Initialisation de l'objet avant de l'envoyé | Asynchrone
  xhr.send(); //Envoi de la requête vers serveur
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
    if (saisie_movie.value.length < 4) {
      alert("La saisie doit contenir au moins 4 caractères..");
    } else {
      cardgroup.innerHTML = "";
      getMovies();
    }
  }
});

send.addEventListener("click", function () {
  if (saisie_movie.value.length < 4) {
    alert("La saisie doit contenir au moins 4 caractères..");
  } else {
    cardgroup.innerHTML = "";
    getMovies();
  }
});

// var refresh = document.getElementById("refresh");
// refresh.addEventListener("click", function () {
//   window.location.reload();
// });

saisie_movie.addEventListener("click", function () {
  saisie_movie.value = "";
});

function entete() {
  //En-tête[Thead]
  var ligne = document.createElement("tr");

  var Th_titre = document.createElement("th");
  Th_titre.style.textAlign = "center";
  var titre = document.createElement("h4");
  titre.textContent = "Titre";
  ligne.appendChild(Th_titre);
  Th_titre.appendChild(titre);

  var Th_annee = document.createElement("th");
  Th_annee.style.textAlign = "center";
  Th_annee.width = "150";
  var annee = document.createElement("h4");
  annee.textContent = "Année";
  ligne.appendChild(Th_annee);
  Th_annee.appendChild(annee);

  var Th_card = document.createElement("th");
  Th_card.style.textAlign = "center";
  var card = document.createElement("h4");
  card.textContent = "Affiche";
  ligne.appendChild(Th_card);
  Th_card.appendChild(card);

  document.getElementById("contenu").appendChild(ligne);
}

function Tableau_Données(dataSearch) {
  var ligne = document.createElement("tr");

  var cell_titre = document.createElement("td");
  cell_titre.innerHTML += dataSearch.Search[i].Title;

  ligne.appendChild(cell_titre);

  var cell_annee = document.createElement("td");
  cell_annee.innerHTML += dataSearch.Search[i].Year;

  ligne.appendChild(cell_annee);

  var cell_card = document.createElement("td");
  var card = document.createElement("img");
  card.src += dataSearch.Search[i].Poster;
  card.width = "100";
  cell_card.appendChild(card);
  ligne.appendChild(cell_card);

  document.getElementById("contenu").appendChild(ligne);
}

/**
 * Option filtrage des différentes traduction possible de la recherche
 * @function Lang
 */
function Lang() {
  var lang = document.getElementsByName("lang");
  for (let i = 0; i < lang.length; i++) {
    lang[i].addEventListener("click", function () {
      lang = this.target;
      cardgroup.innerHTML = "";
      getMovies();
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
  card.id = "card";

  var affiche = document.createElement("img");
  affiche.className = "card-img-top zoom";
  affiche.src = "https://image.tmdb.org/t/p/w300" + dataSearch.results[i].poster_path;
  affiche.style.height = "400px";

  var body = document.createElement("div");
  body.className = "card-body position-absolute";

  var titre = document.createElement("h5");
  titre.className = "card-title";
  titre.innerText = dataSearch.results[i].title;

  var description = dataSearch.results[i].overview;
  var synopsis = document.createElement("p");
  synopsis.className = "card-text synopsis";
  synopsis.innerText = description.slice(0, 150) + " ...";

  // var foot = document.createElement("div");
  // foot.className = "card-footer";

  var sortie = dataSearch.results[i].release_date;
  var small = document.createElement("small");
  small.className = "text-muted";
  small.style.fontSize = "16px";
  small.innerText = "Sortie : " + sortie;

  var id = dataSearch.results[i].id;

  var btnD = document.createElement("button");
  btnD.type = "button";
  btnD.innerText = "More details";
  btnD.className = "btn btn-info";
  var spanD = document.createElement("span");
  spanD.innerHTML = "details";
  spanD.className = "material-icons";
  btnD.addEventListener("click", function () {
    getDetails(id);
  });

  var btnT = document.createElement("button");
  btnT.type = "button";
  btnT.innerText = "Trailer";
  btnT.className = "btn btn-info";
  var spanT = document.createElement("span");
  spanT.innerHTML = "video_library";
  spanT.className = "material-icons";
  btnT.addEventListener("click", function () {
    getTrailer(id);
  });

  card.appendChild(affiche);
  card.appendChild(body);
  // card.appendChild(foot);
  body.appendChild(titre);
  body.appendChild(synopsis);
  body.appendChild(btnD);
  body.appendChild(btnT);
  // foot.appendChild(small);

  cardgroup.appendChild(card);

  $("#card").hover(function () {
    if ($(this).hasClass("active")){
      $(".card-body").slideUp(function () {
        // $('.card').removeClass('active');
      });
    } else {
      // $('.card').addClass('active');
      $('.card-body').slideDown();
    }
  });
}

function valid_msg(confirm) {
  confirm.style.display = "block";
  confirm.textContent = "Recherche " + saisie_movie.value + " effectuée..";

  var time = setInterval(function () {
    confirm.style.display = "none";
    clearInterval(time);
  }, 2500);
}
