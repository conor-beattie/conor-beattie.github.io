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
  // OPTIONAL HOMEPAGE SELECTION:
  // Add featuredOrder: 1, (or 2, 3, ...) to a project or software entry to
  // display it in Selected Projects. Smaller numbers appear first.
  // If featuredOrder is missing, the entry is NOT selected; it still appears
  // on its normal category/software page. Use unique positive whole numbers.
  software: [
    {
      id: "return-to-base",
      featuredOrder: 4,
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
      id: "autonomous-mobile-robot",
      featuredOrder: 1,                  // URL: project.html?id=autonomous-mobile-robot
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
      featuredOrder: 6,
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
      featuredOrder: 7,
      title: "Pulley",
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
      featuredOrder: 2,
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
      featuredOrder: 5,
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
        architecture: "High-level navigation and control code calls io.* methods and properties. A hardware-specific backend translates those requests into the appropriate device operation and converts the response into the expected data type. The rest of the software does not need to know whether a sensor reading came from the Arduino Mega over serial or was handled directly by the Raspberry Pi.\n\nThe Arduino Mega remains responsible for low-level hardware access, encoder counting and manual TeleOp, while the Pi handles higher-level autonomous processing. The io.* boundary is the software contract between these responsibilities, not a pin-allocation table.",
        hardware: "The interface groups devices by function, using named collections such as io.motor, io.encoder, io.camera, io.servo and io.imu. Each entry exposes the operations that make sense for that device. A motor has a commanded power value; an encoder returns counts and associated validity information; a camera exposes image-processing operations.\n\nThe table above is a simplified selection from the larger interface specification. It deliberately omits controller pins, wiring, firmware constants and legacy APIs: those are implementation details behind the interface. A defined interface does not by itself mean that every device or backend has been implemented and tested.",
        construction: "The starting point was a detailed device matrix recording each logical device, its exposed io.* properties and operations, the matching backend method and, where relevant, the Arduino serial request and response. Related properties are grouped under the same logical device instead of being treated as separate items of hardware.\n\nThe public-facing version reduces this to three questions: what device is being accessed, what io.* command does the software use, and what does that operation mean? The complete working matrix remains the detailed engineering reference for implementation and migration.",
        software: "A navigation program can read io.encoder[\"drive_front_left\"].count without referencing the encoder connection or controller firmware. The backend can translate this into a semantic request such as ENCODER drive_front_left READ and return a count with timestamp and validity information. Similarly, setting io.motor[\"collector\"].power can become MOTOR collector WRITE power=<value> on an Arduino-based robot.\n\nOther interfaces can be handled by different backends. For example, io.camera[\"front\"].see(frame=None) is resolved by the Pi camera backend without going through the Arduino serial protocol. The important invariant is the io.* call used by robot software; the implementation beneath it can change.",
        testing: "The interface should be verified at the software boundary first: check that an io.* call reaches the intended backend, accepts the expected inputs and returns the promised values or errors. Then test the backend and transport separately, including invalid responses, lost communication and device absence. Finally verify the behaviour on real robot hardware.\n\nA useful portability test is to run the same high-level command against two different supported backends, including simulation where available, and compare the results. This page documents the interface design; it does not claim complete implementation or measured verification of every entry.",
        iterations: "The central decision is to make io.* a stable boundary rather than expose Arduino pin numbers, library calls or serial message syntax to navigation code. This permits changes to motor drivers, encoders or controllers without rewriting every behaviour that uses them.\n\nThe matrix also distinguishes a physical device from its multiple readings: an encoder may have count, timestamp and validity properties, but remains one logical encoder. Additional platforms can be supported by new backend adapters while preserving the software-facing names and expected behaviour.",
        results: "The current output is a defined common I/O vocabulary covering motion, sensors, localisation inputs, servo mechanisms and direct Pi devices, with corresponding backend mappings and message contracts in the full engineering matrix. The simplified table displayed as this project's main image communicates the io.* layer rather than any particular wiring design.\n\nThis is an interface specification and reusable design approach. The existence of an entry is not evidence that every associated implementation is complete or performance-tested.",
        lessons: "The most useful boundary in a reusable robot system is between what the software asks the robot to do and how a particular controller accomplishes it. Device names and operation semantics should remain meaningful when the physical robot changes.\n\nSeparating the io.* contract from backends, communications and electrical wiring makes failures easier to isolate and new platforms easier to integrate."
      },
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
      featuredOrder: 3,
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
        architecture: "A nominal 12 V NiMH battery supplies the robot through a main fuse and on/off switch to an eight-channel power distribution board. From there the diagram identifies branches for motor controllers, regulated low-voltage supplies and additional mechanisms.\n\nThe drive system uses a RoboClaw motor controller for the front motors. A second controller and rear motors are shown as possible future additions. Separate supply paths are identified for the Raspberry Pi and other logic devices, and for the servo distribution board. The diagram also shows a USB hub linking supporting devices such as cameras and microcontrollers to the Pi.",
        hardware: "The drawing identifies a 20 A main fuse and individual protected supply branches. It shows a 5 V regulator for control electronics and a separate 6 V regulator for servo power, alongside common supply and ground buses and labelled connectors. These choices make the intended distribution and electrical loads easier to review before wiring.\n\nThe schematic also identifies a battery-voltage monitor, main connectors and a chassis bond. Fuse values, regulator capacities, return-current paths and conductor ratings still need to be checked against actual device specifications and worst-case loads before final installation; the diagram alone is not evidence of electrical validation.",
        construction: "The one-line diagram is an early system-level design document. Rather than show every wire and terminal, it records the functional power routes between major components. Each branch can then be developed into the detailed wiring diagram, connector list and physical harness needed for construction.\n\nDashed outlines and labels distinguish planned expansions from the core design, including additional drive motors, collector and shooter motors, an arm and further servos. That allows the electrical architecture to evolve without obscuring the current system.",
        software: "The Raspberry Pi remains responsible for higher-level tasks such as vision, navigation and autonomous control. The Arduino Mega provides low-level TeleOp, encoder counting and hardware interfacing, while motor drivers deliver power to the motors. The electrical diagram shows how those devices are powered and connected at system level; it does not describe their software protocol or pin-by-pin I/O mapping.\n\nThose details are covered in the related Modular Robot I/O & TeleOp Controller and Robot I/O Mapping & Hardware Abstraction projects.",
        testing: "The next stage is to verify the drawing against the actual system. Checks should include supply polarity, fuse and wire ratings, expected current draw, regulator output under load, grounding and voltage drops. Power branches should be commissioned independently before connecting the complete robot.\n\nBench checks should also establish that motor starts and servo movements do not disrupt the Pi or microcontroller supplies, and that any separate test-power arrangement cannot accidentally energise an unintended branch. These are planned verification steps; this page does not present measured results.",
        iterations: "The electrical system is divided into functional branches so that changes to one subsystem need not require a complete redesign. Separate regulated outputs distinguish logic power from servo power, and labelled connections are intended to simplify assembly and troubleshooting.\n\nThe drawing explicitly reserves space for future capabilities, but these additions are not treated as installed equipment. As the robot develops, the diagram can be updated to reflect actual components and revised current requirements.",
        results: "The present output is a one-line electrical diagram that brings the robot's power and control hardware into one coherent view. It documents the intended distribution architecture, identifies the major subsystems and provides a basis for more detailed wiring and electrical verification.\n\nThe design complements the Arduino Mega wiring plan and the io.* software interface: one describes electrical power flow, one defines the low-level connections and controller responsibilities, and one defines how higher-level software accesses robot hardware.",
        lessons: "A system-level electrical drawing makes dependencies and supply requirements visible before detailed wiring begins. Separating the power architecture from control wiring and from the software-facing I/O contract keeps each document focused and easier to maintain.\n\nThe design also highlights the importance of distinguishing future provisions from installed hardware and checking protection, power budgets and grounding with measurements rather than assuming a schematic is sufficient."
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
      id: "gobilda-decode-starter-bot",
      title: "goBILDA DECODE Starter Bot",
      category: "robotics",
      image: "assets/images/IMG_2734 goBilda Decode Starter Bot.jpg",
      imageAlt: "Photograph of the goBILDA DECODE starter robot during assembly, showing its metal chassis, wheels, motors, wiring and control hardware",
      imageCaption: "goBILDA DECODE Starter Bot — photographed during the build",
      summary: "An FTC-style starter robot assembled from goBILDA components, providing a practical platform for mechanical assembly, electrical integration and testing robot controls.",
      tags: ["Robotics", "goBILDA", "FTC", "Robot Assembly"],
      date: "",
      sections: {
        overview: "The goBILDA DECODE Starter Bot is a practical starting point for building and understanding an FTC-style robot. Rather than designing every component from scratch, the project uses a starter platform to concentrate on how the drivetrain, mechanical structure, electronics and wiring fit together. It also provides a baseline for evaluating changes and developing additional mechanisms.\n\nThe photograph records the robot during assembly, not a completed or performance-tested final design.",
        construction: "The chassis is built from modular metal structural components, with motors, wheels, electronic hardware and wiring mounted to the frame. Working with a modular construction system makes it possible to adjust component placement while checking physical clearances, accessibility and cable routing.\n\nThis part of the project focuses on careful mechanical assembly and integration. The starter-kit layout is a foundation; any custom parts or later modifications can be documented separately as they are made.",
        software: "The initial software task for a starter robot is reliable manual control: mapping driver inputs to movement, confirming motor directions and controlling the mechanisms fitted to the chassis. Establishing these behaviours provides a baseline before attempting more advanced automated functions.\n\nSpecific programmed features and autonomous routines will be described here when they have been implemented and tested.",
        testing: "Useful baseline tests include straight-line driving, turning response, repeatability of driver commands, mechanism operation and electrical reliability. These tests help distinguish limitations in the mechanical assembly from problems in wiring or software.\n\nNo measured driving or mechanism-performance results are reported on this page yet.",
        iterations: "Starting with a known kit design makes it easier to change one feature at a time and assess whether an adjustment improves the robot. Potential areas for development include cable organisation, access to components and the positioning of mechanisms. Any actual revisions will be recorded with photographs and test observations.",
        results: "The current photograph documents the physical starter-bot build. This project page will be expanded as control software, functional trials and any mechanical modifications are completed and recorded.",
        lessons: "A working robot depends on much more than choosing individual components. Mechanical access, cable routes, mounting positions and compatibility between the control hardware and drivetrain all affect how easily a platform can be built, maintained and developed."
      },
      links: { github: "", cad: "", video: "", downloads: "" }
    },
    {
      id: "cad-project-2",
      featuredOrder: 8,
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
      featuredOrder: 9,
      title: "Rubber Band Intake Wheel",
      category: "fabrication",
      image: "assets/images/rubber_band_wheel.png",
      imageAlt: "3D-printing example image — replace with the second fabrication project",
      summary: "The diameter and number of notches are adjustable. Designed for a 8mm hex axle.",
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
