import { serial, varchar } from "drizzle-orm/pg-core";
import { pgTable, text } from "drizzle-orm/pg-core";

export const preppulse = pgTable('preppulse', {
    id: serial('id').primaryKey(),
    jsonPrepResp: text('jsonPrepResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    prepId: varchar('prepId').notNull()
});

export const UserAnswer=pgTable('userAnswer',{
    id: serial('id').primaryKey(),
    prepIdRef: varchar('prepId').notNull(),
    question:varchar('question'),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),

});
//2:44;17
