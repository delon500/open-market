import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
    res.json({
        ok: true,
        message: "Open Market API",
    });
});

export default router;