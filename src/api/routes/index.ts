import { Router } from "express";
import { getProjects } from "../controller/getProjects";
import { addViews } from "../controller/addViews";
import { getTotalProjects } from "../controller/getTotalProjects";
import { getSkills } from "../controller/getSkills";


const router = Router();

router.get('/projects', getProjects);
router.get('/skills', getSkills);
router.get('/add-views/:id', addViews);
router.get('/total-projects', getTotalProjects);



export default router;
