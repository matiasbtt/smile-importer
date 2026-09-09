/* Motor de la pieza: 12 planos, cámara viva, una flor se transforma en la
   siguiente (metamorfosis orgánica, no cortes de edición), bucle exacto. */
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
 q+=normalize(uv-0.5+vec2(0.0001))*sin(uT*0.5+sem)*0.0026*smoothstep(0.05,0.7,r);
 vec2 w=vec2(fbm(uv*3.0+vec2(uT*0.05,0.0)+sem),fbm(uv*3.0+vec2(0.0,-uT*0.045)+sem+9.1))-0.5;
 q+=w*warp*(0.35+0.9*r);
 vec2 ca=(uv-0.5)*0.0016*(0.4+gl*1.6);
 vec3 c;
 c.r=texture2D(tex,q+ca).r; c.g=texture2D(tex,q).g; c.b=texture2D(tex,q-ca).b;
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

/* ── metamorfosis: una flor crece/se disuelve dentro de la otra ──
   Un frente de crecimiento orgánico (radial + ruido angular) nace en un
   punto distinto por corte y se expande hasta cubrir el cuadro. Cerca del
   frente el papel se estira, como si una forma tirara de la otra al
   transformarse — sin cortes, sin bloques, sin flashes. */
void main(){
 vec2 uv=vUv;
 vec2 uvA=cam(uv,uCamA,uLoc.x,uFitA);
 vec2 uvB=cam(uv,uCamB,uLoc.y,uFitB);
 float p=uP, m=0.0, glA=uGl.x, glB=uGl.y;
 vec2 dA=vec2(0.0),dB=vec2(0.0);
 vec3 flash=vec3(0.0);

 if(p>0.0){
  float fi=float(uTr);
  vec2 org=vec2(0.5,0.46)+(vec2(hash(vec2(fi,1.7)),hash(vec2(fi,5.3)))-0.5)*vec2(0.85,0.6);
  vec2 asp=vec2(1.12,1.0);
  vec2 d=(uv-org)*asp;
  float rad=length(d)+1e-4;
  vec2 dir=d/rad;
  float ang=atan(d.y,d.x);
  float freq=2.6+hash(vec2(fi,9.1))*3.0;
  float ph=fi*4.1;

  /* cada punto del cuadro tiene su propio umbral de cambio, según qué tan
     lejos está del origen del brote más un ruido orgánico (no anillos
     perfectos). A medida que "base" recorre 0→1 durante todo el plano,
     los puntos van cambiando de a poco, del centro hacia afuera — la
     transformación queda visible el corte entero, no se resuelve de golpe. */
  float wobFino=fbm(vec2(ang*freq*0.3183+ph, rad*2.4+ph))-0.5;
  float wobAncho=fbm(vec2(uv.x*2.1+ph,uv.y*2.1-ph*1.3))-0.5;
  float wob=wobAncho*0.68+wobFino*0.5;
  float refRad=0.5;
  float umbral=clamp(rad/refRad*0.42+wob*0.62, 0.02, 0.98);
  float base=smoothstep(0.0,1.0,p);
  float dEdge=base-umbral;
  float soft=0.07;
  m=smoothstep(-soft,soft,dEdge);

  float prox=exp(-abs(dEdge)*8.0)*smoothstep(0.0,0.04,p)*smoothstep(1.0,0.96,p);
  dA+=dir*prox*0.05 + (org-uv)*prox*0.045;
  dB+=-dir*prox*0.04 + (uv-org)*prox*0.055*step(0.0,dEdge);
  glA+=prox*0.55; glB+=prox*0.4;

  vec3 tintB=texture2D(uB,org).rgb;
  flash+=(tintB-0.5)*prox*0.35;
 }

 vec3 A=mira(uA,uvA+dA,uWarp.x,glA,0.0);
 vec3 B=mira(uB,uvB+dB,uWarp.y,glB,3.7);
 vec3 col=mix(A,B,clamp(m,0.0,1.0))+flash;

 float lum=dot(col,vec3(0.299,0.587,0.114));
 col+=col*smoothstep(0.62,1.0,lum)*0.34;
 col*=0.94+0.12*fbm(uv*vec2(320.0,90.0));
 col+=vec3(0.95,0.92,0.85)*motas(uv)*0.28;
 col+=(hash(uv*uRes+fract(uT)*97.0)-0.5)*0.05;
 col*=clamp(1.0-1.12*pow(length((uv-0.5)*vec2(1.05,1.0)),2.4),0.0,1.0);
 col=pow(max(col,0.0),vec3(1.06,1.03,1.02));
 col+=vec3(0.008,0.014,0.012)*(1.0-lum);
 gl_FragColor=vec4(clamp(col,0.0,1.0),1.0);
}`;
const VERT=`attribute vec2 a;varying vec2 vUv;void main(){vUv=a*0.5+0.5;gl_Position=vec4(a,0.0,1.0);}`;

/* plano: zoom inicial, zoom final, paneo x, paneo y, respiración de papel, aberración */
const PLANOS=[
 {c:[1.02,1.16, 0.000,-0.020],w:0.0020,g:0.03},
 {c:[1.20,1.04, 0.010, 0.020],w:0.0026,g:0.04},
 {c:[1.03,1.18,-0.020, 0.000],w:0.0032,g:0.07},
 {c:[1.06,1.22, 0.020, 0.010],w:0.0030,g:0.10},
 {c:[1.16,1.03, 0.030,-0.010],w:0.0026,g:0.05},
 {c:[1.02,1.14,-0.015, 0.015],w:0.0036,g:0.06},
 {c:[1.18,1.02, 0.020, 0.010],w:0.0024,g:0.05},
 {c:[1.05,1.13, 0.000, 0.020],w:0.0042,g:0.06},
 {c:[1.14,1.02,-0.030, 0.000],w:0.0032,g:0.06},
 {c:[1.02,1.15, 0.000,-0.025],w:0.0030,g:0.06},
 {c:[1.18,1.04, 0.015, 0.010],w:0.0028,g:0.05},
 {c:[1.03,1.20, 0.000, 0.000],w:0.0040,g:0.12}
];
const PLANO=5.0, TRANS=4.5, N=PLANOS.length, TOTAL=PLANO*N;

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
    gl.uniform1f(U.uT,t);gl.uniform1f(U.uP,p);gl.uniform1i(U.uTr,i);
    gl.drawArrays(gl.TRIANGLES,0,3);
  }
  return {dibujar,TOTAL,PLANO,TRANS,N};
}
return {iniciar,TOTAL,PLANO,TRANS,PLANOS};
})();
