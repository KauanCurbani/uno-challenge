import { gql } from "@apollo/client";

export const LIST_TASKS = gql`
  query ListTasks($filter: String) {
    listTasks(filter: $filter) {
      id
      title
      description
      completed
      history {
        id
        taskId
        date
        type
      }
    }
  }
`;

export const COMPLETE_TASK = gql`
  mutation CompleteTask($taskId: String!) {
    completeTask(taskId: $taskId) {
      id
      title
      description
      completed
      history {
        id
        taskId
        date
        type
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($data: CreateTaskInput!) {
    createTask(data: $data) {
      id
      title
      description
      completed
      history {
        id
        taskId
        date
        type
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: String!) {
    deleteTask(taskId: $taskId) {
      id
      title
      description
      completed
      history {
        id
        taskId
        date
        type
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($data: UpdateTaskInput!) {
    updateTask(data: $data) {
      id
      title
      description
      completed
      history {
        id
        taskId
        date
        type
      }
    }
  }
`;
