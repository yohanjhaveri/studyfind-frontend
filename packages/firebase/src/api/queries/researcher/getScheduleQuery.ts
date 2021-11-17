import firebase from "firebase";
import { auth, services } from "../../../index";
import { MeetingDocument } from "@studyfind/types";

export const getScheduleQuery = () => {
  const researcherID = auth.getUser().uid;

  return services.firestore
    .collectionGroup("meetings")
    .where("researcherID", "==", researcherID) as firebase.firestore.Query<MeetingDocument>;
};