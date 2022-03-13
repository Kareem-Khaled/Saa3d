let log = document.getElementById('log') , sign = document.getElementById('sign') , logform = document.querySelector('.log') , signform = document.querySelector('.sign') ,
datalist = document.getElementById('coutries');
log.addEventListener('click',function(e){
  log.className = 'selected';
  sign.className = '';
  logform.style.display = 'block';
  signform.style.display = 'none';
  e.preventDefault();
});
sign.addEventListener('click',function(e){
  sign.className = 'selected';
  log.className = '';
  logform.style.display = 'none';
  signform.style.display = 'block';
  e.preventDefault();
});

// Query for Api

let xhr = new XMLHttpRequest();
xhr.open('GET','../JS/countries.json',true);
xhr.onload = function(){
  if(this.status === 200){
    let res = JSON.parse(this.responseText);
    let options = '';
    res.forEach(function(c){
      options+=`<option value="${c.name}">`;
    })
    datalist.innerHTML = options;
  }
}
xhr.send();