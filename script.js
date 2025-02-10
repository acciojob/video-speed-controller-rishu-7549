const video = document.querySelector('.flex');
    const toggle = document.querySelector('.toggle');
    const skipButtons = document.querySelectorAll('[data-skip]');
    const inputs = document.querySelectorAll('.controls input');
    const progress = document.querySelector('.progress');
    const progressBar = document.querySelector('.progress__filled');
    const speedBar = document.querySelector('.speed-bar');

    function togglePlay() {
      const method = video.paused ? 'play' : 'pause';
      video[method]();
      toggle.textContent = video.paused ? '►' : '❚❚';
    }

    function skip() {
      video.currentTime += parseFloat(this.dataset.skip);
    }

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      video[this.name] = this.value;

      if (this.name === 'playbackRate') {
        speedBar.textContent = `${this.value}${suffix || '×'}`;
      }
    }

    function handleProgress() {
      const percent = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${percent}%`;
    }

    function scrub(e) {
      const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
      video.currentTime = scrubTime;
    }

    video.addEventListener('click', togglePlay);
    video.addEventListener('timeupdate', handleProgress);

    toggle.addEventListener('click', togglePlay);

    skipButtons.forEach(button => button.addEventListener('click', skip));

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);