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
      image: "assets/images/cad.webp"
    },
    {
      id: "fabrication",
      title: "3D Printing & Fabrication",
      subtitle: "Custom parts, prototyping, tolerances and material selection",
      image: "assets/images/Pulley.png"
    },
    {
      id: "electronics",
      title: "Electronics & Embedded Systems",
      subtitle: "Sensors, controllers, wiring and embedded interfaces",
      image: "assets/images/arduino mega.jpg"
    },
    {
      id: "software",
      title: "Software",
      subtitle: "Behaviours, Python modules, control logic and development notes",
      image: "assets/images/navigation block diagram.jpg"
    },
    {
      id: "algorithms",
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
  software: [
    {
      id: "return-to-base",
      title: "Autonomous Return to Base",
      type: "Behaviour",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["apriltag-routing", "distance-angle-control", "local-obstacle-avoidance", "wall-following", "dead-reckoning"],
      tags: ["Python", "Navigation", "AprilTags", "Recovery"],
      status: "Code documented",
      summary: "Navigate back to the delivery area using a chain of arena tags, with obstacle avoidance, guide recovery and a conditional wall-following approach.",
      image: "assets/images/return-to-base-cover.svg",
      flowchart: "assets/diagrams/bobbot-return-to-base.svg",
      imageAlt: "Conventional engineering flowchart of Bobbot's Return-to-Base behaviour",
      objective: "Return from the collection area to a delivery position despite changing visibility and objects obstructing the preferred path. The return behaviour finishes navigation but does not itself release the carried object.",
      implementation: "ReturnToBase supervises the operating mode. ReturnToBaseServo selects the furthest-progressed eligible visible guide on a configured arena-tag route; intermediate tags provide a steering reference, not a stop position. A final guide becomes a point target. The supervisor can transfer control to LocalAvoidance, SearchForReturnGuide or FollowWall depending on perception and approach geometry.",
      changes: "Development progressed beyond a provisional fixed-distance Stage 1 return. The fallback is described in the flowchart as open-loop / dead-reckoning control (the October source still contains a placeholder 750 mm Drive). Stage 2 adds vision-guided route selection, a bounded guide search, ±10° handoff peek, 500 mm backoff plus realignment, obstacle-aware takeover, and a wall-follow option when the terminal guide is approached too side-on.",
      lessons: "A visible tag does not always imply a safe route directly towards it. Keeping intermediate guides at an angular offset supports movement along the perimeter, while separating mission supervision from lower-level motion skills makes failures easier to isolate. Recovery needs different policies for temporary lost visibility, blocked handoffs and terminal approach.",
      testing: "The linked flowchart reflects program logic from the October 2026 Python source. It is not evidence that every branch has completed physical-robot validation. Add dated trials, success rates, logs and observed limitations when they are available.",
      next: "Review FollowWall's start interface, confirm end-to-end wall-follow and avoidance handoffs, and publish measured tests from simulation and the physical robot.",
      codeFiles: ["autonomous/SR2026/return_to_base.py", "skills/navigation/return_to_base_servo.py", "skills/navigation/local_avoidance.py", "skills/navigation/search_for_return_guide.py", "skills/navigation/follow_wall.py"],
      sourceUrl: "",
      demos: []
    },
    {
      id: "stack-object",
      title: "Stack Object",
      type: "Behaviour",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["distance-angle-control", "local-obstacle-avoidance", "coordinate-transformations"],
      tags: ["Perception", "Target Approach", "Sequencing"],
      status: "Write-up in progress",
      summary: "Coordinate target selection, approach and stacking while responding to unavailable or obstructed targets.",
      image: "assets/images/stack-object-cover.svg",
      objective: "Bring perception and movement together to handle a stacking task.",
      implementation: "The behaviour coordinates target selection and approach skills. An October ReturnToBase branch also selects a previously delivered low target for a terminal stacking approach. The standalone stacking behaviour should be documented from its own source before adding a full sequence here.",
      changes: "Add the actual sequence of design revisions and the reason for each change.",
      lessons: "Document target loss, approach reliability and what was learned from unsuccessful trials.",
      testing: "Add measured simulation and physical-robot evidence; no performance figures are asserted here.",
      next: "Add a flowchart, source links and recorded trial outcomes.",
      codeFiles: ["autonomous/SR2026/stack_object.py"], sourceUrl: "", demos: []
    },
    {
      id: "guide-recovery",
      title: "Arena Guide Search & Recovery",
      type: "Subroutine",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["apriltag-routing", "dead-reckoning"],
      tags: ["AprilTags", "Fault Recovery", "Search"],
      status: "Code documented",
      summary: "Search for a missing arena tag and re-establish a viable visual navigation route.",
      image: "assets/images/guide-recovery-cover.svg",
      objective: "Avoid treating a single missing visual observation as mission failure.",
      implementation: "SearchForReturnGuide calls a bounded SearchRotate and succeeds when a permitted guide becomes visible. Separate handoff recovery may peek ±10°, reverse 500 mm and realign using the two known tag locations before resuming route selection.",
      changes: "Distinguishes temporary vision loss, lost current guide and failure to find the next guide at a guarded handoff.",
      lessons: "Recover using the smallest appropriate manoeuvre before resorting to broad search; route identity should remain explicit during handoffs.",
      testing: "Describe observed recoveries and exhausted searches when results are recorded.",
      next: "Verify search limits and timeouts on the physical platform.",
      codeFiles: ["skills/navigation/search_for_return_guide.py", "skills/navigation/search_rotate.py"], sourceUrl: "", demos: []
    },
    {
      id: "wall-follow-skill",
      title: "Follow Wall",
      type: "Subroutine",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["wall-following", "distance-angle-control"],
      tags: ["Navigation", "Wall Geometry", "Feedback"],
      status: "Needs integration review",
      summary: "Travel alongside an arena wall using measured wall geometry and lateral correction.",
      image: "assets/images/wall-follow-cover.svg",
      objective: "Preserve a safe and stable relationship to a wall when an AprilTag approach is too side-on.",
      implementation: "FollowWall receives estimated wall geometry from its caller. A wall-follow controller produces a velocity command; missing usable geometry causes a stop. ReturnToBase determines when to enter or leave wall following.",
      changes: "The latest return supervisor latches the initial side distance as the wall-follow setpoint and uses a camera-edge event from the final guide as one terminal signal.",
      lessons: "Control geometry and mission completion should remain separate responsibilities.",
      testing: "An available FollowWall source snapshot references localisation and io in start() without listing them as parameters. Reconcile this interface before claiming a successful end-to-end integration.",
      next: "Fix or reconcile the start interface and log range, heading and terminal-hand-off behaviour.",
      codeFiles: ["skills/navigation/follow_wall.py", "navigation/wall_following/wall_follower.py"], sourceUrl: "", demos: []
    },
    {
      id: "local-avoidance-skill",
      title: "Local Obstacle Avoidance",
      type: "Subroutine",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["local-obstacle-avoidance", "coordinate-transformations"],
      tags: ["Obstacle Detection", "Navigation", "Recovery"],
      status: "Write-up in progress",
      summary: "Temporarily take over motion when detected objects block the nominal route.",
      image: "assets/images/local-avoidance-cover.svg",
      objective: "Navigate around obstacles without permanently discarding the intended direction of travel.",
      implementation: "The ReturnToBase supervisor checks a local obstacle corridor, transfers control to LocalAvoidance and then tries to rejoin a visible tag route or realign with the previous route direction.",
      changes: "Introduced a supervisory takeover rather than forcing the visual guidance controller to solve obstacle clearance itself.",
      lessons: "Nominal navigation and local safety may require different control objectives; route recovery is as important as bypassing the immediate obstacle.",
      testing: "The exact FTG or DWA algorithms used internally should be verified from the avoidance source before linking them as implemented methods.",
      next: "Document the planner implementation, inputs and comparative simulation/physical tests.",
      codeFiles: ["skills/navigation/local_avoidance.py", "perception/providers/local_obstacle_field.py"], sourceUrl: "", demos: []
    },
    {
      id: "perception-system",
      title: "Visual Perception Pipeline",
      type: "System",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["apriltag-pose", "coordinate-transformations"],
      tags: ["Vision", "AprilTags", "Perception"],
      status: "Write-up in progress",
      summary: "Turn camera observations into measurements and identified targets for navigation behaviours.",
      image: "assets/images/perception-cover.svg",
      objective: "Provide the position and identity of visible arena markers or objects in well-defined coordinates.",
      implementation: "ReturnToBase receives arena observations, object observations, timestamps and a localised robot pose. The full perception pipeline and camera processing belong in their dedicated source modules.",
      changes: "Add details of camera and observation-model revisions.",
      lessons: "Timestamp freshness and the distinction between camera and robot coordinate frames are critical to reliable feedback.",
      testing: "Add detection accuracy, field-of-view and latency comparisons from dated tests.",
      next: "Add a perception data-flow diagram and tested video examples.",
      codeFiles: ["perception/", "vision/"], sourceUrl: "", demos: []
    },
    {
      id: "localisation-system",
      title: "Robot Localisation",
      type: "System",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["odometry", "coordinate-transformations", "dead-reckoning"],
      tags: ["Pose", "Coordinate Frames", "Navigation"],
      status: "Write-up in progress",
      summary: "Represent robot pose and use localisation to support route recovery and home-base decisions.",
      image: "assets/images/localisation-cover.svg",
      objective: "Maintain a useful estimate of where the robot is and the direction it faces.",
      implementation: "ReturnToBase consumes localisation.pose and a HomeBase evaluator; robot heading is used to realign with known arena-tag route segments. Specific estimator and odometry details should be added from their implementation.",
      changes: "Document which observations improved pose accuracy and where confidence was insufficient.",
      lessons: "Heading validity and position validity may differ; decisions should explicitly check the particular quantity they require.",
      testing: "Add accuracy, drift and recovery results, with test conditions.",
      next: "Link the estimator implementation and confidence tests.",
      codeFiles: ["localisation/", "skills/perception/home_base.py"], sourceUrl: "", demos: []
    },
    {
      id: "motion-control",
      title: "Motion & Command Control",
      type: "System",
      robotIds: ["autonomous-mobile-robot"],
      algorithmIds: ["pid", "distance-angle-control", "motion-profiles"],
      tags: ["Velocity", "Control", "Interfaces"],
      status: "Write-up in progress",
      summary: "Convert motion objectives from navigation skills into robot velocity and actuator commands.",
      image: "assets/images/motion-control-cover.svg",
      objective: "Keep control mathematics separate from hardware motor commands and navigation decisions.",
      implementation: "ReturnToBaseServo uses DistanceAngleController and a velocity backend. FollowWall also emits velocity commands through a backend. The larger motion-command architecture should be described independently from these callers.",
      changes: "Document the transition from timed commands to reusable controlled-motion interfaces.",
      lessons: "A shared command interface makes controller comparisons and simulation-to-robot portability easier.",
      testing: "Add motor and velocity calibration, step-response data and safety checks.",
      next: "Clarify which motion profiles are actually used before calling them implemented.",
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
    },
    {
      id: "apriltag-routing", title: "AprilTag Route Selection", shortName: "Tag Route Selection", group: "Vision & localisation",
      summary: "Choose from ordered arena guide markers to steer a robot along a return route.",
      overview: "Choose from ordered arena guide markers to steer a robot along a return route.",
      method: "Use marker IDs and a configured route to choose the most advanced eligible visible guide, then advance the route when the next marker is usable.",
      considerations: "Visibility and route geometry can change; the final tag may need a different controller from intermediate navigation guides.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "apriltag-pose", title: "AprilTag Pose Estimation", shortName: "AprilTag Pose", group: "Vision & localisation",
      summary: "Estimate camera-relative position and orientation from a known square marker.",
      overview: "Estimate camera-relative position and orientation from a known square marker.",
      method: "Detect tag corners, apply camera calibration and solve for a relative pose; transform into the robot frame as needed.",
      considerations: "Pose error depends on calibration, corner detection, range, viewing angle and marker geometry.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "distance-angle-control", title: "Distance–Angle Feedback Control", shortName: "Distance–Angle", group: "Feedback control",
      summary: "Turn a distance error and a steering-angle error into commanded motion.",
      overview: "Turn a distance error and a steering-angle error into commanded motion.",
      method: "Measure target range and relative bearing; apply control gains and speed limits to output linear/angular velocity.",
      considerations: "Saturation, target loss, noise and inconsistent control update timing can affect stability.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "local-obstacle-avoidance", title: "Local Obstacle Avoidance", shortName: "Obstacle Avoidance", group: "Navigation",
      summary: "Change local motion when objects obstruct a preferred direction.",
      overview: "Change local motion when objects obstruct a preferred direction.",
      method: "Represent nearby obstacles and nominal direction, assess free corridors and choose a safe local motion; resume the original route afterward.",
      considerations: "Different planners handle clutter, narrow gaps and dynamic obstacles differently. Check the concrete method before attributing FTG or DWA.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "ftg", title: "FTG — Follow the Gap", shortName: "FTG", group: "Navigation",
      summary: "Steer through a suitable obstacle-free opening in a local scan or obstacle field.",
      overview: "Steer through a suitable obstacle-free opening in a local scan or obstacle field.",
      method: "Find free-space gaps in angular sectors and choose a feasible heading that balances clearance and progress.",
      considerations: "Sparse or noisy measurements can produce unstable or unsafe gaps; robot footprint must be included.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "dwa", title: "DWA — Dynamic Window Approach", shortName: "DWA", group: "Navigation",
      summary: "Evaluate short candidate velocity commands against obstacles and motion constraints.",
      overview: "Evaluate short candidate velocity commands against obstacles and motion constraints.",
      method: "Sample feasible velocities, predict short trajectories and score them against clearance, progress and speed.",
      considerations: "Relies on motion modelling and local obstacle data; may become trapped in local minima.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "wall-following", title: "Wall Following", shortName: "Wall Follow", group: "Navigation",
      summary: "Travel alongside a wall at a preferred side distance and heading.",
      overview: "Travel alongside a wall at a preferred side distance and heading.",
      method: "Estimate wall distance and optionally wall heading; generate steering correction while maintaining forward motion.",
      considerations: "Corners, missing measurements, wall seams and drifting orientation need explicit handling.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "smooth-control-law", title: "Smooth Control Law", shortName: "Smooth Control", group: "Feedback control",
      summary: "Generate a continuously varying corrective motion toward a target.",
      overview: "Generate a continuously varying corrective motion toward a target.",
      method: "Use bearing and distance errors to calculate smooth speed/turn commands with saturation or slowing regions.",
      considerations: "Parameter tuning, delayed observations and target visibility constrain performance.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "odometry", title: "Wheel Odometry", shortName: "Odometry", group: "Localisation",
      summary: "Estimate changes in robot pose from wheel motion.",
      overview: "Estimate changes in robot pose from wheel motion.",
      method: "Convert wheel encoder measurements to linear and angular displacement using the robot kinematic model.",
      considerations: "Slip, unequal wheel size and encoder error accumulate over time.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "dead-reckoning", title: "Dead Reckoning & Open-Loop Motion", shortName: "Dead Reckoning", group: "Localisation",
      summary: "Estimate or execute movement without absolute visual position corrections.",
      overview: "Estimate or execute movement without absolute visual position corrections.",
      method: "Propagate motion estimates from commanded velocity, time or wheel displacement; compare against feedback-based control.",
      considerations: "Errors accumulate; a fixed-distance placeholder is not evidence of an accurately calibrated return.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "coordinate-transformations", title: "Coordinate Frames & Transformations", shortName: "Frames", group: "Robotics mathematics",
      summary: "Convert target and robot measurements between camera, body and arena coordinate frames.",
      overview: "Convert target and robot measurements between camera, body and arena coordinate frames.",
      method: "Define frame origins and axis directions, then apply rotations and translations consistently.",
      considerations: "Axis-sign mistakes and origin misplacement can produce large bearing or position errors.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "a-star", title: "A* Path Planning", shortName: "A*", group: "Planning",
      summary: "Find a graph or grid route using cost-so-far plus a heuristic estimate.",
      overview: "Find a graph or grid route using cost-so-far plus a heuristic estimate.",
      method: "Expand low-cost candidate nodes while tracking the predecessor path; reconstruct a route to the goal.",
      considerations: "Depends on map quality and resolution; planned paths may need smoothing and collision margins.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "slam", title: "SLAM — Simultaneous Localisation and Mapping", shortName: "SLAM", group: "Localisation",
      summary: "Estimate robot pose while constructing or updating a map.",
      overview: "Estimate robot pose while constructing or updating a map.",
      method: "Combine successive motion estimates with landmark or sensor observations to constrain pose and map error.",
      considerations: "Requires suitable sensors and computation; map/pose uncertainty can remain significant.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "motion-profiles", title: "Motion Profiles", shortName: "Profiles", group: "Motion control",
      summary: "Constrain acceleration and speed to make transitions smoother and more repeatable.",
      overview: "Constrain acceleration and speed to make transitions smoother and more repeatable.",
      method: "Plan a velocity or position trajectory with acceleration limits, such as trapezoidal motion.",
      considerations: "Requires appropriate limits and correct timing; not every motor controller uses an explicit profile.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    },
    {
      id: "visual-target-tracking", title: "Visual Target Tracking", shortName: "Tracking", group: "Vision & localisation",
      summary: "Maintain correspondence to an object or marker across camera frames.",
      overview: "Maintain correspondence to an object or marker across camera frames.",
      method: "Identify observations by target identity and compare timestamped positions or features as frames arrive.",
      considerations: "Occlusion, similar-looking targets and stale frames can cause mistaken control commands.",
      implementation: "See linked software entries for examples where the method is documented. Other descriptions are background study material, not claims of implementation.",
      sourceUrl: "", demos: []
    }
  ],

  /* Duplicate a project object to add another project. Each id must be unique. */
  projects: [
    {
      id: "autonomous-mobile-robot",                  // URL: project.html?id=autonomous-mobile-robot
      title: "Autonomous Mobile Robot",
      category: "robotics",                          // robotics | cad | fabrication | electronics
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
      title: "Pulleys",
      category: "fabrication",
      image: "assets/images/Pulley.png",
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
        results: "assets/images/IMG_2788 3d print pulley.jpg",
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
      image: "assets/images/cad.webp",
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
      id: "fabrication-project-3",
      title: "FlySky Receiver Mount",
      category: "fabrication",
      image: "assets/images/FlySky Receiver.png",
      imageAlt: "3D-printing example image — replace with the second fabrication project",
      summary: "FlySky Receiver mount with a slot for the antenna",
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
      id: "fabrication-project-4",
      title: "PiCam3 Mount 8 Degrees",
      category: "fabrication",
      image: "assets/images/PICam3 Mount 8 degree.png",
      imageAlt: "3D-printing example image — replace with the second fabrication project",
      summary: "PiCam3 Mount with an 8 degree downward pitch.",
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
      id: "fabrication-project-5",
      title: "RoboClaw 2x30",
      category: "fabrication",
      image: "assets/images/RoboClaw 2x30.png",
      imageAlt: "3D-printing example image — replace with the second fabrication project",
      summary: "RoboClaw 2x30A motor controller mount",
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
    }
  ]
};
