import { Router } from "express";
import { getProjects } from "../controller/getProjects";
import { addViews } from "../controller/addViews";
import { getTotalProjects } from "../controller/getTotalProjects";


const router = Router();


router.get('/projects', getProjects);
router.get('/add-views/:id', addViews);
router.get('/total-projects', getTotalProjects);



export default router;