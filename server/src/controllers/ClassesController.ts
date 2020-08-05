import { Request, Response } from 'express';

import db from '../database/connection';

import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItemProps {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response
        .status(400)
        .json({ error: '❌ Missing filter to search classes!' });
    }

    // convert hour to minute

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ?', [timeInMinutes]);
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

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
  }
}
