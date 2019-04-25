var url1 = "https://api.datamuse.com/words?";
var url2 = "rel_rhy="
var mdstr = ""
var url3 = "&md="
//var urlword = "rainbow";
//var url2 = "";
//var link
var usersong
var spaces
var htmlwords
var url
//ar allwords
var relatedIndex = 0
var focusword
var popup
var popup1
var Gfield
var Nfield
var definition = undefined 


function setup() { 
  var checkboxes = document.getElementsByTagName('input');
  for (var i=0; i<checkboxes.length; i++)  {
    if (checkboxes[i].type == 'checkbox')   {
      checkboxes[i].checked = false;
    }
  }
  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
  //document.getElementById("word1234")
  //  .addEventListener("keyup", function(event) {
    //event.preventDefault();
 //   askWordnikType()
  //  if (event.keyCode === 13) {
   //     document.getElementById("usersong").innerHTML = htmlwords + "<br>";
        
  //  }
//});
  //createCanvas(400, 200);

 // var button = select('#submit');
 // button.mousePressed(askWordnikType);
  song = select('#word1234');
  askWordnikType();
}

var usersong = "";


function getusersong(){
   usersong = song.value()
   usersong = usersong.replace(/a|i|o/gi, function (x) {
    return x.toUpperCase();
  }); 
  return usersong;
}


function nospaces(usersong = usersong, htmlwords = htmlwords, url = url) {
    //print when typing logic
    var potentialbreak = ""
    var potentialspace = ""
    console.log(usersong.length)
    if(usersong==undefined){
      wordarray = "";
    }
    else{
      
      wordarray = usersong.toLowerCase();
    }
    spaces = 0;
    letternumber = usersong.length+1
    console.log(wordarray)

    htmlwords = htmlwords +"<span id ="+ wordarray +'onclick="selectText('+letternumber+')"'+ ">" +wordarray+potentialspace+" </span>"+potentialbreak
    console.log(htmlwords)
    //put word on screen
    document.getElementById("usersong").innerHTML = ""+htmlwords;
  }


function spacesf(usersong = usersong, htmlwords = htmlwords, url=url) {
      //typing logic
    //set spaces equal to their spaces
    usersong = usersong.replaceAll("\n"," <br> ")
    spaces = usersong.match(/ /g).length;

    //give each word an html id to reference (number of the word is added to the end)
    letternumber = 0
    for (var i=0;i<spaces+1;i++){
      wordarray = usersong.split(" ");
      console.log(letternumber)
      if(wordarray[i]=="<br>"){
       htmlwords = htmlwords+"<br>"
       wordarray[i] = ""
      }
      else{
        
      var letternumber = letternumber+  wordarray[i].length+1
      htmlwords = htmlwords +"<span id ="+ wordarray[i] +i+'" onmouseover="askWordnikHover(\''  +wordarray[i]+  '\')"' +'onclick="selectText('+letternumber+')"' +">" +wordarray[i].toLowerCase()+" </span>"
      console.log(htmlwords)
      }
    }
    console.log(wordarray)

    //set the url to the last word when they type
    focusword = wordarray[wordarray.length-1].replace(/0|1|2|3|4|5|6|7|8|9/gi, function (x) {
      return x.replace("")}); 
    url = url1+url2+focusword
    

    //write the song on the screen
    document.getElementById("usersong").innerHTML = htmlwords;

return url
}


//ping the api when they are typing
function askWordnikType() {
  //get user input : usersong
  usersong = getusersong();
  focusword = usersong
  if (usersong.includes("\n")){
    usersong = usersong.replace("\n", " \n")
  }
  
  //initialize url and html for no spaces
  //if no spaces print value to html and mouselisten
  if (usersong.match(/ /g) == null || usersong.match(/ /g)==undefined) {
    url = url1+url2 + usersong;
    htmlwords = ""

    nospaces(usersong, htmlwords, url);
  
  }
  //if spaces
  else {
   url = url1+url2 
   htmlwords = ""
   url = spacesf(usersong, htmlwords, url);
  }

  var listtype = url2.replace("=","")
  var queryecho = "&qe="+listtype
  //console.log(url+queryecho+url3+mdstr)
  //console.log(usersong)
  loadJSON(url+queryecho+url3+mdstr, getList);
  
}
console.log(url)

function askWordnikHover(word=word){
  console.log(word)
  var listtype = url2.replace("=","")
  var queryecho = "&qe="+listtype
  url = url1+url2+word;
  focusword = word;
  loadJSON(url+queryecho+url3+mdstr, getList)
  loadJSON(url+queryecho+url3+mdstr, getMd)

}

function changeListPage(flag){
  if(flag){
    relatedIndex = relatedIndex + 10;
    loadJSON(url1+url2+focusword, getList);   
  }
  else if(relatedIndex-10>= 0 ){
    relatedIndex = relatedIndex - 10;
    loadJSON(url1+url2+focusword, getList);

  }

}
function changeList(relationship) {
  if(url2!=relationship){
    url2 = relationship
    loadJSON(url1+url2+focusword, getList);
  }
}


function metaPop(field) {
  if(field == "defs"){
  Gfield = field
  popup = document.getElementById(field);
  popup.classList.toggle("show");
  }
  if(field == 0){
    Nfield = field
    popup1 = document.getElementById(field);
    popup1.classList.toggle("show");

  }
  console.log(field)
  var listtype = url2.replace("=","")
  var queryecho = "&qe="+listtype

  loadJSON(url+queryecho+url3+mdstr, getMd)
}

function getMd(data){
  var errything
  console.log(errything)
  //popup.innerHTML = Gfield
  if(Gfield=='defs'){
    errything = data[0].defs[0]
    popup.innerHTML = errything
  }
  if(Nfield==0){
    console.log(data[0].numSyllables)
    errything = data[0].tags
    errything.push(data[0].numSyllables)
    errything = String(errything)

    //errything = errything.replace(","," ")
    errything = errything.replaceAll(","," ")
    errything = errything.replace("pron","\n\nPronounciation\n")
    errything = errything.replace("spellcor", "\nspelling!")
    errything = errything.replace("query","pos: ")
    errything = errything.replace("f:", "\nfrequency:")
    console.log(errything)
    popup1.innerHTML = errything
  }

  

  
}
function mdLetters(letter){
  if(mdstr.includes(letter)){
     mdstr = mdstr.replace(letter,"")
  }
  else{
    mdstr += letter
  }
}
function selectText(index) {
  const input = document.getElementById('word1234');  
  input.focus();
  input.setSelectionRange(index-1, index-1);
}

function getList(data) {
  allwords = ""
  if(data.length<10){
    relatedIndex=0
  }
  if(relatedIndex>data.length){
    relatedIndex = relatedIndex-20
  }
  for (var i=relatedIndex;i<=relatedIndex+9;i++){
    rhyword = data[i].word;
    allwords = allwords + rhyword + "<br>";
   // console.log(rhyword);
    document.getElementById("rhymes").innerHTML = allwords;
    
  }
}


function buttonCode()
{
  alert("Button code executed.");
}