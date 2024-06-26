import { auth, firestore } from "@studyfind/firebase";
import { DocumentID } from "@studyfind/types";

export const getStudyParticipantRemindersQuery = (studyID: DocumentID) => {
  const participantID = auth.getUser().uid;
  return firestore.references.getRemindersReference(studyID, participantID);
};
