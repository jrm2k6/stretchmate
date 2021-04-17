'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    let updatedAt = new Date();
    await queryInterface.bulkInsert('stretches', [
      { name: 'Rotator Cuff Stretch', updatedAt },
      { name: 'Hamstring Stretch', updatedAt },
      { name: 'Calf Stretch', updatedAt },
      { name: 'Side Stretch', updatedAt },
      { name: 'Goal Post Stretch', updatedAt },
      { name: 'Long Stretch', updatedAt },
    ], {
      updateOnDuplicate: ['updatedAt'],
      upsertKeys: ['name'],
    });


    const [results] = await queryInterface.sequelize.query("SELECT name, uuid from stretches");

    // Steps for first stretch
    let uuid = results.find(r => r.name === 'Rotator Cuff Stretch').uuid;
    await queryInterface.bulkInsert('steps', [
      { order: 1, description: 'Place your hands on the side of the doorway, elbows tucked behing your back', duration: 5, assetUrl: '/images/stretches/rotator_cuff_stretch_doorway_1.svg', assetType: 'image', stretchUuid: uuid, updatedAt },
      { order: 2, description: 'Inch your body forward until you feel a stretch in your shoulders', duration: 5, assetUrl: '/images/stretches/rotator_cuff_stretch_doorway_2.svg', assetType: 'image', stretchUuid: uuid, updatedAt },
    ], {
      upsertKeys: ['assetUrl'],
      updateOnDuplicate: ['order', 'description', 'updatedAt', 'duration']
    });

    // // Steps for second stretch
    uuid = results.find(r => r.name === 'Hamstring Stretch').uuid;
    await queryInterface.bulkInsert('steps', [
      { order: 1, description: 'Lay down on the ground, hands flat, one leg up against the wall, the other flat on the ground.', duration: 5, assetUrl: '/images/stretches/hamstring_stretch_doorway_1.svg', assetType: 'image', stretchUuid: uuid, updatedAt },
    ], {
      upsertKeys: ['assetUrl'],
      updateOnDuplicate: ['order', 'description', 'updatedAt', 'duration']
    });

    // Steps for third stretch
    uuid = results.find(r => r.name === 'Calf Stretch').uuid;
    await queryInterface.bulkInsert('steps', [
      { order: 1, description: 'Flex your front foot against the side of the doorway, heel on the ground. Place the heel of your back foot against the other side of the doorway, both legs straight', duration: 5, assetUrl: '/images/stretches/calf_stretch_doorway_1.svg', assetType: 'image', stretchUuid: uuid, updatedAt },
      { order: 2, description: 'Tilt your chest forward, keeping your back flat, until you feel a stretch in your calf.', duration: 5, assetUrl: '/images/stretches/calf_stretch_doorway_2.svg', assetType: 'image', stretchUuid: uuid, updatedAt },
    ], {
      upsertKeys: ['assetUrl'],
      updateOnDuplicate: ['order', 'description', 'updatedAt', 'duration']
    });

    // Steps for fourth stretch
    uuid = results.find(r => r.name === 'Side Stretch').uuid;
    await queryInterface.bulkInsert('steps', [
      { order: 1, description: 'Grab the outside of the doorway with both hands, wider than your shoulder width', duration: 5, assetUrl: '/images/stretches/side_stretch_doorway_1.svg', assetType: 'image', stretchUuid: uuid, updatedAt },
      { order: 2, description: 'Step outside of the doorway', duration: 5, assetUrl: '/images/stretches/side_stretch_doorway_2.svg', assetType: 'image', stretchUuid: uuid, updatedAt },
      { order: 3, description: 'Lean your hips in the opposite direction of the door frame', duration: 5, assetUrl: '/images/stretches/side_stretch_doorway_3.svg', assetType: 'image', stretchUuid: uuid, updatedAt },
    ], {
      upsertKeys: ['assetUrl'],
      updateOnDuplicate: ['order', 'description', 'updatedAt', 'duration']
    });

    // Steps for fifth stretch
    uuid = results.find(r => r.name === 'Goal Post Stretch').uuid;
    await queryInterface.bulkInsert('steps', [
      { order: 1, description: 'Grab onto the doorway with both hands, bending your arms in a goal post shape', duration: 5, assetUrl: '/images/stretches/goal_post_stretch_doorway_1.svg', assetType: 'image', stretchUuid: uuid, updatedAt },
      { order: 2, description: 'Learn forward until you feel a stretch in your chest', duration: 5, assetUrl: '/images/stretches/goal_post_stretch_doorway_2.svg', assetType: 'image', stretchUuid: uuid, updatedAt },
    ], {
      upsertKeys: ['assetUrl'],
      updateOnDuplicate: ['order', 'description', 'updatedAt', 'duration']
    });

    // Steps for sixth stretch
    uuid = results.find(r => r.name === 'Long Stretch').uuid;
    await queryInterface.bulkInsert('steps', [
      { order: 1, description: 'Reach the top of the doorway with your finder, standing straight', duration: 5, assetUrl: '/images/stretches/long_stretch_doorway_1.svg', assetType: 'image', stretchUuid: uuid, updatedAt },
      { order: 1, description: 'Slighty push your chest and ribs forward until you feel a stretch', duration: 5, assetUrl: '/images/stretches/long_stretch_doorway_2.svg', assetType: 'image', stretchUuid: uuid, updatedAt },
    ], {
      upsertKeys: ['assetUrl'],
      updateOnDuplicate: ['order', 'description', 'updatedAt', 'duration']
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('stretches', null, { truncate: true, cascade: true });
  }
};
