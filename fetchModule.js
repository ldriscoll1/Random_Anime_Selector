//Getting Data from html
const btns = document.querySelectorAll(".btn");
const animeName = document.querySelector("#name");
const animeImage = document.querySelector("#image");
const animeDescription = document.querySelector("#description");
const animeRating = document.querySelector("#rating");
btns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        const styles = e.currentTarget.classList;
        //Setting Up Fetch
        var url = "https://jikan1.p.rapidapi.com/genre/anime/";
        if(styles.contains("action"))
        {
            url += "1/1"
        }
        else if(styles.contains("adventure"))
        {
            url += "2/1";

        }else if(styles.contains("comedy"))
        {
            url += "4/1";

        }
        else if(styles.contains("mystery"))
        {
            url += "7/1";

        }
        else if(styles.contains("drama"))
        {
            url += "8/1";

        }
        else if(styles.contains("fantasy"))
        {
            url += "10/1";

        }
        //Basic formatting for the genres
        // 1 Action
        // 2 Adventure
        // 3
        // 4 Comedy
        // 5
        // 6
        // 7 Mystery
        // 8 Drama
        // 9
        // 10 Fantasy

        fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "jikan1.p.rapidapi.com",
                "x-rapidapi-key": "07cb6ccf43mshc70113667ee75b6p111a42jsn46be7a8b4a23"
            }
        })
                .then(res => res.json())
        .then(response => {
            //console.log(response);
            Object.entries(response).forEach(([key, value]) => {
                //Gets the anime section of the JSON
                if(JSON.stringify(key).includes('anime')){
                    //Loops through all the animes
                    //Key 2 is the number of anime
                    //For Each Loop to number from 0-99 which is the random anime in that genre
                    const randomPosition = Math.floor(Math.random() *100);
                    Object.entries(value).forEach(([key2, value2]) => {
                        if(JSON.stringify(key2).includes(randomPosition.toString())){
                            //Look through properties of the anime and get Name(2), image(3) and Summary(4)
                            var counter = 0;
                            var returnString = "";
                            Object.entries(value2).forEach(([key3, value3]) => {
                                if(counter == 2){
                                    animeName.textContent = (`${value3}`);
                                }else if(counter == 3){
                                    console.log(`${value3}`);
                                    animeImage.src = (`${value3}`);
                                    animeImage.alt = (`${value3}`);
                                    console.log(animeImage.src);
                                }else if(counter == 4){
                                    animeDescription.textContent = (`${value3}`);
                                }else if(counter == 15){
                                    animeRating.textContent = (`Rating: ${value3}`);

                                }
                                counter++;
                            });
                        }
                        
                    });
                }
            });
        })
        .catch(error => animeName.textContent = "Error");
    });
});
