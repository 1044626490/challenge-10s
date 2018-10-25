
import {post, postModeCors, request} from "./apiMethod";
import * as C from '~/constants/api';

export default {
    downloadResume: (params) => request(C.DOWNLOAD_RESUME,params),
    querySpecialClassify: (params) => post(C.QUERY_SPECIAL_CLASSIFY,params),
    getStudentExamNum: (params) => post(C.GET_STUDENT_EXAM_NUM,params),
    getQuestionNum: (params) => post(C.GET_QUESTION_NUM,params),
    getAllShieldQestion: (params) => post(C.GET_ALL_SHIELD_QUESTION,params),
    createPaper: (params) => post(C.CREATE_PAPER,params),
    errorQuestion: (params) => post(C.ERROR_QUESTION,params),
    updateShieldQuestion: (params) => post(C.UPDATE_SHIELD_QUESTION,params),
    submitQuestion: (params) => post(C.SUBMIT_QUESTION,params),
    updateShare: (params) => post(C.UPDATE_SHARE,params),

    getAllJobs:(params) => post(C.RE_GETALLJOBS,params),
    getAllJobsByPage:(params) => post(C.GETALLJOBSBYPAGE,params),
    queryOnePost:(params) => post(C.QUERYONEPOST,params),
    updateCollect:(params) => post(C.UPDATECOLLECT,params),
    uploadFileToData: (url, params) => postModeCors(url, params),
    updateManagerInfo:(params) => post(C.UPDATEMANAGERINFOR,params),
    queryAllForum:(params) => post(C.QUERYALLFORUM,params),
    saveApplyHelp:(params) => post(C.SAVEAPPLYHELP,params),
    checkStudentInfo:(params) => post(C.CHECKSTUDENRTINFO,params),
    saveForum:(params) => post(C.SAVEFORUM,params),
    queryInformation:(params)=> post(C.QUERYINFORMATION,params),
    queryOneForum:(params)=> post(C.QUERYONEFORUM,params),
    forumPraiseOrTrample:(params)=> post(C.FOTUMPRAISEORTRAMPLE,params),
    delOrAddStudentFriend:(params)=> post(C.ADDSTUDENT,params),
    saveReply:(params)=> post(C.SAVEPEPLY,params),
    queryKnowledge:(params)=> post(C.QUERY_KNOWLEDGE,params),

    queryStudentResume: (params) => post(C.QUERY_STUDENT_RESUME,params),
    updateResumeInfo: (params) => post(C.UPDATE_RESUME_INFO,params),
    queryCollectByPage: (params) => post(C.QUERY_COLLECT_BY_PAGE,params),

    queryStudentSingin: (params) => post(C.QUERY_STUDENT_SIGN_IN,params),
    studentOperationSignin: (params) => post(C.STUDENT_OPERATION_SIGN_IN,params),
    upOrDownAnalysis: (params) => post(C.UP_OR_DOWN_ANALYSIS,params),
    saveAnalysis: (params) => post(C.SAVE_ANALYSIS, params),

    queryAllNoteByPage: (params) => post(C.QUERY_ALL_NOTE_BY_PAGE,params),
    saveNote: (params) => post(C.SAVE_NOTE,params),
    delNote: (params) => post(C.DEL_NOTE,params),

    queryPostNum: (params) => post(C.QUERY_POST_NUM,params),

    queryFriendsByPage: (params) => post(C.QUERY_FRIENDS_BY_PAGE,params),
    queryOneQustion: (params) => post(C.QUERY_ONE_QUESTION,params),
}