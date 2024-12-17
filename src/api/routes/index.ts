import { Router } from "express";
import { getProjects } from "../controller/getProjects";
import { addViews } from "../controller/addViews";


const router = Router();


router.get('/projects', getProjects);
router.get('/add-views/:id', addViews);



export default router;