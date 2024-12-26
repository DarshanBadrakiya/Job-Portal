import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteJob, getAdminJobs, getAllJob, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);

router.route("/get").get(getAllJob);

router.route("/getadminjob").get(isAuthenticated,getAdminJobs);

router.route("/get/:id").get(getJobById);


export default router;
