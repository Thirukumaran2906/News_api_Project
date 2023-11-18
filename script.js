const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");
const API_KEY = "4f57a526adc5435d832cf4e31bcf9602";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";
var newsArray=[];

window.onload = function() {
    newsType.innerHTML="<h4> Today's Hot Headlines</h4>";
    fetchHeadlines();
};



generalBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>General-News</h4>";
    fetchGeneralNews();
});

businessBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Business-News</h4>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Sports-News</h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Entertainment-News</h4>";
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Tech-News</h4>";
    fetchTechnologyNews();
});

searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Search -> "+newsQuery.value+"</h4>";
    fetchQueryNews();
});

const fetchHeadlines = async () => {
    const res = await fetch(HEADLINES_NEWS+API_KEY);
    newsArray= [];
    if(res.status >=200 && res.status < 300)
     {
        const data = await res.json();
        newsArray = data.articles;
        console.log(data);
    } 
    else 
    {
        console.log(res.status, res.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}


const fetchGeneralNews = async () => {
    const res = await fetch(GENERAL_NEWS+API_KEY);
    newsArray = [];
    if(res.status >=200 && res.status < 300) 
    {
        const data = await response.json();
        newsArray= data.articles;
        console.log(data)
    } 
    else 
    {
        console.log(res.status, res.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchBusinessNews = async () => {
    const res= await fetch(BUSINESS_NEWS+API_KEY);
    newsArray=[];
    if(res.status >=200 && res.status < 300) 
    {
        const data = await res.json();
        newsArray = data.articles;
        console.log(data);
    } 
    else 
    {
        console.log(res.status, res.statusText);
        newsdetails.innerHTML = "<h5>No data was found</h5>"
        return;
    }

    displayNews();
}

const fetchEntertainmentNews = async () => {
    const res = await fetch(ENTERTAINMENT_NEWS+API_KEY);
    newsArray= [];
    if(res.status >=200 && res.status < 300) {
        const data = await res.json();
        console.log(data);
        newsArray = data.articles;
    } 
    else 
    {
        console.log(res.status, res.statusText);
        newsdetails.innerHTML = "<h5>No data was found</h5>"
        return;
    }

    displayNews();
}

const fetchSportsNews = async () => 
{
    const res = await fetch(SPORTS_NEWS+API_KEY);
    newsDataArr = [];
    if(res.status >=200 && res.status < 300) 
    {
        const data = await res.json();
        newsArray = data.articles;
        console.log(data);
    } 
    else 
    {
        console.log(res.status, res.statusText);
        newsdetails.innerHTML = "<h5>No data was found</h5>"
        return;
    }

    displayNews();
}

const fetchTechnologyNews = async () => {
    const res = await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsArray = [];
    if(res.status >=200 && res.status < 300) 
    {
        const data = await res.json();
        newsArray = data.articles;
        console.log(data)
    } 
    else 
    {
        console.log(res.status, res.statusText);
        newsdetails.innerHTML = "<h5>No data was found</h5>"
        return;
    }

    displayNews();
}

const fetchQueryNews = async () => {

    if(newsQuery.value == null)
    {
        return;
    }

    const res = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);
    newsArray = [];
    if(res.status >= 200 && res.status < 300) 
    {
        const data = await res.json();
        newsArray = data.articles;
    } 
    else 
    {

        console.log(res.status, res.statusText);
        newsdetails.innerHTML = "<h5>No data found/not fetched</h5>"
        return;
    }

    displayNews();
}

function displayNews() {

    newsdetails.innerHTML = "";

    if(newsArray.length == 0) 
    {
        newsdetails.innerHTML = "<h5>No data was fetched...</h5>"
        return;
    }

    newsArray.forEach(news => {

        var date = news.publishedAt.split("T");
        
        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h5');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-primary";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more...";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });

}