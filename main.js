let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0 //记录当前显示的张数，用于处理第一张和最后一张的无缝轮播
let timer //记录定时器
makeFakeSlides() //先放两张假图
initPreviousNext() //初始化上一张与下一张按钮
bindEvents() //绑定各个按钮事件
timer = setTimer() //设置定时器

$('.container').on('mouseenter',function(){
    window.clearInterval(timer)
}).on('mouseleave',function(){
    timer = setInterval(function(){
        goToSlide(current+1)
    },2000)
})

function bindEvents() {

    $('#buttonWrapper').on('click', 'button', function (e) {
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlide(index)
    })
}

function goToSlide(index) {
    if(index > $buttons.length-1){
        index = 0
    }else if(index < 0){
        index = $buttons.length - 1
    }
    if (current === $buttons.length - 1 && index === 0) {
        //最后一张到第一张
        $slides.css({ transform: `translateX(${-($buttons.length + 1) * 400}px)` })
            .one('transitionend', function () {
                $slides.hide().offset()
                $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` }).show()
            })
    } else if (current === 0 && index === $buttons.length - 1) {
        //第一张到最后一张
        $slides.css({ transform: `translateX(0px)` })
            .one('transitionend', function () {
                $slides.hide().offset()
                $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` }).show()
            })
    } else {
        $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` })
    }
    current = index
}

function makeFakeSlides() {
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length - 1).clone(true)
    $slides.append($firstCopy) //把第一张放到最后一张后面
    $slides.prepend($lastCopy) //把最后一张放到第一张前面
    $slides.css({ transform: 'translateX(-400px)' })
}

function initPreviousNext(){
    $(next).on('click',function(){
        goToSlide(current+1)
    })
    $(previous).on('click',function(){
        goToSlide(current-1)
    })
}

function setTimer(){
    return setInterval(function(){
        goToSlide(current+1)
    },2000)
}