import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import validatePostBody from "../middleware/validatePostBody.mjs";
import validatePostId from "../middleware/validatePostId.mjs";

const postRouter = Router()

postRouter.post("/",validatePostBody, async(req, res) => {
    const newPosts = req.body;
    try {
        await connectionPool.query(
            `insert into posts (title, image, category_id, description, content, status_id)
            values ($1, $2, $3, $4, $5, $6)`,
            [newPosts.title, newPosts.image, newPosts.category_id, newPosts.description, newPosts.content, newPosts.status_id]
        )
        return res.status(201).json({
            message: "Created post sucessfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server could not create post because database connection",
            error: error.message
        })
    }
})

postRouter.get("/:postId",validatePostId, async(req, res) => {
    const postId = req.params.postId
    try {
        const getPostById = await connectionPool.query(
            `select * from posts where id = $1`,[postId]
        )
        if (getPostById.rowCount === 0) {
            return res.status(404).json({
                message: "Server could not read post because post not found"
            })
        }
        return res.status(200).json({
            data: getPostById.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server could not read post because database connection"
        })
    }
})

postRouter.put("/:postId",[validatePostBody,validatePostId], async(req, res) => {
    const postId = req.params.postId
    const updatePosts = req.body
    try {
        await connectionPool.query(
            `update posts set title = $1, image = $2, category_id = $3, description = $4, content = $5, status_id = $6 where id = $7`,
            [updatePosts.title, updatePosts.image, updatePosts.category_id, updatePosts.description, updatePosts.content, updatePosts.status_id, postId]  
        )
        return res.status(200).json({
            message: "Updated post sucessfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server could not update post because database connection",
            error: error.message
        })
    }
})

postRouter.delete("/:postId",validatePostId, async(req, res) => {
    const postId = req.params.postId
    try {
        await connectionPool.query(
            `delete from posts where id = $1`,[postId]
        )
        return res.status(200).json({
            message: "Deleted post sucessfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server could not delete post because database connection",
            error: error.message
        })
    }
})

postRouter.get("/", async(req, res) => {
    try {
        const category = req.query.category || "";
        const keyword = req.query.keyword || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 6;

        const safePage = Math.max(1, page);
        const safeLimit = Math.max(1, Math.min(100, limit));
        const offset = (safePage - 1) * safeLimit;

        let query = 
            `select posts.id, posts.image,categories.name as category,
            posts.title, posts.description, posts.date, posts.content,
            statuses.status, posts.likes_count
            from posts
            inner join categories on posts.category_id = categories.id
            inner join statuses on posts.status_id = statuses.id`

        let values = [];
        if (category && keyword) {
            query += 
                ` where categories.name ilike $1 
                and (posts.title ilike $2 or posts.description ilike $2 or
                posts.content ilike $2)`;
            values = [`%${category}%`, `%${keyword}%`];
        } else if (category) {
            query += ` where categories.name ilike $1`;
            values = [`%${category}%`];
        } else if (keyword) {
            query += ` where (posts.title ilike $1 or posts.description ilike $1 or
            posts.content ilike $1)`;
            values = [`%${keyword}%`];
        }
        query += ` order by posts.date desc limit $${values.length + 1} offset $${values.length + 2}`;
        values.push(safeLimit, offset);

        const result = await connectionPool.query(query, values);
        let countQuery =
            `select count(*) from posts
            inner join categories on posts.category_id = categories.id
            inner join statuses on posts.status_id = statuses.id`;
        let countValues = values.slice(0,-2)

        if (category && keyword) {
            countQuery += 
                ` where categories.name ilike $1 
                and (posts.title ilike $2 or posts.description ilike $2 or
                posts.content ilike $2)`;
        } else if (category) {
            countQuery += ` where categories.name ilike $1`;
        } else if (keyword) {
            countQuery += 
                ` where (posts.title ilike $1 or posts.description ilike $1 or
                posts.content ilike $1)`;
        }
        
        const countResult = await connectionPool.query(countQuery, countValues);
        const totalPosts = parseInt(countResult.rows[0].count, 10);

        const results = {
            totalPosts,
            totalPages: Math.ceil(totalPosts / safeLimit),
            currentPage: safePage,
            limit: safeLimit,
            posts: result.rows,
        }
        if (offset > 0) {
            results.previousPage = safePage - 1;
        }
        return res.status(200).json(results)
    } catch (error) {
        return res.status(500).json({
            message: "Server could not read post because database connection",
            error: error.message
        })
    }
})

export default postRouter
