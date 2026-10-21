/*
  ENGINEERING PORTFOLIO — EDIT THIS FILE FIRST
  ---------------------------------------------
  This one file controls the visible name, text, projects, algorithms and media paths.
  Project images and descriptions are maintained here, including your own photos.
  Some unfinished entries contain editable instructional text.

  Quick steps:
  1. Update the owner information and the homepage introduction if desired.
  2. Replace images in assets/images and update matching image paths as needed.
  3. Keep the existing projects and edit the five engineering categories as needed.
  4. Add algorithm entries and optional demonstrations (same clip can link to multiple pages).
  5. The template banner and example badges are now disabled.
  6. Add actual public GitHub / video / CAD links (or leave them blank).

  Do not put private addresses, school schedules or personal contact data here.
*/
window.PORTFOLIO_DATA = {
  settings: {
    showTemplateNotice: false,
    imageCredit: ""
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
      title: "Robotics",
      subtitle: "Complete robot platforms, mechanical integration and control",
      image: "assets/images/IMG_2627 Bobbot.jpg"
    },
    {
      id: "cad",
      title: "Mechanical Design & CAD",
      subtitle: "Assemblies, mechanisms, design iterations and manufacturing",
      image: "assets/images/c.webp"
    },
    {
      id: "fabrication",
      title: "3D Printing & Fabrication",
      subtitle: "Custom parts, prototyping, tolerances and material selection",
      image: "assets/images/IMG_2788 3d print pulley.jpg"
    },
    {
      id: "software",
      title: "Software & Algorithms",
      subtitle: "Python, control algorithms, navigation and vision",
      image: "assets/images/navigation block diagram.jpg"
    },
    {
      id: "electronics",
      title: "Electronics & Embedded Systems",
      subtitle: "Sensors, controllers, wiring and embedded interfaces",
      image: "assets/images/arduino mega.jpg"
    }
  ],

  /*
    ALGORITHMS — ONE entry per method, NOT one entry per robot.

    Each algorithm has zero or more demonstrations. Videos are stored under
    assets/videos/<robot>/ and linked via demos[].video. The robotId must match
    the ID of a project under projects[].id. Once you link a real video,
    the same demonstration is displayed automatically on BOTH pages:
       algorithm.html?id=ibvs
       project.html?id=autonomous-mobile-robot

    Do not add a robotId / video until that implementation has been tested.
    These initial entries are general descriptions, not claims of completed work.

    Example to paste INSIDE an algorithm's demos: [
      {
        robotId: "autonomous-mobile-robot",
        title: "IBVS — Bobbot",
        description: "The robot aligns with a visual target.",
        video: "assets/videos/bobbot/ibvs-demo.mp4",
        poster: "", // Optional: assets/images/bobbot-ibvs-preview.webp
        results: "Add the measured performance and test conditions."
      }
    ]
    The following starting entries have demos: [] on purpose.
  */
  algorithms: [
    {
      id: "ibvs",
      title: "IBVS — Image-Based Visual Servoing",
      shortName: "IBVS",
      group: "Visual Servoing",
      summary: "Control robot motion from errors between observed and desired image features.",
      overview: "Image-Based Visual Servoing uses feature positions in the camera image as feedback to control robot motion.",
      method: "Choose visual features, define their target positions and reduce the image-space error using a control law. Depth estimation and camera geometry influence behaviour.",
      considerations: "Performance depends on visibility, feature tracking, camera field of view and the control gain. Large viewpoint changes may cause features to leave the image.",
      implementation: "Add the code structure, tuning and test setup when a robot implementation is ready.",
      sourceUrl: "",
      demos: []
    },
    {
      id: "pbvs",
      title: "PBVS — Position-Based Visual Servoing",
      shortName: "PBVS",
      group: "Visual Servoing",
      summary: "Control robot motion using an estimated target position and orientation.",
      overview: "Position-Based Visual Servoing uses an estimated relative pose, often from camera observations, to drive a robot toward a desired position and orientation.",
      method: "Estimate the target pose, compare it with the desired pose and convert position/orientation error into a robot-motion command.",
      considerations: "Performance depends on pose-estimation accuracy, calibration, coordinate transformations and target visibility.",
      implementation: "Add the estimator, coordinate conventions and physical testing details when available.",
      sourceUrl: "",
      demos: []
    },
    {
      id: "pid",
      title: "PID — Proportional–Integral–Derivative Control",
      shortName: "PID",
      group: "Control",
      summary: "Feedback control combining proportional, accumulated and changing error.",
      overview: "PID adjusts a control input to reduce the difference between a measured quantity and its target value.",
      method: "A proportional term reacts to current error, an integral term to accumulated error and a derivative term to the error's rate of change.",
      considerations: "Tuning matters. Saturation, integral wind-up, sensor noise and sample timing can limit performance.",
      implementation: "Document the controlled subsystem, parameters and before/after response measurements.",
      sourceUrl: "",
      demos: []
    },
    {
      id: "pure-pursuit",
      title: "Pure Pursuit — Path Following",
      shortName: "Pure Pursuit",
      group: "Navigation",
      summary: "Follow a planned path by steering toward a lookahead point.",
      overview: "Pure Pursuit follows a reference path using a target point at a specified lookahead distance along the path.",
      method: "Locate the lookahead target in the robot's coordinate frame, compute the required curvature and generate steering or differential-drive commands.",
      considerations: "The lookahead distance trades responsiveness against smoothness. Wheel slip, localization error and sharp path curvature affect results.",
      implementation: "Add robot kinematics, path setup, lookahead selection and repeated-trial evidence when tested.",
      sourceUrl: "",
      demos: []
    }
  ],

  /* Duplicate a project object to add another project. Each id must be unique. */
  projects: [
    {
      id: "autonomous-mobile-robot",                  // URL: project.html?id=autonomous-mobile-robot
      title: "Autonomous Mobile Robot",
      category: "robotics",                          // robotics | cad | fabrication | software | electronics
      image: "assets/images/IMG_2627 Bobbot.jpg",
      imageAlt: "Illustrative wheeled robot photograph",
      summary: "Meet Bobbot. An experimental autonomous robot designed to grow and expand in capability and function.",
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
      image: "assets/images/d.webp",
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
      title: "Pulleys",
      category: "fabrication",
      image: "assets/images/IMG_2788 3d print pulley.jpg",
      imageAlt: "Illustrative 3D-printed gears and fabricated components",
      summary: "",
      tags: ["3D Printing", "Prototyping", "Materials"],
      date: "3D Printed PETG Pulleys",
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
      category: "electronics",
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
    },
    {
      id: "robotics-project-2",
      title: "Autonomous Mobile Robot - Lite",
      category: "robotics",
      image: "assets/images/IMG_2756_robbot.jpg",
      imageAlt: "Robot project photo — replace or update caption",
      summary: "Meet Robbot. Robbot is Bobbot on a budget.  Where Bobbot doesn’t set a specific price on utility Robbot is designed to extract as much of Bobbot’s functionality and performance as possible without the cost",
      tags: ["Robotics", "Mechanical Design", "Control"],
      date: "",
      contribution: "Add what you personally designed, built, programmed and tested.",
      sections: {
        overview: "Introduce the second robotics project. What does the robot do and why was it built?",
        objectives: "Describe the requirements, performance targets and mechanical or software constraints.",
        design: "Add drawings or CAD images of the chassis, drivetrain and mechanisms, with design decisions.",
        construction: "Explain how the robot was assembled, wired and fabricated. Identify custom parts.",
        software: "Document how the robot is driven or controlled, including control logic and sensors.",
        testing: "Show trial conditions and measured performance, such as repeatability, speed or accuracy.",
        iterations: "Describe a problem discovered during testing and the changes made to resolve it.",
        results: "Add a photograph or short demonstration video of the robot working.",
        lessons: "Summarise the most valuable technical lessons and possible next improvements."
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "cad-project-2",
      title: "CAD Project 2 — Add Title",
      category: "cad",
      image: "assets/images/c.webp",
      imageAlt: "CAD illustration — replace with the second design project",
      summary: "Example entry: add a second CAD design, its intended function and the principal design challenges.",
      tags: ["CAD", "Engineering Design", "Mechanisms"],
      date: "",
      contribution: "Specify which design, calculations, assembly and drawings you produced.",
      sections: {
        overview: "Introduce the second CAD project and explain what the assembly or part is for.",
        objectives: "List dimensions, fit requirements, operating forces and other design constraints.",
        design: "Include CAD renders, section views, exploded assemblies and relevant design alternatives.",
        construction: "Describe any model, prototype or physical assembly produced from the CAD.",
        software: "Mention parametric modelling, simulation or scripts if used; otherwise state not applicable.",
        testing: "Document fit checks, interference reviews, movement range or physical testing.",
        iterations: "Compare initial and revised designs, explaining the reasons for changes.",
        results: "Show the final design and, where available, the completed manufactured part.",
        lessons: "Summarise important design lessons and improvements for future revisions."
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "fabrication-project-2",
      title: "Rubber Band Intake, Bumpers, Ramp",
      category: "fabrication",
      image: "assets/images/rubber_band_intake_bumpers_ramp.jpeg",
      imageAlt: "3D-printing example image — replace with the second fabrication project",
      summary: "3D printed rubber band intake, bumpers, and intake ramp",
      tags: ["3D Printing", "CAD", "Prototyping"],
      date: "",
      contribution: "Identify the components that you modelled, printed, assembled and evaluated.",
      sections: {
        overview: "Explain the purpose of the second printed component or fabricated mechanism.",
        objectives: "Define required strength, accuracy, mass, tolerances, assembly fit and operating environment.",
        design: "Include CAD geometry, critical dimensions, material choices and print-orientation decisions.",
        construction: "Record printer, material, settings and any finishing or assembly processes used.",
        software: "Explain any parametric CAD, CAD automation or printing scripts if applicable.",
        testing: "Document fit measurements, load testing, print reliability and inspection observations.",
        iterations: "Compare the first print and later revisions, including how tolerances were corrected.",
        results: "Include photographs of the printed component installed in its working mechanism.",
        lessons: "Summarise what you learned about manufacturing, material choices and print quality."
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "electronics-project-2",
      title: "Software Project 1 — Add Title",
      category: "software",
      image: "assets/images/electroni.webp",
      imageAlt: "Software and electronics example image — replace with a software project illustration",
      summary: "Example entry: document a Python software system, algorithms or robot-control application.",
      tags: ["Python", "Software", "Control"],
      date: "",
      contribution: "Specify the hardware, code and testing completed individually.",
      sections: {
        overview: "Introduce the subsystem, its purpose and where it is used.",
        objectives: "Describe accuracy, update rate, reliability and hardware/software integration requirements.",
        design: "Include architecture diagrams, interface definitions or circuit drawings where useful.",
        construction: "Show electronics assembly, connectors, sensor positions and wiring if applicable.",
        software: "Explain Python modules, algorithms, data handling and how commands reach the hardware.",
        testing: "Include repeatable measurements such as processing speed, sensor noise or control accuracy.",
        iterations: "Describe bugs, calibration problems or other limitations and how they were improved.",
        results: "Show the system operating, with graphs, screenshots or a short demonstration.",
        lessons: "Discuss technical lessons and remaining questions for further development."
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "software-project-2",
      title: "Software Project 2 — Add Title",
      category: "software",
      image: "assets/images/navigation block diagram.jpg",
      imageAlt: "Illustrative software/navigation architecture diagram",
      summary: "Example entry: add another programming project, its purpose and the results from testing.",
      tags: ["Python", "Software", "Testing"],
      date: "",
      contribution: "Describe the algorithms, modules and tests you personally developed.",
      sections: {
        overview: "Explain the problem addressed by the software project.",
        objectives: "Define requirements such as accuracy, latency, reliability and maintainability.",
        design: "Describe modules, architecture, interfaces and algorithm choices.",
        construction: "Describe the development environment and integration with other components.",
        software: "Describe implementation, configuration and important control or processing algorithms.",
        testing: "Document repeatable tests, metrics and comparisons.",
        iterations: "Show changes made after debugging and measured evaluations.",
        results: "Summarise proven outcomes and link to demonstrations where available.",
        lessons: "Record lessons and further technical questions."
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    
      links: { github: "", cad: "", video: "", downloads: "" }
    }
  ]
};
