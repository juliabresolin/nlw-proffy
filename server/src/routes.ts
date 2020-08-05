import express from 'express';
import db from './database/connection';

import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

interface ScheduleItemProps {
  week_day: number;
  from: string;
  to: string;
}

routes.get('/', (request, response) => {
  return response.json({ message: 'Welcome to the Proffy API!' });
});

routes.post('/classes', async (request, response) => {
  const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;

  /* transaction of the open database when starting the insert commands and
  verifying that all the commands ran smoothly, if any of them return error,
  the transaction undoes the previous commands by returning to the initial
  state of the database */

  const trx = await db.transaction();

  try {
    // insert user to table users
    const insertedUser = await trx('users').insert({
      name,
      avatar,
      whatsapp,
      bio,
    });

    if (!insertedUser) {
      return response.json({ error: 'Failed to create user!' });
    }

    // insert classes to table classes
    const insertedClasses = await trx('classes').insert({
      subject,
      cost,
      user_id: insertedUser[0],
    });

    // convert from and to in minutes
    const classSchedule = schedule.map((scheduleItem: ScheduleItemProps) => {
      return {
        class_id: insertedClasses[0],
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to),
      };
    });

    // insert class_schedule formarted in database
    await trx('class_schedule').insert(classSchedule);

    // finish the transaction
    await trx.commit();

    return response
      .status(201)
      .json({ sucess: '✔ Sucessfully registered classes!' });
  } catch (err) {
    // revert operations in database
    await trx.rollback();

    return response
      .status(400)
      .json({ error: '❌ Unexpected error while creating new class!' });
  }
});

export default routes;
