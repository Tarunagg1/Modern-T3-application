import { isAuthenticated } from '../middleware';
import { deleteUsers, getAllAPIUsers, updateUsers } from '../controller/users';
import express from 'express';

export default (router: express.Router) => {
      router.get("/users", isAuthenticated, getAllAPIUsers);
      router.delete("/users/:id", isAuthenticated, deleteUsers);
      router.patch("/users/:id", isAuthenticated, updateUsers);
    // router.post("/auth/login", () => { });
}