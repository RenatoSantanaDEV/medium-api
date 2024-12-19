module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('post_likes', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            post_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'posts', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    async down(queryInterface) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.dropTable('post_likes', { transaction });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },
};
