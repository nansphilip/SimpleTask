/*
  Warnings:

  - The values [ongoing] on the enum `Task_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `status` ENUM('todo', 'pending', 'inprogress', 'done') NOT NULL DEFAULT 'todo';
