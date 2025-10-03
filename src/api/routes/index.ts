import { Router } from "express";
import { addViews } from "../controller/addViews";
import { getProjects } from "../controller/getProjects";
import { getSkills } from "../controller/getSkills";
import { sync } from "../controller/sync";


const router = Router();

router.get('/projects', getProjects);
router.get('/skills', getSkills);
router.get('/add-views/:id', addViews);
router.get('/sync', sync);



export default router;
