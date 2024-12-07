import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteJob, getAdminJobs, getAllJob, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);

router.route("/get").get(isAuthenticated,getAllJob);

router.route("/getadminjob").get(isAuthenticated,getAdminJobs);

router.route("/get/:id").get(isAuthenticated,getJobById);


export default router;