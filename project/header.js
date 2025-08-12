function show(){
console.log("hello world");
const opt=document.querySelector('.options')
const arr1=document.querySelector('.vector1')
const arr2=document.querySelector('.vector2')
console.log(opt)
if(opt.classList.contains('hidden')){
opt.classList.remove('hidden')
opt.classList.add('flex');
arr1.classList.add('hidden')
arr2.classList.remove('hidden')
}else{
   opt.classList.remove('flex')
   opt.classList.add('hidden'); 
   arr2.classList.add('hidden')
   arr1.classList.remove('hidden')
}
}
function clientShow1(){
   const point=document.querySelector('.point')
   const point1=point.querySelector('#point1')
   console.log(point1.classList)
   if(point1.classList.contains('bg-blue-500')){
      const clients=document.querySelector('#clients')
      const client1=clients.querySelector("#client1")
      console.log(client1);
      client1.classList.remove('opacity-30')
      client1.classList.add('opacity-100')
      client1.classList.remove('hidden')
      point1.classList.remove("bg-blue-500")
      point1.classList.add('bg-blue-900')
       const point2=point.querySelector('#point2')
      if(point2.classList.contains('bg-blue-900')){
         const client2=clients.querySelector("#client2")
         console.log(client2);
         client2.classList.remove('opacity-100')
         client2.classList.add('opacity-30')
         client2.classList.add('hidden')
         point2.classList.remove('bg-blue-900')
         point2.classList.add('bg-blue-500')
      }else{
          const client3=clients.querySelector("#client3")
         client3.classList.remove('opacity-100')
         client3.classList.add('opacity-30')
         client3.classList.add('hidden')
         const point3=point.querySelector('#point3')
         point3.classList.remove('bg-blue-900')
         point3.classList.add('bg-blue-500')
      }
   }  
}
function clientShow2(){
   const point=document.querySelector('.point')
   const point2=point.querySelector('#point2')
  console.log(point2.classList);
   if(point2.classList.contains('bg-blue-500')){
      const clients=document.querySelector('#clients')
      const client2=clients.querySelector("#client2")
      client2.classList.remove('opacity-30')
      client2.classList.add('opacity-100')
      client2.classList.remove('hidden')
      point2.classList.remove("bg-blue-500")
      point2.classList.add('bg-blue-900')
      const point1=point.querySelector('#point1')
      if(point1.classList.contains('bg-blue-900')){
          const client1=clients.querySelector("#client1")
          client1.classList.remove('opacity-100')
          client1.classList.add('opacity-30')
          client1.classList.add('hidden')
         point1.classList.remove('bg-blue-900')
         point1.classList.add('bg-blue-500')
      }else{
          const client3=clients.querySelector("#client3")
           client3.classList.remove('opacity-100')
           client3.classList.add('opacity-30')
           client3.classList.add('hidden')
         const point3=point.querySelector('#point3')
         point3.classList.remove('bg-blue-900')
         point3.classList.add('bg-blue-500')
      }
   }  
}
function clientShow3(){
   const point=document.querySelector('.point')
   const point3=point.querySelector('#point3')
   console.log(point3.classList);
   if(point3.classList.contains('bg-blue-500')){
       const clients=document.querySelector('#clients')
       const client3=clients.querySelector("#client3")
           client3.classList.remove('opacity-30')
           client3.classList.add('opacity-100')
            client3.classList.remove('hidden')
      point3.classList.remove("bg-blue-500")
      point3.classList.add('bg-blue-900')
      const point2=point.querySelector('#point2')
      if(point2.classList.contains('bg-blue-900')){
         const client2=clients.querySelector("#client2")
      client2.classList.remove('opacity-100')
      client2.classList.add('opacity-30')
       client2.classList.add('hidden')
         point2.classList.remove('bg-blue-900')
         point2.classList.add('bg-blue-500')
      }else{
         const client1=clients.querySelector("#client1")
          client1.classList.remove('opacity-100')
          client1.classList.add('opacity-30')
           client1.classList.add('hidden')
          const point1=point.querySelector('#point1')
         point1.classList.remove('bg-blue-900')
         point1.classList.add('bg-blue-500')
      }
   }  
}
