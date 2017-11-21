$(function () {
    setTimeout(function () {

        $.get('./js/songs.json').then(function (response) {
            // console.log(response)        //这里response有可能是字符串，也有可能是对象。要先看清
            let item = response
            item.forEach((i) => {
                let li = $(`
                <li>
                <a href="../disc.html?id=${i.id}">
                    <h3>${i.name}</h3>
                    <p>${i.singer}</p>
                
                    <svg class="play-circle">
                        <use xlink:href="#icon-play-circle"></use>
                    </svg>
                </a>
                </li> 
                `)

                $('#new-music').append(li)
            });
            $('.loading').remove()

        }, function () {
            console.log('请求失败')
        })
    }, 1000)

    $('.nav').on('click', '.header-nav li', function (e) {
        let li = $(e.currentTarget).addClass('active')
        let index = li.index()
        li.trigger('tabChange', index)
        li.siblings().removeClass('active')
        $('.tab-content>li').eq(index).addClass('active').siblings().removeClass('active')
    })

    $('.nav').on('tabChange', function (e, index) {
        if (index === 1) {
            if ($('.tab-content>li').eq(index).attr('data-download') === 'yes') {
                return
            }
            $.get('./js/songs.json').then(function (response) {
                $('.tab-content>li').eq(index).attr('data-download', 'yes')

            })
        } else if (index === 2) {
            if ($('.tab-content>li').eq(index).attr('data-download') === 'yes') {
                return
            }
            // $.get('./js/page3.json').then(function (response) {
            //     $('.tab-content>li').eq(index).attr('data-download', 'yes')
            // })
        }
    })

    //热歌榜页面
    $.get('./js/songs.json').then(function (response) {
        let arr = response
        arr.forEach((i) => {
            let li = $(`
           <li>
           <a href="../disc.html?id=${i.id}">
               <span class="own-number">${i.id}</span>
               <div class="song-wrapper">
                   <h3>${i.name}</h3>               
                   <p>${i.singer}</p>         
                   <svg class="play-circle">
                        <use xlink:href="#icon-play-circle"></use>
                   </svg>
                </div>
           </a>
           </li> 
           `)
            if (i.id < 5) {
                $('.number').css('color', '#df3436')
            }
            $('.hot-music').append(li)
        })


    })







    //搜索页面
    let timer = undefined
    $('#searchSong').on('input', function (e) {
        let input = $(e.currentTarget)
        let value = input.val().trim()

        if (value === '') {
            return
        }

        if (timer) {
            clearTimeout(timer)
        }   //有timer就停止

        timer = setTimeout(function () {
            search(value).then(function (result) {
                timer === undefined
                if (result.length !== 0) {
                    $('.output').text(result.map((r) => r.name).join(','))
                } else {
                    $('.output').text('没有结果')
                }
            })
        }, 300);


    })

    function search(keyword) {
        console.log(keyword)
        return new Promise((resolve, reject) => {
            var dataBase = [{
                "id": 1,
                "name": "成都",
            },
            {
                "id": 2,
                "name": "笨小孩",
            },
            {
                "id": 3,
                "name": "演员",
            },
            {
                "id": 4,
                "name": "情非得已",
            },
            {
                "id": 5,
                "name": "泡沫",
            },
            {
                "id": 6,
                "name": "告白气球",
            },
            {
                "id": 7,
                "name": "水手",
            },
            {
                "id": 7,
                "name": "夜曲",
            }
            ]
            let result = dataBase.filter(function (item) {
                return item.name.indexOf(keyword) >= 0
            })
            setTimeout(function () {
                resolve(result)
            }, (Math.random() * 1000 + 500))
        })



    }

})



