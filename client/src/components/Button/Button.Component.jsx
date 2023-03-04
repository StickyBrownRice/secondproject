import React, { useState } from 'react';
import "./Button.styles.css";

function ClickCounterButton() {
  const [clickCount, setClickCount] = useState(0);

  async function handleClick() {
    try {
      const response = await fetch('/click', { method: 'POST' });
      const data = await response.json();
      setClickCount(data.count);
      displayShibaImage();
      hideButton();
      showButtonAfterDelay(3000);
    } catch (error) {
      console.error(error);
    }
  }

  function displayShibaImage() {
    fetch('http://shibe.online/api/shibes?count=1')
      .then(response => response.json())
      .then(data => {
        const imageUrl = data[0];
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.style.maxWidth = '100%';
        imgElement.style.maxHeight = '100%';
        imgElement.style.objectFit = 'contain';
        imgElement.style.position = 'fixed';
        imgElement.style.top = '50%';
        imgElement.style.left = '50%';
        imgElement.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(imgElement);
      })
      .catch(error => console.error(error));

    // Remove previously displayed images from the page
    const previousImages = document.querySelectorAll('img');
    previousImages.forEach(img => img.remove());
  }

  function hideButton() {
    const button = document.querySelector('button');
    button.style.display = 'none';
  }

  function showButtonAfterDelay(delay) {
    setTimeout(() => {
      const button = document.querySelector('button');
      button.style.display = 'block';
    }, delay);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', paddingTop: '20px' }}>
      <button onClick={handleClick} style={{ display: clickCount > 0 ? 'none' : 'block', position: 'fixed', top: '100px', left: '50%', transform: 'translate(-50%, 0)' }}>
        Click me! ({clickCount} clicks)
      </button>
    </div>
  );
}

export default ClickCounterButton;