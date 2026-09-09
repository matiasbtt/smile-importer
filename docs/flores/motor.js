/* Motor de la pieza: 12 planos, cámara viva, transiciones imposibles, bucle exacto. */
window.HERBARIO=(function(){
const FRAG=`
precision highp float;
varying vec2 vUv;
uniform sampler2D uA,uB;
uniform vec2 uFitA,uFitB,uLoc,uWarp,uGl,uRes;
uniform vec4 uCamA,uCamB;
uniform float uT,uP;
uniform int uTr;

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
 float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0));
 return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.03;a*=0.5;}return v;}

vec2 cam(vec2 uv,vec4 c,float loc,vec2 fit){
 float e=loc*loc*(3.0-2.0*loc);
 float z=mix(c.x,c.y,e);
 vec2 p=(uv-0.5)/z+0.5+vec2(c.z,c.w)*(e-0.5);
 return (p-0.5)*fit+0.5;
}
vec3 mira(sampler2D tex,vec2 uv,float warp,float gl,float sem){
 vec2 q=uv; float r=length(uv-0.5);
 q+=normalize(uv-0.5+vec2(0.0001))*sin(uT*0.55+sem)*0.0035*smoothstep(0.05,0.7,r);
 vec2 w=vec2(fbm(uv*3.2+vec2(uT*0.06,0.0)+sem),fbm(uv*3.2+vec2(0.0,-uT*0.05)+sem+9.1))-0.5;
 q+=w*warp*(0.35+0.9*r);
 q+=vec2(sin(uv.y*38.0+uT*1.1+sem),cos(uv.x*31.0-uT*0.85))*0.0009*smoothstep(0.15,0.75,r);
 float banda=floor(uv.y*26.0), gs=floor(uT*7.0);
 float on=step(0.93-gl*0.30,hash(vec2(banda,gs)));
 q.x+=on*(hash(vec2(banda*3.7,gs))-0.5)*0.10*gl;
 vec2 ca=(uv-0.5)*0.0032*(0.5+gl*2.6);
 vec3 c;
 c.r=texture2D(tex,q+ca).r; c.g=texture2D(tex,q).g; c.b=texture2D(tex,q-ca).b;
 c.r=mix(c.r,texture2D(tex,q+vec2(0.014*gl*on,0.0)).r,on*gl);
 c.b=mix(c.b,texture2D(tex,q-vec2(0.010*gl*on,0.0)).b,on*gl);
 return c;
}
float motas(vec2 uv){
 float s=0.0;
 for(int i=0;i<3;i++){
  float fi=float(i);
  vec2 g=uv*vec2(9.0+fi*4.0,6.0+fi*3.0);
  g.y+=uT*(0.055+fi*0.045); g.x+=sin(uT*0.3+fi+uv.y*6.0)*0.15;
  vec2 id=floor(g),f=fract(g)-0.5;
  if(hash(id+fi*17.0)>0.935) s+=smoothstep(0.07,0.0,length(f));
 }
 return s;
}
void main(){
 vec2 uv=vUv;
 vec2 uvA=cam(uv,uCamA,uLoc.x,uFitA);
 vec2 uvB=cam(uv,uCamB,uLoc.y,uFitB);
 float p=uP, m=0.0, glA=uGl.x, glB=uGl.y;
 vec2 dA=vec2(0.0),dB=vec2(0.0);
 vec3 flash=vec3(0.0);

 if(p>0.0){
  if(uTr==0){                                   /* doblez de papel */
   float cr=p*1.16-0.08, d=uv.x-cr;
   m=1.0-smoothstep(-0.004,0.004,d);
   dA.x+=pow(max(0.0,1.0-abs(d)*6.0),2.0)*0.07;
   dB.x-=pow(max(0.0,1.0-abs(d)*8.0),2.0)*0.03;
   flash+=vec3(0.95,0.92,0.85)*exp(-abs(d)*240.0)*0.75;
  }else if(uTr==1){                             /* rasgado */
   float e=fbm(vec2(uv.y*7.0,3.0))*0.22+fbm(vec2(uv.y*23.0,9.0))*0.06;
   float d=(uv.x*0.92+e)-(p*1.42-0.22);
   m=1.0-smoothstep(-0.006,0.006,d);
   dA.x+=exp(-abs(d)*40.0)*0.05;
   flash+=vec3(0.93,0.89,0.81)*exp(-abs(d)*170.0)*0.6;
  }else if(uTr==2){                             /* datamosh */
   vec2 g=floor(uv*vec2(26.0,15.0));
   float h=hash(g+floor(uT*9.0));
   vec2 off=(vec2(hash(g+1.3),hash(g+7.7))-0.5)*0.30*p*step(0.32,h);
   dA+=off; dB+=off*0.35;
   m=step(hash(g+2.9),p*1.25);
   glA+=p*1.1; glB+=p*0.5;
  }else if(uTr==3){                             /* separación de canales */
   dA.x+=p*0.30; dB.x-=(1.0-p)*0.30;
   m=smoothstep(0.34,0.66,p);
   glA+=p*1.4; glB+=(1.0-p)*1.4;
  }else if(uTr==4){                             /* latente sin resolver */
   vec2 g=floor(uv*vec2(44.0,26.0));
   float k=sin(3.14159*p);
   vec3 rr=vec3(hash(g+floor(uT*13.0)),hash(g+5.1+floor(uT*13.0)),hash(g+9.3+floor(uT*13.0)));
   m=step(hash(g*1.7),p);
   flash+=(rr-0.36)*k*0.9;
  }else if(uTr==5){                             /* atravesar la flor */
   dA-=(uvA-0.5)*p*0.55;
   dB+=(uvB-0.5)*(1.0-p)*0.75;
   m=smoothstep(0.14,0.86,p);
   flash+=vec3(0.60,0.63,0.70)*pow(sin(3.14159*p),3.0)*0.14;
  }else if(uTr==6){                             /* barrido al revés */
   float k=sin(3.14159*p);
   dA+=vec2(1.0,0.15)*k*0.10*(hash(vec2(floor(uv.y*180.0),floor(uT*24.0)))-0.5);
   dB+=vec2(-1.0,0.10)*k*0.07*(hash(vec2(floor(uv.y*140.0),floor(uT*24.0)+3.0))-0.5);
   m=smoothstep(0.28,0.72,p); glA+=k*0.5;
  }else if(uTr==7){                             /* arrugado */
   float k=sin(3.14159*p);
   vec2 cel=uv*5.0; vec2 id=floor(cel),f=fract(cel)-0.5;
   float cr=abs(f.x)+abs(f.y); vec2 dir=normalize(f+vec2(0.001));
   dA+=dir*cr*k*0.11*(0.5+hash(id)); dB+=dir*cr*k*0.05;
   m=smoothstep(0.44,0.56,p);
   flash+=vec3(1.0,0.97,0.90)*pow(max(0.0,1.0-cr*1.6),6.0)*k*0.28;
  }else if(uTr==8){                             /* brote desde el centro */
   vec2 d0=(uv-vec2(0.5,0.62))*vec2(1.7,1.0);
   float r=length(d0);
   float e=fbm(vec2(atan(d0.y,d0.x)*2.2,4.0))*0.18;
   float d=r-p*1.02+e-0.10;
   m=1.0-smoothstep(-0.02,0.02,d);
   flash+=vec3(0.85,0.90,0.80)*exp(-abs(d)*85.0)*0.4;
  }else if(uTr==9){                             /* costura de espejo */
   float k=sin(3.14159*p);
   dA.x+=(1.0-2.0*uvA.x)*step(0.5,uv.x)*k;
   float d=abs(uv.x-0.5)-p*0.52;
   m=1.0-step(0.0,d);
   flash+=vec3(0.88,0.32,0.22)*exp(-abs(d)*260.0)*0.55;
  }else if(uTr==10){                            /* tiras */
   float s=floor(uv.x*22.0);
   dA.y+=(hash(vec2(s,11.0))-0.5)*p*1.3;
   dA.x+=(hash(vec2(s,3.0))-0.5)*p*0.05;
   m=step(hash(vec2(s,7.0)),p*1.18);
   glA+=p*0.7;
  }else{                                        /* colapso: punto de bucle */
   float k=smoothstep(0.28,0.62,p);
   glA+=smoothstep(0.0,0.5,p)*3.2;
   m=smoothstep(0.58,0.70,p);
   flash+=vec3(1.0,0.99,0.96)*pow(k,2.0)*1.15*(1.0-smoothstep(0.62,0.86,p));
  }
 }

 vec3 A=mira(uA,uvA+dA,uWarp.x,glA,0.0);
 vec3 B=mira(uB,uvB+dB,uWarp.y,glB,3.7);
 vec3 col=mix(A,B,clamp(m,0.0,1.0))+flash;

 float lum=dot(col,vec3(0.299,0.587,0.114));
 col+=col*smoothstep(0.62,1.0,lum)*0.38;
 col*=0.94+0.12*fbm(uv*vec2(320.0,90.0));
 col+=vec3(0.95,0.92,0.85)*motas(uv)*0.30;
 col+=(hash(uv*uRes+fract(uT)*97.0)-0.5)*0.055;
 col*=clamp(1.0-1.12*pow(length((uv-0.5)*vec2(1.05,1.0)),2.4),0.0,1.0);
 col=pow(max(col,0.0),vec3(1.06,1.03,1.02));
 col+=vec3(0.008,0.014,0.012)*(1.0-lum);
 gl_FragColor=vec4(clamp(col,0.0,1.0),1.0);
}`;
const VERT=`attribute vec2 a;varying vec2 vUv;void main(){vUv=a*0.5+0.5;gl_Position=vec4(a,0.0,1.0);}`;

/* plano: z0, z1, panX, panY, warp, glitch, transición de salida */
const PLANOS=[
 {c:[1.02,1.16, 0.000,-0.020],w:0.0022,g:0.02,tr:0},
 {c:[1.20,1.04, 0.010, 0.020],w:0.0030,g:0.03,tr:1},
 {c:[1.03,1.18,-0.020, 0.000],w:0.0040,g:0.10,tr:2},
 {c:[1.06,1.22, 0.020, 0.010],w:0.0035,g:0.22,tr:3},
 {c:[1.16,1.03, 0.030,-0.010],w:0.0030,g:0.05,tr:4},
 {c:[1.02,1.14,-0.015, 0.015],w:0.0045,g:0.06,tr:5},
 {c:[1.18,1.02, 0.020, 0.010],w:0.0026,g:0.04,tr:6},
 {c:[1.05,1.13, 0.000, 0.020],w:0.0060,g:0.05,tr:7},
 {c:[1.14,1.02,-0.030, 0.000],w:0.0040,g:0.06,tr:8},
 {c:[1.02,1.15, 0.000,-0.025],w:0.0038,g:0.05,tr:9},
 {c:[1.18,1.04, 0.015, 0.010],w:0.0034,g:0.04,tr:10},
 {c:[1.03,1.20, 0.000, 0.000],w:0.0050,g:0.35,tr:11}
];
const PLANO=4.2, TRANS=1.0, N=PLANOS.length, TOTAL=PLANO*N;

function compilar(gl,tipo,src){
  const s=gl.createShader(tipo);gl.shaderSource(s,src);gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));
  return s;
}
function iniciar(canvas,rutas,alListo){
  const gl=canvas.getContext('webgl',{preserveDrawingBuffer:true,antialias:false,alpha:false});
  if(!gl)throw new Error('sin webgl');
  const prog=gl.createProgram();
  gl.attachShader(prog,compilar(gl,gl.VERTEX_SHADER,VERT));
  gl.attachShader(prog,compilar(gl,gl.FRAGMENT_SHADER,FRAG));
  gl.linkProgram(prog);
  if(!gl.getProgramParameter(prog,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(prog));
  gl.useProgram(prog);
  const buf=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  const la=gl.getAttribLocation(prog,'a');
  gl.enableVertexAttribArray(la);gl.vertexAttribPointer(la,2,gl.FLOAT,false,0,0);
  const U={};['uA','uB','uFitA','uFitB','uLoc','uWarp','uGl','uRes','uCamA','uCamB','uT','uP','uTr']
    .forEach(k=>U[k]=gl.getUniformLocation(prog,k));
  gl.uniform1i(U.uA,0);gl.uniform1i(U.uB,1);

  const texs=[],asp=[];let faltan=rutas.length;
  rutas.forEach((r,i)=>{
    const im=new Image();
    im.onload=()=>{
      const t=gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D,t);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,im);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      texs[i]=t; asp[i]=im.width/im.height;
      if(--faltan===0){window.__listo=true;alListo&&alListo()}
    };
    im.onerror=()=>{console.error('no cargó',r)};
    im.src=r;
  });

  function ajuste(i){
    const salida=canvas.width/canvas.height, a=asp[i]||salida;
    return a>salida?[salida/a,1]:[1,a/salida];
  }
  function dibujar(t){
    t=((t%TOTAL)+TOTAL)%TOTAL;
    const i=Math.min(N-1,Math.floor(t/PLANO)), l=t-i*PLANO;
    const j=(i+1)%N;
    const enTr=l>=PLANO-TRANS;
    const p=enTr?(l-(PLANO-TRANS))/TRANS:0;
    const locA=(l+TRANS)/(PLANO+TRANS);
    const locB=enTr?(l-(PLANO-TRANS))/(PLANO+TRANS):0;
    const A=PLANOS[i],B=PLANOS[j];
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texs[i]);
    gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,texs[j]);
    gl.uniform4fv(U.uCamA,A.c);gl.uniform4fv(U.uCamB,B.c);
    gl.uniform2fv(U.uFitA,ajuste(i));gl.uniform2fv(U.uFitB,ajuste(j));
    gl.uniform2f(U.uLoc,locA,locB);
    gl.uniform2f(U.uWarp,A.w,B.w);
    gl.uniform2f(U.uGl,A.g,B.g);
    gl.uniform2f(U.uRes,canvas.width,canvas.height);
    gl.uniform1f(U.uT,t);gl.uniform1f(U.uP,p);gl.uniform1i(U.uTr,A.tr);
    gl.drawArrays(gl.TRIANGLES,0,3);
  }
  return {dibujar,TOTAL,PLANO,TRANS,N};
}
return {iniciar,TOTAL,PLANO,TRANS,PLANOS};
})();
