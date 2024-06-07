export const clientMeetingsMock = [
  {
    id: 'dacaf34b-4bb0-425a-97b7-32675b20ba38',
  },
];
export const getAllMeetingParticipantsMock = {
  id: 'dacaf34b-4bb0-425a-97b7-32675b20ba38',
  startTime: '2024-06-07T07:00:00.000Z',
  endTime: '2024-06-07T08:00:00.000Z',
  participants: [
    {
      id: 'a885cd6d-8d3b-4eb1-8639-1df92e9e98a0',
      familyName: 'BP',
      givenName: 'Client',
      role: 'client',
    },
    {
      id: '0a30d067-d9bc-4b3f-846b-c3a8791992cf',
      familyName: 'BP',
      givenName: 'Broker',
      role: 'broker',
    },
  ],
};

export const brokerMeetingsMock = [
  {
    id: 'dacaf34b-4bb0-425a-97b7-32675b20ba38',
    startTime: '2024-06-07T07:00:00.000Z',
    endTime: '2024-06-07T08:00:00.000Z',
    participants: [
      {
        id: '0a30d067-d9bc-4b3f-846b-c3a8791992cf',
        familyName: 'Brokerman 3.0',
        givenName: 'Broker',
        role: 'broker',
      },
    ],
  },
];

export const createMeetingDtoMock = {
  participants: [
    { id: 'a885cd6d-8d3b-4eb1-8639-1df92e9e98a0' },
    { id: '0a30d067-d9bc-4b3f-846b-c3a8791992cf' },
  ],
  startTime: new Date('2024-06-07T07:00:00-03:00'),
  endTime: new Date('2024-06-07T07:30:00-03:00'),
};

export const clientIdMock = 'a885cd6d-8d3b-4eb1-8639-1df92e9e98a0';

export const overlappingMeetingDtoMock = {
  participants: [
    { id: 'a885cd6d-8d3b-4eb1-8639-1df92e9e98a0' },
    { id: '0a30d067-d9bc-4b3f-846b-c3a8791992cf' },
  ],
  startTime: new Date('2024-06-07T03:00:00-03:00'),
  endTime: new Date('2024-06-07T03:30:00-03:00'),
};

export const overlappingBrokerSchedule = [
  {
    id: 'dacaf34b-4bb0-425a-97b7-32675b20ba38',
    startTime: '2024-06-07T07:00:00.000Z',
    endTime: '2024-06-07T08:00:00.000Z',
  },
  {
    id: 'fdfb04ee-b327-4559-973f-d120f7be4596',
    startTime: '2024-06-07T06:00:00.000Z',
    endTime: '2024-06-07T06:30:00.000Z',
  },
];

export const over120MinutesMeetingDto = {
  participants: [
    { id: 'a885cd6d-8d3b-4eb1-8639-1df92e9e98a0' },
    { id: '0a30d067-d9bc-4b3f-846b-c3a8791992cf' },
  ],
  startTime: new Date('2024-06-07T01:00:00-03:00'),
  endTime: new Date('2024-06-07T07:45:00-03:00'),
};

export const under30MinutesMeetingDto = {
  participants: [
    { id: 'a885cd6d-8d3b-4eb1-8639-1df92e9e98a0' },
    { id: '0a30d067-d9bc-4b3f-846b-c3a8791992cf' },
  ],
  startTime: new Date('2024-06-07T01:00:00-03:00'),
  endTime: new Date('2024-06-07T01:15:00-03:00'),
};
