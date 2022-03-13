const p1 = document.getElementById('one'),p2 = document.getElementById('two'),p3 = document.getElementById('three') , s1 = document.getElementById('s1'),s2 = document.getElementById('s2'),s3 = document.getElementById('s3');
function disp(){
  p1.className = 'disp';
  s1.className = 'active';
  p3.className = 'hide';
  s3.className = 'disactive';
  p2.className = 'hide';
  s2.className = 'disactive';
  setTimeout(function(){
    p2.className = 'disp';
    s2.className = 'active';
    p1.className = 'hide';
    s1.className = 'disactive';
  },3000)
  setTimeout(function(){
    p3.className = 'disp';
    s3.className = 'active';
    p2.className = 'hide';
    s2.className = 'disactive';
  },6000)
}
disp();
setInterval(disp,9000);
