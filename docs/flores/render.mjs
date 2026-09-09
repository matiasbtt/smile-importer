import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { spawn } from 'child_process';
const FPS=30, W=1280, H=720;
const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage({viewport:{width:W+20,height:H+20}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://127.0.0.1:8099/render.html');
await p.waitForFunction(()=>window.__listo===true,null,{timeout:60000});
const DUR=await p.evaluate(()=>window.DUR);
const N=Math.round(DUR*FPS);
console.log('duración',DUR.toFixed(2),'s ·',N,'cuadros');
const ff=spawn('./node_modules/ffmpeg-static/ffmpeg',[
 '-y','-f','image2pipe','-framerate',String(FPS),'-i','-',
 '-vf','unsharp=5:5:0.42:5:5:0.0,format=yuv420p',
 '-c:v','libx264','-preset','slow','-crf','19','-movflags','+faststart',
 'flores-herbario.mp4']);
ff.stderr.on('data',()=>{});
const fin=new Promise(r=>ff.on('close',r));
for(let n=0;n<N;n++){
  await p.evaluate(t=>window.pintar(t), n/FPS);
  const d=await p.evaluate(()=>document.getElementById('cv').toDataURL('image/jpeg',0.95));
  const buf=Buffer.from(d.slice(d.indexOf(',')+1),'base64');
  if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));
  if(n%150===0)console.log('cuadro',n,'/',N);
}
ff.stdin.end();
const code=await fin;
console.log('ffmpeg salió con',code);
await b.close();
