var map = [];
var w = 101;
var h = 101;
var my = 0;
var mx = 0;
var tw = 4;
var th = 4;
var px = 2;
var py = 2;
var backtrack = false;

if(w/2 === Math.floor(w/2))w++;
if(h/2 === Math.floor(h/2))h++;
for(my = 0; my < h; my++)
{
  map[my] = [];
  for(mx = 0; mx < w; mx++)
  {
    if(mx === 0 || mx === w - 1 || my === 0 || my === h - 1)
      map[my][mx] = 3;
    else
      map[my][mx] = 0;
  }
}
map[py][px] = 1;

var c = document.getElementById("game");
var ctx = c.getContext("2d");
c.width = w * tw;
c.height = h * th;
var keymap = [];
var gloop = window.setInterval(function(){mazeLoop();},1);

ctx.fillStyle = "black";
ctx.fillRect(0,0,c.width,c.height);
for(my = 0; my < h; my++)
for(mx = 0; mx < w; mx++)
  if(map[my][mx] === 1)
  {
    ctx.fillStyle = "white";
    ctx.fillRect(mx * tw, my * th, tw, th);
  }
  else if(map[my][mx] === 2)
  {
    ctx.fillStyle = "blue";
    ctx.fillRect(mx * tw, my * th, tw, th);
  }
  else if(map[my][mx] === 3)
  {
    ctx.fillStyle = "red";
    ctx.fillRect(mx * tw, my * th, tw, th);
  }

function mazeLoop()
{
  if(!backtrack)
  {
    var cho = "";
    if(map[py - 2][px] === 0)cho += "u";
    if(map[py + 2][px] === 0)cho += "d";
    if(map[py][px - 2] === 0)cho += "l";
    if(map[py][px + 2] === 0)cho += "r";
    
    if(cho.length > 0)
    {
      var rnd = cho.charAt(Math.floor(Math.random() * cho.length));
      ctx.fillStyle = "white";
      if(rnd === "u")
      {
        map[py - 1][px] = 1;
        map[py - 2][px] = 1;
        ctx.fillRect(px * tw,(py - 1) * th,tw,th);
        ctx.fillRect(px * tw,(py - 2) * th,tw,th);
        py -= 2;
      }
      else if(rnd === "d")
      {
        map[py + 1][px] = 1;
        map[py + 2][px] = 1;
        ctx.fillRect(px * tw,(py + 1) * th,tw,th);
        ctx.fillRect(px * tw,(py + 2) * th,tw,th);
        py += 2;
      }
      else if(rnd === "l")
      {
        map[py][px - 1] = 1;
        map[py][px - 2] = 1;
        ctx.fillRect((px - 1) * tw,py * th,tw,th);
        ctx.fillRect((px - 2) * tw,py * th,tw,th);
        px -= 2;
      }
      else if(rnd === "r")
      {
        map[py][px + 1] = 1;
        map[py][px + 2] = 1;
        ctx.fillRect((px + 1) * tw,py * th,tw,th);
        ctx.fillRect((px + 2) * tw,py * th,tw,th);
        px += 2;
      }
      
    }
    else
      backtrack = true;
  }
  else if(px === 2 && py === 2)
  {
    window.clearInterval(gloop);
    map[px][py] = 2;
    for(my = 0; my < h; my++)
    for(mx = 0; mx < w; mx++)
      if(map[my][mx] === 0)
        map[my][mx] = 0;
      else if(map[my][mx] === 2)
        map[my][mx] = 1;
    map[h - 3][w - 3] = 4;
    
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,c.width,c.height);
    for(my = 0; my < h; my++)
    for(mx = 0; mx < w; mx++)
      if(map[my][mx] === 1)
      {
        ctx.fillStyle = "white";
        ctx.fillRect(mx * tw, my * th, tw, th);
      }
      else if(map[my][mx] === 3)
      {
        ctx.fillStyle = "red";
        ctx.fillRect(mx * tw, my * th, tw, th);
      }
      else if(map[my][mx] === 4)
      {
        ctx.fillStyle = "lime";
        ctx.fillRect(mx * tw, my * th, tw, th);
      }
    
    gloop = window.setInterval(function(){gameLoop();},1000 / 30);
  }
  else if(map[py - 2][px] === 0
       || map[py + 2][px] === 0
       || map[py][px - 2] === 0
       || map[py][px + 2] === 0)backtrack = false;
  else 
  {
    ctx.fillStyle = "blue";
    ctx.fillRect(px * tw,py * th,tw,th);
    if(map[py - 1][px] === 1)
    {
      map[py][px] = 2;
      map[py - 1][px] = 2;
      ctx.fillRect(px * tw,(py - 1) * th,tw,th);
      py -= 2;
    }
    else if(map[py + 1][px] === 1)
    {
      map[py][px] = 2;
      map[py + 1][px] = 2;
      ctx.fillRect(px * tw,(py + 1) * th,tw,th);
      py += 2;
    }
    else if(map[py][px - 1] === 1)
    {
      map[py][px] = 2;
      map[py][px - 1] = 2;
      ctx.fillRect((px - 1) * tw,py * th,tw,th);
      px -= 2;
    }
    else if(map[py][px + 1] === 1)
    {
      map[py][px] = 2;
      map[py][px + 1] = 2;
      ctx.fillRect((px + 1) * tw,py * th,tw,th);
      px += 2;
    }
  }
}

function gameLoop()
{
  ctx.fillStyle = "white";
  
  if(keymap[38] && !keymap[40] && (map[py - 1][px] === 1 || map[py - 1][px] === 4))
  {
    ctx.fillRect(px * tw, py * th, tw, th);
    py--;
  }
  else if(keymap[40] && !keymap[38] && (map[py + 1][px] === 1 || map[py + 1][px] === 4))
  {
    ctx.fillRect(px * tw, py * th, tw, th);
    py++;
  }
  
  if(keymap[37] && !keymap[39] && (map[py][px - 1] === 1 || map[py][px - 1] === 4))
  {
    ctx.fillRect(px * tw, py * th, tw, th);
    px--;
  }
  else if(keymap[39] && !keymap[37] && (map[py][px + 1] === 1 || map[py][px + 1] === 4))
  {
    ctx.fillRect(px * tw, py * th, tw, th);
    px++;
  }
  
  ctx.fillStyle = "blue";
  ctx.fillRect(px * tw, py * th, tw, th);
  
  if(map[py][px] === 4)//maze solved
  {
    
  }
}

onkeydown = onkeyup = function(e)
{
    e = e || event;
    keymap[e.keyCode] = e.type == "keydown";
    e.preventDefault();
    return false;
};