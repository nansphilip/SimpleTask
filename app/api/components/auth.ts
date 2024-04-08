import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userExists = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email: email }
    });
};

export async function SignUp(userForm: { name: string, email: string, password: string }) {

    // Check if the email is already used
    const userDB = await userExists(userForm.email);

    // If the email is already used, return "Email already used"
    if (userDB) {
        return {
            message: "Email already used",
            content: null,
        }
    }

    // Hash the password using bcrypt
    const bcrypt = require('bcrypt');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userForm.password, salt);

    // Create the user
    const createUser = await prisma.user.create({
        data: {
            name: userForm.name,
            email: userForm.email,
            password: hashedPassword,
        }
    });

    return {
        message: "New user created",
        content: createUser
    }
}

export async function Login(userForm: { email: string, password: string }) {

    // Check if the user exists
    const userDB = await userExists(userForm.email);

    // Verify if the passwords hash match using bcrypt
    const bcrypt = require('bcrypt');
    const isPasswordValid = userDB ?
        await bcrypt.compare(userForm.password, userDB.password) :
        false;

    // If user does not exist or password is invalid, return "Invalid credentials"
    if (!userDB || !isPasswordValid) {
        return {
            message: "Invalid credentials",
            content: null
        }
    }

    return {
        message: "Valid credentials",
        content: userDB
    }
}

// Export the functions names and types
export const authFunctions = {
    Login,
    SignUp,
};
