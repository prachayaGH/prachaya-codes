//server/route/authRouter.mjs
import { Router } from "express";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          // เพิ่ม profile_pic ถ้าต้องการ
          // แก้ DisplayName เป็น name
          name,
        },
      },
    });

    if (error || !data.user) {
      return res.status(400).json({ error: error?.message || "Signup failed" });
    }

    const { error: insertError } = await supabase.from("users").insert([
      {
        id: data.user.id,
        username,
        name,
        email,
        role: "user",
      },
    ]);

    if (insertError) {
      console.error("Error creating user profile:", insertError);
      throw new Error(insertError.message);
    }

    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // ตรวจสอบว่า error เกิดจากข้อมูลเข้าสู่ระบบไม่ถูกต้องหรือไม่
      if (
        error.code === "invalid_credentials" ||
        error.message.includes("Invalid login credentials")
      ) {
        return res.status(400).json({
          error: "Your password is incorrect or this email doesn't exist",
          error: error.message,
        });
      }
      return res.status(400).json({
        error: error.message,
      });
    }

    res.cookie("sb-access-token", data.session.access_token, {
      httpOnly: true,     // can't access via JavaScript
      secure: false,      // set to true if you're using HTTPS
      sameSite: "Lax",    // adjust for cross-site
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      message: "Signed in successfully",
      session: data.session
    });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred during login" });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.clearCookie("sb-access-token");

    return res.status(200).json({ message: "Logged out successfully" });
  }
  catch (error) {
    return res.status(500).json({ error: "An error occurred during logout" });
  }
})

// authRouter.get("/get-user", async (req, res) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(400).json({
//       error: "Unauthorized: Token missing or invalid",
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const { data, error } = await supabase.auth.getUser(token);
//     if (error) {
//       return res.status(401).json({ error: "Unauthorized or token expired" });
//     }

//     const supabaseUserId = data.user.id;
//     const query = `select * from users where id = $1`;
//     const values = [supabaseUserId];
//     const { rows } = await connectionPool.query(query, values);

//     res.status(200).json({
//       id: data.user.id,
//       email: data.user.email,
//       username: rows[0].username,
//       name: rows[0].name,
//       role: rows[0].role,
//       profilePic: rows[0].profile_pic,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: "Internal server error",
//     });
//   }
// });
// แก้ error หน้า homepage
export default authRouter;
