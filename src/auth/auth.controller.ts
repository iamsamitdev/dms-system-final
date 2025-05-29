import { Controller, Get, Post, Render, Body, Res } from "@nestjs/common";
import { Response } from "express"
import { AuthService } from "./auth.service"
import { UserService } from "../users/user.service"
import * as bcrypt from "bcrypt"

@Controller("auth")
export class AuthController {

    constructor(
        private authService: AuthService,
        private usersService: UserService
    ) {}

    // Login endpoint
    @Get("login")
    @Render("auth/login")
    getLogin() {
        return { title: "Login" };
    }

    // Login POST endpoint
    @Post("login")
    async postLogin(
        @Body() body: { username: string, password: string }, @Res() res: Response) {
        
        const user = await this.authService.validateUser(body.username, body.password)

        if(user) {
            // ถ้าผู้ใช้ล็อกอินสำเร็จ ให้ redirect ไปที่ dashboard
            return res.redirect("/backend/dashboard");
        } else {
            // ถ้าผู้ใช้ล็อกอินไม่สำเร็จ ให้แสดง error message
            return res.render("auth/login", {
                title: "Login",
                error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
            });
        }
    }

    // Register endpoint
    @Get("register")
    @Render("auth/register")
    getRegister() {
        return { 
            title: "Register",
            // roles: [] // ถ้าต้องการส่ง roles มาให้เลือก สามารถเพิ่มได้ในอนาคต
        };
    }

    // Register POST endpoint
    @Post("register")
    async postRegister(
        @Body() body: { 
            firstName: string,
            lastName: string,
            username: string,
            email: string, 
            password: string,
            confirmPassword: string
        }, 
        @Res() res: Response) {
        try {
            // ตรวจสอบรหัสผ่านตรงกันหรือไม่
            if(body.password !== body.confirmPassword) {
                return res.render("auth/register", {
                    title: "Register",
                    error: "รหัสผ่านไม่ตรงกัน"
                })
            }

            // ตรวจสอบว่า username ซ้ำหรือไม่
            const existingUser = await this.usersService.findByUsername(body.username)
            if(existingUser) {
                return res.render("auth/register", {
                    title: "Register",
                    error: "ชื่อผู้ใช้นี้มีผู้ใช้แล้ว กรุณาเลือกชื่อผู้ใช้ใหม่"
                })
            }

            // ตรวจสอบว่า email ซ้ำหรือไม่
            const existingEmail = await this.usersService.findByEmail(body.email)
            if(existingEmail) {
                return res.render("auth/register", {
                    title: "Register",
                    error: "อีเมลนี้มีผู้ใช้แล้ว กรุณาใช้ที่อยู่อีเมลอื่น"
                })
            }

            // สร้าง user ใหม่ในฐานข้อมูล
            await this.usersService.create({
                firstName: body.firstName,
                lastName: body.lastName,
                username: body.username,
                email: body.email,
                password: await bcrypt.hash(body.password, 10),
                roleId: 3 // สมมุติว่า roleId 3 คือผู้ใช้ทั่วไป
            })

            // ถ้าสร้างสำเร็จ ให้ redirect ไปที่หน้า login
            return res.render("auth/login", {
                title: "Login",
                success: "ลงทะเบียนสำเร็จแล้ว กรุณาเข้าสู่ระบบ",            
            })

        } catch (error) {
            return res.render("auth/register", {
                title: "Register",
                error: `เกิดข้อผิดพลาด: ${error.message}`
            })
        }
    }

    // Forgot Password GET endpoint
    @Get("forgot-password")
    @Render("auth/forgotpassword")
    getForgotPassword() {
        return { 
            title: "Forgot Password"
        };
    }

    // Forgot Password POST endpoint
    @Post("forgot-password")
    async postForgotPassword(@Body() body: { email: string }, @Res() res: Response) {
        try {
            const { email } = body;

            // Validate email
            if (!email || !email.includes("@")) {
                return res.render("auth/forgotpassword", {
                    title: "Forgot Password",
                    error: "Please enter a valid email address",
                    email
                });
            }

            // TODO: ในอนาคตจะต้องเพิ่ม logic สำหรับ:
            // 1. ตรวจสอบว่า email นี้มีในระบบหรือไม่
            // 2. สร้าง reset token
            // 3. ส่ง email พร้อม reset link
            // 4. บันทึก token ลงฐานข้อมูล

            // ตอนนี้แสดง success message
            return res.render("auth/forgotpassword", {
                title: "Forgot Password",
                success: "Password reset link has been sent to your email address. Please check your inbox.",
                email: ""
            });

        } catch (error) {
            console.error("Forgot password error:", error);
            return res.render("auth/forgotpassword", {
                title: "Forgot Password",
                error: "An error occurred. Please try again later.",
                email: body.email
            });
        }
    }
}