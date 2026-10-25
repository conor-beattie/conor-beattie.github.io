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

  7. For 3D prints: keep `image` as the CAD render and list 1–4 real print photos
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
      image: "assets/images/gripper_bobbot.png"
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
      image: "assets/diagrams/bobbot-return-to-base.svg"
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
      title: "Bobbot - Autonomous Mobile Robot",
      category: "robotics",                          // robotics | cad | fabrication | electronics
      image: "assets/images/IMG_2627 Bobbot.jpg",
      imageAlt: "Illustrative wheeled robot photograph",
      summary: "An experimental autonomous robot designed to grow and expand in capability and function.",
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
      image: "assets/images/gripper_bobbot.png",
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
        results: "",
        lessons: "Summarise what worked in manufacturing and what you would change."
      },
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
      relatedProjectIds: ["robot-io-mapping"],
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
        architecture: "The system has two levels of control. The Raspberry Pi is responsible for interpreting sensor information, planning behaviour and producing autonomous motion commands. The Arduino Mega provides the low-level connection to the physical robot: it reads relevant inputs, counts encoder pulses and interfaces with motor drivers, servos and other peripherals. Commands and feedback pass between these levels as required by the robot’s operating mode.\n\nManual operation is also handled at the Mega level through the radio-control receiver. This keeps TeleOp separate from the Pi’s higher-level navigation software. The architecture is reusable: robots can share the controller layout without sharing exactly the same set of attached devices.",
        hardware: "The wiring diagram identifies the Mega’s pin assignments and the connections available at the panel and field interfaces. It includes 5 V and ground distribution, a regulated power input, motor-driver and servo outputs, and connections for quadrature encoders and other feedback devices.\n\nThe drawing also allocates interfaces for switches, range sensors, inertial sensing, the radio receiver and auxiliary devices. These are provisions in the wiring design, not a claim that every peripheral is fitted to every robot. Devices are connected only when that robot needs them. Clear connector names and a shared pin map are intended to make assembly, troubleshooting and later modifications easier.",
        construction: "The design begins with a complete connection diagram rather than wiring each robot independently. The Arduino Mega forms the centre of the layout, with labelled groups of inputs and outputs and separate panel-to-field connections for external devices. Power and ground distribution are shown alongside the signal wiring so that each subsystem has an identifiable supply and return path.\n\nFor a particular robot, the required connectors and cables are selected from this common arrangement. For example, a robot with wheel encoders can use the assigned encoder inputs, while a robot without that feedback can leave them unused. This approach reduces repeated wiring decisions and makes it easier to transfer a sensor or mechanism between platforms. The diagram documents the electrical layout; physical harness construction and verification can be recorded separately as they are completed.",
        software: "The Mega firmware has a deliberately limited remit. It reads teleoperation input from the radio receiver, counts encoder transitions and manages the low-level interfaces needed to operate the connected hardware. This includes the pathways for motor-driver commands, servo control and sensor signals shown in the wiring diagram.\n\nMore demanding algorithms belong on the Raspberry Pi. Vision processing, localisation, route selection and autonomous robot behaviour are kept outside the Mega firmware. The Pi can use the low-level inputs and outputs provided by the Mega without duplicating the pin-level hardware logic. Keeping the responsibilities separate also makes it possible to diagnose a wiring or encoder issue independently of a navigation algorithm.",
        testing: "Verification is best carried out in stages. Start with the power rails and connector pinouts, checking voltage levels, common grounds and correct polarity before connecting motors or sensitive sensors. Then test each used I/O channel individually: switches, servos, motor outputs, sensor readings and the direction and consistency of encoder counts.\n\nTeleOp testing should confirm channel mapping, response to operator inputs and behaviour if the radio signal is lost. With the Raspberry Pi connected, additional checks should cover command handling, feedback timing and transitions between manual and autonomous control. The schematic establishes the interface design; quantitative results such as encoder count reliability or control latency have not yet been recorded on this page.",
        iterations: "A central design decision was to avoid making the Mega responsible for vision or navigation simply because it is connected to the actuators. Restricting its role to TeleOp, encoder counting and hardware I/O makes the software easier to reuse and keeps high-level development on the Raspberry Pi.\n\nThe other important decision is to standardise connections rather than hard-wire every possible sensor into a robot. Future revisions can improve connector labelling, cable routing, electrical protection and fault handling without changing the overall separation of responsibilities. Any actual wiring or firmware revisions can be documented here as they are tested.",
        results: "The current documented output is a consolidated Arduino Mega wiring diagram and I/O allocation covering power distribution, external connectors, manual-control input, encoders and multiple kinds of robot peripherals. It provides a repeatable starting point for configuring the electrical interface of more than one robot.\n\nThe defined control split is that the Mega handles TeleOp and encoder counting while the Raspberry Pi performs high-level control. This page describes that architecture and the interfaces available; it does not yet present measured performance, completed qualification tests or a claim that every connection in the diagram has been populated.",
        lessons: "A modular robot controller is as much about defining responsibilities and connections as it is about choosing the microcontroller. Separating low-level I/O from higher-level autonomy makes the design easier to understand, test and transfer to another platform.\n\nConsistent signal names, connector pinouts and power distribution are particularly valuable when the robot changes but the controller does not. The next useful evidence will be repeatable encoder, TeleOp and power-system tests that show how reliably the reusable design operates on different robots.",
        objectives: "Provide one reusable set of controller connections for multiple robots, with stable power and signal interfaces, radio TeleOp, encoder counting and selective connection of robot-specific peripherals.",
        design: "Separate low-level Arduino Mega I/O and manual control from Raspberry Pi autonomy. Document connectors, pin allocation and power distribution in a common wiring diagram."
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "robot-io-mapping",
      title: "Robot I/O Mapping & Hardware Abstraction",
      category: "electronics",
      image: "assets/images/arduino mega.jpg",
      imageAlt: "Arduino Mega wiring and pin allocation diagram associated with the robot I/O mapping",
      imageCaption: "The common Arduino Mega wiring plan provides the physical connection reference for the I/O mapping.",
      summary: "A common device map connecting Raspberry Pi software to robot-specific sensors, motors, encoders and Arduino commands without embedding hardware pin numbers in high-level programs.",
      tags: ["Hardware Abstraction", "I/O Mapping", "Python", "Arduino Serial"],
      date: "",
      relatedProjectIds: ["robot-control-electronics"],
      sectionLabels: {
        architecture: "System architecture",
        hardware: "Device naming & interfaces",
        construction: "Developing the I/O map",
        software: "Software & serial protocol",
        testing: "Verification approach",
        iterations: "Design decisions & refinements",
        results: "Current outcome"
      },
      sections: {
        overview: "The robot I/O map connects the higher-level Raspberry Pi software to the equipment installed on a particular robot. Instead of programming directly against Arduino pin numbers, software refers to named devices such as drive_front_left, gripper and battery. A backend then translates each operation into the appropriate hardware request.\n\nThe design is documented in a larger interface matrix that records device names, available properties, Pi-side calls, serial messages, firmware definitions and physical connections. The table shown here is a small representative extract, not a copy of the complete working database. This project concerns the interface design; the companion Modular Robot I/O & TeleOp Controller project documents the electrical hardware.",
        architecture: "Robot behaviours and control algorithms run on the Raspberry Pi and use a common set of named I/O operations. For an Arduino-connected device, the Pi backend converts the requested operation into a serial message, and the Mega handles the corresponding low-level input or output. Feedback is returned in a defined format for the Pi to interpret.\n\nNot every device passes through the Mega. The front camera is read directly by the Pi, while the Mega also supports its own radio-controlled TeleOp path. Separating these cases keeps the high-level robot code independent of which board physically handles a device.",
        hardware: "Each mapping identifies what the device does, its logical software name, the board responsible and the electrical interface. The shared definition includes digital and analogue inputs, motor-driver commands, servo outputs, quadrature encoders, I²C devices and direct Pi peripherals.\n\nThe table below deliberately shows just one example for each main interface type. The complete mapping retains the individual pin assignments, signal names, firmware hooks and alternative backends needed for implementation and troubleshooting.",
        construction: "The mapping was developed as an interface specification rather than a new circuit board. Each device is recorded against a common name and operation, then linked to its serial request and response (where needed), backend handler and Arduino pin assignment. Related properties are grouped under one device: an encoder, for example, can supply count, timestamp and validity information without becoming three separate physical devices.\n\nThe same approach can be applied to additional robot platforms by changing the configuration or hardware backend while retaining the software-facing device names. Physical wiring and connector details remain with the companion Mega controller design.",
        software: "For example, Pi software can request io.encoder[\"drive_front_left\"].count. The mapping associates this with ENCODER drive_front_left READ; the Mega reads the quadrature encoder connected to pins 22 and 24 and returns a count with timing and validity fields. The navigation code need not know those pin numbers.\n\nFor an output, io.motor[\"collector\"].power corresponds to MOTOR collector WRITE power=<value>. The backend routes the command to the Mega, whose mapping allocates PWM and direction signals to pins 4 and 41. Direct Pi devices, such as the front camera, bypass the Arduino serial interface.\n\nThe defined message formats and backend calls are an interface contract. The working table includes planned, existing and legacy entries, so defining an operation does not by itself establish that it has been fully implemented and tested.",
        testing: "Each mapping needs three levels of verification: first, confirm the logical name and requested operation map to the intended backend; second, test serial request/response parsing, timing and error handling; and third, test the connected device on the physical robot. Encoder tests should check count direction, timestamps and invalid readings. Motor and servo tests should check command range, direction and safe response to communication loss.\n\nA further regression test is to run the same high-level operation against different supported backends and confirm that the software-facing behaviour remains consistent. No measured test results or completed verification coverage are claimed here.",
        iterations: "The important refinement is to map physical devices rather than create a separate hardware interface for every reported property. This reduces duplicate definitions and makes the relationship between a device, its readings and its pin allocation easier to maintain.\n\nThe original matrix also records alternate hardware and previous API calls. Those columns are useful for development and migration but are intentionally omitted from the public-facing summary. Interface names, command definitions and firmware mappings can evolve without changing the purpose of the common I/O layer.",
        results: "The current output is a structured I/O specification spanning Pi-side names, Arduino serial requests and responses, hardware backends and physical pin mappings. It provides a consistent design reference for integrating sensors, actuators and multiple robot configurations.\n\nThe simplified table illustrates this architecture; it is not a certification that every listed connection or firmware function has been completed or tested.",
        lessons: "Separating a device's logical identity from its electrical connection makes the system easier to extend, debug and transfer to a new robot. A stable interface also helps isolate failures: software naming, serial transport, firmware handling and wiring can be checked as distinct layers.\n\nThe central lesson is that a useful hardware abstraction is not merely a list of pins. It is an agreed contract between higher-level software and the electronics that carry out its requests."
      },
      ioMap: {
        intro: "Representative mappings from the engineering I/O matrix. Multiple readings from one device are combined into a single row.",
        columns: ["Device / function", "Pi software interface", "Handled by", "Physical connection"],
        rows: [
          ["Front camera", "camera[\"front\"].see()", "Raspberry Pi", "Camera interface; no Mega request"],
          ["Left drive encoder", "encoder[\"drive_front_left\"].count", "Arduino Mega", "Quadrature input · D22 / D24"],
          ["Front drive motors", "drive[\"front\"].set_power(left, right)", "Mega → RoboClaw", "Serial motor driver · D18 / D19"],
          ["Collector motor", "motor[\"collector\"].power", "Arduino Mega", "PWM / direction · D4 / D41"],
          ["Gripper servo", "servo[\"gripper\"].position", "Arduino Mega", "Two servo outputs · D11 / D13"],
          ["Left reflectance sensor", "reflectance[\"left\"]", "Arduino Mega", "Analogue input · A5"],
          ["IMU heading", "imu[\"main\"].heading", "Arduino Mega", "I²C · SDA20 / SCL21"],
          ["Battery voltage", "voltage[\"battery\"].volts", "Arduino Mega", "Analogue input · A0"],
          ["Pi / Mega selector", "selector[\"pi_arduino\"]", "Arduino Mega", "Digital input · D32"]
        ],
        note: "These are documented allocations, not verification results. The master I/O matrix also defines protocol responses, pin symbols, additional peripherals and alternate hardware backends."
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "robotics-project-2",
      title: "Robbot - Autonomous Mobile Robot",
      category: "robotics",
      image: "assets/images/IMG_2756_robbot.jpg",
      imageAlt: "Robot project photo — replace or update caption",
      summary: "Robbot is Bobbot on a budget.  Where Bobbot doesn’t set a specific price on utility Robbot is designed to extract as much of Bobbot’s functionality and performance as possible without the cost",
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
      title: "Shooter",
      category: "cad",
      image: "assets/images/Shooter CAD.png",
      imageAlt: "CAD illustration — replace with the second design project",
      summary: "Shooter design for FTC BioBuzz Pollen.",
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
      title: "Rubber Band Intake Wheel",
      category: "fabrication",
      image: "assets/images/rubber_band_wheel.png",
      imageAlt: "3D-printing example image — replace with the second fabrication project",
      summary: "Circumference adjustable with a 8mm hex axle",
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
