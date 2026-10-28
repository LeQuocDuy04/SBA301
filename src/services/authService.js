export function login(username, password) {
    if (!username.trim() || !password) {
        return {
            success: false,
            message: "Vui lòng nhập đầy đủ tài khoản và mật khẩu.",
        };
    }

    if (username === "Admin" && password === "Admin") {
        return {
            success: true,
            user: {
                username: "Admin",
                role: 1,
                roleName: "Admin",
            },
        };
    }

    return {
        success: false,
        message: "Tài khoản hoặc mật khẩu không chính xác.",
    };
}