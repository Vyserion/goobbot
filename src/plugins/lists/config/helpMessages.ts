import { Actions } from "./actions";

export const showCommandMessage = `User Commands:
- Get Lists: lists
- Get List: ${Actions.getList}
- Create List: ${Actions.createList}
- Rename List: ${Actions.renameList}
- Delete List: ${Actions.deleteList}
- Add Value: ${Actions.addValue}
- Remove Value: ${Actions.removeValue}

For more information, use the command: ${process.env.PREFIX}lists help [command]
`;

export const createListMessage = `This command will create an empty list.
The list name must be unique.

Command:
${process.env.PREFIX}lists ${Actions.createList} [list name]

Example:
${process.env.PREFIX}lists ${Actions.createList} 'My List`;

export const renameListMessage = `This command will rename a list.
The new name must be unique.

Command:
${process.env.PREFIX}lists ${Actions.renameList} [list name] [new list name]

Example:
${process.env.PREFIX}lists ${Actions.renameList} 'My List' 'New List'`;

export const deleteListMessage = `This command will remove a list.

Command:
${process.env.PREFIX}lists ${Actions.deleteList} [list name]

Example:
${process.env.PREFIX}lists ${Actions.deleteList} 'My List'`;

export const addValueMessage = `This command will add a value to a list.

Command:
${process.env.PREFIX}lists ${Actions.addValue} [list name] [value]

Example:
${process.env.PREFIX}lists ${Actions.addValue} 'My List' value`;

export const removeValueMessage = `This command will remove a value from a list.

Command:
${process.env.PREFIX} lists ${Actions.removeValue} [list name] [value]

Example:
${process.env.PREFIX} lists ${Actions.removeValue} 'My List' value`;

export const getListMessage = `This command will show a list.

Command:
${process.env.PREFIX}lists ${Actions.getList} [list name]

Example:
${process.env.PREFIX}lists ${Actions.getList} 'My List'`;

export const getListsMessage = `This command will list all lists.

Command:
${process.env.PREFIX}lists

Example:
${process.env.PREFIX}lists`;
