import taskServices from "../taskServices.js";

jest.setTimeout(10000); // Increase timeout to 10 seconds

test("test getTasks", async () => {
  const userId = "66105e818b0d26a8a1670626"; 
  const result = await taskServices.getTasks(userId);
  expect(result.length).toBeGreaterThan(0);

  // Add your other assertions here
});

test("test deleteTask - task not found", async () => {
    const taskId = "invalid_task_id"; // An invalid task ID that does not exist
    const result = await taskServices.deleteTask(taskId);
    expect(result).toBeUndefined(); // Expect the function to return undefined
});
  
test("test addTask - invalid data", async () => {
    const task = {
      // Invalid task data, missing required fields, violating schema constraints, etc.
      // Example: userId is missing
      title: "unittest addtask_1",
      dueDate: new Date(),
      category: "Test",
      timeEst: 60,
      body: "Testing!"
    };
  
    const result = await taskServices.addTask(task);
    expect(result).toBe(false); // Expect the function to return false
});



// test("test getTasks", async () => {
//   const userId = "65e6328a68059ab797224e0f"; 
//   const result = await taskServices.getTasks(userId);
//   expect(result.length).toBeGreaterThan(0);
//   expect(result[0].title).toBe("fewfewffewfewfewg"); 
//   expect(result[0].category).toBe("anything");
//   expect(result[0].timeEst).toBe(20); 

//   expect(result[1].title).toBe("nothing");
//   expect(result[1].category).toBe("anything"); 
//   expect(result[1].timeEst).toBe(20); 

//   expect(result[2].title).toBe("Band Practice");
//   expect(result[2].category).toBe("anything");
//   expect(result[2].timeEst).toBe(20); 

//   expect(result[3].title).toBe("Conduct Coding Workshop"); 
//   expect(result[3].category).toBe("anything"); 
//   expect(result[3].timeEst).toBe(20); 

//   expect(result[4].title).toBe("eat dinner"); 
//   expect(result[4].category).toBe("anything"); 
//   expect(result[4].timeEst).toBe(20); 

//   expect(result[5].title).toBe("adding task testing"); 
//   expect(result[5].category).toBe("anything"); 
//   expect(result[5].timeEst).toBe(20); 

//   expect(result[6].title).toBe("Pack for Home"); 
//   expect(result[6].category).toBe("Work"); 
//   expect(result[6].timeEst).toBe(30);

//   expect(result[7].title).toBe("Meet Friend for Lunch"); 
//   expect(result[7].category).toBe("Work"); 
//   expect(result[7].timeEst).toBe(30); 

//   expect(result[8].title).toBe("sweep"); 
//   expect(result[8].category).toBe("anything"); 
//   expect(result[8].timeEst).toBe(20); 

//   expect(result[9].title).toBe("Test Task");
//   expect(result[9].category).toBe("Test");
//   expect(result[9].timeEst).toBe(30); 
// });

// test("test deleteTask", async () => {
//   const userId = "dd_id"; 
//   // Add a task for testing deletion
//   const task = {
//     userId: userId,
//     title: "unittest deleteTask",
//     dueDate: new Date(),
//     category: "Test",
//     timeEst: 60,
//     body: "Testing!"
//   };
//   const addedTask = await taskServices.addTask(task);
  
//   const result = await taskServices.deleteTask(addedTask._id);
  
//   expect(result).toBeDefined();
// });


// test("test addTask", async () => {
//     const task = {
//       userId: "add_id",
//       title: "unittest addtask_1",
//       dueDate: new Date(),
//       category: "Test",
//       timeEst: 60,
//       body: "Testing!"
//     };

//     const addedTask = await taskServices.addTask(task);
//     const result = await taskServices.getTasks("add_id");
//     expect(addedTask.title).toBe("unittest addtask_1");
//     expect(addedTask.timeEst).toBe(60);
//     expect(addedTask.body).toBe("Testing!");
// });
  


// test("test editTask", async () => {
//   const taskId = "65f8fb42e0b37710e49a04eb"; 
//   const taskEdits = { title: "Edited Task Title" };
  
//   const result = await taskServices.editTask(taskId, taskEdits);
  
//   expect(result).toBeDefined();
  
//   if (result) {
//     expect(result.title).toBe("Edited Task Title");
//   }
// });

// test("test editTask_recover", async () => {
//     const taskId = "65f8fb42e0b37710e49a04eb"; 
//     const taskEdits = { title: "Test Task" };
    
//     const result = await taskServices.editTask(taskId, taskEdits);
    
//     expect(result).toBeDefined();
    
//     if (result) {
//       expect(result.title).toBe("Test Task");
//     }
// });

