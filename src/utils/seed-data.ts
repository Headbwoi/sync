export const boards = [
  {
    name: "Personal Tasks",
    description: "Tasks for personal projects",
    columns: [
      {
        name: "To Do",
        tasks: [
          {
            name: "Create Kanban App",
            description: "Develop a Kanban app for personal use",
            subtasks: [
              { name: "Research Kanban principles", completed: true },
              { name: "Design user interface", completed: false },
            ],
            id: "task1_random_id",
          },
        ],
      },
      {
        name: "In Progress",
        tasks: [
          {
            name: "Write Documentation",
            description: "Document the app's features and usage",
            subtasks: [],
            id: "task2_random_id",
          },
        ],
      },
      {
        name: "Done",
        tasks: [],
      },
    ],
  },
  {
    name: "Work Tasks",
    description: "Tasks for work projects",
    columns: [
      {
        name: "To Do",
        tasks: [],
      },
      {
        name: "In Progress",
        tasks: [
          {
            name: "Develop New Feature",
            description: "Implement a new feature for the company's website",
            subtasks: [],
            id: "task3_random_id",
          },
        ],
      },
      {
        name: "Code Review",
        tasks: [],
      },
      {
        name: "Testing",
        tasks: [
          {
            name: "Bug Fixes",
            description: "Fix reported bugs in the application",
            subtasks: [
              { name: "Identify root cause of bug", completed: true },
              { name: "Implement fix", completed: false },
            ],
            id: "task4_random_id",
          },
        ],
      },
      {
        name: "Done",
        tasks: [],
      },
    ],
  },
  {
    name: "Home Renovation",
    description: "Tasks for renovating the house",
    columns: [
      {
        name: "Planning",
        tasks: [
          {
            name: "Plan Renovation",
            description: "Create a renovation plan for the house",
            subtasks: [],
            id: "task5_random_id",
          },
        ],
      },
      {
        name: "Demolition",
        tasks: [
          {
            name: "Tear Down Walls",
            description: "Demolish interior walls",
            subtasks: [],
            id: "task6_random_id",
          },
        ],
      },
      {
        name: "Construction",
        tasks: [],
      },
      {
        name: "Finishing",
        tasks: [],
      },
      {
        name: "Completed",
        tasks: [],
      },
    ],
  },
  {
    name: "Vacation Planning",
    description: "Tasks for planning a vacation",
    columns: [
      {
        name: "Destination Research",
        tasks: [
          {
            name: "Choose Destination",
            description: "Select a vacation destination",
            subtasks: [],
            id: "task7_random_id",
          },
        ],
      },
      {
        name: "Flight Booking",
        tasks: [
          {
            name: "Book Flights",
            description: "Purchase airline tickets",
            subtasks: [],
            id: "task8_random_id",
          },
        ],
      },
      {
        name: "Accommodation",
        tasks: [],
      },
      {
        name: "Activities",
        tasks: [],
      },
      {
        name: "Completed",
        tasks: [],
      },
    ],
  },
]
