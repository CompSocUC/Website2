var debounce=function(e,t){var n=!1;return function(){var r=this,a=arguments;n===!1&&(n=!0,e.apply(r,a),setTimeout(function(){n=!1},t))}},pretty_date=function(e){var t=["January","February","March","April","May","June","July","August","September","October","November","December"],n=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],r=e.split("+")[0],a=new Date(r),s=function(e){return e>12?[e-12,!0]:[e,!1]}(a.getUTCHours()),o=function(e){return 1===e.length?"0"+e:e}(String(a.getUTCMinutes())),l=n[a.getUTCDay()]+", "+a.getUTCDate()+" "+t[a.getUTCMonth()]+", "+s[0]+":"+o+(s[1]?"pm":"am");return l},create_event=function(e,t,n,r){var a=document.createElement("span");a.setAttribute("class","title"),a.innerText=e;var s=document.createElement("span");s.setAttribute("class","time"),s.innerText=pretty_date(n);var o=document.createElement("a");o.setAttribute("class","link"),o.setAttribute("href","https://www.facebook.com/events/"+t+"/"),o.setAttribute("target","_blank"),o.appendChild(a);var l=new Image;l.src=r,l.setAttribute("alt",e);var i=document.createElement("div");return i.setAttribute("class","event"),i.appendChild(l),i.appendChild(o),i.appendChild(s),i},animate_rollover=function(e,t,n,r){var a=(r+1)%n,s=(a+1)%n,o=e.children(),l=o[0],i=o[1];return l.style.left="-100%",i.style.left="0",setTimeout(function(){e[0].removeChild(l),l.style.left="0",e.append(t[s]);var n=e.children()[1];n.style.left="100%"},500),a},setup_rollover=function(e,t){var n,r,a,s,o,l,i,c,u=$("#event-scroll");u.html("");var d=$(e.data).map(function(e,n){var u=create_event(n.name,n.id,n.start_time,n.cover.source);return $(u).on("touchstart",function(e){clearInterval(a),s=!1,setTimeout(function(){s=!0},250),o=e.originalEvent.touches[0].pageX}),$(u).on("touchmove",function(e){e.preventDefault(),l=e.originalEvent.touches[0].pageX,$(this).css("transform","translate3d("+(l-o)+"px,0,0)")}),$(u).on("touchend",function(e){var n=function(e,t){setTimeout(function(){$(e).css("transform","translate3d(0,0,0)")},t)},u;s===!0?(u=.3*document.body.offsetWidth,o-l>u?(n(this,500),i(e)):l-o>u?(n(this,500),c(e)):n(this,0)):(u=10,u>o-l?(n(this,500),c(e)):o-l>u?(n(this,500),i(e)):n(this,0)),o=0,l=0,a||(a=setInterval(r,t))}),u}),v=d.length;u.append(d[0]),u.append(d[1]);var p=u.children()[0],m=u.children()[1];p.style.left="0",m.style.left="100%",n=0,r=function(){n=animate_rollover(u,d,v,n)},a=setInterval(r,t),i=debounce(function(e){return e.preventDefault(),clearInterval(a),n=animate_rollover(u,d,v,n),a=setInterval(r,t),!1},500),c=debounce(function(e){e.preventDefault(),clearInterval(a),n=(n-1+v)%v;var s=u.children(),o=s[0],l=s[1];u[0].removeChild(l),l.style.left="0";var i=d[n];return i.style.left="-100%",u.prepend(i),setTimeout(function(){o.style.left="100%",i.style.left="0"},1),a=setInterval(r,t),!1},500),$("#next-arrow").on("click",i),$("#prev-arrow").on("click",c)},setup_arrows=function(e){var t=document.createElement("a");t.setAttribute("class","next-arrow"),t.setAttribute("id","next-arrow"),t.setAttribute("href","#"),t.innerText="Next";var n=document.createElement("a");n.setAttribute("class","prev-arrow"),n.setAttribute("id","prev-arrow"),n.setAttribute("href","#"),n.innerText="Previous",e.append(n),e.append(t)},show_single=function(e){var t=e.data[0],n=$("#event-scroll");n.append(create_event(t.name,t.id,t.start_time,t.cover.source))},event_callback=function(e){var t=$("#event-holder");0===e.data.length?(t.addClass("text"),t.html("<p>There are no upcoming events.</p>"),t.css("padding-bottom","0"),t.css("margin-top",0)):1===e.data.length?(t.css("padding-bottom","calc(37% + 6rem)"),show_single(e)):(t.css("padding-bottom","calc(37% + 6rem)"),setup_arrows(t),setup_rollover(e,5e3))};$(function(){$(document).ready(function(){$.ajax({dataType:"json",url:"/resources/events.php",success:event_callback})})});