/*
  ENGINEERING PORTFOLIO — EDIT THIS FILE FIRST
  ---------------------------------------------
  This one file controls the visible name, text, projects, software behaviours, algorithms and media paths.
  Project images and descriptions are maintained here, including your own photos.
  Some unfinished entries contain editable instructional text.

  Quick steps:
  1. Update the owner information and the homepage introduction if desired.
  2. Replace images in assets/images and update matching image paths as needed.
  3. Keep the existing projects and edit the six engineering categories as needed.
  4. Add entries under software[] for behaviours; add algorithms[] for reusable methods.
  5. Link by IDs: software[].algorithmIds and software[].robotIds (videos optional).
  5. The template banner and example badges are now disabled.
  6. Add actual public GitHub / video / CAD links (or leave them blank).

  7. Every project/software entry has nine optional journal-style `sections` fields.
     Empty fields are hidden automatically. Use `sectionDetails` for optional
     subheadings and `references` for credited links and useful sources.

  8. For 3D prints: keep `image` as the CAD render and list 1–4 real print photos
     under `printPhotos`. Optional printer settings belong in `printDetails`.

  CATEGORY LISTING ORDER:
  Use categoryOrder: 1, 2, 3, ... independently in each project category
  (Robotics, CAD, Fabrication, Electronics) or for software entries.
  It does not affect homepage featuredOrder, which is separate.
  If absent/invalid, the entry follows all numbered items in original file order.
  Algorithm listings are sorted alphabetically, regardless of categoryOrder.
  Prefer unique positive whole numbers per category; gaps are allowed.
  Each category displays Projects followed by Future Projects (only if any).
  Planned work is hidden from demonstrated-skill filters and Selected Projects.
  All Projects retains its original order within the two groups.

  PROJECT PROGRESS: status: "planned" / "in-progress" / "completed" / "".
  "planned" appears in Future Projects; all others in Projects.
  targetStart: "" is optional and displayed only for planned work.
  Planned engineering/software entries must have no demonstrated skill tags.
  Algorithm skill tags describe topics, including future learning goals.

  CARD DISPLAY: category, title, optional subtitle, optional status, summary.
  For projects/algorithms: subtitle: "", status: ""; for software: subtitle: "", cardStatus: "".
  Software's existing status field records testing/documentation evidence and is NOT
  the public project progress status. Any optional field set to "" is not rendered.
  Use only Future or In Progress for visible progress labels, or "" to hide.

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
    homeHeadline: "Project Portfolio",
    introduction: "",
    shortAbout: "I enjoy turning engineering questions into physical prototypes: designing mechanisms, programming controllers, bringing systems together and improving them through testing.",
    aboutParagraphs: [
      "I am a GCSE student interested in all things mechanical. I enjoy using CAD, building prototypes, testing different ideas, designing mechanisms, understanding how moving parts work together and integrating this with software and sensors.",
      "I plan to study A-level Maths, Further Maths, Physics and Electronics and would like to study mechanical engineering at university.",
      "This site showcases my personal projects, future ambitions and what I have learned along the way"
    ],
    // How It All Began — add any favourite LEGO Technic models after student review.
    aboutHistoryParagraphs: [
      "My interest in mechanics goes back as far as I can remember. My parents bought me my first LEGO Technic set when I was four, and I was instantly hooked. Each time I finished a set, they would buy me another that was a little more challenging. Just before my sixth birthday, I completed the LEGO Technic 42055 Bucket Wheel Excavator, the flagship model of the 2016 range and the largest Technic set released at the time."
    ],
    // OPTIONAL ABOUT PHOTOS: 0–4 images per section. Empty arrays leave no gallery or blank space.
    // Upload photographs to assets/images/, then add { src: "assets/images/file.jpg", caption: "Description" }.
    // Captions are optional; use alt for a more descriptive accessibility label if desired.
    aboutHistoryPhotos: [
      {
        src: "assets/images/IMG_9305.JPG",
        caption: ""
      },
    ],
    outsideEngineeringParagraphs: [
      "Chess became another major interest when I started playing and studying it during the COVID-19 pandemic. Within 4 years, I was ranked as one of England's top 10 players for my year group and represented England in the Under-13 team at the Glorney Cup tournament."
    ],
    // Add chess, cycling or bikepacking pictures here when selected.
    outsideEngineeringPhotos: [],
    // Optional About-page influences. Add { name, focus, description, url } entries.
    // Leave the array empty to hide the entire Influences & Inspiration section.
    influences: [
      {
        name: "Veritasium",
        focus: "Interesting Science",
        description: "Shortest path algorithms, maze solving, game theory...just interesting science",
        url: "https://www.youtube.com/@veritasium"
      },
      {
        name: "Madoca1977",
        focus: "LEGO Technic MOCs",
        description: "Inventive LEGO Technic creations with unique mechanical designs.",
        url: "https://rebrickable.com/users/Madoca1977/mocs/"
      },
      {
        name: "Seths Bike Hacks (Berm Peak)",
        focus: "Unique Bicycle Products and Hacks",
        description: "Seth's channel has a long history of unique product reviews, 3d prints, and creative hacks",
        url: "https://www.youtube.com/@SethsBikeHacks"
      }
    ],
    githubUrl: "",       // e.g. https://github.com/your-username
    linkedinUrl: "",     // optional, leave blank until ready
    youtubeUrl: "",      // optional
    email: ""            // optional — public email appears on site if provided
  },

  categories: [
    {
      id: "robotics",
      published: true,
      title: "Robotics",
      subtitle: "Complete robot platforms, mechanical integration and control",
      image: "assets/images/IMG_2627 Bobbot.jpg"
    },
    {
      id: "cad",
      published: true,
      title: "Mechanical Design & CAD",
      subtitle: "Assemblies, mechanisms, design iterations and manufacturing",
      image: "assets/images/gripper_bobbot.png"
    },
    {
      id: "fabrication",
      published: true,
      title: "3D Printing & Fabrication",
      subtitle: "Custom parts, prototyping, tolerances and material selection",
      image: "assets/images/Pulley.png"
    },
    {
      id: "electronics",
      published: true,
      title: "Embedded Control & Integration",
      subtitle: "",
      cardSubtitle: "Microcontrollers, motor drivers, wiring and robotic control integration",
      image: "assets/images/arduino mega.jpg"
    },
    {
      id: "software",
      published: true,
      title: "Software Logic",
      subtitle: "Flow diagrams showing how programmed routines combine reusable functions",
      image: "assets/diagrams/bobbot-return-to-base.svg"
    },
    {
      id: "algorithms",
      published: true,
      title: "Software Libraries",
      subtitle: "Reusable software modules, from basic functions to robotics algorithms",
      image: "assets/images/software_libaries_cover.png"
    }
  ],

  /*
    SOFTWARE — One meaningful behaviour/system per entry, independent of algorithms.
    robotIds link to projects[].id; algorithmIds link to algorithms[].id.
    flowchart: local SVG illustration; sourceUrl: add the PUBLIC GitHub link when ready.
    Evidence status should describe actual test evidence, not merely code existence.
    Detail sections start blank for the student to write. Card descriptions and
    hardware/algorithm links remain unchanged; only a genuine routine flowchart
    is displayed automatically on a software detail page.
  */
  // OPTIONAL HOMEPAGE SELECTION:
  // Add featuredOrder: 1, (or 2, 3, ...) to a project or software entry to
  // display it in Selected Projects. Smaller numbers appear first.
  // If featuredOrder is missing, the entry is NOT selected; it still appears
  // on its normal category/software page. Use unique positive whole numbers.
  software: [
    {
      id: "acquire-object",
      published: true,
      title: "Acquire Object",
      subtitle: "",
      cardStatus: "",
      projectStatus: "in-progress",
      type: "Behaviour",
      skills: ["Python"],
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["ibvs", "pbvs", "apriltag-pose", "local-obstacle-avoidance"],
      summary: "Find, approach and pick up an object.",
      sections: {},
      sectionDetails: {},
      references: [],
      sourceUrl: "",
      demos: []
    },
    {
      id: "robot-behaviour",
      published: true,
      title: "Robot Behaviour",
      subtitle: "",
      cardStatus: "",
      projectStatus: "in-progress",
      type: "System",
      skills: ["Python"],
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: [],
      summary: "Coordinate the main sequence of autonomous robot operations.",
      sections: {},
      sectionDetails: {},
      references: [],
      sourceUrl: "",
      demos: []
    },
    {
      id: "return-to-base",
      categoryOrder: 1,
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["Python", "Feedback Control"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      featuredOrder: 5,
      title: "Return to Base",
      subtitle: "",
      cardStatus: "",
      projectStatus: "in-progress", // Optional: "planned"; existing status records evidence maturity.
      targetStart: "", // Optional provisional start period.

      type: "Behaviour",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["apriltag-pose", "pid", "local-obstacle-avoidance", "wall-following", "dead-reckoning"],
      tags: ["Python", "Navigation", "AprilTags", "Recovery"],
      status: "Code documented",
      summary: "Navigate back to the delivery area using a chain of arena tags, with obstacle avoidance, guide recovery and a conditional wall-following approach.",
      image: "assets/diagrams/bobbot-return-to-base.svg",
      flowchart: "assets/diagrams/bobbot-return-to-base.svg",
      imageAlt: "Conventional engineering flowchart of Bobbot's Return-to-Base behaviour",
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        resultsDiscussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: ""
      },
      sectionDetails: {},
      references: [],
      codeFiles: ["autonomous/SR2026/return_to_base.py", "skills/navigation/return_to_base_servo.py", "skills/navigation/local_avoidance.py", "skills/navigation/search_for_return_guide.py", "skills/navigation/follow_wall.py"],
      sourceUrl: "",
      demos: []
    },
    {
      id: "stack-object",
      categoryOrder: 2,
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["Python"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      title: "Stack Object",
      subtitle: "",
      cardStatus: "",
      projectStatus: "in-progress", // Optional: "planned"; existing status records evidence maturity.
      targetStart: "", // Optional provisional start period.

      type: "Behaviour",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["pid", "local-obstacle-avoidance", "coordinate-transformations"],
      tags: ["Perception", "Target Approach", "Sequencing"],
      status: "Write-up in progress",
      summary: "Coordinate robot movement, lifting and gripper operations to stack an object.",
      image: "assets/images/stack-object-cover.svg",
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        resultsDiscussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: ""
      },
      sectionDetails: {},
      references: [],
      codeFiles: ["autonomous/SR2026/stack_object.py"], sourceUrl: "", demos: []
    },
    {
      id: "guide-recovery",
      categoryOrder: 3,
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["Python"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      title: "Guide Recovery",
      subtitle: "",
      cardStatus: "",
      projectStatus: "in-progress", // Optional: "planned"; existing status records evidence maturity.
      targetStart: "", // Optional provisional start period.

      type: "Subroutine",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["apriltag-pose", "dead-reckoning"],
      tags: ["AprilTags", "Fault Recovery", "Search"],
      status: "Code documented",
      summary: "Search for a missing visual guide and restore a route for navigation.",
      image: "assets/images/guide-recovery-cover.svg",
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        resultsDiscussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: ""
      },
      sectionDetails: {},
      references: [],
      codeFiles: ["skills/navigation/search_for_return_guide.py", "skills/navigation/search_rotate.py"], sourceUrl: "", demos: []
    },
    {
      id: "local-avoidance-skill",
      categoryOrder: 5,
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["Python"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      title: "Local Avoidance",
      subtitle: "",
      cardStatus: "",
      projectStatus: "in-progress", // Optional: "planned"; existing status records evidence maturity.
      targetStart: "", // Optional provisional start period.

      type: "Subroutine",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["local-obstacle-avoidance", "coordinate-transformations"],
      tags: ["Obstacle Detection", "Navigation", "Recovery"],
      status: "Write-up in progress",
      summary: "Combine obstacle detection and avoidance methods to navigate around obstacles.",
      image: "assets/images/local-avoidance-cover.svg",
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        resultsDiscussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: ""
      },
      sectionDetails: {},
      references: [],
      codeFiles: ["skills/navigation/local_avoidance.py", "perception/providers/local_obstacle_field.py"], sourceUrl: "", demos: []
    },
    {
      id: "perception-system",
      categoryOrder: 6,
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["Python", "Computer Vision"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      title: "Perception Pipeline",
      subtitle: "",
      cardStatus: "",
      projectStatus: "in-progress", // Optional: "planned"; existing status records evidence maturity.
      targetStart: "", // Optional provisional start period.

      type: "System",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["apriltag-pose", "coordinate-transformations"],
      tags: ["Vision", "AprilTags", "Perception"],
      status: "Write-up in progress",
      summary: "Process camera observations to identify targets and provide information for other routines.",
      image: "assets/images/perception-cover.svg",
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        resultsDiscussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: ""
      },
      sectionDetails: {},
      references: [],
      codeFiles: ["perception/", "vision/"], sourceUrl: "", demos: []
    },
    {
      id: "localisation-system",
      categoryOrder: 7,
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["Python"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      title: "Localisation",
      subtitle: "",
      cardStatus: "",
      projectStatus: "in-progress", // Optional: "planned"; existing status records evidence maturity.
      targetStart: "", // Optional provisional start period.

      type: "System",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["odometry", "coordinate-transformations", "dead-reckoning"],
      tags: ["Pose", "Coordinate Frames", "Navigation"],
      status: "Write-up in progress",
      summary: "Combine observations and position estimates to determine the robot’s location.",
      image: "assets/images/localisation-cover.svg",
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        resultsDiscussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: ""
      },
      sectionDetails: {},
      references: [],
      codeFiles: ["localisation/", "skills/perception/home_base.py"], sourceUrl: "", demos: []
    },
    {
      id: "motion-control",
      categoryOrder: 8,
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["Python", "Motor Control", "Feedback Control"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      title: "Motion Control",
      subtitle: "",
      cardStatus: "",
      projectStatus: "in-progress", // Optional: "planned"; existing status records evidence maturity.
      targetStart: "", // Optional provisional start period.

      type: "System",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["pid", "pid", "velocity-control"],
      tags: ["Velocity", "Control", "Interfaces"],
      status: "Write-up in progress",
      summary: "Coordinate movement commands and controllers to control the robot.",
      image: "assets/images/motion-control-cover.svg",
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        resultsDiscussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: ""
      },
      sectionDetails: {},
      references: [],
      codeFiles: ["navigation/control/distance_angle_controller.py", "motion_backends/velocity.py"], sourceUrl: "", demos: []
    }
  ],

  /*
    SOFTWARE LIBRARIES — individual reusable modules or recognised algorithms.
    Existing and planned entries have separate short descriptions.
    The eight pictured actuator primitives alone carry the Primitives tag.
    Module interfaces can be documented with inputs, outputs and settings
    once their exact parameter names have been verified from the code.
  */
  algorithms: [
    {"id": "apriltag-detection", "published": true, "skills": ["Python", "Vision"], "title": "AprilTag Detection", "shortName": "AprilTag Detection", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Vision", "summary": "Identify AprilTags in camera images.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "apriltag-pose", "published": true, "skills": ["Python", "Vision"], "title": "AprilTag Pose Estimation", "shortName": "AprilTag Pose Estimation", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Vision", "summary": "Calculate the position and orientation of a detected tag.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "colour-detection", "published": true, "skills": ["Python", "Vision"], "title": "Colour Detection", "shortName": "Colour Detection", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Vision", "summary": "Locate objects or features using colour.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "coordinate-transformations", "published": true, "skills": ["Python", "Localisation"], "title": "Coordinate Transformations", "shortName": "Coordinate Transformations", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Localisation", "summary": "Convert positions between robot, camera and world coordinates.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "dead-reckoning", "published": true, "skills": ["Python", "Localisation"], "title": "Dead Reckoning", "shortName": "Dead Reckoning", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Localisation", "summary": "Estimate robot position from previous position and movement.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "drive", "published": true, "skills": ["Python", "Motion Control"], "title": "Drive", "shortName": "Drive", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Motion Control", "summary": "Move the robot a specified distance or at a specified speed.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "ftg", "published": true, "skills": ["Python", "Obstacle Avoidance"], "title": "Follow-the-Gap", "shortName": "Follow-the-Gap", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Obstacle Avoidance", "summary": "Steer towards a suitable opening between obstacles.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "grab", "published": true, "skills": ["Python", "Primitives"], "title": "Grab", "shortName": "Grab", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Actuators", "summary": "Close the gripper to hold an object.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": [], "fileName": "grab.py"},
    {"id": "ibvs", "published": true, "skills": ["Python", "Visual Servoing"], "title": "IBVS", "shortName": "IBVS", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Visual Servoing", "summary": "Guide robot movement using errors measured in camera images.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "lift-carry", "published": true, "skills": ["Python", "Primitives"], "title": "Lift Carry", "shortName": "Lift Carry", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Actuators", "summary": "Move the lifting mechanism to its carrying position.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": [], "fileName": "liftcarry.py"},
    {"id": "lift-down", "published": true, "skills": ["Python", "Primitives"], "title": "Lift Down", "shortName": "Lift Down", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Actuators", "summary": "Lower the lifting mechanism.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": [], "fileName": "liftdown.py"},
    {"id": "lift-idle", "published": true, "skills": ["Python", "Primitives"], "title": "Lift Idle", "shortName": "Lift Idle", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Actuators", "summary": "Move the lifting mechanism to its idle position.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": [], "fileName": "liftidle.py"},
    {"id": "lift-middle", "published": true, "skills": ["Python", "Primitives"], "title": "Lift Middle", "shortName": "Lift Middle", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Actuators", "summary": "Move the lifting mechanism to its middle position.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": [], "fileName": "liftmiddle.py"},
    {"id": "lift-up", "published": true, "skills": ["Python", "Primitives"], "title": "Lift Up", "shortName": "Lift Up", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Actuators", "summary": "Raise the lifting mechanism.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": [], "fileName": "liftup.py"},
    {"id": "multi-apriltag-positioning", "published": true, "skills": ["Python", "Localisation"], "title": "Multi-AprilTag Positioning", "shortName": "Multi-AprilTag Positioning", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Localisation", "summary": "Combine observations of several tags to estimate position.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "object-detection", "published": true, "skills": ["Python", "Vision"], "title": "Object Detection", "shortName": "Object Detection", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Vision", "summary": "Identify target objects within an image.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "local-obstacle-avoidance", "published": true, "skills": ["Python", "Obstacle Avoidance"], "title": "Obstacle Avoidance", "shortName": "Obstacle Avoidance", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Obstacle Avoidance", "summary": "Adjust robot movement to avoid detected obstacles.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "pbvs", "published": true, "skills": ["Python", "Visual Servoing"], "title": "PBVS", "shortName": "PBVS", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Visual Servoing", "summary": "Guide robot movement using estimated position and orientation.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "pid", "published": true, "skills": ["Python", "Feedback Control"], "title": "PID Control", "shortName": "PID Control", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Feedback Control", "summary": "Adjust an output based on feedback and a target value.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "release", "published": true, "skills": ["Python", "Primitives"], "title": "Release", "shortName": "Release", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Actuators", "summary": "Open the gripper to release an object.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": [], "fileName": "release.py"},
    {"id": "rotate", "published": true, "skills": ["Python", "Motion Control"], "title": "Rotate", "shortName": "Rotate", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Motion Control", "summary": "Turn the robot through a specified angle.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "stop", "published": true, "skills": ["Python", "Primitives"], "title": "Stop", "shortName": "Stop", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Actuators", "summary": "Stop the robot’s movement.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": [], "fileName": "stop.py"},
    {"id": "velocity-control", "published": true, "skills": ["Python", "Motion Control"], "title": "Velocity Control", "shortName": "Velocity Control", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Motion Control", "summary": "Control linear and angular movement.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "wall-following", "published": true, "skills": ["Python", "Navigation"], "title": "Wall Following", "shortName": "Wall Following", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Navigation", "summary": "Maintain a target distance from a wall.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "odometry", "published": true, "skills": ["Python", "Localisation"], "title": "Wheel Odometry", "shortName": "Wheel Odometry", "subtitle": "", "status": "", "projectStatus": "in-progress", "group": "Localisation", "summary": "Estimate robot movement from wheel encoder measurements.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "a-star", "published": true, "skills": ["Python", "Path Planning"], "title": "A* Path Planning", "shortName": "A* Path Planning", "subtitle": "", "status": "", "projectStatus": "planned", "group": "Path Planning", "summary": "Introduces route planning rather than simply reacting to the immediate environment.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "dwa", "published": true, "skills": ["Python", "Obstacle Avoidance"], "title": "Dynamic Window Approach (DWA)", "shortName": "Dynamic Window Approach (DWA)", "subtitle": "", "status": "", "projectStatus": "planned", "group": "Obstacle Avoidance", "summary": "Introduces local motion planning that considers obstacles and feasible robot velocities.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "ekf", "published": true, "skills": ["Python", "Localisation"], "title": "Extended Kalman Filter (EKF)", "shortName": "Extended Kalman Filter (EKF)", "subtitle": "", "status": "", "projectStatus": "planned", "group": "Localisation", "summary": "Introduces more advanced localisation through sensor fusion.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "polynomial-splines", "published": true, "skills": ["Python", "Motion Planning"], "title": "Polynomial Splines", "shortName": "Polynomial Splines", "subtitle": "", "status": "", "projectStatus": "planned", "group": "Motion Planning", "summary": "Introduces smooth trajectory generation rather than paths with abrupt changes in direction.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "pure-pursuit", "published": true, "skills": ["Python", "Path Following"], "title": "Pure Pursuit", "shortName": "Pure Pursuit", "subtitle": "", "status": "", "projectStatus": "planned", "group": "Path Following", "summary": "Introduces established geometric path-following techniques.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "slam", "published": true, "skills": ["Python", "Localisation"], "title": "SLAM", "shortName": "SLAM", "subtitle": "", "status": "", "projectStatus": "planned", "group": "Localisation", "summary": "Introduces the ability to build a map while simultaneously estimating the robot’s position.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "smooth-control-law", "published": true, "skills": ["Python", "Feedback Control"], "title": "Smooth Control Law", "shortName": "Smooth Control Law", "subtitle": "", "status": "", "projectStatus": "planned", "group": "Feedback Control", "summary": "Introduces smoother, more controlled movement towards a target position.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
    {"id": "velocity-profiling", "published": true, "skills": ["Python", "Motion Control"], "title": "Velocity Profiling", "shortName": "Velocity Profiling", "subtitle": "", "status": "", "projectStatus": "planned", "group": "Motion Control", "summary": "Introduces controlled acceleration and deceleration for smoother robot movement.", "introduction": "", "overview": "", "method": "", "considerations": "", "implementation": "", "interface": {"inputs": [], "outputs": [], "settings": []}, "sourceUrl": "", "demos": []},
  ],
  /* PUBLICATION: published: false hides a project from public listings,
     direct project links and related-project links. It is still present
     in this public JavaScript file (not confidential). The unlisted live
     development.html page lets you preview drafts.
     featuredOrder controls only the Selected Projects order; unpublished
     items never appear there, even when numbered. */
  /* Duplicate a project object to add another project. Each id must be unique. */
  projects: [
    {
      id: "autonomous-mobile-robot",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["Python", "Computer Vision", "Systems Integration", "Mechanical Assembly"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      featuredOrder: 2,                  // URL: project.html?id=autonomous-mobile-robot
      title: "Autonomous Mobile Robot",
      subtitle: "Bobbot",
      status: "",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "robotics",                          // robotics | cad | fabrication | electronics
      categoryOrder: 1,
      image: "assets/images/IMG_2627 Bobbot.jpg",
      imageAlt: "Illustrative wheeled robot photograph",
      summary: "An experimental autonomous robot designed to grow and expand in capability and function.",
      tags: ["Robotics", "Python", "Sensors"],
      date: "",                                       // e.g. 2026; leave blank if not wanted
      contribution: "",
      sections: {
        abstract: "",
        introduction: "Bobbot is an ongoing multi-year project working towards a fully autonomous robot.",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: "",
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "mechanical-gripper",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["CAD", "Mechanism Design"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      featuredOrder: 7,
      title: "Bobbot Gripper — Original CAD Design",
      subtitle: "",
      status: "",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "cad",
      categoryOrder: 1,
      image: "assets/images/gripper_bobbot.png",
      imageAlt: "CAD model of the original Bobbot gripper",
      summary: "The original gripper built for Bobbot with an angled grip and over-center linkage ",
      tags: ["CAD", "Mechanisms", "Design"],
      date: "",
      relatedProjectIds: ["robotic-gripper-grasp-detection", "gripper-contact-surfaces", "autonomous-mobile-robot"],
      contribution: "",
      sections: {
        abstract: "",
        introduction: "This is the first gripper design for the autonomous mobile robot Bobbot. The jaws are mounted on a dual gear rack and close around a cardboard cube approximately 150 mm across.",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: "",
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      "id": "robotic-gripper-grasp-detection",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: [],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      featuredOrder: 1,
      "title": "Improving Gripper Reliability on an Autonomous Mobile Robot",
      subtitle: "Part 2: Gripper Jaw Assembly",
      status: "planned",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      "category": "cad",
      categoryOrder: 4,
      "image": "assets/images/Watch_This_Space.png",
      "imageAlt": "",
      "imageCaption": "",
      "summary": "Comparing four-bar and rack-and-pinion parallel grippers on their effectiveness in picking up various small cardboard boxes.",
      hideDetailSummary: true,
      hideDetailStatus: true,
      hideImageCaption: true,
      "tags": [
        "Mechanism Design",
        "Parallel Jaws",
        "CAD",
        "Experimental Design"
      ],
      "date": "",
      "relatedProjectIds": [],
      showRelatedProjects: false,
      sections: {
        abstract: "",
        introduction: "The original Bobbot gripper was a good first pass at getting the autonomous mobile robot up and running.  But it's angled grip and over-center linkage is better designed for other applications (For instance is makes for a good ramen delivery robot as can be seen in the image above). For the future Bobbot a more versatile grip that can reliably grasp various size of small boxes is desired. Ultimately a more versatile gripper, with contact feedback, and at a lower cost.",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: "",
      },
      references: [],
      "links": {
        "github": "",
        "cad": "",
        "video": "",
        "downloads": ""
      }
    },
    {
      "id": "gripper-contact-surfaces",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["Engineering Research", "Material Selection"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      "published": true,
      "title": "Improving Gripper Reliability on an Autonomous Mobile Robot",
      subtitle: "Part 1: Gripper Contact Pads",
      status: "in-progress",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      "category": "cad",
      categoryOrder: 3,
      "image": "assets/images/gripper_bobbot_orig.jpeg",
      "imageAlt": "CAD of the existing Bobbot gripper used as a baseline for contact-pad tests",
      "imageCaption": "Existing Bobbot gripper",
      "summary": "Testing a selection of 3D printable gripper pads to determine their reliabilty in grasping small cardboard boxes.",
      "tags": [
        "Mechanical Design",
        "Materials",
        "Experimental Testing",
        "3D Printing"
      ],
      "date": "",
      showRelatedProjects: true,
      "relatedProjectIds": [
        "mechanical-gripper",
        "robotic-gripper-grasp-detection",
        "gripper-contact-sensing",
        "autonomous-mobile-robot"
      ],
      "contribution": "Planned independent work: design interchangeable contact pads, manufacture samples and measure grip, friction, damage and repeatability.",
      sections: {
        abstract: "This study will investigate the use of flexible 3D-printed filaments as contact-pad materials for a robotic gripper. Candidate materials will be selected based on their expected softness, flexibility and frictional properties. Proposed materials include TPU 90A, TPU 60A–70A, TPE 90A and PEBA 90A. Their frictional performance will be compared through controlled tests and evaluated during gripping operations on an autonomous mobile robot.",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: "",
      },
      // Proposal-stage outline. Short provisional text is replaced by actual evidence as work progresses.
      sectionDetails: {
        introduction: [
          { id: "background", heading: "Background", text: "The original Bobbot gripper was a good first pass, but its angled grip and over-centre linkage were better suited to other applications (for instance, it does a great job picking up and delivering Pot Noodle containers). For small cardboard boxes, some immediate modifications were required. As a quick fix, the grip was widened and rubber bands were added to improve frictional contact. Now it is time to make a more permanent change, undertaken in three phases. The first phase, and the purpose of this project, is to find a more suitable gripper material." },
          { id: "literature", heading: "Literature Review", text: "Gripping surfaces are often made of soft materials with high coefficients of friction [@wikipedia-robot-end-effector]. Historically, rubber and silicone have been common choices, but in recent years 3D-printable materials have become more viable. Published studies were reviewed to identify 3D-printable filaments that have shown promising results in gripping research. These studies are cited in the References & Resources section." },
          { id: "aim", heading: "Study Aim", text: "This project will investigate whether 3D-printable gripper pads can improve pickup and retention reliability compared with rubber bands, and how material type and durometer affect performance." },
          { id: "requirements", heading: "Objectives", text: "The objectives are to identify suitable flexible 3D-printable materials, compare their frictional and gripping performance against the existing rubber bands, and investigate how material type and durometer affect the results.\n\nMaterial selection will focus on filaments compatible with the available Bambu Lab P1S printer, with outsourcing considered for softer materials that cannot be printed reliably." },
        ],
        materialsMethods: [
          { id: "material-selection", heading: "Material Selection", text: "Published studies were reviewed to identify 3D-printable filaments previously used in gripping research. These studies are cited in the table below. Material testing follows two pathways: comparing TPU with other filament materials, and comparing TPU at different durometers." },
          { id: "pad-design", heading: "Contact-Pad Design", text: "The pad geometry and attachment method will be documented when the initial CAD design is finalised." },
          { id: "manufacturing", heading: "3D Printed Specimens", text: "Specimen dimensions, print orientation and material-specific printing settings will be recorded when the samples are manufactured." },
          { id: "sliding-friction", heading: "Sliding Friction Test", text: "A horizontal pull test will measure sliding resistance between each candidate material and cardboard. The normal load and the method of applying the pull will be defined before testing." },
          { id: "gripper-pull-out", heading: "Gripper Pull-Out Test", text: "Each pad will be fitted to the existing gripper, and the force required to pull the cardboard object from the jaws will be measured under controlled gripping conditions." },
          { id: "robot-pickup", heading: "Robot Pickup Test", text: "Repeated pickup, carry and dropoff trials will assess the reliability of the complete gripping operation. The number of attempts and criteria for success will be set before testing." },
        ],
        projectPlan: [
          { id: "schedule", heading: "Schedule", text: "" },
          { id: "equipment", heading: "Equipment List", text: "" },
          { id: "budget", heading: "Budget", text: "Costs for filament, test materials and any outsourced printing will be recorded as they are established." },
          { id: "contingencies", heading: "Contingencies", text: "" },
        ],
      },
      // Proposal schedule: stage numbers are sequential work stages, not calendar dates.
      projectSchedule: [
        { activity: "Initial CAD Design", stage: 1 },
        { activity: "Procure Filament", stage: 1 },
        { activity: "Build Test Equipment & Print First Filament", stage: 2 },
        { activity: "Preliminary Test of First Filament", stage: 3 },
        { activity: "CAD - Design Iteration (if required)", stage: 4 },
        { activity: "Print Remaining Filaments", stage: 5 },
        { activity: "Outsource TPU 60–70A", stage: 5 },
        { activity: "Final Testing of All Materials", stage: 6 },
      ],
      projectEquipment: [
        { name: "Bambu Lab P1S", notes: "Modified to attach directly to Filament Dryer and bypass AMS" },
        { name: "Filament Dryer", notes: "Dry filament prior to use in the Bambu P1S" },
        { name: "Filaments: TPU 90A, TPU (60A to 70A), SEBS 90A, PEBA 90", notes: "" },
        { name: "Existing rubber bands", notes: "" },
        { name: "CAD (AutoCAD Fusion)", notes: "" },
        { name: "Digital force gauge", notes: "" },
        { name: "Sliding-friction test fixture", notes: "" },
        { name: "Gripper pull-out fixture", notes: "" },
        { name: "Bobbot with gripper", notes: "" },
        { name: "150 mm cardboard box", notes: "" },
        { name: "Regulated power supply", notes: "consistent and reliable power source" }
      ],
      projectContingencies: [
        { risk: "TPU 60A–70A cannot be outsourced cost effectively", response: "Use an alternative filament from the material list." },
        { risk: "A selected filament is unavailable", response: "Use an alternative filament from the material list." },
      ],
      "materialSelection": [
        [
                "Benchmark",
                "Rubber bands",
                "n/a",
                "n/a",
                "Establish existing performance",
                ""
        ],
        [
                "Selected",
                "TPU 90A",
                "TPU",
                "Yes",
                "Baseline TPU",
                "Robotic-gripper study using TPU 90A [@al-hadithi-2026]; Białek & Rybarczyk (2023) [@bialek-rybarczyk-2023]"
        ],
        [
                "Selected",
                "Recreus Filaflex SEBS 90A",
                "TPE",
                "Yes",
                "Compare TPE vs TPU (both 90A)",
                ""
        ],
        [
                "Selected",
                "PEBA 90A",
                "PEBA",
                "Yes",
                "Compare PEBA vs TPU (both 90A)",
                "[@perspektive3d-peba]"
        ],
        [
                "Selected (if outsourced)",
                "TPU 60A–70A (Filaflex)",
                "TPU",
                "Not reliably",
                "Compare TPU 60–70A vs TPU 90A",
                "Stoica et al. (2025) [@stoica-2025]"
        ],
        [
                "Alternative",
                "TPU 85A",
                "TPU",
                "Yes",
                "Lower-durometer TPU if 60A–70A cannot be outsourced",
                "Białek & Rybarczyk (2023) [@bialek-rybarczyk-2023]; Liu & Hung (2022) [@liu-hung-2022]"
        ],
        [
                "Alternative",
                "eSUN TPU 95A",
                "TPU",
                "Yes",
                "Already owned; alternative TPU durometer if required",
                ""
        ],
        [
                "Alternative",
                "Siraya Tech Flex TPU 64D",
                "TPU",
                "Yes",
                "Already owned; alternative TPU durometer if required",
                ""
        ],
        [
                "Not Selected",
                "BotFeeder Filastic TPE",
                "TPE",
                "Not researched",
                "Not available to purchase in the UK",
                "Liu & Hung (2022) [@liu-hung-2022]"
        ],
        [
                "Alternative",
                "colorFabb varioShore TPU",
                "Foaming TPU",
                "Yes",
                "",
                "3D-printed elastomeric-foam robotic-gripper study"
        ]
],
      testMethods: [
        {
          name: "Horizontal pull / slip",
          image: "assets/images/gripper-test-horizontal.png",
          measures: "Static friction and resistance to sliding against cardboard",
          formula: "slip"
        },
        {
          name: "Gripper retention / pull-out",
          image: "assets/images/gripper-test-retention.png",
          measures: "Force required to pull the cardboard object from the jaws at a specified jaw force",
          formula: "retention"
        },
        {
          name: "Pickup, carry, dropoff",
          image: "assets/images/gripper-test-cycle.png",
          measures: "Reliability of the complete gripping operation, including pickup, transport and release",
          formula: "success"
        },
        {
          name: "Cardboard compression / damage",
          image: "assets/images/gripper-test-damage.png",
          measures: "Permanent indentation, creasing, crushing or other structural damage to the cardboard",
          formula: "damage"
        }
      ],
      references: [
        {
                "id": "wikipedia-robot-end-effector",
                "name": "Wikipedia — Robot end effector, 'Levels of force'",
                "url": "https://en.wikipedia.org/wiki/Robot_end_effector#Levels_of_force"
        },
        {
                "id": "al-hadithi-2026",
                "name": "Al-Hadithi, Pastor & Lin (2026) — Design and Experimental Validation of a 3D-Printed Hybrid Soft Robotic Gripper for Delicate Object Manipulation",
                "url": "https://doi.org/10.3390/electronics15040848"
        },
        {
                "id": "bialek-rybarczyk-2023",
                "name": "Białek & Rybarczyk (2023) — A Comparative Study of Different Fingertips on the Object Pulling Forces in Robotic Gripper Jaws",
                "url": "https://doi.org/10.3390/app13031247"
        },
        {
                "id": "perspektive3d-peba",
                "name": "perspektive3d — PEBA 90A filament demonstration (YouTube video; title not independently verified)",
                "url": "https://www.youtube.com/watch?v=pVdkjnWaO64&t=365s"
        },
        {
                "id": "stoica-2025",
                "name": "Stoica et al. (2025) — Experimental Research on the Tribological Behavior of Plastic Materials with Friction Properties, with Applications to Manipulators in the Pharmaceutical Industry",
                "url": "https://doi.org/10.3390/coatings15010084"
        },
        {
                "id": "liu-hung-2022",
                "name": "Liu & Hung (2022) — Effect of the infill density on the performance of a 3D-printed compliant finger",
                "url": "https://doi.org/10.1016/j.matdes.2022.111203"
        }
],
            "links": {
        "github": "",
        "cad": "",
        "video": "",
        "downloads": ""
      }
    },
    {
      id: "printed-mechanisms",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["CAD", "3D Printing"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      featuredOrder: 8,
      title: "Pulley",
      subtitle: "",
      status: "",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "fabrication",
      categoryOrder: 1,
      image: "assets/images/Pulley.png",
      imageAlt: "Illustrative 3D-printed gears and fabricated components",
      summary: "A HTD-5M design I developed with a 14 mm bore compatible with goBilda.",
      tags: ["3D Printing", "Prototyping", "Materials"],
      date: "3D Printed PETG Pulleys",
      contribution: "",
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: "",
      },
      references: [],
      // Finished physical print photos (1–4). Add photos to assets/images/ and list them here.
      printPhotos: [
        { src: "assets/images/IMG_2788 3d print pulley.jpg", caption: "Photograph of the printed pulleys in the robot assembly" }
      ],
      // Optional print-profile details; blank values are hidden from the public page.
      printDetails: {
        material: "PETG",
        printer: "",
        layerHeight: "",
        infill: "",
        supports: "",
        printTime: ""
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "robot-control-electronics",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["Arduino", "Electrical Design", "Embedded Systems", "Technical Documentation"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      featuredOrder: 3,
      relatedProjectIds: ["robot-io-mapping", "mobile-robot-power-distribution"],
      title: "Modular Robot I/O & TeleOp Controller",
      subtitle: "",
      status: "",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "electronics",
      categoryOrder: 1,
      image: "assets/images/arduino mega.jpg",
      imageAlt: "Arduino Mega 2560 controller wiring diagram showing field and panel connectors, power buses, encoder inputs, servos and sensor interfaces",
      imageCaption: "Arduino Mega 2560 — pin allocation, power distribution and field/panel wiring diagram",
      summary: "A reusable Arduino Mega-based low-level controller for hardware I/O and encoder counting. Can be used as a standalone for TeleOp or connected to a Raspberry Pi for higher-level vision, navigation and autonomous control.",
      tags: ["Arduino Mega", "Embedded Systems", "TeleOp", "Robot I/O"],
      date: "",
      contribution: "Design of a reusable wiring and I/O arrangement for robot platforms, separating the Mega’s low-level functions from Raspberry Pi autonomy.",
      sectionLabels: {"architecture": "System architecture", "hardware": "Electrical interfaces", "software": "Firmware & TeleOp", "testing": "Testing & verification", "iterations": "Design decisions & improvements", "results": "Current outcome"},
      sections: {
        abstract: "",
        introduction: "The Modular Robot I/O & TeleOp Controller is a common electrical and low-level control interface intended for use across different robots. It is built around an Arduino Mega 2560, chosen for its numerous digital, analogue and interrupt-capable connections. Rather than design a different controller for every robot, the aim is to keep a consistent pin map and connect only the motors, servos, encoders and sensors that each platform requires.\n\nThe Mega is deliberately not the robot’s main computer. It handles manual teleoperation (TeleOp), encoder counting and direct hardware interfacing. A Raspberry Pi carries out higher-level work such as perception, navigation and autonomous decision-making. This division keeps the microcontroller focused on practical, time-sensitive I/O rather than computationally demanding algorithms.\n\nProvide one reusable set of controller connections for multiple robots, with stable power and signal interfaces, radio TeleOp, encoder counting and selective connection of robot-specific peripherals.",
        materialsMethods: "Verification is best carried out in stages. Start with the power rails and connector pinouts, checking voltage levels, common grounds and correct polarity before connecting motors or sensitive sensors. Then test each used I/O channel individually: switches, servos, motor outputs, sensor readings and the direction and consistency of encoder counts.\n\nTeleOp testing should confirm channel mapping, response to operator inputs and behaviour if the radio signal is lost. With the Raspberry Pi connected, additional checks should cover command handling, feedback timing and transitions between manual and autonomous control. The schematic establishes the interface design; quantitative results such as encoder count reliability or control latency have not yet been recorded on this page.",
        projectPlan: "",
        results: "The current documented output is a consolidated Arduino Mega wiring diagram and I/O allocation covering power distribution, external connectors, manual-control input, encoders and multiple kinds of robot peripherals. It provides a repeatable starting point for configuring the electrical interface of more than one robot.",
        discussion: "The defined control split is that the Mega handles TeleOp and encoder counting while the Raspberry Pi performs high-level control. This page describes that architecture and the interfaces available; it does not yet present measured performance, completed qualification tests or a claim that every connection in the diagram has been populated.",
        conclusions: "",
        lessonsLearned: "A modular robot controller is as much about defining responsibilities and connections as it is about choosing the microcontroller. Separating low-level I/O from higher-level autonomy makes the design easier to understand, test and transfer to another platform.\n\nConsistent signal names, connector pinouts and power distribution are particularly valuable when the robot changes but the controller does not. The next useful evidence will be repeatable encoder, TeleOp and power-system tests that show how reliably the reusable design operates on different robots.",
        relatedProjects: "",
        references: "",
      },
      sectionDetails: {
        materialsMethods: [
          { heading: "System architecture", text: "The system has two levels of control. The Raspberry Pi is responsible for interpreting sensor information, planning behaviour and producing autonomous motion commands. The Arduino Mega provides the low-level connection to the physical robot: it reads relevant inputs, counts encoder pulses and interfaces with motor drivers, servos and other peripherals. Commands and feedback pass between these levels as required by the robot’s operating mode.\n\nManual operation is also handled at the Mega level through the radio-control receiver. This keeps TeleOp separate from the Pi’s higher-level navigation software. The architecture is reusable: robots can share the controller layout without sharing exactly the same set of attached devices." },
          { heading: "Electrical interfaces", text: "The wiring diagram identifies the Mega’s pin assignments and the connections available at the panel and field interfaces. It includes 5 V and ground distribution, a regulated power input, motor-driver and servo outputs, and connections for quadrature encoders and other feedback devices.\n\nThe drawing also allocates interfaces for switches, range sensors, inertial sensing, the radio receiver and auxiliary devices. These are provisions in the wiring design, not a claim that every peripheral is fitted to every robot. Devices are connected only when that robot needs them. Clear connector names and a shared pin map are intended to make assembly, troubleshooting and later modifications easier." },
          { heading: "Design", text: "Separate low-level Arduino Mega I/O and manual control from Raspberry Pi autonomy. Document connectors, pin allocation and power distribution in a common wiring diagram." },
          { heading: "Construction & manufacture", text: "The design begins with a complete connection diagram rather than wiring each robot independently. The Arduino Mega forms the centre of the layout, with labelled groups of inputs and outputs and separate panel-to-field connections for external devices. Power and ground distribution are shown alongside the signal wiring so that each subsystem has an identifiable supply and return path.\n\nFor a particular robot, the required connectors and cables are selected from this common arrangement. For example, a robot with wheel encoders can use the assigned encoder inputs, while a robot without that feedback can leave them unused. This approach reduces repeated wiring decisions and makes it easier to transfer a sensor or mechanism between platforms. The diagram documents the electrical layout; physical harness construction and verification can be recorded separately as they are completed." },
          { heading: "Firmware & TeleOp", text: "The Mega firmware has a deliberately limited remit. It reads teleoperation input from the radio receiver, counts encoder transitions and manages the low-level interfaces needed to operate the connected hardware. This includes the pathways for motor-driver commands, servo control and sensor signals shown in the wiring diagram.\n\nMore demanding algorithms belong on the Raspberry Pi. Vision processing, localisation, route selection and autonomous robot behaviour are kept outside the Mega firmware. The Pi can use the low-level inputs and outputs provided by the Mega without duplicating the pin-level hardware logic. Keeping the responsibilities separate also makes it possible to diagnose a wiring or encoder issue independently of a navigation algorithm." },
          { heading: "Design decisions & improvements", text: "A central design decision was to avoid making the Mega responsible for vision or navigation simply because it is connected to the actuators. Restricting its role to TeleOp, encoder counting and hardware I/O makes the software easier to reuse and keeps high-level development on the Raspberry Pi.\n\nThe other important decision is to standardise connections rather than hard-wire every possible sensor into a robot. Future revisions can improve connector labelling, cable routing, electrical protection and fault handling without changing the overall separation of responsibilities. Any actual wiring or firmware revisions can be documented here as they are tested." }
        ]
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "robot-io-mapping",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["Python", "Software Architecture", "Systems Integration"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      featuredOrder: 6,
      title: "Robot I/O Mapping & Hardware Abstraction",
      subtitle: "",
      status: "",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "electronics",
      categoryOrder: 3,
      image: "assets/images/io-interface-contract.svg",
      imageAlt: "Simplified table of robot input/output interfaces, showing io.* methods and properties used by higher-level software",
      imageCaption: "The io.* interface: the final software-facing contract for sensors, motors and actuators. Select the image to view it at full size.",
      imageFullSize: true,
      summary: "A common io.* interface that lets robot software command motors, read sensors and use controllers without knowing which hardware backend implements each operation.",
      tags: ["Robot I/O", "Hardware Abstraction", "Python", "Interface Design"],
      date: "",
      relatedProjectIds: ["robot-control-electronics", "mobile-robot-power-distribution"],
      sectionLabels: {
        architecture: "Control and I/O architecture",
        hardware: "The io.* interface contract",
        construction: "Developing the interface",
        software: "Backends and command translation",
        testing: "Interface verification",
        iterations: "Design decisions and refinements",
        results: "Current outcome"
      },
      sections: {
        abstract: "",
        introduction: "The purpose of this project is to define the final interface between robot software and hardware. Higher-level programs use a single io.* vocabulary to read sensor data and command actuators: for example, io.encoder[\"drive_front_left\"].count or io.motor[\"collector\"].power. The program describes what it wants to do, not which controller, protocol or connection is needed to do it.\n\nThis makes the software more reusable. A robot may use an Arduino Mega, a device connected directly to the Raspberry Pi, another controller or a simulation backend, while the robot behaviours retain the same named I/O operations. The companion Modular Robot I/O & TeleOp Controller project documents one physical implementation of this interface.",
        materialsMethods: "The interface should be verified at the software boundary first: check that an io.* call reaches the intended backend, accepts the expected inputs and returns the promised values or errors. Then test the backend and transport separately, including invalid responses, lost communication and device absence. Finally verify the behaviour on real robot hardware.\n\nA useful portability test is to run the same high-level command against two different supported backends, including simulation where available, and compare the results. This page documents the interface design; it does not claim complete implementation or measured verification of every entry.",
        projectPlan: "",
        results: "The current output is a defined common I/O vocabulary covering motion, sensors, localisation inputs, servo mechanisms and direct Pi devices, with corresponding backend mappings and message contracts in the full engineering matrix. The simplified table displayed as this project's main image communicates the io.* layer rather than any particular wiring design.",
        discussion: "This is an interface specification and reusable design approach. The existence of an entry is not evidence that every associated implementation is complete or performance-tested.",
        conclusions: "",
        lessonsLearned: "The most useful boundary in a reusable robot system is between what the software asks the robot to do and how a particular controller accomplishes it. Device names and operation semantics should remain meaningful when the physical robot changes.\n\nSeparating the io.* contract from backends, communications and electrical wiring makes failures easier to isolate and new platforms easier to integrate.",
        relatedProjects: "",
        references: "",
      },
      sectionDetails: {
        materialsMethods: [
          { heading: "Control and I/O architecture", text: "High-level navigation and control code calls io.* methods and properties. A hardware-specific backend translates those requests into the appropriate device operation and converts the response into the expected data type. The rest of the software does not need to know whether a sensor reading came from the Arduino Mega over serial or was handled directly by the Raspberry Pi.\n\nThe Arduino Mega remains responsible for low-level hardware access, encoder counting and manual TeleOp, while the Pi handles higher-level autonomous processing. The io.* boundary is the software contract between these responsibilities, not a pin-allocation table." },
          { heading: "The io.* interface contract", text: "The interface groups devices by function, using named collections such as io.motor, io.encoder, io.camera, io.servo and io.imu. Each entry exposes the operations that make sense for that device. A motor has a commanded power value; an encoder returns counts and associated validity information; a camera exposes image-processing operations.\n\nThe table above is a simplified selection from the larger interface specification. It deliberately omits controller pins, wiring, firmware constants and legacy APIs: those are implementation details behind the interface. A defined interface does not by itself mean that every device or backend has been implemented and tested." },
          { heading: "Developing the interface", text: "The starting point was a detailed device matrix recording each logical device, its exposed io.* properties and operations, the matching backend method and, where relevant, the Arduino serial request and response. Related properties are grouped under the same logical device instead of being treated as separate items of hardware.\n\nThe public-facing version reduces this to three questions: what device is being accessed, what io.* command does the software use, and what does that operation mean? The complete working matrix remains the detailed engineering reference for implementation and migration." },
          { heading: "Backends and command translation", text: "A navigation program can read io.encoder[\"drive_front_left\"].count without referencing the encoder connection or controller firmware. The backend can translate this into a semantic request such as ENCODER drive_front_left READ and return a count with timestamp and validity information. Similarly, setting io.motor[\"collector\"].power can become MOTOR collector WRITE power=<value> on an Arduino-based robot.\n\nOther interfaces can be handled by different backends. For example, io.camera[\"front\"].see(frame=None) is resolved by the Pi camera backend without going through the Arduino serial protocol. The important invariant is the io.* call used by robot software; the implementation beneath it can change." },
          { heading: "Design decisions and refinements", text: "The central decision is to make io.* a stable boundary rather than expose Arduino pin numbers, library calls or serial message syntax to navigation code. This permits changes to motor drivers, encoders or controllers without rewriting every behaviour that uses them.\n\nThe matrix also distinguishes a physical device from its multiple readings: an encoder may have count, timestamp and validity properties, but remains one logical encoder. Additional platforms can be supported by new backend adapters while preserving the software-facing names and expected behaviour." }
        ]
      },
      references: [],
      ioMap: {
        intro: "Examples of the final software-to-hardware interface. Higher-level programs use these io.* operations; the backend handles the implementation.",
        columns: ["Device / function", "io.* interface", "Software-facing purpose"],
        rows: [
          ["Drive motors", "io.drive[\"front\"].set_power(left, right)", "Command left/right drive together"],
          ["Motor", "io.motor[\"collector\"].power", "Set collector motor power"],
          ["Encoder", "io.encoder[\"drive_front_left\"].count", "Read position feedback"],
          ["Encoder validity", "io.encoder[\"deadwheel_parallel\"].valid", "Check measurement validity"],
          ["Servo", "io.servo[\"gripper\"].position", "Command servo position"],
          ["Camera", "io.camera[\"front\"].see(frame=None)", "Request visual observations"],
          ["Inertial sensor", "io.imu[\"main\"].heading", "Read heading"],
          ["Reflectance", "io.reflectance[\"left\"]", "Read surface sensor"],
          ["Battery voltage", "io.voltage[\"battery\"].volts", "Read voltage feedback"],
          ["Distance sensor", "io.tof[\"front_left\"]", "Read distance feedback"],
          ["Control selector", "io.selector[\"pi_arduino\"]", "Read active control selection"]
        ],
        note: "Device names and operations are the contract; firmware, controller selection and physical connections are intentionally excluded. Defined entries may still require implementation or testing."
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "mobile-robot-power-distribution",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["Electrical Design", "Technical Documentation"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      featuredOrder: 4,
      title: "Mobile Robot Power Distribution & Electrical Architecture",
      subtitle: "",
      status: "",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "electronics",
      categoryOrder: 2,
      image: "assets/images/one line diagram.jpg",
      imageAlt: "One-line electrical diagram of a mobile robot showing battery protection, power distribution, motor controllers, voltage regulators, servos and control electronics",
      imageCaption: "Mobile robot one-line electrical diagram — power supplies, distribution, controller hardware and planned expansion.",
      imageFullSize: true,
      summary: "A one-line electrical design showing how a mobile robot distributes battery power to its drive motors, control electronics, cameras, servos and future expansion systems.",
      tags: ["Electrical Design", "Power Distribution", "System Integration", "Robotics"],
      date: "",
      relatedProjectIds: ["robot-control-electronics", "robot-io-mapping"],
      sectionLabels: {
        architecture: "Electrical architecture",
        hardware: "Power distribution & protection",
        construction: "Design documentation",
        software: "Control system integration",
        testing: "Verification approach",
        iterations: "Design choices & future expansion",
        results: "Current outcome"
      },
      sections: {
        abstract: "",
        introduction: "This project documents the electrical architecture of a mobile robot using a one-line diagram. The aim is to show how the main electrical subsystems fit together: the battery supply, motor drivers, low-voltage control electronics, USB devices and powered actuators. It provides an overall system view alongside the more detailed Arduino Mega wiring diagram and software I/O specification.\n\nThe design is modular. Power paths and functional groups are identified separately, and provisions for future devices are shown without implying that every illustrated component is installed.",
        materialsMethods: "The next stage is to verify the drawing against the actual system. Checks should include supply polarity, fuse and wire ratings, expected current draw, regulator output under load, grounding and voltage drops. Power branches should be commissioned independently before connecting the complete robot.\n\nBench checks should also establish that motor starts and servo movements do not disrupt the Pi or microcontroller supplies, and that any separate test-power arrangement cannot accidentally energise an unintended branch. These are planned verification steps; this page does not present measured results.",
        projectPlan: "",
        results: "The present output is a one-line electrical diagram that brings the robot's power and control hardware into one coherent view. It documents the intended distribution architecture, identifies the major subsystems and provides a basis for more detailed wiring and electrical verification.",
        discussion: "The design complements the Arduino Mega wiring plan and the io.* software interface: one describes electrical power flow, one defines the low-level connections and controller responsibilities, and one defines how higher-level software accesses robot hardware.",
        conclusions: "",
        lessonsLearned: "A system-level electrical drawing makes dependencies and supply requirements visible before detailed wiring begins. Separating the power architecture from control wiring and from the software-facing I/O contract keeps each document focused and easier to maintain.\n\nThe design also highlights the importance of distinguishing future provisions from installed hardware and checking protection, power budgets and grounding with measurements rather than assuming a schematic is sufficient.",
        relatedProjects: "",
        references: "",
      },
      sectionDetails: {
        materialsMethods: [
          { heading: "Electrical architecture", text: "A nominal 12 V NiMH battery supplies the robot through a main fuse and on/off switch to an eight-channel power distribution board. From there the diagram identifies branches for motor controllers, regulated low-voltage supplies and additional mechanisms.\n\nThe drive system uses a RoboClaw motor controller for the front motors. A second controller and rear motors are shown as possible future additions. Separate supply paths are identified for the Raspberry Pi and other logic devices, and for the servo distribution board. The diagram also shows a USB hub linking supporting devices such as cameras and microcontrollers to the Pi." },
          { heading: "Power distribution & protection", text: "The drawing identifies a 20 A main fuse and individual protected supply branches. It shows a 5 V regulator for control electronics and a separate 6 V regulator for servo power, alongside common supply and ground buses and labelled connectors. These choices make the intended distribution and electrical loads easier to review before wiring.\n\nThe schematic also identifies a battery-voltage monitor, main connectors and a chassis bond. Fuse values, regulator capacities, return-current paths and conductor ratings still need to be checked against actual device specifications and worst-case loads before final installation; the diagram alone is not evidence of electrical validation." },
          { heading: "Design documentation", text: "The one-line diagram is an early system-level design document. Rather than show every wire and terminal, it records the functional power routes between major components. Each branch can then be developed into the detailed wiring diagram, connector list and physical harness needed for construction.\n\nDashed outlines and labels distinguish planned expansions from the core design, including additional drive motors, collector and shooter motors, an arm and further servos. That allows the electrical architecture to evolve without obscuring the current system." },
          { heading: "Control system integration", text: "The Raspberry Pi remains responsible for higher-level tasks such as vision, navigation and autonomous control. The Arduino Mega provides low-level TeleOp, encoder counting and hardware interfacing, while motor drivers deliver power to the motors. The electrical diagram shows how those devices are powered and connected at system level; it does not describe their software protocol or pin-by-pin I/O mapping.\n\nThose details are covered in the related Modular Robot I/O & TeleOp Controller and Robot I/O Mapping & Hardware Abstraction projects." },
          { heading: "Design choices & future expansion", text: "The electrical system is divided into functional branches so that changes to one subsystem need not require a complete redesign. Separate regulated outputs distinguish logic power from servo power, and labelled connections are intended to simplify assembly and troubleshooting.\n\nThe drawing explicitly reserves space for future capabilities, but these additions are not treated as installed equipment. As the robot develops, the diagram can be updated to reflect actual components and revised current requirements." }
        ]
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "robotics-project-2",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["Mechanical Assembly", "Systems Integration"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      title: "Autonomous Mobile Robot",
      subtitle: "Robbot",
      status: "In Progress",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "robotics",
      categoryOrder: 2,
      image: "assets/images/IMG_2756_robbot.jpg",
      imageAlt: "Robot project photo — replace or update caption",
      summary: "Robbot is Bobbot on a budget.  Where Bobbot doesn’t set a specific price on utility Robbot is designed to extract as much of Bobbot’s functionality and performance as possible without the cost",
      tags: ["Robotics", "Mechanical Design", "Control"],
      date: "",
      contribution: "",
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: "",
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "motor-calibration-voltage-compensation",
      // Open-loop motor calibration experiment; no featured position unless selected later.
      // Skills describe work already carried out, rather than proposed methods.
      skills: ["Experimental Testing", "Data Analysis", "Motor Control", "Python"],
      engineeringSummary: {
        challenge: "Timed, open-loop motor commands did not produce consistent movement as supply voltage changed, particularly at low motor power.",
        contribution: "I tested DFRobot and goBILDA motor configurations at different command powers, pulse durations and supply voltages, recorded movement and investigated calibration and voltage-compensation curves.",
        outcome: "In the tested configurations, voltage compensation was approximately linear at moderate and higher power settings, but low-power behaviour was nonlinear and fitted better with a quadratic relationship.",
        lessonsLearned: "Accurate calibration requires controlled voltage and repeatable test conditions. A relationship that works at higher motor power may not be suitable near the low-power operating range."
      },
      published: true,
      title: "Motor Calibration & Voltage Compensation",
      subtitle: "Investigating Open-Loop Drive Accuracy",
      status: "",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "robotics",
      categoryOrder: 4,
      image: "assets/images/motor_calibration.jpeg",
      imageAlt: "Illustration of a motor calibration experiment, showing controlled supply voltage, motor command, timing and measured distance",
      imageCaption: "Open-loop motor calibration test sequence (conceptual illustration, not experimental data)",
      summary: "Measuring how motor power, drive duration and supply voltage influence robot movement, and developing calibration curves for more consistent open-loop control.",
      // Legacy topic tags retained for source compatibility; the website displays skills above.
      tags: ["Motor Calibration", "Voltage Compensation", "Open-Loop Control", "Experiment"],
      date: "",
      contribution: "",
      relatedProjectIds: ["autonomous-mobile-robot", "robotics-project-2"],
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: "",
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "dc-motor-comparison-selection",
      // Comparative selection study. No measured results are reproduced until
      // the original test records are available for documentation.
      published: true,
      title: "DC Motor Comparison & Selection",
      subtitle: "Selecting Drive Motors for Robbot",
      status: "completed",
      category: "robotics",
      categoryOrder: 6,
      image: "assets/images/IMG_2756_robbot.jpg",
      imageAlt: "Robbot differential-drive chassis with geared drive motors and wheels",
      hideImageCaption: true,
      summary: "Comparing four nominally identical DFRobot geared motors to select a suitable drive-wheel pair and repurpose another motor as a passive wheel support.",
      skills: ["Component Selection", "Mechanical Adaptation"],
      engineeringSummary: {
        challenge: "Four nominally identical DFRobot FIT0186 geared motors were available for Robbot's differential-drive system. Manufacturing variations can produce differences in motor performance, potentially affecting straight-line movement.\n\nThe objective was to identify the most suitable pair for the robot's drive wheels.",
        contribution: "I carried out a comparative assessment of four motors, labelled A, B, C and D, to evaluate their relative performance and suitability.\n\nRather than selecting two motors arbitrarily, I used the comparison to inform component selection.",
        outcome: "Motors A and C were selected for the drive wheels, motor B was repurposed into a passive omni-wheel bearing support, and motor D was retained as a spare.",
        lessonsLearned: "Nominally identical components do not necessarily perform identically. Comparing motors before assembly can help identify a suitable pairing and reduce potential performance differences.\n\nThe exercise also demonstrated how an unsuitable component could be repurposed into a useful mechanical assembly, avoiding the need to design and manufacture a separate wheel support."
      },
      relatedProjectIds: ["robotics-project-2", "motor-calibration-voltage-compensation"],
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        results: "The four motors were allocated according to their relative performance:",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: ""
      },
      sectionDetails: {
        results: [
          {
            heading: "Motors A and C",
            text: "Selected for Robbot's left and right drive wheels."
          },
          {
            heading: "Motor B",
            text: "The worst-performing motor was dismantled and converted into a passive bearing support for an omni wheel. Removing the internal drive components allowed the wheel to rotate freely, while retaining the original motor mounting geometry maintained the same chassis height as the powered wheels."
          },
          {
            heading: "Motor D",
            text: "Retained as a spare drive motor."
          }
        ]
      },
      references: [
        {
          id: "dos-reis-geared-motor-data",
          title: "dos Reis, W. P. N., Couto, G. E. & Morandin Junior, O. (2022). Direct current geared motor data: Voltage, current, and speed measured under different experimental conditions. Data in Brief, 40, 107802.",
          url: "https://doi.org/10.1016/j.dib.2022.107802"
        },
        {
          id: "nor-differential-steering",
          title: "Nor, R. M. et al. (2012). Differential Steering Control for an Autonomous Mobile Robot: A Preliminary Experimental Study. Procedia Engineering.",
          url: "https://doi.org/10.1016/j.proeng.2012.07.161"
        }
      ],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "camera-performance-comparison",
      skills: ["Python", "Vision", "Localisation", "Experimental Testing", "Data Analysis"],
      engineeringSummary: {
        challenge: "My robot needed reliable AprilTag detection for localisation and navigation, both while stationary and while moving.",
        contribution: "I compared the Pi Camera 3 (rolling shutter) and Arducam OV9281 (global shutter), testing AprilTag detection while stationary and while moving at up to approximately 1 m/s.",
        outcome: "The Pi Camera 3 performed better when stationary and at lower speeds, while the Arducam OV9281 performed better during faster movement.",
        lessonsLearned: "Choose components for the conditions in which they will operate. The best camera for stationary localisation may not be the best camera while driving."
      },
      published: true,
      title: "Camera Performance Comparison",
      subtitle: "Pi Camera 3 vs Arducam OV9281",
      status: "completed",
      targetStart: "",
      category: "robotics",
      categoryOrder: 5,
      image: "assets/images/camera_comparison.jpeg",
      imageAlt: "Photograph of the Bobbot autonomous mobile robot",
      hideImageCaption: true,
      summary: "Comparing rolling-shutter and global-shutter cameras for AprilTag detection while a mobile robot is stationary and moving.",
      tags: ["Camera Comparison", "AprilTags", "Rolling Shutter", "Global Shutter"],
      date: "",
      contribution: "",
      relatedProjectIds: ["autonomous-mobile-robot"],
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: ""
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "gobilda-decode-starter-bot",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["Mechanical Assembly", "Electrical Design"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      title: "goBILDA DECODE Starter Bot",
      subtitle: "",
      status: "",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "robotics",
      categoryOrder: 9,
      image: "assets/images/IMG_2734 goBilda Decode Starter Bot.jpg",
      imageAlt: "Photograph of the goBILDA DECODE starter robot during assembly, showing its metal chassis, wheels, motors, wiring and control hardware",
      imageCaption: "goBILDA DECODE Starter Bot with removable electrical panel",
      summary: "An FTC-style starter robot assembled from the goBILDA StarterBot Assembly Manual and Starter Kit components. It's Electrical Panel was built separately and was built to be removable and integrate with other robots.",
      tags: ["Robotics", "goBILDA", "FTC", "Robot Assembly"],
      relatedProjectIds: ["mobile-robot-power-distribution", "robot-control-electronics"],
      date: "",
      sections: {
        abstract: "",
        introduction: "This robot build was my entry point into larger robotics projects. It was built from the goBILDA starter kit and based on their DECODE starter bot build manual. Typically these bots are built for FTC competitions and with REV Robotics electronics.  As my intention wasn't to compete but to use this as an entry point into larger robotic projects an easily removeable electrical panel that could be used on other robots was built instead.  Details on that panel are linked in Related Projects below.",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: "",
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "cad-project-2",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["CAD", "Mechanical Design"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      featuredOrder: 9,
      title: "Shooter",
      subtitle: "",
      status: "",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "cad",
      categoryOrder: 6,
      image: "assets/images/Shooter CAD.png",
      imageAlt: "CAD illustration — replace with the second design project",
      summary: "Shooter design for FTC BioBuzz Pollen.",
      tags: ["CAD", "Engineering Design", "Mechanisms"],
      date: "",
      contribution: "",
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: "",
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "gripper-contact-sensing",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: [],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      title: "Improving Gripper Reliability on an Autonomous Mobile Robot",
      subtitle: "Part 3: Gripper Contact Sensing",
      status: "planned",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "cad",
      categoryOrder: 5,
      image: "assets/images/Watch_This_Space.png",
      imageAlt: "",
      summary: "Using sensor feedback to detect contact and reduce failed pickups.",
      tags: ["CAD", "Engineering Design", "Mechanisms"],
      date: "",
      contribution: "",
      sections: {
        abstract: "",
        introduction: "Robots using the current gripper have limited capability to determine whether a cardboard box was picked up. The current softward solution is to reverse the robot such that the cardboard box (if not picked up) would come into view.  This leads to some false positives and increases cycle time. Placing a sensor to determine contact and retention will be tested to see if this can provide a more reliable or quick indication of the pickup status.",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: "",
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "fabrication-project-2",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["CAD", "3D Printing"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      featuredOrder: 10,
      title: "Rubber Band Intake Wheel",
      subtitle: "",
      status: "",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "fabrication",
      categoryOrder: 2,
      image: "assets/images/rubber_band_wheel.png",
      imageAlt: "3D-printing example image — replace with the second fabrication project",
      summary: "A design I created in which the diameter and number of notches are adjustable depending on need. Designed for a 8mm hex axle.",
      tags: ["3D Printing", "CAD", "Prototyping"],
      date: "",
      contribution: "",
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: "",
      },
      references: [],
      // Finished physical print photos (1–4). Add photos to assets/images/ and list them here.
      printPhotos: [
        {
          src: "assets/images/rubber_band_intake_bumpers_ramp.jpeg",
          caption: "3D-printed rubber band intake"
        }
      ],
      // Optional print-profile details; blank values are hidden from the public page.
      printDetails: {
        material: "",
        printer: "",
        layerHeight: "",
        infill: "",
        supports: "",
        printTime: ""
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "fabrication-project-3",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["CAD", "3D Printing"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      title: "FlySky Receiver Mount",
      subtitle: "",
      status: "",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "fabrication",
      categoryOrder: 3,
      image: "assets/images/FlySky Receiver.png",
      imageAlt: "3D-printing example image — replace with the second fabrication project",
      summary: "A mount I created for a FlySky Receiver with slots for the antennas.",
      tags: ["3D Printing", "CAD", "Prototyping"],
      date: "",
      contribution: "",
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: "",
      },
      references: [],
      // Finished physical print photos (1–4). Add photos to assets/images/ and list them here.
      printPhotos: [],
      // Optional print-profile details; blank values are hidden from the public page.
      printDetails: {
        material: "",
        printer: "",
        layerHeight: "",
        infill: "",
        supports: "",
        printTime: ""
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "fabrication-project-4",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["CAD", "3D Printing"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      title: "PiCam3 Mount 8 Degrees",
      subtitle: "",
      status: "",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "fabrication",
      categoryOrder: 4,
      image: "assets/images/PICam3 Mount 8 degree.png",
      imageAlt: "3D-printing example image — replace with the second fabrication project",
      summary: "A mount I created for the PiCam3 that provides an 8 degree downward pitch.",
      tags: ["3D Printing", "CAD", "Prototyping"],
      date: "",
      contribution: "",
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: "",
      },
      references: [],
      // Finished physical print photos (1–4). Add photos to assets/images/ and list them here.
      printPhotos: [],
      // Optional print-profile details; blank values are hidden from the public page.
      printDetails: {
        material: "",
        printer: "",
        layerHeight: "",
        infill: "",
        supports: "",
        printTime: ""
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "fabrication-project-5",
      // Demonstrated skills only. Existing legacy tags below are retained for reference, not shown.
      skills: ["CAD", "3D Printing"],
      engineeringSummary: {
        challenge: "",
        contribution: "",
        outcome: "",
        lessonsLearned: ""
      },
      published: true,
      title: "RoboClaw 2x30",
      subtitle: "",
      status: "",
      targetStart: "", // Optional provisional date or period; hidden when empty.
      category: "fabrication",
      categoryOrder: 5,
      image: "assets/images/RoboClaw 2x30.png",
      imageAlt: "3D-printing example image — replace with the second fabrication project",
      summary: "A mount I designed for the RoboClaw 2x30A motor controller.",
      tags: ["3D Printing", "CAD", "Prototyping"],
      date: "",
      contribution: "",
      sections: {
        abstract: "",
        introduction: "",
        materialsMethods: "",
        projectPlan: "",
        results: "",
        discussion: "",
        conclusions: "",
        lessonsLearned: "",
        relatedProjects: "",
        references: "",
      },
      references: [],
      // Finished physical print photos (1–4). Add photos to assets/images/ and list them here.
      printPhotos: [],
      // Optional print-profile details; blank values are hidden from the public page.
      printDetails: {
        material: "",
        printer: "",
        layerHeight: "",
        infill: "",
        supports: "",
        printTime: ""
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    }
  ]
};
