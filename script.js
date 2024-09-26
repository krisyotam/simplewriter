let musicPlayer = null;
let typewriterSoundEnabled = true; // Track if typewriter sound is enabled

function format(command, value = null) {
    document.execCommand(command, false, value);
}

function toggleToolbar() {
    const toolbar = document.getElementById('toolbar');
    toolbar.style.display = (toolbar.style.display === 'none' || !toolbar.style.display) ? 'flex' : 'none';
}

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        toggleToolbar();
    }
});

function playTypewriterSound(event) {
    if (event.key.length === 1 && typewriterSoundEnabled) { // Check if it's a printable character and sound is enabled
        const sound = document.getElementById('typewriter-sound');
        sound.currentTime = 0; // Reset sound to start
        sound.play();
    }
}

function exportText(format) {
    const content = document.getElementById('editor').innerHTML;
    // Handle export functionality based on format
    alert(`Exporting as ${format} not implemented yet!`);
}

function loadMusic(event) {
    const selectedValue = event.target.value;
    if (selectedValue) {
        if (musicPlayer) {
            musicPlayer.pause();
        }
        musicPlayer = new Audio(selectedValue);
        musicPlayer.play();
    }
}

function toggleTypewriterSound() {
    const checkbox = document.getElementById('typewriter-toggle');
    typewriterSoundEnabled = checkbox.checked; // Update the sound toggle state
}

function toggleContributors() {
    const contributorsList = document.getElementById('contributors-list');
    const isHidden = contributorsList.classList.toggle('hidden');
    
    // Update button text based on visibility
    document.getElementById('contributors-toggle').innerText = isHidden ? 'Contributors' : 'Hide Contributors';
    
    // If the contributors list is shown, load images
    if (!isHidden) {
        loadContributorsImages();
    }
}

async function loadContributorsImages() {
    const contributors = document.querySelectorAll('.contributor');

    contributors.forEach(async (contributor) => {
        const username = contributor.getAttribute('data-username');
        const img = document.createElement('img');

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            img.src = data.avatar_url; // Get avatar URL from GitHub API
            img.alt = `${username}'s Profile Picture`;
            img.width = 40;
            img.height = 40;
            img.style.borderRadius = '50%';
            img.style.marginRight = '10px';
            contributor.prepend(img); // Add image before the username

        } catch (error) {
            console.error('Error fetching user data:', error);
            // Optionally add an error placeholder image or text
        }
    });
}







  
  
  