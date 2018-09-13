
import {Before} from "./Before";

window.addEventListener("load",()=>{

    var ua = navigator.userAgent;

    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),

        isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),

        isAndroid = ua.match(/(Android)\s+([\d.]+)/),

        isMobile = isIphone || isAndroid;

//判断

    if(isMobile){
document.body.innerHTML= `
    <style>
        body{
        text-align: center;
        font-size: 1rem;
        color: #349ccd;
        }

    h1{
    margin-top: 10rem;
    }
    </style> 
    <h1>Hi!</h1>
    Please access through PC, mobile phone temporarily not supported!" <br>(请通过PC访问，手机暂时不支持！)`;
    }else{
        Before.ins.update();
    }


})
