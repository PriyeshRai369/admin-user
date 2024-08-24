import jwt from 'jsonwebtoken'

export async function generateToken(user){
    return await jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, {
        expiresIn: '1d',
    });
}