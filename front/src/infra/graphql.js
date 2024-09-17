import { gql } from "@apollo/client";

export const GET_TODO_LIST = gql`
  query getTodoList($filter: ItemFilter) {
    todoList(filter: $filter) {
      id
      name
      description
      completed
      history {
        id
        todoId
        type
        date
      }
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($values: ItemInput) {
    addItem(values: $values)
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation updateItem($values: ItemInput) {
    updateItem(values: $values)
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation deleteItem($id: Int!) {
    deleteItem(id: $id)
  }
`;
