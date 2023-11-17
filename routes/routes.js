import { Router } from "express";
import {getAll} from "../controllers/decoupagePaysController.js";

const router = Router();


/**
 * API REGION
 */
router.get("/api/gn/decoupage", getAll);




/************************************************ A NE PAS TOUCHER | OU LE FENIR*****************************************/
/**
 * Uers
 *
// GET
router.get("/", HomeController);
router.get("/users", users);
router.get("/user/:id", authGuard, getUserById);
router.get("/random-user", authGuard, randomUser);
router.get("/user-count", nbUser);
router.put('/user/favorite/:userId/:postId',addToFavorite)
 */








export default router;
