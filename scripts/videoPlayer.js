export const videoPlayerInit = () => {
  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoVolume = document.querySelector('.video-volume');
  const videoFullscreen = document.querySelector('.video-fullscreen');
  // Дз новые переменные
  const volumeOff = document.querySelector('.vid-volume-off');
  const volumeMax = document.querySelector('.vid-volume-max');
  let activePlayerVol = videoPlayer.volume;
  let activeVideoVol = videoVolume.value;

  videoFullscreen.addEventListener('click', () => {
    // console.log(videoPlayer);
    videoPlayer.requestFullscreen();
    videoPlayer.controls = true;
  });

  videoPlayer.addEventListener('fullscreenchange', () => {
    if (document.fullscreen) {
      videoPlayer.controls = true;
    } else {
      videoPlayer.controls = false;
    }
  });

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  };

  const togglePlay = (e) => {
    e.preventDefault();
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  const addZero = (n) => (n < 10 ? '0' + n : n);

  const changeValue = () => {
    const valueVolume = videoVolume.value;
    videoPlayer.volume = valueVolume / 100;
    // сохранение состояния при изменении
    activePlayerVol = videoPlayer.volume;
    activeVideoVol = valueVolume;
  };
  // Дз - функция переключение звука на максимум и возврат к прежнему
  const maxValue = () => {
    if (videoVolume.value < 100) {
      videoVolume.value = 100;
      videoPlayer.volume = 1;
    } else if (videoVolume.value == 100) {
      videoPlayer.volume = activePlayerVol;
      videoVolume.value = activeVideoVol;
    }
  };
  // Дз - функция отключение звука и возврат к прежнему
  const offValue = () => {
    if (videoVolume.value > 0) {
      videoVolume.value = 0;
      videoPlayer.volume = 0;
    } else if (videoVolume.value == 0) {
      videoPlayer.volume = activePlayerVol;
      videoVolume.value = activeVideoVol;
    }
  };
  // Дз события для max/off
  volumeMax.addEventListener('click', maxValue);
  volumeOff.addEventListener('click', offValue);

  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(
      secondsPassed
    )}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(
      secondsTotal
    )}`;
  });

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  });

  videoVolume.addEventListener('input', changeValue);
  videoVolume.addEventListener('volumechange', () => {
    videoVolume.value = Math.round(videoPlayer.volume * 100);
  });
  changeValue();

  // videoPlayerInit.stop = () => {
  //   videoPlayer.pause();
  //   toggleIcon();
  // }
  return () => {
    videoPlayer.pause();
    toggleIcon();
  };
};
