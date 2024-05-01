import { randomBytes, scryptSync } from "crypto";

function hashAndSalt(inputPassword){
    const saltPassword = randomBytes(16).toString("hex");
    const hashPassword = scryptSync(inputPassword, saltPassword, 64).toString("hex");
    return { hashPassword, saltPassword };
}

export default hashAndSalt;