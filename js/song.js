$(function () {
    let id = location.search.match(/\bid=([^&]*)/)[1]
    $.get('js/songs.json').then(function (response) {
        let songs = response
        let song  = songs.filter(function (s) {
            
            return s.id === id;
          })[0];
        let { url, name, lyric } = song
        let {backGround,face}=song
        
        initPlay.call(undefined, url)
        initLyric(name, lyric)
        pic(backGround,face)
    })
    function pic(backGround,face){

       $('.disc-name').attr('src',face)
       $('.disc').css({'background':'url('+backGround+')','background-size':'cover'})
       
    }

    function initLyric(name, lyric) {
        $('.song-title').text(name)
        parseLyric(lyric)
    }


    function initPlay(url) {
        let audio = document.createElement('audio')
        audio.src = url
        audio.oncanplay = function () {
            audio.play();
            $('.disc-circle').addClass('playing')
        }
        $('.svg-pause').on('click', function () {
            audio.pause();
            $('.disc-circle').removeClass('playing');
        })
        $('.svg-play').on('click', function () {
            audio.play();
            $('.disc-circle').addClass('playing');
        })

        setInterval(()=>{
         let second=audio.currentTime
         let minute=~~(second/60)
         let left=second-minute*60
         let time=`${pad(minute)}:${pad(left)}`
         let line=$('.lines p')
         let whichLine
        //  console.log(time)
         for(let i=0; i<line.length; i++){
          
             if(line[i+1]!==undefined && line.eq(i).attr('data-time')<time && line.eq(i+1).attr('data-time')>time){
                 whichLine=line.eq(i)
                 
             }
         }
         if(whichLine){
             let top=whichLine.offset().top
             let linesTop=$('.lines').offset().top
             let sub=top-linesTop-$('.lyric').height()/3
             $('.lines').css('transform',`translateY(-${sub}px)`)
             whichLine.addClass('lines-active').prev().removeClass('lines-active')
         }
        }, 300)
    }

    function pad(number){
        return number>=10 ? number+'':'0'+number
    }

    function parseLyric(lyric) {
        let arr = lyric.split('\n')
        let regex = /^\[(.+)\](.*)$/
        arr = arr.map(function (string, index) {
            let matches = string.match(regex)   //正则捕获有滞留，这里用match

            if (matches) {
                return { time: matches[1], word: matches[2] }
            }

        })

        let lyrics = $('.lyric')
        arr.map(function (object) {
            if (!object) {
                return
            }
            let p = $('<p/>')
            p.attr('data-time', object.time).text(object.word)

            p.appendTo(lyrics.children('.lines'))


        })
    }
})