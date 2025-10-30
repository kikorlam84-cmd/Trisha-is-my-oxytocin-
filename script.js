const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionContainer = document.getElementById('questionContainer');
const resultContainer = document.getElementById('resultContainer');
const backgroundMusic = document.getElementById('backgroundMusic');
const resultVideo = document.getElementById('gifResult');

// মিউজিক এবং ভিডিও প্লে করার লজিক (প্রথম ইউজার ইন্টারঅ্যাকশনে)
document.addEventListener('DOMContentLoaded', () => {
    // ওয়েবসাইটে প্রথমবার ক্লিক বা স্পর্শ করলে সব চালু হবে
    document.body.addEventListener('click', function init() {
        if (backgroundMusic && backgroundMusic.paused) {
            backgroundMusic.volume = 0.6; 
            backgroundMusic.play().catch(error => console.log("Audio playback failed:", error));
        }
        
        // প্রশ্ন অংশের ভিডিওটি চালু করার জন্য
        const questionVideo = questionContainer.querySelector('video');
        if (questionVideo) {
            questionVideo.play().catch(error => console.log("Question video play failed:", error));
        }
        
        document.body.removeEventListener('click', init); // একবার ক্লিক হলেই যথেষ্ট
    }, { once: true });
});

// No বাটন এর লজিক: মাউস আনলেই দূরে সরে যাবে
noBtn.addEventListener('mouseover', () => {
    // ... (আগের কোড) ...
    const containerRect = questionContainer.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width - 20;
    const maxY = containerRect.height - btnRect.height - 20;
    
    const newX = Math.max(0, Math.floor(Math.random() * maxX));
    const newY = Math.max(0, Math.floor(Math.random() * maxY));
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
});


// Yes বাটন এর লজিক: ক্লিক করলে ফলাফল দেখাবে এবং ভিডিও চালাবে
yesBtn.addEventListener('click', () => {
    // প্রশ্ন লুকানো
    questionContainer.classList.add('hidden'); 
    
    // ফলাফল দেখানো
    resultContainer.classList.remove('hidden'); 

    // ফলাফল ভিডিওটি প্লে করা
    if (resultVideo) {
        resultVideo.play();
    }
    
    // মিউজিক জোরে করা
    if (backgroundMusic) {
        backgroundMusic.volume = 1.0; 
    }
});
