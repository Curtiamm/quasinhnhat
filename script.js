// === DỮ LIỆU TÙY CHỈNH CỦA NGƯỜI DÙNG ===

// 1. Kịch bản Kể chuyện (Storytelling)
const storyLines = [
    "Chào cô gái bên Hàn Quốc của anh...",
    "Từ Tết đến giờ em đi, nhanh thật đấy.",
    "Bên đó xa xôi lạ lẫm, chắc em cũng vất vả cũng có nhiều điều chưa nói ra được...",
    "Tuy yêu xa, nhưng anh luôn ở đây theo dõi em.",
    "Hôm nay là sinh nhật em...",
    "Anh có một món quà nhỏ tặng em đây.",
    "Tick nút bên dưới giùm anh một phát nhé!"
];

// 2. Những câu nài nỉ khi nút Chê bỏ chạy
const teasingTexts = [
    "Bấm vào Có cơ mà đi đâu đấy?",
    "Năn nỉ đấy bấm bên này đi!",
    "Chê nữa là giận á nha!",
    "Bên này bấm phát ăn luôn nè!",
    "Đừng cố nữa lết chuột mỏi tay!",
    "Đồng ý đi người đẹp ơi!",
    "Cóooooo 💕" // Câu gốc cuối cùng
];

// 3. Thông điệp Trạm Năng Lượng (Energy Station)
const energyMessages = [
    "Chúc em yêu sinh nhật tuổi mới ngày càng xinh đẹp, bớt nhõng nhẽo lại nha! 🥰",
    "Trời Hàn Quốc có lạnh thì cũng nhớ bận ấm vào, không ốm là anh bay sang đánh đòn đấy đùa thôi xót lắm. 🤧",
    "Hôm nay học/làm có mệt không? Nhìn ảnh anh 1 phút lấy lại năng lượng này! 📸",
    "Khoảng cách địa lý không làm anh xa em được đâu, em vẫn nợ anh chầu vườn bia hôm nọ đấy! 🍦",
    "Gửi em 1000 cái ôm ấm áp từ Việt Nam! 🤗🤗",
    "Thèm lẩu Dookki gì đó thì tự túc đi nhé mai mốt về anh dẫn đi bù! 😋",
    "Cố gắng học tập tốt nhé em bé, xong sớm rồi về với anh! ✈️"
];

// Danh sách tên các file ảnh (bạn có thể thêm bớt tùy ý sau này)
// Thư mục chứa ảnh: d:\NEW PROJECT\EnergyStation\
const energyPhotos = [
    "1.jpg", 
    "2.jpg", 
    "3.jpg",
    "4.jpg",
    "5.jpg"
];


// === KẾT QUẢ HIỆN TẠI TRONG DOM ===
const bgMusic = document.getElementById('bgMusic');
// Đặt âm lượng nhạc nền (0.0 đến 1.0)
if (bgMusic) {
    bgMusic.volume = 0.5;
}

const storyScreen = document.getElementById('storyScreen');
const confessionScreen = document.getElementById('confessionScreen');
const energyScreen = document.getElementById('energyScreen');

const btnStartStory = document.getElementById('btnStartStory');
const btnNextToConfess = document.getElementById('btnNextToConfess');
const typewriterText = document.getElementById('typewriterText');

const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const confessionText = document.getElementById('confessionText');

const btnCharge = document.getElementById('btnCharge');
const energyMessageText = document.getElementById('energyMessageText');
const photoContainer = document.getElementById('photoContainer');
const energyPhoto = document.getElementById('energyPhoto');


// === LUỒNG 1: KỂ CHUYỆN ===
btnStartStory.addEventListener('click', () => {
    btnStartStory.classList.add('hidden');
    document.getElementById('storyContent').classList.remove('hidden');
    
    // Bắt đầu phát nhạc
    if (bgMusic) {
        bgMusic.play().catch(error => {
            console.log("Trình duyệt chặn autoplay âm thanh. Vui lòng tương tác thêm với trang.", error);
        });
    }

    playTypewriterEffect(storyLines, () => {
        // Sau khi kể chuyện xong, hiện nút đi tiếp
        btnNextToConfess.classList.remove('hidden');
    });
});

function playTypewriterEffect(lines, onComplete) {
    let lineIndex = 0;
    let charIndex = 0;
    typewriterText.innerHTML = '';
    typewriterText.classList.add('typewriter-cursor');

    function typeChar() {
        if (lineIndex < lines.length) {
            if (charIndex < lines[lineIndex].length) {
                typewriterText.innerHTML += lines[lineIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 80); // Tốc độ gõ chữ (ms)
            } else {
                // Xong 1 dòng, chờ 1.5s rồi qua dòng tiếp theo
                setTimeout(() => {
                    typewriterText.innerHTML += '<br>';
                    lineIndex++;
                    charIndex = 0;
                    typeChar();
                }, 1500); 
            }
        } else {
            typewriterText.classList.remove('typewriter-cursor');
            onComplete();
        }
    }
    typeChar();
}

btnNextToConfess.addEventListener('click', () => {
    // Chuyển sang màn 2
    storyScreen.classList.remove('active');
    setTimeout(() => {
        storyScreen.classList.add('hidden');
        document.body.classList.add('colorful-bg'); // Đổi từ nền đen sang màu sắc
        
        confessionScreen.classList.remove('hidden');
        setTimeout(() => confessionScreen.classList.add('active'), 50);
    }, 1500); // Đợi màn 1 mờ hẳn
});

// === LUỒNG 2: TỎ TÌNH TRỐN TÌM ===
let teaseIndex = 0;

btnNo.addEventListener('mouseover', () => {
    // Di chuyển nút ra Body
    if (btnNo.parentElement !== document.body) {
        btnNo.style.width = btnNo.offsetWidth + 'px';
        btnNo.style.height = btnNo.offsetHeight + 'px';
        document.body.appendChild(btnNo);
    }

    const padding = 50;
    const maxX = window.innerWidth - btnNo.offsetWidth - padding * 2;
    const maxY = window.innerHeight - btnNo.offsetHeight - padding * 2;

    const randomX = Math.floor(Math.random() * maxX) + padding;
    const randomY = Math.floor(Math.random() * maxY) + padding;

    btnNo.style.position = 'fixed';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
    btnNo.style.zIndex = '999';

    // Thay đổi chữ nút Có (nài nỉ)
    btnYes.innerText = teasingTexts[teaseIndex];
    teaseIndex = (teaseIndex + 1) % teasingTexts.length; // Lặp lại mảng nếu hết
});

// Khi nhấn Có
btnYes.addEventListener('click', () => {
    // Dọn dẹp nút No nếu nó đang ở ngoài body
    if (btnNo.parentElement === document.body) {
        document.body.removeChild(btnNo);
    }
    
    // Đổi chữ và bắn pháo hoa
    confessionText.innerText = "Trời ơi thích em nhấttt! Quà sinh nhật chưa dừng ở đây đâu nhé! ❤️🥰";
    btnYes.style.display = 'none';
    btnNo.style.display = 'none';
    
    shootConfetti();

    // Chờ 4s (pháo hoa rơi xong) rồi chuyển sang màn Trạm Năng Lượng
    setTimeout(() => {
        confessionScreen.classList.remove('active');
        setTimeout(() => {
            confessionScreen.classList.add('hidden');
            energyScreen.classList.remove('hidden');
            setTimeout(() => energyScreen.classList.add('active'), 50);
        }, 1500);
    }, 4500);
});

// === LUỒNG 3: TRẠM NĂNG LƯỢNG ===
let lastMessageIndex = -1;
let lastPhotoIndex = -1;

btnCharge.addEventListener('click', () => {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * energyMessages.length);
    } while (randomIndex === lastMessageIndex && energyMessages.length > 1);

    lastMessageIndex = randomIndex;
    
    // Chọn ngẫu nhiên 1 ảnh (Đảm bảo không bị trùng ảnh cũ)
    let randomPhotoIndex;
    do {
        randomPhotoIndex = Math.floor(Math.random() * energyPhotos.length);
    } while (randomPhotoIndex === lastPhotoIndex && energyPhotos.length > 1);
    
    lastPhotoIndex = randomPhotoIndex;
    const selectedPhoto = energyPhotos[randomPhotoIndex];
    
    // Tạo góc xoay ngẫu nhiên cho ảnh (từ -10 đến 10 độ) để trông giống Polaroid bị thả ngẫu nhiên
    const randomRotation = Math.floor(Math.random() * 21) - 10;
    
    // Hiệu ứng mờ đi
    energyMessageText.style.opacity = 0;
    energyMessageText.style.transform = 'scale(0.95)';
    
    // Nếu ảnh đang hiện thì cũng mờ đi
    if (!photoContainer.classList.contains('hidden')) {
        photoContainer.style.opacity = 0;
        photoContainer.style.transform = `scale(0.8) rotate(${randomRotation}deg)`;
    }
    
    setTimeout(() => {
        // Cập nhật text
        energyMessageText.innerText = energyMessages[randomIndex];
        energyMessageText.style.opacity = 1;
        energyMessageText.style.transform = 'scale(1)';
        
        // Cập nhật và hiện ảnh
        energyPhoto.src = selectedPhoto;
        photoContainer.classList.remove('hidden');
        photoContainer.style.setProperty('--rotation', randomRotation);
        
        // Mẹo: Cần một chút delay nhỏ để CSS transition nhận diện display:block trước khi đổi opacity
        setTimeout(() => {
            photoContainer.style.opacity = 1;
            photoContainer.style.transform = `scale(1) rotate(${randomRotation}deg)`;
        }, 50);
        
    }, 400); // Tăng thời gian chờ mờ xíu để ảnh load k bị gắt

    // Pháo hoa nhỏ nhỏ ăn mừng
    confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.6 },
        colors: ['#ff8fa3', '#ffb3c6', '#ffffff']
    });
});

// Hàm hỗ trợ pháo hoa lớn
function shootConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5, angle: 60, spread: 55, origin: { x: 0 },
            colors: ['#ff8fa3', '#ffb3c6', '#ff4d6d', '#ffffff']
        });
        confetti({
            particleCount: 5, angle: 120, spread: 55, origin: { x: 1 },
            colors: ['#ff8fa3', '#ffb3c6', '#ff4d6d', '#ffffff']
        });

        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}
