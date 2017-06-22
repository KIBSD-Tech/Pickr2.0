module.exports = (connection, Sequelize) =>  {
	var Tutorial = connection.define('tutorial', {
        name: Sequelize.STRING,
        room_number: Sequelize.STRING,
        teacher_name: Sequelize.STRING,
        max_students: Sequelize.INTEGER,
        // approved attribute for teacher verification
        // not currently in use - for future development
        approved: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false } 
    });
    return Tutorial;
};