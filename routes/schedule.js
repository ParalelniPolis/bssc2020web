const moment = require('moment-timezone');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/* GET page. */

const pageTitle = 'Schedule';
const hashTitle = '#BSSC20';
const pageDescription = 'Black Swan Security Congress is the event for IT security professional community and is dedicated to exceptional risks which hardly anybody pays attention to.';

const formatApiData = (talks) => {
  const scheduleData = talks.map((event) => {
    event.groupDate = moment(event.starts).format('DD-MM-YYYY');

     return event;
  });

   return _.groupBy(scheduleData, 'groupDate');
};

const requestBody = {
  operationName:"talksQuery",
  query:`query talksQuery {
          allTalks(
            filter: {status: ACTIVE}, orderBy: starts_ASC
          ) {
            id
            name
            description
            starts
            ends
            room{ id name }
            speakers(
              filter: {status: ACTIVE}
            ) {
              id
              displayName
              photo{ id url }
            }
          }
        }`,
  variables:{}
};

router.get('/', async (req, res) => {
  try {
    const data = await fetch(process.env.GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestBody)
    });
    const talks = await data.json();
    const schedule = formatApiData(talks.data.allTalks);

    return res.render('schedule', {
      protocol: req.protocol,
      hostname: req.hostname,
      path: req.originalUrl,
      title: pageTitle,
      title_hash: hashTitle,
      description: pageDescription,
      day1: schedule['04-10-2019'],
      day2: schedule['05-10-2019'],
      day3: schedule['06-10-2019']
    });
  }
  catch (error) {
    throw error;
  }
});

module.exports = router;
