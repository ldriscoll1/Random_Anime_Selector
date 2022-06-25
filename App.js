"use strict";
//Getting Data from html
const btns = document.querySelectorAll(".btn");
const animeName = document.querySelector("#name");
const animeImage = document.querySelector("#image");
const animeDescription = document.querySelector("#description");
const animeRating = document.querySelector("#rating");
//Adding in Button Functionality
btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const styles = e.currentTarget.classList;
    //Setting Up Fetch

    //Adds the URL for the different genres
    const genreToUrlDict = {
      action: "1",
      adventure: "2",
      comedy: "4",
      mystery: "7",
      drama: "8",
      fantasy: "10",
    };
    //Computing Genre based on button pressed and genre
    const genre = styles[1];
    const genreURL = genreToUrlDict[genre];
    const url = "https://jikan1.p.rapidapi.com/genre/anime/" + genreURL + "/1";

    //Waiting Image
    animeImage.src =
      "http://phette23.github.io/speed-is-a-feature/img/loadingBar.gif";
    animeDescription.classList.add(".hidden");
    animeName.classList.add(".hidden");
    animeRating.classList.add(".hidden");

    fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "jikan1.p.rapidapi.com",
        "x-rapidapi-key": "07cb6ccf43mshc70113667ee75b6p111a42jsn46be7a8b4a23",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        //Gets the anime section of the JSON
        try {
          const { anime: animeOptions = undefined } = response;
          const randomPosition = Math.floor(Math.random() * 100);
          //Error Detection
          //Checks if animeOptions = {}
          if (animeOptions == undefined) throw "Anime Option Not Found";

          //Gets anime at random position
          const { [randomPosition]: animeDetails = undefined } = animeOptions;
          //Error Detection
          //Checks if animeDetails = {}
          if (animeDetails == undefined) throw "Anime Details Not Found";

          //Look through properties of the anime and get Name, image, Summary and Rating
          const { image_url = "" } = animeDetails;
          const { title = "" } = animeDetails;
          const { synopsis: description = "" } = animeDetails;
          const { score: rating = 0 } = animeDetails;

          animeName.textContent = `${title}`;
          animeImage.src = `${image_url}`;
          animeImage.alt = `${image_url}`;
          animeDescription.textContent = `${description}`;
          animeRating.textContent = `Rating: ${rating}`;
        } catch (err) {
          alert(`Error: ${err}`);
        }
      })
      .catch((error) => (animeName.textContent = "Error"));
  });
});
