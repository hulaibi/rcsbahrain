import { Router, Request, Response } from "express";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware";
import { prisma } from "../lib/prisma";

const router = Router();

// Protected: All authenticated users can access
router.get("/me", authMiddleware, (req: Request, res: Response) => {
  res.json({
    message: "User data",
    user: req.user,
  });
});

// Protected: Admin only - List all users
router.get(
  "/users",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          fullName: true,
          isActive: true,
          createdAt: true,
          role: { select: { name: true } },
        },
      });
      res.json({ users });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }
);

// Protected: Admin only - Deactivate user
router.patch(
  "/users/:userId/deactivate",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;

      const user = await prisma.user.update({
        where: { id: userId },
        data: { isActive: false },
        include: { role: true },
      });

      res.json({
        message: "User deactivated successfully",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          isActive: user.isActive,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to deactivate user" });
    }
  }
);

// Protected: Admin only - Assign role to user
router.patch(
  "/users/:userId/role",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const { roleName } = req.body;

      if (!roleName) {
        res.status(400).json({ error: "Role name is required" });
        return;
      }

      const role = await prisma.role.findUnique({
        where: { name: roleName },
      });

      if (!role) {
        res.status(404).json({ error: "Role not found" });
        return;
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data: { roleId: role.id },
        include: { role: true },
      });

      res.json({
        message: "User role updated successfully",
        user: {
          id: user.id,
          email: user.email,
          role: user.role.name,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user role" });
    }
  }
);

export default router;
