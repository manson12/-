$(function(){
        let id = location.search.match(/\bid=([^&]*)/)[1]
        
       $.get('./js/own.json').then(function(back){
            let item=back
            let choose=item.filter(function(e){
                return e.id === id;
            })[0]         
            let{backgroundimage,albumface}=choose
            let{title,head,name}=choose
            let{tab,description}=choose
            pics(backgroundimage,albumface)
            names(title,head,name)
            text(tab,description)
   })
   function pics(backgroundimage,albumface){
       let image=document.createElement('img')
       $('.back-filter').css({'background':'url('+backgroundimage+')','background-size':'cover'})
       $(image).attr('src',''+albumface+'')
       $('.left-img').append(image)
   }

   function names(title,head,name){
       let image=document.createElement('img')
       $('.header-info-right p:nth-child(1)').text(title)  
       $(image).attr('src',''+head+'')  
       $('.header-info-right span').text(name)
       $('.header-info-right p:nth-child(2)').prepend(image)

   }

   function text(tab,description){    
      let arr=tab.split(',')
      arr.forEach(function(e) {
         let tabs=document.createElement('span')
          $(tabs).text(e)
          $('.own-tab').append(tabs)
         });
  
     
      $('.own-text').text(description)
   }



    $('.down').on('click',function(){
    
        $('.own-text').removeClass('own-text-show')
        $('.down').addClass('none').siblings().removeClass('none')
    })
    $('.up').on('click',function(){     
        $('.own-text').addClass('own-text-show')
        $('.up').addClass('none').siblings().removeClass('none')
    })

})