class UserRepository {
    constructor() {
        this.users = new Map();
        this.id = 1;
    }

    async save(user) {
        this.users.set(this.id, user);
        this.id += 1;
    }

    async findById(id) {
        const user = this.users.get(Number(id));
        if (!user) {
            throw new Error('User not found');
        }
        return {
            data: {
                title: user.name,
                user,
            },
        };
    }
}

module.exports = new UserRepository();