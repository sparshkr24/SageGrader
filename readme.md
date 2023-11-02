# SageGrader

SageGrader is a mentor-view web application which provides a platform for mentors to assign students to groups and grade their semester long assignment.

## Technologies
    React.js, Node.js, Express.js, PostgreSQL, Prisma ORM
    <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> <a href="https://www.php.net" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" alt="php" width="40" height="40"/> </a>

     <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>

     <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a>

## Functionality

### 1. Add Students

- Mentors can add students to their group.
- Validations:
  - Students must not be assigned to other mentors.
  - Each mentor can have a minimum of 3 and a maximum of 4 students assigned to them.
- Mentors can see a list of available students to assign and those who are already assigned.

### 2. Assign Marks

- Mentors can assign marks to the students in their group.
- Mentors can edit the assigned marks.
- Mentors can remove/unassign a student from their group before locking the submission.

### 3. Lock Submission

- Mentors can lock the submission, which will lock all the marks assigned to that student group.
- Validation:
  - Submission can only be locked when there are a minimum of 3 and a maximum of 4 students in the mentor's group, and all students have been assigned marks.
- ***When the submission is locked, an email notification is sent to the students, informing them that their assignments have been graded.***

### 4. Mentor View

- Mentors have a separate page to view their students based on different filters:
  - **Unassigned:** Display students who are part of a mentor group but don't have marks assigned to them yet.
  - **Assigned:** Display students who are part of a mentor group and have marks assigned to them, but their submissions haven't been locked.
  - **Locked Submission:** Display students whose submissions have been locked/graded.

## Bonus Points

- [x] An email is sent to all assigned students when the mentor submits the evaluation, notifying them that the evaluation has been completed.
- [ ] A mark sheet of all students for a mentor can be generated in PDF, DOC, or any document format.
- [ ] Responsive design (work in progress).

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/sparshkr24/SageGrader.git
   cd SageGrader
    ```

2. Start Server
   
   ```bash
    cd backend/
    npm install
    npx prisma generate
    npm start
   ```

3. Start React
   
   ```bash
    cd frontend/
    npm install
    npm start
   ```
