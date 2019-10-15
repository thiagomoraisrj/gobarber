import { startOfDay, endOfDay, parseIso } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const { date } = req.query;
    const parseDate = parseIso(date);

    const checkUserProvider = await User.findOne({
      where: { id: req.user_id, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.user_id,
        canceled_at: null,
        date: { [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)] },
      },
      order: ['date'],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
