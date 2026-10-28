export const initialCategories = [
    { id: 1, name: "Campus News", status: 1 },
    { id: 2, name: "Student Activities", status: 1 },
    { id: 3, name: "Announcements", status: 0 },
];

export const initialNews = [
    {
        id: 1,
        title: "Welcome to the new academic year",
        content: "Important information for students and staff.",
        categoryId: 1,
        createdBy: "Admin",
        status: 1,
    },
    {
        id: 2,
        title: "Student club registration",
        content: "Registration information for student clubs.",
        categoryId: 2,
        createdBy: "Admin",
        status: 1,
    },
];

export const initialUsers = [
    {
        id: 1,
        username: "Admin",
        email: "admin@funews.local",
        role: 1,
        status: 1,
    },
    {
        id: 2,
        username: "Staff01",
        email: "staff01@funews.local",
        role: 2,
        status: 1,
    },
];