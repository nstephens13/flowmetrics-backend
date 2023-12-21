import { createRxSchema } from 'rxdb';
import { IssueIF } from '../model/IssueIF';
import { EmployeeIF } from '../model/EmployeeIF';
import { ProjectIF } from '../model/ProjectIF';
import { ChangeIF } from '../model/ChangeIF';
import { ChangeLogIF } from '../model/ChangeLogIF';
import { SLARule } from '../model/SLARule';
import { SLASubscriber } from '../model/SLASubscriber';

export const dataSchema = {
  employee: createRxSchema<EmployeeIF>('Employee', {
    title: 'Employee schema',
    description: 'Describes the structure of the Employee collection',
    version: 0,
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        primary: true,
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      emailAddress: {
        type: 'string',
      },
      avatarUrl: {
        type: 'string',
      },
      status: {
        type: 'string',
        enum: ['active', 'inactive'],
      },
    },
    required: ['id', 'firstName', 'lastName', 'emailAddress', 'avatarUrl', 'status'],
  }),

  slaRule: createRxSchema<SLARule>('SLARule', {
    title: 'SLARule schema',
    description: 'Describes the structure of the SLARule collection',
    version: 0,
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        primary: true,
      },
      name: {
        type: 'string',
      },
      durationInDays: {
        type: 'integer',
      },
      expirationDate: {
        type: 'string',
        format: 'date-time',
      },
      maxAssignedEmployees: {
        type: 'integer',
      },
      occurredIn: {
        type: 'string',
      },
    },
    required: [
      'id',
      'name',
      'durationInDays',
      'expirationDate',
      'maxAssignedEmployees',
      'occurredIn',
    ],
  }),

  slaSubscriber: createRxSchema<SLASubscriber>('slaSubscriber', {
    title: 'SLASubscriber schema',
    description: 'Describes the structure of the SLASubscriber collection',
    version: 0,
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        primary: true,
      },
      name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
    },
    required: ['id', 'name', 'description'],
  }),

  change: createRxSchema<ChangeIF>('change', {
    title: 'ChangeIF schema',
    description: 'Describes the structure of the ChangeIF collection',
    version: 0,
    type: 'object',
    properties: {
      changeType: {
        type: 'string',
      },
      from: {
        type: 'string',
      },
      to: {
        type: 'string',
      },
    },
    required: ['changeType', 'from', 'to'],
  }),

  changeLog: createRxSchema<ChangeLogIF>('changeLog', {
    title: 'ChangeLogIF schema',
    description: 'Describes the structure of the ChangeLogIF collection',
    version: 0,
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        primary: true,
      },
      created: {
        type: 'string',
        format: 'date-time',
      },
      author: {
        type: 'object',
      },
      changes: {
        type: 'array',
        items: {
          type: 'object',
        },
      },
    },
    required: ['id', 'created', 'author', 'changes'],
  }),

  issue: createRxSchema<IssueIF>('issue', {
    title: 'IssueIF schema',
    description: 'Describes the structure of the IssueIF collection',
    version: 0,
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        primary: true,
      },
      name: {
        type: 'string',
      },
      description: {
        type: 'string',
        nullable: true,
      },
      assignedTo: {
        type: 'object',
      },
      assigneeRestingTime: {
        type: 'object',
      },
      createdBy: {
        type: 'object',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      closedAt: {
        type: 'string',
        format: 'date-time',
      },
      dueTo: {
        type: 'string',
        format: 'date-time',
      },
      status: {
        type: 'string',
        nullable: true,
      },
      statusRestingTime: {
        type: 'object',
      },
      statusChanges: {
        type: 'array',
        items: {
          type: 'object',
        },
      },
      assigneeChanges: {
        type: 'array',
        items: {
          type: 'object',
        },
      },
      assignedSLARule: {
        type: 'array',
        items: {
          type: 'object',
        },
      },
    },
    required: ['id', 'name'],
  }),

  project: createRxSchema<ProjectIF>('project', {
    title: 'ProjectIF schema',
    description: 'Describes the structure of the ProjectIF collection',
    version: 0,
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        primary: true,
      },
      name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      issues: {
        type: 'array',
        items: {
          type: 'object',
        },
      },
      slaSubscriber: {
        type: 'object',
        nullable: true,
      },
    },
    required: ['id', 'name', 'description'],
  }),
};
