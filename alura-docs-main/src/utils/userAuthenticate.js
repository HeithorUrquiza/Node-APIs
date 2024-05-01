import { scryptSync, timingSafeEqual } from "crypto";

function userAuthenticate(inputPassword, user){
    const hashTest = scryptSync(inputPassword, user.saltPassword, 64);
    const realHash = Buffer.from(user.hashPassword, "hex");
    return timingSafeEqual(hashTest, realHash);
}

export default userAuthenticate;