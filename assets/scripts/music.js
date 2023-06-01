document.addEventListener("DOMContentLoaded", () => {
    //VIDEO
    const video = document.getElementById("bg_video");
    video.pause(); // 暂停视频
    video.volume = 0.5; // 设置音量
    document.addEventListener("mousemove", () => {
        // video.play();
    });
    // setTimeout(function () {
    //     video.play();
    // }, 100);
    // video.play(); // 播放视频
    // video.pause(); // 暂停视频

    //AUDIO
    // const audio = document.getElementById("bg_music");
    // const playBtn = document.querySelector('.play');
    // const pauseBtn = document.querySelector('.pause');
    // audio.pause();
    // audio.play();
    // ...
    // playBtn.addEventListener('click', () => {
    //     console.log('play');
    //     audio.play();
    //     playBtn.classList.add('hide');
    //     pauseBtn.classList.remove('hide');
    // });
    // pauseBtn.addEventListener('click', () => {
    //     audio.pause();
    //     pauseBtn.classList.add('hide');
    //     playBtn.classList.remove('hide');
    // });

})
