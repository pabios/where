import { Router } from "express";
import HomeController from "../controllers/homeController.js";
import { getUserById, login, randomUser, users, editProfil, deleteUser,  create,nbUser,getCategories,addToFavorite} from '../controllers/userController.js';
import {posts, addPost, likePost, editPost,getPost,deletePost} from '../controllers/postController.js';
import { authGuard } from '../middlewares/AuthGuard.js';
import {addCategory,getAllCategory} from "../controllers/categoryController.js";
import {getAllRegion, readRegionsData,getAll} from "../controllers/regionController.js";

const router = Router();


/**
 *  REGION
 */

router.get("/api/gn/regions", async (req, res) => {
    try {
        const data = await getAll();
        res.json(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des données.' });
    }
});

/************************************************ NE PAS TOUCHER *****************************************/
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


router.get("/categories",getCategories); //  debutant/intermediare

router.post("/login", login);
router.post("/admin/add", create) // authGuard

router.put('/user/:id', authGuard, editProfil)

router.delete("/admin/delete/:id",authGuard, deleteUser)

**
 * POSTS
 *
router.get("/posts", posts);
router.get('/posts/:id', getPost)

router.get("/posts/like/:id", likePost);

router.post("/posts/add", addPost);

router.put('/posts/:id', editPost);

router.delete("/posts/delete/:id", deletePost)

/**
 * CATEGORY
 * Front/Back || Dakar,Conackry
 *
router.get("/category", getAllCategory);
router.post("/posts/category/add", addCategory);
*/
/************************************************ NE PAS TOUCHER *****************************************/







export default router;
