const artistlist = document.getElementById("artist-container"),
      addform = document.getElementById("addform"),
      searchbox = document.getElementById("search-box"),
      searchfunc = document.getElementById("search-functionality");

let increment;

window.onload = () => {
  for (increment = 0; localStorage.getItem(increment + "name") != null; ++increment)
    AddElement();
}

searchfunc.addEventListener("keyup", () => {
  for(let j = 0; j < artistlist.childElementCount; j++){
    let name = artistlist.children[j].children[2].children[0].textContent;

    if((name.toLowerCase()).indexOf(searchfunc.value)==-1)
      artistlist.children[j].style.display = "none";
    else
      artistlist.children[j].style.display = "block";
  }
});

const Delete = (artist) => {
  let i;
  for (i = parseInt(artist.children[0].alt, 10); localStorage.getItem(i + 1 + "name") != null; ++i){
    localStorage.setItem(i + "name", localStorage.getItem(i + 1 + "name"));
    localStorage.setItem(i + "desc", localStorage.getItem(i + 1 + "desc"));
    localStorage.setItem(i + "img", localStorage.getItem(i + 1 + "img"));
    for (let j = 0; j < artistlist.childElementCount; ++j){
      if(artistlist.children[j].children[0].alt == i){
        artistlist.children[j].children[0].alt = i + 1;
        break;
      }
    }
  }
  localStorage.removeItem(i + "name");
  localStorage.removeItem(i + "desc");
  localStorage.removeItem(i + "img");
  artistlist.removeChild(artist)
};

const Add = () => {
  searchbox.style.height = "250px";
  addform.style.display = "block";
}
const AddArtist = (f) => {
  let name = f.children[0].value,
      desc = f.children[1].value,
      img = f.children[2].value;

  localStorage.setItem(increment + "name", name);
  localStorage.setItem(increment + "desc", desc);
  localStorage.setItem(increment + "img", img);
  
  AddElement();
  ++increment;

  addform.style.display = "none";
  f.children[0].value = f.children[1].value = f.children[2].value = "";
  searchbox.style.height = "100px";
}

const AddElement = () => {
  let cont = document.createElement("div"),
      img = document.createElement("img"),
      btn = document.createElement("button"),
      indiv = document.createElement("div"),
      h3 = document.createElement("h3"),
      p = document.createElement("p");
  
  h3.innerHTML = localStorage.getItem(increment + "name");
  p.innerHTML = localStorage.getItem(increment + "desc");
  img.src = localStorage.getItem(increment + "img");
  img.alt = increment;

  cont.className = "artist bordering";

  btn.className = "delete";
  btn.onclick = () => Delete(cont);
  btn.innerHTML = "Delete";

  indiv.className = "artist-info";

  indiv.appendChild(h3);
  indiv.appendChild(p);

  cont.appendChild(img);
  cont.appendChild(btn);
  cont.appendChild(indiv);

  //artistlist.appendChild(cont);
  artistlist.insertBefore(cont, artistlist.firstChild);
}

