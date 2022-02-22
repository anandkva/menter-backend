//Data for API
let data = [
  {
    students: [
      {
        name: "Suresh",
        mentor: "Arjun",
        id: 1,
      },
      {
        name: "Mukesh",
        mentor: "Sangeetha",
        id: 2,
      },
      {
        name: "Preethi",
        mentor: "Sangeetha",
        id: 3,
      },
      {
        name: "Mohammed",
        mentor: "Vicky",
        id: 4,
      },
      {
        name: "Jhon",
        mentor: "Dinesh",
        id: 5,
      },
      {
        name: "Bharathi",
        mentor: "Sangeetha",
        id: 6,
      },
    ],
  },
  {
    mentors: [
      {
        name: "Arjun",
        studs: ["Suresh"],
        id: 1,
      },
      {
        name: "M2",
        studs: ["Preethi", "Mohammed", "Bharathi"],
        id: 2,
      },
      {
        name: "Sangeetha",
        studs: ["Jhon"],
        id: 3,
      },
    ],
  },
];

//Services

const service = {
  displayStudents() {
    return data[0].students;
  },
  displayMentors() {
    return data[1].mentors;
  },
  displayMentor(id) {
    return data[1].mentors[id - 1];
  },

  //To create STUDENT
  createStudent(newData) {
    let flag = true;

    //Checking if student already exists
    data[0].students.map((s) => {
      console.log(s);
      if (s.name == newData.name) {
        flag = false;
      }
    });

    //Pushing the new room to the
    if (flag) {
      let id = data[0].students.length + 1;
      let newStudent = {
        ...newData,
        mentor: "",
        id,
      };
      data[0].students.push(newStudent);
      return data[0].students;
    } else {
      return { error: "Already existing student" };
    }
  },
  //To create Mentor
  createMentor(newData) {
    let flag = true;

    //Checking if mentor already exists
    data[1].mentors.map((m) => {
      console.log(m);
      if (m.name == newData.name) {
        flag = false;
      }
    });

    //Pushing the new mentor to the data
    if (flag) {
      let id = data[1].mentors.length + 1;
      let newMentor = {
        ...newData,
        studs: [],
        id,
      };
      data[1].mentors.push(newMentor);
      return data[1].mentors;
    } else {
      return { error: "Already existing mentor" };
    }
  },

  //Function to assign a student to a mentor
  assignStudentToMentor(id, newData) {
    let flag = true;
    let output = {};
    let message = "";
    let selectedMentor = data[1].mentors.filter((m) => m.id == id);
    // console.log("new", newData);
    let selectedStudent = data[0].students.filter((s) => {
      return s.name == newData.student;
    });
    console.log("selected stud", selectedStudent);

    //If student already has a mentor throw an error
    if (selectedStudent[0].mentor) {
      flag = false;
      message = "Student already has a mentor : " + selectedStudent[0].mentor;
    }

    //If not, assign the student to the mentor
    if (flag) {
      //Updating mentors
      for (let i in data[1].mentors) {
        if (data[1].mentors[i].id == id) {
          data[1].mentors[i].studs.push(newData.student);
          output = data[1].mentors[i];
        }
      }
      //Updating students
      for (let i in data[0].students) {
        if (data[0].students[i].name == newData.student) {
          data[0].students[i].mentor = selectedMentor[0].name;
        }
      }
      // console.log(output);
      return output;
    } else {
      return { error: message };
    }
  },

  //Function to change mentor of a student
  changeMentor(id, newData) {
    let flag = true;
    let output = {};
    let message = "";
    let selectedStudent = data[0].students.filter((s) => s.id == id);

    //Checking if Student already has this mentor
    if (selectedStudent[0].mentor == newData.mentor) {
      flag = false;
      message = "Student already has this mentor";
    }

    if (flag) {
      for (let i in data[1].mentors) {
        //Removing the selected student from any other mentor if it existed.
        if (data[1].mentors[i].name == selectedStudent[0].mentor) {
          const index = data[1].mentors[i].studs.indexOf(
            selectedStudent[0].name
          );
          if (index > -1) {
            data[1].mentors[i].studs.splice(index, 1);
          }
        }
      }
      //Updating students
      for (let i in data[0].students) {
        if (data[0].students[i].id == id) {
          data[0].students[i].mentor = newData.mentor;
          output = data[0].students[i];
        }
      }

      //Updating mentors list
      for (let i in data[1].mentors) {
        //Adding selected student to selected mentor
        if (data[1].mentors[i].name == newData.mentor) {
          data[1].mentors[i].studs.push(selectedStudent[0].name);
          console.log(data[1].mentors[i]);
        }
      }

      return output;
    } else {
      return { error: message };
    }
  },
};

module.exports = service;
