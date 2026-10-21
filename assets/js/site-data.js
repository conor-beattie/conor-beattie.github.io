/*
  ENGINEERING PORTFOLIO — EDIT THIS FILE FIRST
  ---------------------------------------------
  This one file controls the visible name, text, projects and image paths.
  All images are examples extracted from the reference Portfolio.docx.
  Replace them with real project photographs before sharing the site.

  Quick steps:
  1. Replace YOUR NAME, YN and the headline / introduction below.
  2. Replace images in assets/images and update matching image paths.
  3. Replace the four example projects with real projects.
  4. When ready, change showTemplateNotice to false.
  5. Add actual public GitHub / video / CAD links (or leave them blank).

  Do not put private addresses, school schedules or personal contact data here.
*/
window.PORTFOLIO_DATA = {
  settings: {
    showTemplateNotice: true,
    imageCredit: "Illustrative images from the supplied portfolio document — replace with your own project photos and CAD renders."
  },

  owner: {
    name: "Conor Beattie",
    initials: "CB",
    portfolioTitle: "Engineering Portfolio",
    location: "United Kingdom",
    eyebrow: "ENGINEERING · ROBOTICS · DESIGN",
    headline: "From an idea to a working system.",
    introduction: "A growing collection of robotics, mechanical design, electronics and software projects — documenting the thinking, building and testing behind each one.",
    shortAbout: "I enjoy turning engineering questions into physical prototypes: designing mechanisms, programming controllers, bringing systems together and improving them through testing.",
    aboutParagraphs: [
      "This portfolio is a record of projects, design decisions and technical experiments. Each entry explains the objective, the approach taken, the challenges encountered and what was learned.",
      "I'm especially interested in robotics, autonomous systems, mechanical design, 3D printing, electronics and Python programming. The portfolio will grow as new projects are designed, built and tested."
    ],
    githubUrl: "",       // e.g. https://github.com/your-username
    linkedinUrl: "",     // optional, leave blank until ready
    youtubeUrl: "",      // optional
    email: ""            // optional — public email appears on site if provided
  },

  categories: [
    {
      id: "robotics",
      title: "Autonomous Robotics",
      subtitle: "Robot architecture, sensors, Python control and navigation",
      image: "assets/images/IMG_2627 Bobbot.jpg"
    },
    {
      id: "cad",
      title: "Mechanical Design & CAD",
      subtitle: "Assemblies, mechanisms, design iterations and manufacturing",
      image: "assets/images/cad.webp"
    },
    {
      id: "fabrication",
      title: "3D Printing & Fabrication",
      subtitle: "Custom parts, prototyping, tolerances and material selection",
      image: "assets/images/IMG_2788 3d print pulley.jpg"
    },
    {
      id: "software",
      title: "Software & Electronics",
      subtitle: "Python, embedded systems, motor control and computer vision",
      image: "assets/images/arduino mega.jpg"
    }
  ],

  /* Duplicate a project object to add another project. Each id must be unique. */
  projects: [
    {
      id: "autonomous-mobile-robot",                  // URL: project.html?id=autonomous-mobile-robot
      title: "Autonomous Mobile Robot",
      category: "robotics",                          // robotics | cad | fabrication | software
      image: "assets/images/IMG_2627 Bobbot.jpg",
      imageAlt: "Illustrative wheeled robot photograph",
      summary: "Meet Bobbot. An experimental autonomous robot designed to grow and expand in capability and function. 
      tags: ["Robotics", "Python", "Sensors"],
      date: "",                                       // e.g. 2026; leave blank if not wanted
      contribution: "Replace with what you personally designed, built, programmed or tested.",
      sections: {
        overview: "Bobbot is an ongoing multi-year project working towards a fuly autonomous robot.  Describe the robot and the problem it was intended to solve. Include the final result in one or two sentences.",
        objectives: "List the main engineering requirements: movement, accuracy, payload, autonomy, cost, time or physical dimensions.",
        design: "Explain chassis layout, drivetrain choice, sensor placement and important design trade-offs. Include CAD screenshots where available.",
        construction: "Record the mechanical assembly, fabrication, wiring and hardware integration, including parts you designed yourself.",
        software: "Describe the Python control architecture, navigation methods, sensor processing and motor-control strategy.",
        testing: "Include measurable trials: success rate, distance travelled, positioning accuracy, battery life or repeatability. Add test conditions.",
        iterations: "Show one or two meaningful problems, the evidence used to diagnose them, and how the design was changed.",
        results: "Summarise what currently works. Add a 20–60-second demonstration video and a photograph of the finished robot.",
        lessons: "What would you do differently in a second revision?"
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "mechanical-gripper",
      title: "Mechanical Gripper Design",
      category: "cad",
      image: "assets/images/cad.webp",
      imageAlt: "Illustrative CAD model of a mechanical gripper",
      summary: "Example entry: document a mechanical assembly with CAD models, design calculations and successive improvements.",
      tags: ["CAD", "Mechanisms", "Design"],
      date: "",
      contribution: "Replace with the parts and assemblies that you modelled or engineered.",
      sections: {
        overview: "State the function of the mechanism and how it fits into the wider system.",
        objectives: "Document required travel, grip force, envelope, mass, material and manufacturing constraints.",
        design: "Include views from the CAD assembly and describe the linkage or transmission principle.",
        construction: "Explain how the components were manufactured and assembled.",
        software: "If motors, sensors or controllers are involved, explain how motion is commanded or measured. Otherwise note that software is not applicable.",
        testing: "Measure opening range, repeatability, grip performance or fit tolerance if possible.",
        iterations: "Show how the mechanism evolved, especially any changes needed for reliable operation.",
        results: "Add a photograph or short clip of the completed mechanism working.",
        lessons: "Identify important mechanical lessons and improvements for the next version."
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "printed-mechanisms",
      title: "3D-Printed Mechanisms",
      category: "fabrication",
      image: "assets/images/IMG_2788 3d print pulley.jpg",
      imageAlt: "Illustrative 3D-printed gears and fabricated components",
      summary: "Example entry: present printable components with design intent, materials, tolerances and print revisions.",
      tags: ["3D Printing", "Prototyping", "Materials"],
      date: "",
      contribution: "Replace with the components you designed and printed yourself.",
      sections: {
        overview: "Identify the component or family of parts and explain the engineering need.",
        objectives: "Set out constraints such as fit, load, wear, size and available printer materials.",
        design: "Show the CAD geometry and any details that make the part printable or assemble correctly.",
        construction: "Record material selection, print orientation, supports and post-processing.",
        software: "If applicable, explain parametric CAD or scripts used to generate the part.",
        testing: "Show fit checks, load tests, endurance trials or measured dimensional accuracy.",
        iterations: "Compare revisions and explain the effect of dimensional or design changes.",
        results: "Add photographs of printed parts installed in a working assembly.",
        lessons: "Summarise what worked in manufacturing and what you would change."
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "robot-control-electronics",
      title: "Robot Control & Electronics",
      category: "software",
      image: "assets/images/arduino mega.jpg",
      imageAlt: "Illustrative electronics and Raspberry Pi robotics prototype",
      summary: "Example entry: explain how sensors, control software and electronics work together inside a robot.",
      tags: ["Python", "Electronics", "Computer Vision"],
      date: "",
      contribution: "Replace with the hardware, software and debugging work you completed.",
      sections: {
        overview: "Describe the electronic or software subsystem, its purpose and the wider robot it supports.",
        objectives: "Set requirements for timing, accuracy, interfaces, reliability and safety.",
        design: "Illustrate the system architecture, signal flow and the hardware interfaces.",
        construction: "Record wiring, sensor configuration, motor drivers and controller hardware.",
        software: "Explain program structure, Python modules, algorithms, testing strategy and configuration.",
        testing: "Present results such as response time, sensor accuracy or performance across repeated trials.",
        iterations: "Discuss debugging, performance bottlenecks and improvements.",
        results: "Add screenshots, telemetry plots or a video of the system operating.",
        lessons: "Summarise technical insights and remaining engineering questions."
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    }
  ]
};
