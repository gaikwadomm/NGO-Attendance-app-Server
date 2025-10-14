import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addClass,
  getClasses,
  updateClass,
  removeClass,
} from "../controllers/college/index.js";
import {
  addStudents,
  getStudents,
  updateSingleStudent,
  removeSingleStudent,
  getAllStudents,
  getRemovedStudents,
  recoverStudent,
  updateStudentClass,
} from "../controllers/class/index.js";
import { getAllColleges } from "../controllers/college/index.js";
import { getEventAttendanceForCollege } from "../controllers/attendence/index.js";

const router = Router();

router.route("/get-all-colleges").get(verifyJWT, getAllColleges);

// Class management
router.route("/classes").get(verifyJWT, getClasses).post(verifyJWT, addClass);

router
  .route("/classes/:classId")
  .put(verifyJWT, updateClass)
  .delete(verifyJWT, removeClass);

// Students management
router.route("/students").get(verifyJWT, getAllStudents);
router.route("/students/removed").get(verifyJWT, getRemovedStudents);
router.route("/students/recover/:studentId").patch(verifyJWT, recoverStudent);
router
  .route("/students/:studentId/class/:newClassId")
  .patch(verifyJWT, updateStudentClass);

router
  .route("/:classId/students")
  .get(verifyJWT, getStudents)
  .post(verifyJWT, addStudents);

router
  .route("/:classId/students/:studentId")
  .put(verifyJWT, updateSingleStudent)
  .delete(verifyJWT, removeSingleStudent);

// Attendance routes
router
  .route("/event/:eventId/attendance")
  .get(verifyJWT, getEventAttendanceForCollege);

export default router;
