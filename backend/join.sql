SELECT meeting.meeting_id, meeting.group_id, meeting.teacher_id, course_id, coursename, projectname,starttime,endtime,note,next_meeting_id,report
FROM `meeting`
INNER JOIN `groupstudent` AS GS ON GS.group_id = `meeting`.`group_id`