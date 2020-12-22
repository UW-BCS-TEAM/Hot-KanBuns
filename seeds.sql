use hot_kanbuns;
select * from tasks;
insert into tasks(taskName, taskDesc, taskStatus, taskPriority, createdAt, updatedAt, ProjectId)
values
("task 1", "first task", "inProgress", "low", current_date(), current_date(), 2),
("task 2", "second task", "todo", "low", current_date(), current_date(), 2),
("task 3", "third task", "todo", "low", current_date(), current_date(), 2),
("task 4", "fourth task", "todo", "low", current_date(), current_date(), 2),
("task 5", "fifth task", "inProgress", "low", current_date(), current_date(), 2),
("task 6", "sixth task", "todo", "low", current_date(), current_date(), 2),
("task 7", "seventh task", "todo", "low", current_date(), current_date(), 2),
("task 8", "eighth task", "completed", "low", current_date(), current_date(), 2),
("task 9", "ninth task", "completed", "low", current_date(), current_date(), 2),