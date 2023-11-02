# SageGrader

SageGrader is a mentor-view web application built using Node.js, Express.js, React, PostgreSQL, and Prisma. It provides a platform for mentors to assign students to groups and grade their work.

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
- When the submission is locked, an email notification is sent to the students, informing them that their assignments have been graded.

### 4. Mentor View

- Mentors have a separate page to view their students based on different filters:
  - **Unassigned:** Display students who are part of a mentor group but don't have assigned marks.
  - **Assigned:** Display students who are part of a mentor group and have marks assigned to them, but their submissions haven't been locked.
  - **Locked Submission:** Display students whose submissions have been locked/graded.

## Bonus Points

- [x] An email is sent to all assigned students when the mentor submits the evaluation, notifying them that the evaluation has been completed.
- [x] A mark sheet of all students for a mentor can be generated in PDF, DOC, or any document format.
- [ ] Responsive design (work in progress).

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/SageGrader.git
   cd SageGrader
    ```
