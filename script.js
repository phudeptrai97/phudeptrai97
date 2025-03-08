function fadeOutAudio(audioElement, duration) {
    const fadeOutInterval = 50; // Cập nhật âm lượng mỗi 50ms
    const steps = duration / fadeOutInterval; // Số bước giảm âm lượng
    const deltaVolume = audioElement.volume / steps; // Lượng giảm âm lượng mỗi bước

    const fadeOut = setInterval(() => {
        if (audioElement.volume > deltaVolume) {
            audioElement.volume -= deltaVolume; // Giảm âm lượng
        } else {
            audioElement.volume = 0; // Đặt âm lượng về 0
            clearInterval(fadeOut); // Dừng interval
        }
    }, fadeOutInterval);
}function rollDice() {
    rollSound.play();
    rollSound.volume = 1; // Đặt âm lượng về mức đầy đủ trước khi phát

    let diceElements = document.querySelectorAll(".dice");
    diceElements.forEach(dice => {
        dice.classList.add("blinking", "shake");
    });

    // Bắt đầu fade out âm thanh ở giây cuối cùng
    setTimeout(() => {
        fadeOutAudio(rollSound, 1000); // Fade out trong 1 giây
    }, 4000); // Bắt đầu fade out sau 4 giây (tổng thời gian lắc là 5 giây)

    setTimeout(() => {
        let results = [
            Math.floor(Math.random() * 6),
            Math.floor(Math.random() * 6),
            Math.floor(Math.random() * 6)
        ];
        
        document.getElementById("resultContainer").innerHTML = results.map(i => `<img src="${images[i]}" alt="result" class="highlight">`).join('');
        
        diceElements.forEach(dice => {
            dice.classList.remove("blinking", "shake", "highlight");
        });
        results.forEach(result => {
            let matchedDice = document.querySelectorAll(`img[src='${images[result]}']`);
            matchedDice.forEach(dice => dice.classList.add("highlight"));
        });
    }, 5000); // Kết thúc lắc sau 5 giây
}