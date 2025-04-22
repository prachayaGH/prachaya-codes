import connectionPool from "../utils/db.mjs";

let cachedPostsFields = null;

export const getPostsFields = async () => {
    // ถ้ามี cache แล้ว ➔ return เลย
    if (cachedPostsFields) {
        return cachedPostsFields;
    }
    // ถ้ายังไม่มี ➔ query จาก database
    try {
        const result = await connectionPool.query(`
            select column_name, data_type
            from information_schema.columns 
            where table_name = 'posts'`
        );

        cachedPostsFields = {};
        result.rows.forEach(row => {cachedPostsFields[row.column_name] = row.data_type;});
        return cachedPostsFields;

    } catch (error) {
        console.error("Error fetching posts fields:", error);

    }
}