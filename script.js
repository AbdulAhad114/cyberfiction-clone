function locoScroll(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locoScroll()

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
})


// function files(index){
//     var data = `
//     ./images/male0001.png
//     ./images/male0002.png
//     ./images/male0003.png
//     ./images/male0004.png
//     ./images/male0005.png
//     ./images/male0006.png
//     ./images/male0007.png
//     ./images/male0008.png
//     ./images/male0009.png
//     ./images/male0010.png
//     ./images/male0011.png
//     ./images/male0012.png
//     ./images/male0013.png
//     ./images/male0014.png
//     ./images/male0015.png
//     ./images/male0016.png
//     ./images/male0017.png
//     ./images/male0018.png
//     ./images/male0019.png
//     ./images/male0020.png
//     ./images/male0021.png
//     ./images/male0022.png
//     ./images/male0023.png
//     ./images/male0024.png
//     ./images/male0025.png
//     ./images/male0026.png
//     ./images/male0027.png
//     ./images/male0028.png
//     ./images/male0029.png
//     ./images/male0030.png
//     ./images/male0031.png
//     `
// }

function files(index) {
    const paddedIndex = String(index).padStart(4, '0'); 
    return `./images/male${paddedIndex}.png`;
}

const framecount = 300;
const images = [];
const imageSeq = {
    frame: 1,
}

for (let i = 1; i <= framecount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq,{
    frame: framecount - 1,
    snap: "frame",
    ease:"none",
    scrollTrigger:{
        scrub: 0.15,
        trigger: '#section>canvas',
        start: "top top",
        end: "600% top",
        scroller: `#main`,
    },
    onUpdate: render,
})

images[1].onload = render

function render(){
    scaleImage(images[imageSeq.frame],context)
}

function scaleImage(img,ctx){
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio,vRatio);
    var centerShiftx = (canvas.width - img.width * ratio) / 2;
    var centerShifty = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftx,
        centerShifty,
        img.width * ratio,
        img.height * ratio
    );
}

gsap.to("#section>canvas",{
    scrollTrigger:{
    trigger:"#section>canvas",
    pin: true,
    scroller:"#main",
    start: "top top",
    end: "600% top",
    markers:false,
    }
})

gsap.to("#section1",{
    scrollTrigger:{
        trigger:"#section1",
        start:"top top",
        end: "bottom top",
        markers: false,
        pin: true,
        scroller: "#main"
    }
})
gsap.to("#section2",{
    scrollTrigger:{
        trigger:"#section2",
        start:"top top",
        end: "bottom top",
        markers: false,
        pin: true,
        scroller: "#main"
    }
})
gsap.to("#section3",{
    scrollTrigger:{
        trigger:"#section3",
        start:"top top",
        end: "bottom top",
        markers: false,
        pin: true,
        scroller: "#main"
    }
})