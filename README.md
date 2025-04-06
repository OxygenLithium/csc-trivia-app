# CSC Trivia App
A web application used to host UWaterloo's CS Club's Trivia Nights. Originally developed by Manasva Katyal, upgraded by Oliver Mao.

Now supports audio files.

In order to use this, simply follow the prescribed JSON format below and modify the questions.json file as required.

Images should be placed in the ./public/images/ folder, and audio in the ./public/audio/ folder. They can be named by just their name in the JSON, as it will pull from these folders.

JSON Format Example: 
```
[
  {"id": 1, "question": "What is the current stable release of the C++ standard ", "answer": "C++20", "category": "Coding Languages and Frameworks", "img": "N/A", "audio": "N/A"},
  {"id": 2, "question": "Out of the following, what is the oldest programming language: COBOL, Fortran, Lisp, BASIC ", "answer": "Fortran", "category": "Coding Languages and Frameworks", "img": "N/A", "audio": "N/A"},
  {"id": 3, "question": "What coding language is most commonly used for iOS mobile development? ", "answer": "Swift", "category": "Coding Languages and Frameworks", "img": "N/A", "audio": "N/A"},
  {"id": 4, "question": "What popular frontend web framework was developed by Facebook in 2013? ", "answer": "React", "category": "Coding Languages and Frameworks", "img": "N/A", "audio": "N/A"},
  {"id": 5, "question": "Which programming language is this screenshot taken from? ", "answer": "JavaScript", "category": "Coding Languages and Frameworks", "img": "javascript.jpg", "audio": "N/A"},
  {"id": 6, "question": "Which operating system's startup sound is this? ", "answer": "Windows XP", "category": "Operating Systems ", "img": "N/A", "audio": "windowsXP.mp3"},
]
```
