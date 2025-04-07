# CSC Trivia App
A web application used to host UWaterloo's CS Club's Trivia Nights. Originally developed by Manasva Katyal, upgraded by Oliver Mao.

Now supports audio files.

In order to use this, simply follow the prescribed JSON format below and modify the questions.json file as required.

Images should be placed in the ./public/images/ folder, audio in the ./public/audio/ folder, and videos in the ./public/video/ folder. They should be named by just their file name in the JSON, as it will pull from these folders.

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

Consult W25 Trivia Document for how the Google Sheet should be formatted.
The following script should be inserted into the App Script in the Google Sheet.
```
function generateJSON() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues();

  var jsonArray = [];
  for (var i = 0; i < 325; i++) {
    var id = i + 1;
    var question = data[i][0];
    var answer = data[i][1];
    var category = data[i][2];
    var img = data[i][3] === "" ? "N/A" : data[i][3];
    var audio = data[i][4] === "" ? "N/A" : data[i][4];
    var video = data[i][5] === "" ? "N/A" : data[i][5];
    Logger.log(answer);
    Logger.log(category)
    Logger.log(img)
    Logger.log(audio)
    Logger.log(video)
    
    var jsonObject = {
      "id": id,
      "question": question,
      "answer": answer,
      "category": category,
      "img": img,
      "audio": audio,
      "video": video
    };
    jsonArray.push(jsonObject);
  }
  
  var jsonString = JSON.stringify(jsonArray, null, 2);
  
  // Create a new sheet tab
  var newSheet = spreadsheet.insertSheet("JSON Data");

  var jsonChunks = jsonString.match(/(.|[\r\n]){1,50000}/g);
  for (var j = 0; j < jsonChunks.length; j++) {
    newSheet.getRange(j + 1, 1).setValue(jsonChunks[j]);
  }

  Logger.log("JSON data written to sheet.");
}
```

Set up steps for users unfamiliar with React:
1. Download this project and unzip it
2. Place the files for questions with images, audio, or videos in their corresponding folders. Ensure that the corresponding cells in the Google Sheet have the filename of these files in the correct column.
3. In the Google Sheet containing the trivia questions, go to  `Extensions->App Script` and paste the above script. Then run the code.
4. Copy the generated JSON file into the `./src/questions.json` file. Ensure that it is properly JSON formatted (VSCode should show errors if it isn't).
5. In the terminal, `cd` into the folder for this project
6. Enter `npm i` into the console
7. Enter `npm run start`
8. The console will display a URL in the form `http://localhost:XXXX/`. Go to this URL in your local browser.
9. Ensure the questions are displaying properly. It is possible that the Google Sheet was formatted incorrectly and you don't want to find out during the event.
