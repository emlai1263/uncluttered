# to-do-list
To-do list project for CSC 308. 
This is a website that contains features for users to create their own to-do lists. Users may click on the task card to add any tasks, as well as enter their due date and time estimate for that task. Users may also organize their tasks by categories, and can also view their tasks through a calendar view. They may track the status of their task (to do, in progress, completed), and completing tasks can unlock new features, such as added colors and themes.

Developers: Sai Rama Balakrishnan, Sabrina Huang, Angela Kim, Emily Lai, Arya Ramchander

Style Guide:
- lowerCamelCase() for naming functions/variables
- Kernigan & Ritchie's method of curly braces
- Single, specific import statements

Code Style and Linter Installation Instructions:
1. Ensure that VSCode is up to date. If there are any updates to be installed, install them now.
2. Navigate to the to-do-list/frontend folder.
3. Run the following command: npm i prettier@^3.1.0 eslint@^8.52.0 prettier-eslint@^16.1.2
4. Navigate to the to-do-list/backend folder.
5. Repeat Step 2.
6. Click on "Extensions" in VSCode, and search for "Prettier ESLint." Select "install."
7. Click on "Extensions" in VSCode, and search for "ESLint." Select "install."
8. Navigate to the "Project Settings" section of the Prettier ESLint installation instructions and follow steps 1-4. At this point, you should have a settings.json file in your to-do-list/.vscode folder, and you should have restarted VSCode.
10. Test that the extensions are correctly installed through the following steps:
    
   - Navigate to any arbitrary file in the to-do-list folder. Inside the body of any function, offset the tabs such that the statements are not in line with each other.
   - Type CMD + S (for Mac), or CTRL + S (for Windows) to save the code. The statements in the body of your selected function should now be in line with each other. This means that Prettier is correctly installed.
   - In the same file, type the following inside any function: const unused = 5;
   - The variable unused should be underlined as an error. Hover over it to ensure that it is an error thrown by ESLint, saying "'unused' is assigned a value but never used." If this error appears, then ESLint is installed correctly.


Figma Storyboard: https://www.figma.com/file/ywLnHZ6rao4ppC5qqaLCFQ/308-To-do-List?type=design&node-id=0%3A1&mode=design&t=8RKLbxvSnlpiEl7U-1\n
Code Coverage File (as of 3/18/24): https://docs.google.com/document/d/1ffSGjk5LD-kGKwJWh5kmMCQo04Yg27QSFlvFoyPDPxg/edit?usp=sharing 
