//         jquery style         //
//sidenav
$(document).ready(function(){
 //main menu toggle
 $('#openMenu').click(function (e) { 
  $('.fa-bars').toggleClass('fa-xmark');
 if ($('.main-menu').width() == "0") {
  $('.main-menu').css("width", "250px");
  $('.side-navHeader').css("left", "250px");
  
  $('.main-menu li').css("padding-top", "20px");
 
 }
 else{
  $('.main-menu').css("width", "0px");
  $('.side-navHeader').css("left", "0px");
 }
  
 });
})

// variables && links of api 
let rowData  = document.getElementById('rowData'),
categories =document.getElementsByClassName('nav-type'),
 searchWord =document.getElementById('search-word'),
currentURL ="https://api.themoviedb.org/3/movie/now_playing?api_key=c46ee7b5fbd9fa436adf64d35510e95f",
popularURL ="https://api.themoviedb.org/3/movie/popular?api_key=c46ee7b5fbd9fa436adf64d35510e95f",
topRtedURL ="https://api.themoviedb.org/3/movie/top_rated?api_key=c46ee7b5fbd9fa436adf64d35510e95f",
trendURL =  "https://api.themoviedb.org/3/trending/all/day?api_key=c46ee7b5fbd9fa436adf64d35510e95f",
upcomingURL ="https://api.themoviedb.org/3/movie/upcoming?api_key=c46ee7b5fbd9fa436adf64d35510e95f",
URL ="https://api.themoviedb.org/3/movie/now_playing?api_key=c46ee7b5fbd9fa436adf64d35510e95f"
category=""

allMovies=[];

// search functions
// serch by word
async function  getMoviesByWord(e){
  var m = new XMLHttpRequest();
  m.open('GET',"https://api.themoviedb.org/3/search/movie?query="+e+"&api_key=c46ee7b5fbd9fa436adf64d35510e95f&language=en-US&page=1&include_adult=false")
  m.send();
  m.onreadystatechange = function () {
    if(m.readyState == 4 && m.status == 200){
      allMovies = JSON.parse(m.response).results
      displayMovies()
      console.log(allMovies);
}
  }
 
}
searchWord.onkeyup = function () {
  getMoviesByWord(searchWord.value);
};  

//display movies in slider
    for (let i = 0; i < categories.length; i++) {
      
      categories[i],addEventListener('click',function (e) {
        category = e.target.innerHTML
        if(category == "Now playing"){
         currentURL = URL
          displayMovies();
        }
        else if(category == "Popular"){
          currentURL =popularURL
          getMovies()
        }
        else if(category == "Top Rated"){
          currentURL =topRtedURL
          getMovies()
        }
        else if(category == "Trending"){
          currentURL =trendURL
          getMovies()
        }
        else if(category == "Upcoming"){
          currentURL =upcomingURL;
          getMovies()
        }
        else{
          console.log('error');
        }
      })
     
    
      
    }
    //get data from api
function getMovies(URL) {
  var a = new XMLHttpRequest();
  a.open('GET',currentURL)
  a.send()
  a.addEventListener('readystatechange',function () {
  
      if(a.readyState==4 && a.status==200){
          allMovies = JSON.parse((a.response)).results
          displayMovies();
          // NowPlaying.addEventListener('click',function(){
          //   displayMovies();
          // })
          
      }
      else{
       console.log('error');     
      }
    })
}
getMovies()


//play now movies
function displayMovies() {
  // imgPath = "https://image.tmdb.org/t/p/w500"
    var box =" ";
    for (let i = 0; i < allMovies.length; i++) {
        box +=`
        <div class="col-lg-4 col-sm-6">
        <div class="movie shadow rounded position-relative">
          <div class="post">
            <img
              src= 'https://image.tmdb.org/t/p/w500${allMovies[i].poster_path}'
              class="img-fluid rounded"
            />
          </div>
          <div class="layer">
          <div class="info">
            <h2>${allMovies[i].original_title}</h2>
            <p>
               ${allMovies[i].overview}
              </p>
              <p>Rate: ${allMovies[i].vote_average}</p>
              <p>${allMovies[i].release_date}</p>
          </div>

          </div>
        </div>
      </div>
        `
        rowData.innerHTML = box;
      
  }
    
}

// contact functions
//get dom elments
let usrName = document.getElementById('name'),
email = document.getElementById('email'), 
phone = document.getElementById('phone'), 
Age = document.getElementById('Age'), 
password = document.getElementById('password'), 
repassword = document.getElementById('repassword'),
NameAlert = document.getElementById("namealert"),
EmailAlert = document.getElementById("emailalert"),
PhoneAlert = document.getElementById("phonealert"),
AgeAlert = document.getElementById("agealert"),
passwordAlert = document.getElementById("passwordalert"),
RepasswordAlert = document.getElementById("repasswordalert");
//name validation 
let validName = /^[a-zA-Z0-9]+$/;

function nameValid() {
  if (validName.test(usrName.value)) {

    (NameAlert.style.display = "none")
  }
  else{
    (NameAlert.style.display = "block")
  }
}
function validEmail() {
  return 1 == /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email.value)
    ? ((EmailAlert.style.display = "none"), !0)
    : ((EmailAlert.style.display = "block"), !1);
}
function userPhoneValid() {
  return 1 ==
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
      phone.value
    )
    ? ((PhoneAlert.style.display = "none"), !0)
    : ((PhoneAlert.style.display = "block"), !1);
}
function userAgeValid() {
  return 1 == /^[1-9][0-9]?$|^100$/.test(Age.value)
    ? ((AgeAlert.style.display = "none"), !0)
    : ((AgeAlert.style.display = "block"), console.log("dkldkdlkdlk"), !1);
}
function userPasswordValid() {
  return 1 == /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password.value)
    ? ((passwordAlert.style.display = "none"), !0)
    : ((passwordAlert.style.display = "block"), !1);
}
function userRePasswordValid() {
  return password.value == repassword.value
    ? ((RepasswordAlert.style.display = "none"), !0)
    : ((RepasswordAlert.style.display = "block"), !1);
}
(AgeAlert.style.display = "none"),
usrName.addEventListener("keyup", nameValid),
email.addEventListener("keyup", validEmail),
 phone.addEventListener("keyup", userPhoneValid),
  Age.addEventListener("keyup", userAgeValid),
  password.addEventListener("keyup", userPasswordValid),
  repassword.addEventListener("keyup", userRePasswordValid);
  document.getElementById('submitBtn').addEventListener("click", function () {
    nameValid() &&
    validEmail() &&
    userPhoneValid() &&
    userAgeValid() &&
    userPasswordValid() &&
    userRePasswordValid()
      ? (document.getElementById("submitBtn").disabled = !0)
      : (document.getElementById("submitBtn").disabled = !1);
  });

