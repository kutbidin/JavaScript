var flag=false;
var light=false;
var a=0;
function hit(){
   a++;
flag=(a%2===0)?true:false;
   if(flag)
   {document.getElementById('diva').style.backgroundColor="blue";}
   else{
    document.getElementById('diva').style.backgroundColor="white";
   }
   document.getElementById('diva').innerHTML='this is click '+a;
}
 
function DocWrite(txt){
    console.log(txt);
document.getElementById('diva').innerHTML='type of flag is :'+typeof(flag);
}

function switchLight(){
    light=(a%2==0)?true:false;
    if(light){
        document.getElementById('switch').innerHTML="light off";
        document.getElementById('bulb').src="D://Programming/resources/imgs/bulb_on_yellow200by340.png";
    }
    else{
        document.getElementById('bulb').src="D://Programming/resources/imgs/bulb_off_yellow200by340.png";
        document.getElementById('switch').innerHTML="light on";
    }
    a++;
}

let Car_BMW={
   brand:'BMW',
   motor:'1.5',
   price:'200 thousand',
   year:2015
};
function car(brand,motor,price,year){
   //car=new Car_BMW(brand,motor,price,year);
   Car_BMW.brand=brand;
   Car_BMW.motor=motor;
   Car_BMW.price=price;
   Car_BMW.year=year;
   document.getElementById('divb').innerHTML=Car_BMW;
   console.log(Car_BMW);
}