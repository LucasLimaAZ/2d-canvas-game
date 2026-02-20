# 🎮 JS Platformer Game

A simple 2D platformer game built with **vanilla JavaScript** and **HTML5 Canvas**.

This project was created to practice game architecture, entity systems, collision detection, state management, and basic AI behaviors.

---

## 🎮 Features

* Player movement (left, right, jump)
* Shooting projectiles
* Enemy AI (towards-player behavior with reaction delay)
* Collision system with custom hitboxes
* Win condition (flag trigger)
* Game states (playing / lost / win)
* Basic sound effects system
* Camera following system

---

## 🛠️ Technologies Used

* JavaScript (ES6 Modules)
* HTML5 Canvas API
* Custom Entity System
* Basic Game Loop (`requestAnimationFrame`)

---

## 📂 Project Structure

```
assets/
  sounds/
  sprites/

core/
  Input.js
  Utils.js

entities/
  Player.js
  Enemy.js
  Projectile.js
  WinFlag.js
  ...

main.js
index.html
style.css
```

---

## 🧠 Architecture Concepts Used

* Entity-based system
* Separation of concerns
* Game state management
* Basic AI (seek behavior)
* Custom collision detection with hitboxes
* Simple trigger vs solid entity distinction

---

## ▶️ How to Run

1. Clone the repository
2. Open `index.html` in your browser
   or
3. Use a local server (recommended)

Example with VSCode Live Server:

```
Right click → Open with Live Server
```

---

## 🔊 Assets & Credits

Sound effects obtained from Freesound.org.
See `licenses.txt` for full attribution details.

---

## 📌 Future Improvements

* Better enemy AI behaviors
* Animation system refinement
* Pause state
* Level system
* UI improvements
* Mobile controls

---

## 📷 Preview

<img width="911" height="613" alt="image" src="https://github.com/user-attachments/assets/cb179e64-4087-4532-8399-b453de060692" />


---

## 📄 License

This project is for learning purposes.
See `licenses.txt` for third-party asset licenses.
