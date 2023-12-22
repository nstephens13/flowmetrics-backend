import { RxJsonSchema } from 'rxdb';
import { ProjectIF } from '../model/ProjectIF';

const projectSchema: RxJsonSchema<ProjectIF> = {
  title: 'project schema',
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    description: { type: 'string' },
    issues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          description: { type: 'string' },
          assignedTo: {
            type: ['object', 'null'],
            properties: {
              id: { type: 'number' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              emailAddress: { type: 'string' },
              avatarUrl: { type: 'string' },
              status: { type: 'string', enum: ['active', 'inactive'] },
            },
            required: ['id', 'firstName', 'lastName', 'emailAddress', 'avatarUrl', 'status'],
          },
          assigneeRestingTime: { type: 'object' },
          createdBy: {
            type: ['object', 'null'],
            properties: {
              id: { type: 'number' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              emailAddress: { type: 'string' },
              avatarUrl: { type: 'string' },
              status: { type: 'string', enum: ['active', 'inactive'] },
            },
            required: ['id', 'firstName', 'lastName', 'emailAddress', 'avatarUrl', 'status'],
          },
          createdAt: { type: 'Date' },
          closedAt: { type: 'Date' },
          dueTo: { type: 'Date' },
          status: { type: 'string' },
          statusRestingTime: { type: 'object' },
          statusChanges: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                created: { type: 'string', format: 'date-time' },
                author: {
                  type: ['object', 'null'],
                  properties: {
                    id: { type: 'number' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    emailAddress: { type: 'string' },
                    avatarUrl: { type: 'string' },
                    status: { type: 'string', enum: ['active', 'inactive'] },
                  },
                  required: ['id', 'firstName', 'lastName', 'emailAddress', 'avatarUrl', 'status'],
                },
                changes: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      changeType: { type: 'string', enum: ['status', 'assignee'] },
                      from: {
                        type: ['object', 'null'],
                        properties: {
                          id: { type: 'number' },
                          firstName: { type: 'string' },
                          lastName: { type: 'string' },
                          emailAddress: { type: 'string' },
                          avatarUrl: { type: 'string' },
                          status: { type: 'string', enum: ['active', 'inactive'] },
                        },
                        required: [
                          'id',
                          'firstName',
                          'lastName',
                          'emailAddress',
                          'avatarUrl',
                          'status',
                        ],
                      },
                      to: {
                        type: ['object', 'null'],
                        properties: {
                          id: { type: 'number' },
                          firstName: { type: 'string' },
                          lastName: { type: 'string' },
                          emailAddress: { type: 'string' },
                          avatarUrl: { type: 'string' },
                          status: { type: 'string', enum: ['active', 'inactive'] },
                        },
                        required: [
                          'id',
                          'firstName',
                          'lastName',
                          'emailAddress',
                          'avatarUrl',
                          'status',
                        ],
                      },
                    },
                    required: ['changeType', 'from', 'to'],
                  },
                },
              },
              required: ['id', 'created', 'author', 'changes'],
            },
          },
          assigneeChanges: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                created: { type: 'string', format: 'date-time' },
                author: {
                  type: ['object', 'null'],
                  properties: {
                    id: { type: 'number' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    emailAddress: { type: 'string' },
                    avatarUrl: { type: 'string' },
                    status: { type: 'string', enum: ['active', 'inactive'] },
                  },
                  required: ['id', 'firstName', 'lastName', 'emailAddress', 'avatarUrl', 'status'],
                },
                changes: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      changeType: { type: 'string', enum: ['status', 'assignee'] },
                      from: {
                        type: ['object', 'null'],
                        properties: {
                          id: { type: 'number' },
                          firstName: { type: 'string' },
                          lastName: { type: 'string' },
                          emailAddress: { type: 'string' },
                          avatarUrl: { type: 'string' },
                          status: { type: 'string', enum: ['active', 'inactive'] },
                        },
                        required: [
                          'id',
                          'firstName',
                          'lastName',
                          'emailAddress',
                          'avatarUrl',
                          'status',
                        ],
                      },
                      to: {
                        type: ['object', 'null'],
                        properties: {
                          id: { type: 'number' },
                          firstName: { type: 'string' },
                          lastName: { type: 'string' },
                          emailAddress: { type: 'string' },
                          avatarUrl: { type: 'string' },
                          status: { type: 'string', enum: ['active', 'inactive'] },
                        },
                        required: [
                          'id',
                          'firstName',
                          'lastName',
                          'emailAddress',
                          'avatarUrl',
                          'status',
                        ],
                      },
                    },
                    required: ['changeType', 'from', 'to'],
                  },
                },
              },
              required: ['id', 'created', 'author', 'changes'],
            },
          },
          assignedSLARule: {
            type: ['object', 'null'],
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              durationInDays: { type: 'number' },
              expirationDate: { type: 'number' },
              maxAssignedEmployees: { type: 'number' },
              occurredIn: { type: 'string', format: 'date-time' }, // Adjust the format if necessary
            },
            required: [
              'id',
              'name',
              'durationInDays',
              'expirationDate',
              'maxAssignedEmployees',
              'occurredIn',
            ],
          },
        },
      },
      required: [
        'id',
        'name',
        'description',
        'assignedTo',
        'assigneeRestingTime',
        'createdBy',
        'createdAt',
        'closedAt',
        'dueTo',
        'status',
        'statusRestingTime',
        'statusChanges',
        'assigneeChanges',
        'assignedSLARule',
      ],
    },
    slaSubscriber: {
      type: ['object', 'null'],
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
      },
      required: ['id', 'name'],
    },
  },
  required: ['id', 'name', 'description', 'issues', 'slaSubscriber'],
};
export { projectSchema };
