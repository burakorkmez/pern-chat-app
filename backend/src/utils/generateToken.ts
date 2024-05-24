import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId: string, res: Response) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS,
		httpOnly: true, // prevent XSS cross site scripting
		sameSite: "strict", // CSRF attack cross-site request forgery
		secure: process.env.NODE_ENV !== "development", // HTTPS
	});

	return token;
};

export default generateToken;
