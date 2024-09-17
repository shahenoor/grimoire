import "dotenv/config";

// Get a user with a specified job id
export const getUserById = ( req, userId) => {
    return req.knexDb("users").where({ id: userId }).first();
}

// Create a New User
export const createUser = ( req, res, userDetails) => {
    const { id, name, email, password, avatar } = userDetails;
    
    if (!id || !name || !email  || !password || !avatar) {
        return res.status(400).send("Error: Missing properties");
    }
    return req.knexDb("users").insert(userDetails);
}

// Update User Information
export const updateUser = async ( req, res, userDetails, userId) => {
    const { id, name, email, password, avatar} = userDetails;
    
    if (!id || !name || !email  || !password) {
        return res.status(400).send("Error: Missing properties");
    }

    const user = await req.knexDb("users").where({ id: userId }).first();
    if (!user) {
        return res.status(404).send('User ID not found');
    }

    await req.knexDb("users").where({ id: userId }).update({
        id,
        name,
        email,
        password,
        avatar,
        updated_at: req.knexDb.fn.now(),
    });
    return req.knexDb("users").where({ id: userId}).first();
}

// Delete User 
export const deleteUser = async ( req, res, userId ) => {
    const user = await req.knexDb("users").where({ id: userId }).first();

    if (!user) {
        return res.status(404).send('User ID not found');
    }

    return req.knexDb("users").where({ id: userId }).del();
}
