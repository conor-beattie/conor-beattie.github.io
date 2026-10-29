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

  7. Every project/software entry has ten consistent `sections` fields.
     Empty fields are hidden automatically. Use `sectionDetails` for optional
     subheadings and `references` for credited links and useful sources.

  8. For 3D prints: keep `image` as the CAD render and list 1–4 real print photos
     under `printPhotos`. Optional printer settings belong in `printDetails`.

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
    homeHeadline: "Project Journal",
    introduction: "A collection of robotics, mechanical design, electronics and software projects.",
    shortAbout: "I enjoy turning engineering questions into physical prototypes: designing mechanisms, programming controllers, bringing systems together and improving them through testing.",
    aboutParagraphs: [
      "My main interest is mechanical engineering, particularly designing mechanisms and understanding how moving parts work together. I enjoy using CAD, building prototypes and testing different ideas.",
      "Robotics gives me the opportunity to combine mechanical design with electronics, sensors and software. In the future, I hope to study mechanical engineering and develop mechanisms for robotics or other mechatronic machines."
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
      "Chess became another major interest when I started playing and studying it during the COVID-19 pandemic. I went on to reach approximately tenth in the country for my year group and represented England as part of the Under-13 team at the Glorney Cup tournament."
    ],
    // Add chess, cycling or bikepacking pictures here when selected.
    outsideEngineeringPhotos: [],
    // Optional About-page influences. Add { name, focus, description, url } entries.
    // Leave the array empty to hide the entire Influences & Inspiration section.
    influences: [
      {
        name: "Madoca1977",
        focus: "LEGO Technic MOCs",
        description: "I admire Madoca1977's LEGO Technic creations for their inventive mechanisms and thoughtful mechanical design.",
        url: "https://rebrickable.com/users/Madoca1977/mocs/"
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
      title: "Electronics & Embedded Systems",
      subtitle: "Sensors, controllers, wiring and embedded interfaces",
      image: "assets/images/arduino mega.jpg"
    },
    {
      id: "software",
      published: true,
      title: "Software",
      subtitle: "Behaviours, Python modules, control logic and development notes",
      image: "assets/diagrams/bobbot-return-to-base.svg"
    },
    {
      id: "algorithms",
      published: true,
      title: "Algorithms",
      subtitle: "The mathematical methods behind navigation, vision and control",
      image: "assets/images/navigation block diagram.jpg"
    }
  ],

  /*
    SOFTWARE — One meaningful behaviour/system per entry, independent of algorithms.
    robotIds link to projects[].id; algorithmIds link to algorithms[].id.
    flowchart: local SVG illustration; sourceUrl: add the PUBLIC GitHub link when ready.
    Evidence status should describe actual test evidence, not merely code existence.
    The first entry is written from the October 2026 ReturnToBase source.
  */
  // OPTIONAL HOMEPAGE SELECTION:
  // Add featuredOrder: 1, (or 2, 3, ...) to a project or software entry to
  // display it in Selected Projects. Smaller numbers appear first.
  // If featuredOrder is missing, the entry is NOT selected; it still appears
  // on its normal category/software page. Use unique positive whole numbers.
  software: [
    {
      id: "return-to-base",
      published: true,
      featuredOrder: 5,
      title: "Autonomous Return to Base",
      type: "Behaviour",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["apriltag-routing", "distance-angle-control", "local-obstacle-avoidance", "wall-following", "dead-reckoning"],
      tags: ["Python", "Navigation", "AprilTags", "Recovery"],
      status: "Code documented",
      summary: "Navigate back to the delivery area using a chain of arena tags, with obstacle avoidance, guide recovery and a conditional wall-following approach.",
      image: "assets/diagrams/bobbot-return-to-base.svg",
      flowchart: "assets/diagrams/bobbot-return-to-base.svg",
      imageAlt: "Conventional engineering flowchart of Bobbot's Return-to-Base behaviour",
      sections: {
        overview: "Navigate back to the delivery area using a chain of arena tags, with obstacle avoidance, guide recovery and a conditional wall-following approach.",
        objectivesRequirements: "Return from the collection area to a delivery position despite changing visibility and objects obstructing the preferred path. The return behaviour finishes navigation but does not itself release the carried object.",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "The linked flowchart reflects program logic from the October 2026 Python source. It is not evidence that every branch has completed physical-robot validation. Add dated trials, success rates, logs and observed limitations when they are available.",
        resultsEvaluation: "",
        conclusionsNextSteps: "Review FollowWall's start interface, confirm end-to-end wall-follow and avoidance handoffs, and publish measured tests from simulation and the physical robot.",
        lessonsLearned: "A visible tag does not always imply a safe route directly towards it. Keeping intermediate guides at an angular offset supports movement along the perimeter, while separating mission supervision from lower-level motion skills makes failures easier to isolate. Recovery needs different policies for temporary lost visibility, blocked handoffs and terminal approach.",
        referencesResources: "",
        relatedProjects: ""
      },
      sectionDetails: {
        designDevelopment: [
          { heading: "Implementation", text: "ReturnToBase supervises the operating mode. ReturnToBaseServo selects the furthest-progressed eligible visible guide on a configured arena-tag route; intermediate tags provide a steering reference, not a stop position. A final guide becomes a point target. The supervisor can transfer control to LocalAvoidance, SearchForReturnGuide or FollowWall depending on perception and approach geometry." },
          { heading: "Development & iterations", text: "Development progressed beyond a provisional fixed-distance Stage 1 return. The fallback is described in the flowchart as open-loop / dead-reckoning control (the October source still contains a placeholder 750 mm Drive). Stage 2 adds vision-guided route selection, a bounded guide search, ±10° handoff peek, 500 mm backoff plus realignment, obstacle-aware takeover, and a wall-follow option when the terminal guide is approached too side-on." }
        ]
      },
      references: [],
      codeFiles: ["autonomous/SR2026/return_to_base.py", "skills/navigation/return_to_base_servo.py", "skills/navigation/local_avoidance.py", "skills/navigation/search_for_return_guide.py", "skills/navigation/follow_wall.py"],
      sourceUrl: "",
      demos: []
    },
    {
      id: "stack-object",
      published: true,
      title: "Stack Object",
      type: "Behaviour",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["distance-angle-control", "local-obstacle-avoidance", "coordinate-transformations"],
      tags: ["Perception", "Target Approach", "Sequencing"],
      status: "Write-up in progress",
      summary: "Coordinate target selection, approach and stacking while responding to unavailable or obstructed targets.",
      image: "assets/images/stack-object-cover.svg",
      sections: {
        overview: "Coordinate target selection, approach and stacking while responding to unavailable or obstructed targets.",
        objectivesRequirements: "Bring perception and movement together to handle a stacking task.",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "Add measured simulation and physical-robot evidence; no performance figures are asserted here.",
        resultsEvaluation: "",
        conclusionsNextSteps: "Add a flowchart, source links and recorded trial outcomes.",
        lessonsLearned: "Document target loss, approach reliability and what was learned from unsuccessful trials.",
        referencesResources: "",
        relatedProjects: ""
      },
      sectionDetails: {
        designDevelopment: [
          { heading: "Implementation", text: "The behaviour coordinates target selection and approach skills. An October ReturnToBase branch also selects a previously delivered low target for a terminal stacking approach. The standalone stacking behaviour should be documented from its own source before adding a full sequence here." },
          { heading: "Development & iterations", text: "Add the actual sequence of design revisions and the reason for each change." }
        ]
      },
      references: [],
      codeFiles: ["autonomous/SR2026/stack_object.py"], sourceUrl: "", demos: []
    },
    {
      id: "guide-recovery",
      published: true,
      title: "Arena Guide Search & Recovery",
      type: "Subroutine",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["apriltag-routing", "dead-reckoning"],
      tags: ["AprilTags", "Fault Recovery", "Search"],
      status: "Code documented",
      summary: "Search for a missing arena tag and re-establish a viable visual navigation route.",
      image: "assets/images/guide-recovery-cover.svg",
      sections: {
        overview: "Search for a missing arena tag and re-establish a viable visual navigation route.",
        objectivesRequirements: "Avoid treating a single missing visual observation as mission failure.",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "Describe observed recoveries and exhausted searches when results are recorded.",
        resultsEvaluation: "",
        conclusionsNextSteps: "Verify search limits and timeouts on the physical platform.",
        lessonsLearned: "Recover using the smallest appropriate manoeuvre before resorting to broad search; route identity should remain explicit during handoffs.",
        referencesResources: "",
        relatedProjects: ""
      },
      sectionDetails: {
        designDevelopment: [
          { heading: "Implementation", text: "SearchForReturnGuide calls a bounded SearchRotate and succeeds when a permitted guide becomes visible. Separate handoff recovery may peek ±10°, reverse 500 mm and realign using the two known tag locations before resuming route selection." },
          { heading: "Development & iterations", text: "Distinguishes temporary vision loss, lost current guide and failure to find the next guide at a guarded handoff." }
        ]
      },
      references: [],
      codeFiles: ["skills/navigation/search_for_return_guide.py", "skills/navigation/search_rotate.py"], sourceUrl: "", demos: []
    },
    {
      id: "wall-follow-skill",
      published: true,
      title: "Follow Wall",
      type: "Subroutine",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["wall-following", "distance-angle-control"],
      tags: ["Navigation", "Wall Geometry", "Feedback"],
      status: "Needs integration review",
      summary: "Travel alongside an arena wall using measured wall geometry and lateral correction.",
      image: "assets/images/wall-follow-cover.svg",
      sections: {
        overview: "Travel alongside an arena wall using measured wall geometry and lateral correction.",
        objectivesRequirements: "Preserve a safe and stable relationship to a wall when an AprilTag approach is too side-on.",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "An available FollowWall source snapshot references localisation and io in start() without listing them as parameters. Reconcile this interface before claiming a successful end-to-end integration.",
        resultsEvaluation: "",
        conclusionsNextSteps: "Fix or reconcile the start interface and log range, heading and terminal-hand-off behaviour.",
        lessonsLearned: "Control geometry and mission completion should remain separate responsibilities.",
        referencesResources: "",
        relatedProjects: ""
      },
      sectionDetails: {
        designDevelopment: [
          { heading: "Implementation", text: "FollowWall receives estimated wall geometry from its caller. A wall-follow controller produces a velocity command; missing usable geometry causes a stop. ReturnToBase determines when to enter or leave wall following." },
          { heading: "Development & iterations", text: "The latest return supervisor latches the initial side distance as the wall-follow setpoint and uses a camera-edge event from the final guide as one terminal signal." }
        ]
      },
      references: [],
      codeFiles: ["skills/navigation/follow_wall.py", "navigation/wall_following/wall_follower.py"], sourceUrl: "", demos: []
    },
    {
      id: "local-avoidance-skill",
      published: true,
      title: "Local Obstacle Avoidance",
      type: "Subroutine",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["local-obstacle-avoidance", "coordinate-transformations"],
      tags: ["Obstacle Detection", "Navigation", "Recovery"],
      status: "Write-up in progress",
      summary: "Temporarily take over motion when detected objects block the nominal route.",
      image: "assets/images/local-avoidance-cover.svg",
      sections: {
        overview: "Temporarily take over motion when detected objects block the nominal route.",
        objectivesRequirements: "Navigate around obstacles without permanently discarding the intended direction of travel.",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "The exact FTG or DWA algorithms used internally should be verified from the avoidance source before linking them as implemented methods.",
        resultsEvaluation: "",
        conclusionsNextSteps: "Document the planner implementation, inputs and comparative simulation/physical tests.",
        lessonsLearned: "Nominal navigation and local safety may require different control objectives; route recovery is as important as bypassing the immediate obstacle.",
        referencesResources: "",
        relatedProjects: ""
      },
      sectionDetails: {
        designDevelopment: [
          { heading: "Implementation", text: "The ReturnToBase supervisor checks a local obstacle corridor, transfers control to LocalAvoidance and then tries to rejoin a visible tag route or realign with the previous route direction." },
          { heading: "Development & iterations", text: "Introduced a supervisory takeover rather than forcing the visual guidance controller to solve obstacle clearance itself." }
        ]
      },
      references: [],
      codeFiles: ["skills/navigation/local_avoidance.py", "perception/providers/local_obstacle_field.py"], sourceUrl: "", demos: []
    },
    {
      id: "perception-system",
      published: true,
      title: "Visual Perception Pipeline",
      type: "System",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["apriltag-pose", "coordinate-transformations"],
      tags: ["Vision", "AprilTags", "Perception"],
      status: "Write-up in progress",
      summary: "Turn camera observations into measurements and identified targets for navigation behaviours.",
      image: "assets/images/perception-cover.svg",
      sections: {
        overview: "Turn camera observations into measurements and identified targets for navigation behaviours.",
        objectivesRequirements: "Provide the position and identity of visible arena markers or objects in well-defined coordinates.",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "Add detection accuracy, field-of-view and latency comparisons from dated tests.",
        resultsEvaluation: "",
        conclusionsNextSteps: "Add a perception data-flow diagram and tested video examples.",
        lessonsLearned: "Timestamp freshness and the distinction between camera and robot coordinate frames are critical to reliable feedback.",
        referencesResources: "",
        relatedProjects: ""
      },
      sectionDetails: {
        designDevelopment: [
          { heading: "Implementation", text: "ReturnToBase receives arena observations, object observations, timestamps and a localised robot pose. The full perception pipeline and camera processing belong in their dedicated source modules." },
          { heading: "Development & iterations", text: "Add details of camera and observation-model revisions." }
        ]
      },
      references: [],
      codeFiles: ["perception/", "vision/"], sourceUrl: "", demos: []
    },
    {
      id: "localisation-system",
      published: true,
      title: "Robot Localisation",
      type: "System",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["odometry", "coordinate-transformations", "dead-reckoning"],
      tags: ["Pose", "Coordinate Frames", "Navigation"],
      status: "Write-up in progress",
      summary: "Represent robot pose and use localisation to support route recovery and home-base decisions.",
      image: "assets/images/localisation-cover.svg",
      sections: {
        overview: "Represent robot pose and use localisation to support route recovery and home-base decisions.",
        objectivesRequirements: "Maintain a useful estimate of where the robot is and the direction it faces.",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "Add accuracy, drift and recovery results, with test conditions.",
        resultsEvaluation: "",
        conclusionsNextSteps: "Link the estimator implementation and confidence tests.",
        lessonsLearned: "Heading validity and position validity may differ; decisions should explicitly check the particular quantity they require.",
        referencesResources: "",
        relatedProjects: ""
      },
      sectionDetails: {
        designDevelopment: [
          { heading: "Implementation", text: "ReturnToBase consumes localisation.pose and a HomeBase evaluator; robot heading is used to realign with known arena-tag route segments. Specific estimator and odometry details should be added from their implementation." },
          { heading: "Development & iterations", text: "Document which observations improved pose accuracy and where confidence was insufficient." }
        ]
      },
      references: [],
      codeFiles: ["localisation/", "skills/perception/home_base.py"], sourceUrl: "", demos: []
    },
    {
      id: "motion-control",
      published: true,
      title: "Motion & Command Control",
      type: "System",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["pid", "distance-angle-control", "motion-profiles"],
      tags: ["Velocity", "Control", "Interfaces"],
      status: "Write-up in progress",
      summary: "Convert motion objectives from navigation skills into robot velocity and actuator commands.",
      image: "assets/images/motion-control-cover.svg",
      sections: {
        overview: "Convert motion objectives from navigation skills into robot velocity and actuator commands.",
        objectivesRequirements: "Keep control mathematics separate from hardware motor commands and navigation decisions.",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "Add motor and velocity calibration, step-response data and safety checks.",
        resultsEvaluation: "",
        conclusionsNextSteps: "Clarify which motion profiles are actually used before calling them implemented.",
        lessonsLearned: "A shared command interface makes controller comparisons and simulation-to-robot portability easier.",
        referencesResources: "",
        relatedProjects: ""
      },
      sectionDetails: {
        designDevelopment: [
          { heading: "Implementation", text: "ReturnToBaseServo uses DistanceAngleController and a velocity backend. FollowWall also emits velocity commands through a backend. The larger motion-command architecture should be described independently from these callers." },
          { heading: "Development & iterations", text: "Document the transition from timed commands to reusable controlled-motion interfaces." }
        ]
      },
      references: [],
      codeFiles: ["navigation/control/distance_angle_controller.py", "motion_backends/velocity.py"], sourceUrl: "", demos: []
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
    Cross-links to software[] require no video and must reflect actual code use.
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
      published: true,
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
      published: true,
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
      published: true,
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
      published: true,
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
    },
    {
      id: "apriltag-routing",
      published: true, title: "AprilTag Route Selection", shortName: "Tag Route Selection", group: "Vision & localisation",
      summary: "Choose from ordered arena guide markers to steer a robot along a return route.",
      overview: "Choose from ordered arena guide markers to steer a robot along a return route.",
      method: "Use marker IDs and a configured route to choose the most advanced eligible visible guide, then advance the route when the next marker is usable.",
      considerations: "Visibility and route geometry can change; the final tag may need a different controller from intermediate navigation guides.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "apriltag-pose",
      published: true, title: "AprilTag Pose Estimation", shortName: "AprilTag Pose", group: "Vision & localisation",
      summary: "Estimate camera-relative position and orientation from a known square marker.",
      overview: "Estimate camera-relative position and orientation from a known square marker.",
      method: "Detect tag corners, apply camera calibration and solve for a relative pose; transform into the robot frame as needed.",
      considerations: "Pose error depends on calibration, corner detection, range, viewing angle and marker geometry.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "distance-angle-control",
      published: true, title: "Distance–Angle Feedback Control", shortName: "Distance–Angle", group: "Feedback control",
      summary: "Turn a distance error and a steering-angle error into commanded motion.",
      overview: "Turn a distance error and a steering-angle error into commanded motion.",
      method: "Measure target range and relative bearing; apply control gains and speed limits to output linear/angular velocity.",
      considerations: "Saturation, target loss, noise and inconsistent control update timing can affect stability.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "local-obstacle-avoidance",
      published: true, title: "Local Obstacle Avoidance", shortName: "Obstacle Avoidance", group: "Navigation",
      summary: "Change local motion when objects obstruct a preferred direction.",
      overview: "Change local motion when objects obstruct a preferred direction.",
      method: "Represent nearby obstacles and nominal direction, assess free corridors and choose a safe local motion; resume the original route afterward.",
      considerations: "Different planners handle clutter, narrow gaps and dynamic obstacles differently. Check the concrete method before attributing FTG or DWA.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "ftg",
      published: true, title: "FTG — Follow the Gap", shortName: "FTG", group: "Navigation",
      summary: "Steer through a suitable obstacle-free opening in a local scan or obstacle field.",
      overview: "Steer through a suitable obstacle-free opening in a local scan or obstacle field.",
      method: "Find free-space gaps in angular sectors and choose a feasible heading that balances clearance and progress.",
      considerations: "Sparse or noisy measurements can produce unstable or unsafe gaps; robot footprint must be included.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "dwa",
      published: true, title: "DWA — Dynamic Window Approach", shortName: "DWA", group: "Navigation",
      summary: "Evaluate short candidate velocity commands against obstacles and motion constraints.",
      overview: "Evaluate short candidate velocity commands against obstacles and motion constraints.",
      method: "Sample feasible velocities, predict short trajectories and score them against clearance, progress and speed.",
      considerations: "Relies on motion modelling and local obstacle data; may become trapped in local minima.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "wall-following",
      published: true, title: "Wall Following", shortName: "Wall Follow", group: "Navigation",
      summary: "Travel alongside a wall at a preferred side distance and heading.",
      overview: "Travel alongside a wall at a preferred side distance and heading.",
      method: "Estimate wall distance and optionally wall heading; generate steering correction while maintaining forward motion.",
      considerations: "Corners, missing measurements, wall seams and drifting orientation need explicit handling.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "smooth-control-law",
      published: true, title: "Smooth Control Law", shortName: "Smooth Control", group: "Feedback control",
      summary: "Generate a continuously varying corrective motion toward a target.",
      overview: "Generate a continuously varying corrective motion toward a target.",
      method: "Use bearing and distance errors to calculate smooth speed/turn commands with saturation or slowing regions.",
      considerations: "Parameter tuning, delayed observations and target visibility constrain performance.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "odometry",
      published: true, title: "Wheel Odometry", shortName: "Odometry", group: "Localisation",
      summary: "Estimate changes in robot pose from wheel motion.",
      overview: "Estimate changes in robot pose from wheel motion.",
      method: "Convert wheel encoder measurements to linear and angular displacement using the robot kinematic model.",
      considerations: "Slip, unequal wheel size and encoder error accumulate over time.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "dead-reckoning",
      published: true, title: "Dead Reckoning & Open-Loop Motion", shortName: "Dead Reckoning", group: "Localisation",
      summary: "Estimate or execute movement without absolute visual position corrections.",
      overview: "Estimate or execute movement without absolute visual position corrections.",
      method: "Propagate motion estimates from commanded velocity, time or wheel displacement; compare against feedback-based control.",
      considerations: "Errors accumulate; a fixed-distance placeholder is not evidence of an accurately calibrated return.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "coordinate-transformations",
      published: true, title: "Coordinate Frames & Transformations", shortName: "Frames", group: "Robotics mathematics",
      summary: "Convert target and robot measurements between camera, body and arena coordinate frames.",
      overview: "Convert target and robot measurements between camera, body and arena coordinate frames.",
      method: "Define frame origins and axis directions, then apply rotations and translations consistently.",
      considerations: "Axis-sign mistakes and origin misplacement can produce large bearing or position errors.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "a-star",
      published: true, title: "A* Path Planning", shortName: "A*", group: "Planning",
      summary: "Find a graph or grid route using cost-so-far plus a heuristic estimate.",
      overview: "Find a graph or grid route using cost-so-far plus a heuristic estimate.",
      method: "Expand low-cost candidate nodes while tracking the predecessor path; reconstruct a route to the goal.",
      considerations: "Depends on map quality and resolution; planned paths may need smoothing and collision margins.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "slam",
      published: true, title: "SLAM — Simultaneous Localisation and Mapping", shortName: "SLAM", group: "Localisation",
      summary: "Estimate robot pose while constructing or updating a map.",
      overview: "Estimate robot pose while constructing or updating a map.",
      method: "Combine successive motion estimates with landmark or sensor observations to constrain pose and map error.",
      considerations: "Requires suitable sensors and computation; map/pose uncertainty can remain significant.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "motion-profiles",
      published: true, title: "Motion Profiles", shortName: "Profiles", group: "Motion control",
      summary: "Constrain acceleration and speed to make transitions smoother and more repeatable.",
      overview: "Constrain acceleration and speed to make transitions smoother and more repeatable.",
      method: "Plan a velocity or position trajectory with acceleration limits, such as trapezoidal motion.",
      considerations: "Requires appropriate limits and correct timing; not every motor controller uses an explicit profile.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "visual-target-tracking",
      published: true, title: "Visual Target Tracking", shortName: "Tracking", group: "Vision & localisation",
      summary: "Maintain correspondence to an object or marker across camera frames.",
      overview: "Maintain correspondence to an object or marker across camera frames.",
      method: "Identify observations by target identity and compare timestamped positions or features as frames arrive.",
      considerations: "Occlusion, similar-looking targets and stale frames can cause mistaken control commands.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    }
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
      published: true,
      featuredOrder: 2,                  // URL: project.html?id=autonomous-mobile-robot
      title: "Bobbot - Autonomous Mobile Robot",
      category: "robotics",                          // robotics | cad | fabrication | electronics
      image: "assets/images/IMG_2627 Bobbot.jpg",
      imageAlt: "Illustrative wheeled robot photograph",
      summary: "An experimental autonomous robot designed to grow and expand in capability and function.",
      tags: ["Robotics", "Python", "Sensors"],
      date: "",                                       // e.g. 2026; leave blank if not wanted
      contribution: "",
      sections: {
        overview: "Bobbot is an ongoing multi-year project working towards a fully autonomous robot.",
        objectivesRequirements: "",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "",
        resultsEvaluation: "",
        conclusionsNextSteps: "",
        lessonsLearned: "",
        referencesResources: "",
        relatedProjects: ""
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "mechanical-gripper",
      published: true,
      featuredOrder: 7,
      title: "Bobbot Gripper — Original Design",
      category: "cad",
      image: "assets/images/gripper_bobbot.png",
      imageAlt: "CAD model of the original Bobbot gripper",
      summary: "The original gripper built for Bobbot, using pivoting jaws on a vertical lift to handle a 150 mm cardboard cube. This first design provides the reference for a separate grasp-detection investigation.",
      tags: ["CAD", "Mechanisms", "Design"],
      date: "",
      relatedProjectIds: ["robotic-gripper-grasp-detection", "gripper-contact-surfaces", "autonomous-mobile-robot"],
      contribution: "",
      sections: {
        overview: "This is the first gripper design for the autonomous mobile robot Bobbot. The jaws are mounted on a dual gear rack and close around a cardboard cube approximately 150 mm across.",
        objectivesRequirements: "",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "",
        resultsEvaluation: "",
        conclusionsNextSteps: "",
        lessonsLearned: "",
        referencesResources: "",
        relatedProjects: ""
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      "id": "robotic-gripper-grasp-detection",
      published: true,
      featuredOrder: 1,
      "title": "Gripper Design Test",
      "category": "cad",
      "image": "assets/images/Watch_This_Space.png",
      "imageAlt": "CAD model of the original Bobbot gripper used as the investigation baseline",
      "imageCaption": "Original Bobbot gripper — reference design only. New gripper concepts are not pictured.",
      "summary": "Comparing four-bar and rack-and-pinion parallel grippers on their effectiveness in picking up variuos small cardboard boxes using a 150 mm cube as the main test object.",
      "tags": [
        "Mechanism Design",
        "Parallel Jaws",
        "CAD",
        "Experimental Design"
      ],
      "date": "",
      "relatedProjectIds": [
        "mechanical-gripper",
        "gripper-contact-surfaces",
        "robotics-project-2",
        "autonomous-mobile-robot"
      ],
      "sectionLabels": {
  "overview": "The design problem",
  "brief": "Design objectives",
  "research": "Mechanisms and sensing research",
  "construction": "CAD and prototyping",
  "software": "Interpreting grasp feedback",
  "testing": "Test and measurement plan",
  "iterations": "Design decisions and iteration",
  "results": "Current stage",
  "nextSteps": "Next steps"
},
      sections: {
        overview: "The first Bobbot gripper is a separate, existing design. Its pivoting jaws do not keep parallel contact faces during closure, reducing the range of box widths and positions that can be gripped consistently. It remains a useful mechanical reference, but the new investigation is an additional gripper intended for the lower-cost Robbot platform—not simply a renamed version of the Bobbot gripper. The initial reference object is a 150 mm cardboard cube.\n\nThe central problem has two parts: produce opposing jaw motion suitable for boxes of different widths, and obtain feedback that a box is being gripped with sufficient engagement to stay held. Indirect camera-based pickup checks have limitations. Jaw contact by itself does not establish a secure grasp, and neither jaw position nor servo command alone proves that the box will be retained.",
        objectivesRequirements: "Compare two candidate mechanisms: a four-bar parallel-jaw linkage and a rack-and-pinion parallel gripper. Both should be evaluated for jaw parallelism, useful opening range, load transmission, clearances, friction, backlash, size, cost and ease of fabrication. The designs should be bench-testable before mounting on Robbot.\n\nInvestigate a simple mechanical indicator of gripping load or elastic deflection, for example a spring-loaded pad or compliant drive element read by a switch, Hall-effect sensor or displacement measurement. The objective is not merely to signal that something was touched, but to determine experimentally whether the signal is a useful predictor of secure retention. The 150 mm cube provides a common baseline; support for other box widths is an additional design goal with limits to be established by measurements.",
        backgroundResearch: "Research will focus on published examples and technical explanations of four-bar and rack-and-pinion grippers, jaw guidance, spring-loaded pads, compliant gripping mechanisms, and methods for sensing gripping force indirectly through displacement. For each approach, record its source, working principle, force path, likely failure modes, and suitability for low-cost manufacture.\n\nCandidate feedback methods include a spring whose compression is measured by a Hall-effect magnet/sensor pair, a microswitch operating at a defined displacement, a jaw-position sensor, or a force-sensitive element where justified. A spring or Hall reading measures deflection or proximity; it must be calibrated and checked against actual grip performance before it can be interpreted as gripping load. Important questions include how off-centre contact, box deformation, linkage friction, jaw slip and variations in box size alter the reading. Specific literature references and test evidence will be added as research is completed.",
        designDevelopment: "",
        testingValidation: "First measure the original gripper's effective jaw range and demonstrate where its non-parallel faces limit box engagement. Test the four-bar and rack-and-pinion candidates with the same 150 mm cube, then with other recorded box widths where practical. Compare parallelism, opening travel, centred and offset grasps, mechanical play and actual retention after closure.\n\nFor grasp feedback, independently record three outcomes: initial contact, a held box immediately after closure, and retention during a defined lift or disturbance. In each trial note the sensor state or deflection, jaw position and any slip. Count false positives (detector predicts a secure grasp but the box is not retained) and missed detections (a secure grasp without a positive signal). Establish sample sizes, performance targets and test loading before claiming that an approach works. No success rates are assumed in advance.",
        resultsEvaluation: "Current work consists of identifying the limitations of the original Bobbot jaws, selecting the four-bar linkage and rack-and-pinion parallel gripper as the principal candidates, and outlining possible spring-based grasp indicators. The literature review, revised CAD drawings, sensing prototypes and comparative experiments are still to be completed. No secure-grasp detection reliability or gripping-force result is claimed at this stage.",
        conclusionsNextSteps: "1. Record the original gripper's opening geometry and failure conditions on a 150 mm cube. 2. Read and document existing work on parallel-jaw mechanisms and spring/compliant gripping-force detection. 3. Sketch and model the four-bar and rack-and-pinion candidates. 4. Produce at least two sensor-placement concepts, including a possible spring-plus-Hall-effect arrangement. 5. Bench-test opening range and secure retention using centred and offset boxes. 6. Compare sensor indications against independent grip outcomes before selecting and refining the final design.",
        lessonsLearned: "",
        referencesResources: "",
        relatedProjects: ""
      },
      sectionDetails: {
        designDevelopment: [
          { heading: "CAD and prototyping", text: "Develop student-created, annotated drawings and CAD models of both candidate mechanisms, showing the two jaw motion paths, guides, pivots or rack teeth, actuation path, clearances and mounting envelope. Give the proposed sensing element its own detail view showing what moves, which spring deflects and how displacement reaches the sensor.\n\nBuild small bench prototypes before selecting a complete mechanism. Record the dimensions, material, version and manufacturing choices for each candidate, then compare their useful closing range and tolerance to jaw misalignment. The new gripper will have its own drawings and prototype photographs; the current cover image is clearly labelled as the original Bobbot baseline until new images exist." },
          { heading: "Interpreting grasp feedback", text: "Keep the gripping mechanism and its evidence separate from the detection circuit. Low-level software may read a switch or Hall-effect signal and log the timing or magnitude of mechanical deflection, but the signal is only an estimate of engagement. It should be compared with independent observations of box retention.\n\nThe first goal is an understandable mechanical response that could be monitored with minimal sensing hardware. Software thresholds or a digital grasp indication should follow physical calibration and repeatability tests, not substitute for them. No high-level robot navigation or power-supply redesign is part of this investigation." },
          { heading: "Design decisions and iteration", text: "Compare changes to jaw geometry, guides and sensing compliance against repeatable measurements, rather than appearance alone. Four-bar linkages may introduce joint play or changing mechanical advantage; rack-and-pinion designs may introduce friction, backlash or tooth wear. Spring placement or detector thresholds may also make off-centre contact appear secure when it is not.\n\nOnly report iterations as completed when a physical or simulated test has been carried out and the observations recorded. Keep sketches of rejected concepts and explain why a revised design offers a practical improvement." }
        ]
      },
      references: [],
      "investigation": {
        "question": "Which parallel-jaw design best handles different box widths, and can measurable spring or mechanism deflection indicate a grasp likely to remain secure?",
        "status": "Investigation in progress — concepts and proposed tests, not demonstrated performance.",
        "criteria": [
          [
            "Box width and travel",
            "Hold 150 mm reference cube and evaluate other widths",
            "Record jaw opening, contact geometry and smallest/largest reliable box"
          ],
          [
            "Parallel jaw motion",
            "Keep opposing contact surfaces approximately parallel in working range",
            "Measure jaw angle and clearance at repeated openings"
          ],
          [
            "Gripping and retention",
            "Retain cube after closure and defined handling or disturbance",
            "Independent hold, lift and motion tests with a stated pass criterion"
          ],
          [
            "Mechanical response",
            "Create measurable spring or compliant-element displacement under load",
            "Measure deflection against independently observed grasp conditions"
          ],
          [
            "Secure grasp indication",
            "Distinguish contact from a grasp that remains held",
            "Count false positives and missed detections against actual retention"
          ],
          [
            "Misaligned engagement",
            "Evaluate centred, offset and partial jaw contacts",
            "Repeat tests with recorded offsets and box orientations"
          ],
          [
            "Manufacture and robustness",
            "Practical low-cost assembly with manageable backlash and friction",
            "Document parts, cost, build accuracy, wear and maintenance"
          ],
          [
            "Robot fit",
            "Independently bench-testable, with later Robbot mounting",
            "Check mass, envelope and mechanical interface; no lift project required"
          ]
        ],
        "jawOptions": [
          {
            "name": "Original Bobbot pivoting jaws",
            "strength": "Existing reference for comparing jaw travel and box-width tolerance.",
            "tradeoff": "Faces do not remain parallel; box engagement depends on closure and position.",
            "status": "Baseline only"
          },
          {
            "name": "Four-bar parallel-jaw gripper",
            "strength": "Linkage geometry can maintain approximately parallel contact over a chosen range.",
            "tradeoff": "Finite travel, changing mechanical advantage and pivot clearance require analysis.",
            "status": "Main candidate A"
          },
          {
            "name": "Rack-and-pinion parallel gripper",
            "strength": "Opposed racks can give symmetric, guided translation and adaptable jaw travel.",
            "tradeoff": "Guides, backlash, gear tooth strength and sliding resistance need testing.",
            "status": "Main candidate B"
          }
        ],
        "detectionOptions": [
          {
            "name": "Spring-loaded pads with measured displacement",
            "principle": "Elastic pad displacement under gripping load is observed by a magnet/Hall sensor, switch or position measurement.",
            "risk": "A displaced pad can show contact without reliable retention; stiffness and thresholds need calibration."
          },
          {
            "name": "Floating jaw or compliant contact element",
            "principle": "The movable jaw segment deflects under reaction force, making engagement observable at the mechanism.",
            "risk": "Deflection depends on contact location, cube compliance and alignment."
          },
          {
            "name": "Spring or compliance in the drive transmission",
            "principle": "A spring in the closing force path compresses under load and creates measurable travel.",
            "risk": "Friction, backlash and mechanical advantage can confuse the relationship between travel and grip force."
          }
        ],
        "trialColumns": [
          "Test observation",
          "What is recorded",
          "Why it matters"
        ],
        "trialRows": [
          [
            "Jaw range",
            "Cube width, jaw opening and parallelism",
            "Checks usable size range beyond the 150 mm reference"
          ],
          [
            "Initial contact",
            "Observed contact versus sensor response",
            "Contact alone is not proof of retention"
          ],
          [
            "Secure hold",
            "Independent hold / lift outcome after closing",
            "Reference outcome for any grasp-success indication"
          ],
          [
            "Disturbance and slip",
            "Whether the box remains held during defined handling",
            "Tests whether the claimed grasp is likely to stay grasped"
          ],
          [
            "Repeatability",
            "Repeated centre/offset trials and detector errors",
            "Counts false positives and missed detections"
          ]
        ],
        "media": [],
        "sources": []
      },
      "links": {
        "github": "",
        "cad": "",
        "video": "",
        "downloads": ""
      }
    },
    {
      "id": "gripper-contact-surfaces",
      "published": false,
      "title": "Gripper Pad Selection Trial",
      "category": "cad",
      "image": "assets/images/gripper_bobbot_orig.jpeg",
      "imageAlt": "CAD of the existing Bobbot gripper used as a baseline for contact-pad tests",
      "imageCaption": "Existing Bobbot gripper — reference design. New contact-pad prototypes and experimental photographs will be added as they are produced.",
      "summary": "Testing a selection of 3D printable gripper pads to determine effectiveness on a 150 mm cardboard box.",
      "tags": [
        "Mechanical Design",
        "Materials",
        "Experimental Testing",
        "3D Printing"
      ],
      "date": "",
      "relatedProjectIds": [
        "mechanical-gripper",
        "robotic-gripper-grasp-detection",
        "autonomous-mobile-robot"
      ],
      "contribution": "Planned independent work: design interchangeable contact pads, manufacture samples and measure grip, friction, damage and repeatability.",
      "sectionLabels": {
        "overview": "The problem & existing baseline",
        "brief": "Investigation aim and approach",
        "surface-benchmarks": "Success criteria against rubber bands",
        "surface-materials": "Material shortlist and decisions",
        "surface-tests": "Experimental test programme",
        "surface-failures": "Failure analysis and design responses",
        "construction": "Prototype design and manufacturing",
        "results": "Current status and evidence",
        "nextSteps": "Next steps and decisions",
      },
      sections: {
        overview: "The working gripper uses rubber bands as high-friction contact surfaces against cardboard. This arrangement can work well when the object and jaw position match closely, but performance is sensitive to geometry and the bands can occasionally detach. The existing strong gripper actuator may also mask limitations in the contact material. An improved pad should be judged at equal, controlled loading rather than by simply increasing gripping force.\n\nThis is a separate investigation into the material and geometry of the gripping surface, not a redesign of the full gripper mechanism or a grasp-sensing project. The existing rubber-band arrangement is the reference, and a 150 mm cardboard cube provides the principal test object.",
        objectivesRequirements: "Investigate whether a replaceable 3D-printed compliant pad can produce higher cardboard slip resistance and pull-out retention than the existing rubber bands without unacceptable cardboard damage. Start with comparable, flat pads and a controlled load. Test Bambu TPU 90A, Bambu TPU 85A and Recreus Filaflex SEBS 90A, using available eSUN TPU 95A or TPU 54D only if needed.\n\nThe design sequence is baseline measurement → material comparison → failure diagnosis → literature-informed surface modification → repeat testing. Geometry modifications are conditional, not assumed improvements: a textured surface can produce a different friction response without necessarily increasing peak force. Material hardness, polymer formulation and geometry should be treated as separate experimental variables.",
        backgroundResearch: "",
        designDevelopment: "Create interchangeable pads with controlled nominal contact dimensions and documented printer settings. Use a repeatable mounting arrangement on the existing gripper or a two-jaw test fixture, with pad orientation and contact area recorded. Design the initial pad surfaces to be geometrically comparable across materials.\n\nThe P1S can print Bambu TPU 90A with a 0.4 mm nozzle; TPU 85A requires a recommended 0.6 or 0.8 mm nozzle. Recreus supplies a Filaflex SEBS profile for the P1S, but its suitability still needs a practical print trial. Record extrusion consistency, layer adhesion, dimensional accuracy and whether the finished pad can be produced repeatedly. No manufactured pads or test values are claimed yet.",
        testingValidation: "",
        resultsEvaluation: "",
        conclusionsNextSteps: "",
        lessonsLearned: "",
        referencesResources: "",
        relatedProjects: ""
      },
      references: [],
      "surfaceStudy": {
        "benchmarks": [
          [
            "Gripper retention",
            "Existing rubber bands",
            "Higher mean pull-out force at identical controlled jaw loading"
          ],
          [
            "Surface friction",
            "Existing rubber bands",
            "Higher mean onset-of-slip force at identical applied normal loading"
          ],
          [
            "Cardboard damage",
            "Existing rubber bands",
            "No unacceptable increase in permanent deformation or damage"
          ],
          [
            "Printability",
            "Rubber bands not printed",
            "Repeatably manufacture a usable contact pad"
          ],
          [
            "Robot operation",
            "Existing working gripper",
            "Optional validation; not mandatory for initial material screening"
          ]
        ],
        "materials": [
          {
            "rank": 1,
            "name": "Bambu TPU 90A",
            "relevance": "Compliant printed robotic-gripper materials; verify the exact formulation in any cited study.",
            "printing": "P1S compatible; 0.4 mm nozzle recommended.",
            "decision": "Primary 1",
            "reason": "Intermediate hardness and practical starting point."
          },
          {
            "rank": 2,
            "name": "Bambu TPU 85A",
            "relevance": "Softer compliant gripper and sensing research provides a design rationale, not a product-specific cardboard result.",
            "printing": "P1S compatible; 0.6 mm or 0.8 mm nozzle recommended.",
            "decision": "Primary 2",
            "reason": "Tests whether greater softness improves contact with cardboard."
          },
          {
            "rank": 3,
            "name": "Recreus Filaflex SEBS 90A",
            "relevance": "SEBS-type flexible anti-slip material; direct evidence for this exact grade against cardboard is not established.",
            "printing": "Manufacturer provides P1S Filaflex SEBS profile; check product grade and settings.",
            "decision": "Primary 3",
            "reason": "Different polymer chemistry at similar nominal Shore A hardness."
          },
          {
            "rank": 4,
            "name": "eSUN TPU 95A",
            "relevance": "2025 published research includes printed TPU 95A and cardboard packaging friction.",
            "printing": "Already owned; P1S printable with 0.4 mm.",
            "decision": "Substitute 1",
            "reason": "Available, reliable alternative if a primary material cannot be tested."
          },
          {
            "rank": 5,
            "name": "TPU 54D",
            "relevance": "Harder TPU can inform printed structural/compliant designs, but is not a leading soft-contact candidate.",
            "printing": "Already owned and printable.",
            "decision": "Substitute 2",
            "reason": "Fallback rather than a preferred soft gripping surface."
          },
          {
            "rank": 6,
            "name": "TPU 60A–70A",
            "relevance": "Research on very soft printed grippers, but manufacturing adds uncertainty.",
            "printing": "Outside the initially selected, manufacturer-supported P1S route.",
            "decision": "Excluded",
            "reason": "Printing uncertainty outweighs benefit to initial comparison."
          },
          {
            "rank": 7,
            "name": "BotFeeder Filastic TPE",
            "relevance": "Material used in Liu and Hung (2022) compliant-finger research.",
            "printing": "Specific material and P1S profile not established.",
            "decision": "Excluded",
            "reason": "Material sourcing and manufacturing evidence insufficient."
          },
          {
            "rank": 8,
            "name": "Other TPS/TPC formulations",
            "relevance": "Research on flexible printed structures varies by formulation.",
            "printing": "Product-specific P1S compatibility unverified.",
            "decision": "Excluded",
            "reason": "No strong case to add more initial variables."
          },
          {
            "rank": 9,
            "name": "Foaming TPU",
            "relevance": "Potentially tunable compliance; not yet justified for cardboard retention.",
            "printing": "Requires additional calibration and process controls.",
            "decision": "Excluded",
            "reason": "Introduces extra manufacturing variables."
          }
        ],
        "failures": [
          [
            "Insufficient grip",
            "Low friction against cardboard",
            "Compare shallow ribs, grooves or directional texture with a flat reference.",
            "Possibly greater resistance to sliding; verify experimentally.",
            "TPU–cardboard tribology (2025); textured silicone pads (2025)"
          ],
          [
            "Poor surface conformity",
            "Pad too stiff to follow cardboard irregularities",
            "Explore flexible ribs, grooves or compliant geometry.",
            "Greater local deformation without relying only on lower filament hardness.",
            "Liu & Hung (2022)"
          ],
          [
            "Uneven contact",
            "Pivoting jaws create nonuniform contact pressure",
            "Explore rounded, segmented or locally compliant pad features.",
            "More even contact and usable contact area.",
            "Białek & Rybarczyk (2023); Liu & Hung (2022)"
          ],
          [
            "Cardboard damage",
            "Excessive local pressure creates crushing or creasing",
            "Use wider, rounded or compliant contact features and reassess pressure.",
            "Lower local pressure and reduced permanent deformation.",
            "Kargar & Berselli (2025); Białek & Rybarczyk (2023)"
          ],
          [
            "Poor print quality",
            "Under-extrusion, weak layer bonding or deformation",
            "Adjust nozzle, feed rate, temperature, orientation and drying.",
            "More consistent, repeatable and durable pads.",
            "Bambu Lab guidance; Liu & Hung (2022)"
          ]
        ],
        "tests": [
          {
            "rank": 1,
            "name": "Horizontal pull / slip",
            "priority": "Primary",
            "measures": "Static friction and resistance to initial sliding against cardboard.",
            "equipment": "Weighted sled, force gauge, slow pulley or motorised lead screw.",
            "minimum": "5 trials per material.",
            "result": "Mean peak force before sustained slip (N); estimated coefficient F/N when loading is controlled.",
            "controls": "Normal load, pad area, cardboard type, pull speed, surface direction, print orientation.",
            "assess": "Onset-of-slip force and trial variability.",
            "extension": "More trials or normal loads; inclined-plane test if sled is impractical.",
            "notes": "Adapted from ASTM D1894; not an ASTM-compliant cardboard standard. Smooth motorised pulling is preferable.",
            "reference": "ASTM D1894-24 (adapted)"
          },
          {
            "rank": 2,
            "name": "Gripper retention / pull-out",
            "priority": "Primary",
            "measures": "Force needed to extract the box from closed jaws under a controlled normal force.",
            "equipment": "Two-jaw fixture, force gauge and calibrated clamp or controlled spring.",
            "minimum": "5 trials per material.",
            "result": "Mean pull-out force (N) and trial-to-trial spread.",
            "controls": "Actual jaw normal force, pad location, area, box orientation, pull direction/speed.",
            "assess": "First sustained slip and any box damage.",
            "extension": "Additional jaw-force settings.",
            "notes": "A fixed servo position or motor current cannot by itself establish equal jaw force between materials.",
            "reference": "Białek & Rybarczyk (2023)"
          },
          {
            "rank": 3,
            "name": "Pickup–carry–drop-off",
            "priority": "Secondary",
            "measures": "Reliability of complete pickup, transport and release.",
            "equipment": "Existing robot, boxes and interchangeable pads.",
            "minimum": "1–3 exploratory cycles per material, if feasible.",
            "result": "Count successful operations and identify the failure stage.",
            "controls": "Starting position, box type, jaw settings, route, speed and release.",
            "assess": "Pickup failure, slipping/drop during travel or release failure.",
            "extension": "10 full cycles per material (30 total).",
            "notes": "Optional application-level validation, not a requirement for passing the material screen.",
            "reference": "Application-level validation (no matching standard identified)"
          },
          {
            "rank": 4,
            "name": "Cardboard compression / damage",
            "priority": "Primary — simple",
            "measures": "Permanent indentation, creasing, crushing or structural damage.",
            "equipment": "Existing fixture, camera and calipers.",
            "minimum": "Inspect the box after retention tests.",
            "result": "Damage score 1–5; thickness reduction (%) if measurable.",
            "controls": "Same cardboard, marked location, jaw force, duration, recovery time and caliper pressure.",
            "assess": "1 = none; 5 = structural failure. Compare with baseline.",
            "extension": "More detailed compression measurement.",
            "notes": "Use consistent photographs and the same recovery time; no separate large test programme.",
            "reference": "Adapted practical damage assessment"
          },
          {
            "rank": 5,
            "name": "Inclined-plane sliding",
            "priority": "Alternative",
            "measures": "Approximate friction coefficient from initial slip angle.",
            "equipment": "Adjustable ramp and inclinometer.",
            "minimum": "Optional fallback only.",
            "result": "Slip angle and estimated coefficient tan(angle).",
            "controls": "Normal loading via weight, cardboard type and ramp raising rate.",
            "assess": "Angle at first sliding.",
            "extension": "Substitute for horizontal slip rig.",
            "notes": "Simpler to build, but loading may be less representative of a real gripper.",
            "reference": "Inclined-plane friction method"
          },
          {
            "rank": 6,
            "name": "Compression / force–displacement",
            "priority": "Extension",
            "measures": "Pad stiffness, elastic recovery and hysteresis.",
            "equipment": "Force gauge and repeatable displacement fixture.",
            "minimum": "Not part of initial screening.",
            "result": "Load–displacement curve and residual deformation.",
            "controls": "Pad dimensions, compression rate, cycles and loading history.",
            "assess": "Permanent set and recovery.",
            "extension": "Potential future sensing study.",
            "notes": "Useful for understanding compliance, not a prerequisite to selecting materials.",
            "reference": "Compliant-finger and integrated sensing literature"
          },
          {
            "rank": 7,
            "name": "Repeated gripping / wear",
            "priority": "Extension",
            "measures": "Reduction of grip performance after repeated contact.",
            "equipment": "Fixture or robot and force gauge.",
            "minimum": "Not part of initial screening.",
            "result": "Change in retention force and visible wear.",
            "controls": "Cycle count, jaw force and cardboard condition.",
            "assess": "Force loss and physical damage.",
            "extension": "Combine with longer robot-cycle programme.",
            "notes": "Follow-up durability investigation after a successful material is identified.",
            "reference": "TPU/cardboard tribology (2025)"
          },
          {
            "rank": 8,
            "name": "Surface texture comparison",
            "priority": "Extension",
            "measures": "Effect of ribs, grooves or textured pads on grip.",
            "equipment": "Alternative printed contact pads.",
            "minimum": "Only after baseline results justify a design change.",
            "result": "Change in slip and pull-out force compared with a flat pad.",
            "controls": "Material, pad size, normal force, printing method and texture orientation.",
            "assess": "Measured improvement without increased box damage.",
            "extension": "Optimise the selected material.",
            "notes": "Texture adds a second experimental variable; do not mix into initial material comparison.",
            "reference": "Kargar & Berselli (2025)"
          },
          {
            "rank": 9,
            "name": "Infill-density comparison",
            "priority": "Extension",
            "measures": "Influence of internal printed geometry on compliance and grip.",
            "equipment": "Pads with controlled different infill densities.",
            "minimum": "Only if pad thickness makes infill meaningful.",
            "result": "Compliance, slip force and retention by infill design.",
            "controls": "Material, shape, shells, infill pattern, jaw load.",
            "assess": "Measured improvement versus solid/standard pad.",
            "extension": "Optimise thicker compliant geometry.",
            "notes": "More pertinent for thick compliant structures than thin contact layers.",
            "reference": "Liu & Hung (2022)"
          },
          {
            "rank": 10,
            "name": "Integrated contact detection",
            "priority": "Separate future study",
            "measures": "Whether deformation can indicate initial contact.",
            "equipment": "Sensor and associated electronics/fixture.",
            "minimum": "Outside the contact-material study.",
            "result": "Detection accuracy and consistency.",
            "controls": "Contact load, pad geometry and sensor position.",
            "assess": "False triggers and missed detections.",
            "extension": "Future grasp-feedback project.",
            "notes": "Do not conflate sensing performance with contact-surface friction.",
            "reference": "Integrated sensing gripper literature"
          }
        ],
        "sources": [
          {
            "name": "Experimental Research on the Tribological Behavior of Plastic Materials with Friction Properties (2025)",
            "use": "Tests how different plastic materials, including 3D-printed TPU, slide against cardboard packaging.",
            "url": "https://doi.org/10.3390/coatings15010084"
          },
          {
            "name": "Białek & Rybarczyk — Comparative Study of Different Fingertips (2023)",
            "use": "Compares different robotic gripper fingertips by measuring the force needed to pull an object out of the gripper.",
            "url": "https://doi.org/10.3390/app13031247"
          },
          {
            "name": "Kargar & Berselli — Frictional insights into textured soft pads (2025)",
            "use": "Tests smooth and patterned silicone gripping surfaces to see how their shapes affect friction.",
            "url": "https://doi.org/10.1007/s00170-025-16625-1"
          },
          {
            "name": "Liu & Hung — Effect of the infill density on a compliant finger (2022)",
            "use": "Investigates how the amount of material inside a 3D-printed flexible finger changes its bending and gripping behaviour.",
            "url": "https://doi.org/10.1016/j.matdes.2022.111203"
          },
          {
            "name": "ASTM D1894-24 — Friction of plastic film and sheeting",
            "use": "Describes a standard way to measure friction by pulling one surface across another.",
            "url": "https://store.astm.org/d1894-24.html"
          },
          {
            "name": "Bambu Lab — TPU 85A / TPU 90A",
            "use": "Gives material properties and printing requirements for Bambu’s flexible filaments.",
            "url": "https://asia.store.bambulab.com/collections/pc-tpu/products/tpu-85a-tpu-90a"
          },
          {
            "name": "Recreus — Filaflex SEBS",
            "use": "Describes a flexible filament made from a different type of plastic, with manufacturer printing guidance.",
            "url": "https://recreus.com/en/products/filaflex-sebs"
          },
          {
            "name": "SurgGrip (2022)",
            "use": "Describes a robotic gripper using soft contact pads to improve how objects are held.",
            "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9618027/"
          }
        ]
      },
      "links": {
        "github": "",
        "cad": "",
        "video": "",
        "downloads": ""
      }
    },
    {
      id: "printed-mechanisms",
      published: true,
      featuredOrder: 8,
      title: "Pulley",
      category: "fabrication",
      image: "assets/images/Pulley.png",
      imageAlt: "Illustrative 3D-printed gears and fabricated components",
      summary: "",
      tags: ["3D Printing", "Prototyping", "Materials"],
      date: "3D Printed PETG Pulleys",
      contribution: "",
      sections: {
        overview: "",
        objectivesRequirements: "",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "",
        resultsEvaluation: "",
        conclusionsNextSteps: "",
        lessonsLearned: "",
        referencesResources: "",
        relatedProjects: ""
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
      published: true,
      featuredOrder: 3,
      relatedProjectIds: ["robot-io-mapping", "mobile-robot-power-distribution"],
      title: "Modular Robot I/O & TeleOp Controller",
      category: "electronics",
      image: "assets/images/arduino mega.jpg",
      imageAlt: "Arduino Mega 2560 controller wiring diagram showing field and panel connectors, power buses, encoder inputs, servos and sensor interfaces",
      imageCaption: "Arduino Mega 2560 — pin allocation, power distribution and field/panel wiring diagram",
      summary: "A reusable Arduino Mega-based low-level controller for robot TeleOp, encoder counting and hardware I/O, with a Raspberry Pi responsible for higher-level vision, navigation and autonomous control.",
      tags: ["Arduino Mega", "Embedded Systems", "TeleOp", "Robot I/O"],
      date: "",
      contribution: "Design of a reusable wiring and I/O arrangement for robot platforms, separating the Mega’s low-level functions from Raspberry Pi autonomy.",
      sectionLabels: {"architecture": "System architecture", "hardware": "Electrical interfaces", "software": "Firmware & TeleOp", "testing": "Testing & verification", "iterations": "Design decisions & improvements", "results": "Current outcome"},
      sections: {
        overview: "The Modular Robot I/O & TeleOp Controller is a common electrical and low-level control interface intended for use across different robots. It is built around an Arduino Mega 2560, chosen for its numerous digital, analogue and interrupt-capable connections. Rather than design a different controller for every robot, the aim is to keep a consistent pin map and connect only the motors, servos, encoders and sensors that each platform requires.\n\nThe Mega is deliberately not the robot’s main computer. It handles manual teleoperation (TeleOp), encoder counting and direct hardware interfacing. A Raspberry Pi carries out higher-level work such as perception, navigation and autonomous decision-making. This division keeps the microcontroller focused on practical, time-sensitive I/O rather than computationally demanding algorithms.",
        objectivesRequirements: "Provide one reusable set of controller connections for multiple robots, with stable power and signal interfaces, radio TeleOp, encoder counting and selective connection of robot-specific peripherals.",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "Verification is best carried out in stages. Start with the power rails and connector pinouts, checking voltage levels, common grounds and correct polarity before connecting motors or sensitive sensors. Then test each used I/O channel individually: switches, servos, motor outputs, sensor readings and the direction and consistency of encoder counts.\n\nTeleOp testing should confirm channel mapping, response to operator inputs and behaviour if the radio signal is lost. With the Raspberry Pi connected, additional checks should cover command handling, feedback timing and transitions between manual and autonomous control. The schematic establishes the interface design; quantitative results such as encoder count reliability or control latency have not yet been recorded on this page.",
        resultsEvaluation: "The current documented output is a consolidated Arduino Mega wiring diagram and I/O allocation covering power distribution, external connectors, manual-control input, encoders and multiple kinds of robot peripherals. It provides a repeatable starting point for configuring the electrical interface of more than one robot.\n\nThe defined control split is that the Mega handles TeleOp and encoder counting while the Raspberry Pi performs high-level control. This page describes that architecture and the interfaces available; it does not yet present measured performance, completed qualification tests or a claim that every connection in the diagram has been populated.",
        conclusionsNextSteps: "",
        lessonsLearned: "A modular robot controller is as much about defining responsibilities and connections as it is about choosing the microcontroller. Separating low-level I/O from higher-level autonomy makes the design easier to understand, test and transfer to another platform.\n\nConsistent signal names, connector pinouts and power distribution are particularly valuable when the robot changes but the controller does not. The next useful evidence will be repeatable encoder, TeleOp and power-system tests that show how reliably the reusable design operates on different robots.",
        referencesResources: "",
        relatedProjects: ""
      },
      sectionDetails: {
        designDevelopment: [
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
      published: true,
      featuredOrder: 6,
      title: "Robot I/O Mapping & Hardware Abstraction",
      category: "electronics",
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
        overview: "The purpose of this project is to define the final interface between robot software and hardware. Higher-level programs use a single io.* vocabulary to read sensor data and command actuators: for example, io.encoder[\"drive_front_left\"].count or io.motor[\"collector\"].power. The program describes what it wants to do, not which controller, protocol or connection is needed to do it.\n\nThis makes the software more reusable. A robot may use an Arduino Mega, a device connected directly to the Raspberry Pi, another controller or a simulation backend, while the robot behaviours retain the same named I/O operations. The companion Modular Robot I/O & TeleOp Controller project documents one physical implementation of this interface.",
        objectivesRequirements: "",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "The interface should be verified at the software boundary first: check that an io.* call reaches the intended backend, accepts the expected inputs and returns the promised values or errors. Then test the backend and transport separately, including invalid responses, lost communication and device absence. Finally verify the behaviour on real robot hardware.\n\nA useful portability test is to run the same high-level command against two different supported backends, including simulation where available, and compare the results. This page documents the interface design; it does not claim complete implementation or measured verification of every entry.",
        resultsEvaluation: "The current output is a defined common I/O vocabulary covering motion, sensors, localisation inputs, servo mechanisms and direct Pi devices, with corresponding backend mappings and message contracts in the full engineering matrix. The simplified table displayed as this project's main image communicates the io.* layer rather than any particular wiring design.\n\nThis is an interface specification and reusable design approach. The existence of an entry is not evidence that every associated implementation is complete or performance-tested.",
        conclusionsNextSteps: "",
        lessonsLearned: "The most useful boundary in a reusable robot system is between what the software asks the robot to do and how a particular controller accomplishes it. Device names and operation semantics should remain meaningful when the physical robot changes.\n\nSeparating the io.* contract from backends, communications and electrical wiring makes failures easier to isolate and new platforms easier to integrate.",
        referencesResources: "",
        relatedProjects: ""
      },
      sectionDetails: {
        designDevelopment: [
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
      published: true,
      featuredOrder: 4,
      title: "Mobile Robot Power Distribution & Electrical Architecture",
      category: "electronics",
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
        overview: "This project documents the electrical architecture of a mobile robot using a one-line diagram. The aim is to show how the main electrical subsystems fit together: the battery supply, motor drivers, low-voltage control electronics, USB devices and powered actuators. It provides an overall system view alongside the more detailed Arduino Mega wiring diagram and software I/O specification.\n\nThe design is modular. Power paths and functional groups are identified separately, and provisions for future devices are shown without implying that every illustrated component is installed.",
        objectivesRequirements: "",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "The next stage is to verify the drawing against the actual system. Checks should include supply polarity, fuse and wire ratings, expected current draw, regulator output under load, grounding and voltage drops. Power branches should be commissioned independently before connecting the complete robot.\n\nBench checks should also establish that motor starts and servo movements do not disrupt the Pi or microcontroller supplies, and that any separate test-power arrangement cannot accidentally energise an unintended branch. These are planned verification steps; this page does not present measured results.",
        resultsEvaluation: "The present output is a one-line electrical diagram that brings the robot's power and control hardware into one coherent view. It documents the intended distribution architecture, identifies the major subsystems and provides a basis for more detailed wiring and electrical verification.\n\nThe design complements the Arduino Mega wiring plan and the io.* software interface: one describes electrical power flow, one defines the low-level connections and controller responsibilities, and one defines how higher-level software accesses robot hardware.",
        conclusionsNextSteps: "",
        lessonsLearned: "A system-level electrical drawing makes dependencies and supply requirements visible before detailed wiring begins. Separating the power architecture from control wiring and from the software-facing I/O contract keeps each document focused and easier to maintain.\n\nThe design also highlights the importance of distinguishing future provisions from installed hardware and checking protection, power budgets and grounding with measurements rather than assuming a schematic is sufficient.",
        referencesResources: "",
        relatedProjects: ""
      },
      sectionDetails: {
        designDevelopment: [
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
      published: true,
      title: "Robbot - Autonomous Mobile Robot",
      category: "robotics",
      image: "assets/images/IMG_2756_robbot.jpg",
      imageAlt: "Robot project photo — replace or update caption",
      summary: "Robbot is Bobbot on a budget.  Where Bobbot doesn’t set a specific price on utility Robbot is designed to extract as much of Bobbot’s functionality and performance as possible without the cost",
      tags: ["Robotics", "Mechanical Design", "Control"],
      date: "",
      contribution: "",
      sections: {
        overview: "",
        objectivesRequirements: "",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "",
        resultsEvaluation: "",
        conclusionsNextSteps: "",
        lessonsLearned: "",
        referencesResources: "",
        relatedProjects: ""
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "gobilda-decode-starter-bot",
      published: true,
      title: "goBILDA DECODE Starter Bot",
      category: "robotics",
      image: "assets/images/IMG_2734 goBilda Decode Starter Bot.jpg",
      imageAlt: "Photograph of the goBILDA DECODE starter robot during assembly, showing its metal chassis, wheels, motors, wiring and control hardware",
      imageCaption: "goBILDA DECODE Starter Bot — photographed during the build",
      summary: "An FTC-style starter robot assembled from the goBILDA StarterBot Assembly Manual and Starter Kit components. Electrical Panel was designed and built to integrate with the robot.",
      tags: ["Robotics", "goBILDA", "FTC", "Robot Assembly"],
      date: "",
      sections: {
        overview: "The goBILDA DECODE Starter Bot is a practical starting point for building and understanding an FTC-style robot. Rather than designing every component from scratch, the project uses a starter platform to concentrate on how the drivetrain, mechanical structure, electronics and wiring fit together. It also provides a baseline for evaluating changes and developing additional mechanisms.\n\nThe photograph records the robot during assembly, not a completed or performance-tested final design.",
        objectivesRequirements: "",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "Useful baseline tests include straight-line driving, turning response, repeatability of driver commands, mechanism operation and electrical reliability. These tests help distinguish limitations in the mechanical assembly from problems in wiring or software.\n\nNo measured driving or mechanism-performance results are reported on this page yet.",
        resultsEvaluation: "The current photograph documents the physical starter-bot build. This project page will be expanded as control software, functional trials and any mechanical modifications are completed and recorded.",
        conclusionsNextSteps: "",
        lessonsLearned: "A working robot depends on much more than choosing individual components. Mechanical access, cable routes, mounting positions and compatibility between the control hardware and drivetrain all affect how easily a platform can be built, maintained and developed.",
        referencesResources: "",
        relatedProjects: ""
      },
      sectionDetails: {
        designDevelopment: [
          { heading: "Construction & manufacture", text: "The chassis is built from modular metal structural components, with motors, wheels, electronic hardware and wiring mounted to the frame. Working with a modular construction system makes it possible to adjust component placement while checking physical clearances, accessibility and cable routing.\n\nThis part of the project focuses on careful mechanical assembly and integration. The starter-kit layout is a foundation; any custom parts or later modifications can be documented separately as they are made." },
          { heading: "Software & control", text: "The initial software task for a starter robot is reliable manual control: mapping driver inputs to movement, confirming motor directions and controlling the mechanisms fitted to the chassis. Establishing these behaviours provides a baseline before attempting more advanced automated functions.\n\nSpecific programmed features and autonomous routines will be described here when they have been implemented and tested." },
          { heading: "Design iterations", text: "Starting with a known kit design makes it easier to change one feature at a time and assess whether an adjustment improves the robot. Potential areas for development include cable organisation, access to components and the positioning of mechanisms. Any actual revisions will be recorded with photographs and test observations." }
        ]
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "cad-project-2",
      published: true,
      featuredOrder: 9,
      title: "Shooter",
      category: "cad",
      image: "assets/images/Shooter CAD.png",
      imageAlt: "CAD illustration — replace with the second design project",
      summary: "Shooter design for FTC BioBuzz Pollen.",
      tags: ["CAD", "Engineering Design", "Mechanisms"],
      date: "",
      contribution: "",
      sections: {
        overview: "",
        objectivesRequirements: "",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "",
        resultsEvaluation: "",
        conclusionsNextSteps: "",
        lessonsLearned: "",
        referencesResources: "",
        relatedProjects: ""
      },
      references: [],
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "fabrication-project-2",
      published: true,
      featuredOrder: 10,
      title: "Rubber Band Intake Wheel",
      category: "fabrication",
      image: "assets/images/rubber_band_wheel.png",
      imageAlt: "3D-printing example image — replace with the second fabrication project",
      summary: "The diameter and number of notches are adjustable. Designed for a 8mm hex axle.",
      tags: ["3D Printing", "CAD", "Prototyping"],
      date: "",
      contribution: "",
      sections: {
        overview: "",
        objectivesRequirements: "",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "",
        resultsEvaluation: "",
        conclusionsNextSteps: "",
        lessonsLearned: "",
        referencesResources: "",
        relatedProjects: ""
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
      published: true,
      title: "FlySky Receiver Mount",
      category: "fabrication",
      image: "assets/images/FlySky Receiver.png",
      imageAlt: "3D-printing example image — replace with the second fabrication project",
      summary: "FlySky Receiver mount with a slot for the antenna",
      tags: ["3D Printing", "CAD", "Prototyping"],
      date: "",
      contribution: "",
      sections: {
        overview: "",
        objectivesRequirements: "",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "",
        resultsEvaluation: "",
        conclusionsNextSteps: "",
        lessonsLearned: "",
        referencesResources: "",
        relatedProjects: ""
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
      published: true,
      title: "PiCam3 Mount 8 Degrees",
      category: "fabrication",
      image: "assets/images/PICam3 Mount 8 degree.png",
      imageAlt: "3D-printing example image — replace with the second fabrication project",
      summary: "PiCam3 Mount with an 8 degree downward pitch.",
      tags: ["3D Printing", "CAD", "Prototyping"],
      date: "",
      contribution: "",
      sections: {
        overview: "",
        objectivesRequirements: "",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "",
        resultsEvaluation: "",
        conclusionsNextSteps: "",
        lessonsLearned: "",
        referencesResources: "",
        relatedProjects: ""
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
      published: true,
      title: "RoboClaw 2x30",
      category: "fabrication",
      image: "assets/images/RoboClaw 2x30.png",
      imageAlt: "3D-printing example image — replace with the second fabrication project",
      summary: "RoboClaw 2x30A motor controller mount",
      tags: ["3D Printing", "CAD", "Prototyping"],
      date: "",
      contribution: "",
      sections: {
        overview: "",
        objectivesRequirements: "",
        backgroundResearch: "",
        designDevelopment: "",
        testingValidation: "",
        resultsEvaluation: "",
        conclusionsNextSteps: "",
        lessonsLearned: "",
        referencesResources: "",
        relatedProjects: ""
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
