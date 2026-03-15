import express from "express"
import cors from "cors"
import db from "./db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const app = express()
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.post("/register", async (req, res)=>{
    let { login, password, email } = req.body
    try {
        let result = await db.query("SELECT * FROM user WHERE login=? OR email=?", [login, email])
        if (result[0].length > 0){
            res.status(400).json({error: "Користувач з такими даними вже існує"})
            return
        }
        let hashedPassword = await bcrypt.hash(password, 10)
        await db.query("INSERT INTO user (login, password, email) VALUES (?, ?, ?)", [login, hashedPassword, email])
        res.status(201).json({message: "Користувача зареєстровано"})
    }catch(error){
        console.log(error)
        res.status(500).json({error: error})
    }
})

app.post("/login", async(req, res)=>{
    const { email, password } = req.body
    try {
        let [users] = await db.query("SELECT * FROM user WHERE email = ?", [email])
        if (users.length === 0){
            res.status(401).json({error: "Інвалід пароль чи пошта"})
            return
        }
        let user = users[0]
        let isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword){
            res.status(401).json({error: "Інвалід пароль чи пошта"})
            return
        }
        let token = jwt.sign({id: user.id}, process.env.SECRET, { expiresIn: "14d"})
        res.status(200).json({token})
    }catch(err){
        return res.status(500).json({error: "Сервер втомився"})
    }
})

const authenticateToken = (req, res, next) => {
    let authHeader = req.headers.authorization;
    let token = authHeader && authHeader.split(" ")[1]
    if(!token) return res.status(403).json({error: "Access denied"})
    jwt.verify(token, process.env.SECRET, (err, user)=>{
        if (err) return res.status(403).json({error: "Access denied"})
        req.user = user
        next()
    })
} 

app.get("/protected", authenticateToken, (req, res)=>{
    res.json({ data: req?.user?.id})
})

app.listen(3000, ()=>console.log("Server ON!"))