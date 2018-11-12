/**
 * @module  api
 * api请求的地址常量
 * */

export const GET_LOGIN_CAPTCHA = '/api/login/captcha';
export const LOGIN = '/api/login';//登录
export const REGISTER = '/api/register';//注册
export const SEND_VERIFI_CODE = '/api/send_verifi_code';//获取验证码
export const GET_LEADER_BOARD = '/api/leaderboard';//查看排行榜
export const GET_USER_MEDAL = '/api/user_medal';//个人勋章列表
export const GET_USER_INFO = '/api/user_info';//个人勋章列表
export const EDIT_USERNAME = '/api/edit_username';//个人勋章列表
export const COUPON = '/api/coupon';//活动页优惠券
export const JOIN_ROOM_ID = '/api/join_room_id';//加入房间
export const CREATE_ROOM = '/api/create_room';//创建房间
export const CONFIRM_ROOM_PASS = '/api/confirm_room_pass';//验证房间密码
export const RADOME_JOIN_ROOM = '/api/join_room';//加入房间
export const UPLOAD_MY_HEAD = '/api/upload';//上传头像
export const UPDATE_USERINFO = '/api/update_userinfo';//更新用户信息
export const ADD_USER_LIST = '/api/add_user_list';//添加好友列表
export const BATCH_AGREE_APPLY = '/api/batch_agree_apply';//同意添加好友
export const OTHER_USER_INFO = '/api/other_user_info';//好友信息
export const BATCH_REFUSE_APPLY = '/api/batch_refuse_apply';//拒绝添加好友
export const BATCH_ADD_USER = '/api/batch_add_user';//申请添加好友
export const SELF_FRIEND = '/api/self_friend';//好友列表
export const BEGIN_GAME = '/api/begin_game';//开始游戏
export const CHALL_RES = '/api/chall_res';//游戏结果
export const LOGIN_OUT = '/api/logout';//登出
export const LEADER_BOARD = '/api/leaderboard';//总排行榜
export const USER_READY = '/api/user_ready';//总排行榜
export const SIGN_LIST = '/api/sign_list';//签到
export const USER_SIGN = '/api/user_sign';//签到
export const MEDAL_INFO = '/api/medal_info';//勋章单个信息
export const WATCH_GAME = '/api/watch_game';//勋章单个信息
export const RECEIVE_GOLD = '/api/receive_gold';//勋章单个信息
export const DAILY_TASK_LIST = '/api/daily_task_list';//勋章单个信息
export const ACHIEVEMENT_LIST = '/api/achievement_list';//勋章单个信息
export const RECEIVE_ACHIEVEMENT_TASK = '/api/receive_achievement_task';//勋章单个信息
export const RECEIVE_DAILY_TASK = '/api/receive_daily_task';//勋章单个信息
export const ONLINE_FRIEND = '/api/online_friend';//勋章单个信息
export const INVITE_FRIEND = '/api/invite_friend';//勋章单个信息
export const STRANGER = '/api/stranger';//勋章单个信息
export const INVITE_FRIEND_JOIN = '/api/invite_friend_join';//勋章单个信息



// export const LOGOUT = '/login/logout';
// export const REGISTER = '/register';
// export const FORGETPASSWORD = '/login/modifyPassword';
// export const SENDCAPTCHA = '/login/sendRandomCaptcha';
// export const UPLOAD = '/data/saveData';
//
// export const QUERY_TASK_LIST = '/project/info/toMain';
// export const GET_DICT = '/common/getDict'; //字典表查询
// export const QUERY_CHALLENGE_TO_MAIN = "/student/challenge/toMain"; //考核中心主页面信息
// export const GET_INSPECTION_DETAILS = "/student/challenge/getDetails"; //获取小技能柱
// export const GET_INSPECTION_HISTORY = "/student/challenge/getHistory";//获取考核历史记录
// export const GET_INSPECTION_TESTS = "/student/test/getTests";//获取考核列表
// export const GET_AFTER_EXAMINE_BASE = "/student/challenge/getPassBase";//获取通关后数据
// export const HOME_QUERYMYSTAGE="/student/home/queryMyStage";
// export const HOME_TO_MAIN = '/student/home/toMain';//首页列表
// export const HOME_GETSKILLSCORE= '/student/home/getSkillScore';//获取某人技能住||||||| .r2121
// export const GET_STATGE = "/system/skillColumn/getStage";
// export const GET_QUESTIONS = "/student/test/getQuestions";//考核页面获取试题=======
// export const TEST_SUBMINTQUESTIONS = "/student/test/submitQuestions";//试卷
// export const QUERYONEPOST="/company/recruitment/queryOnePost";
// export const RE_GETALLJOBS="/company/recruitment/getAllJobs";
// export const GETALLJOBSBYPAGE="/company/recruitment/getAllJobsByPage";
// export const UPDATECOLLECT="/system/operation/updateCollect";
// export const UPDATEMANAGERINFOR="/system/manager/updateManagerInfo";
// export const QUERYALLFORUM="/forum/forum/queryAllForum";
// export const SAVEAPPLYHELP="/company/promotion/saveApplyHelp";
// export const CHECKSTUDENRTINFO="/company/promotion/checkStudentInfo";
// export const SAVEFORUM="/forum/forum/saveForum";
// export const QUERYONEFORUM="/forum/forum/queryOneForum";
// export const FOTUMPRAISEORTRAMPLE="/forum/forum/forumPraiseOrTrample";
// export const ADDSTUDENT="/system/manager/delOrAddStudentFriend";
// // 每日练习
// export const QUERY_SPECIAL_CLASSIFY = "/questions/classify/queryAllClassify";//获取专项考核分类
// export const GET_STUDENT_EXAM_NUM = "/questions/classify/getStudentExamNum";//获取二级分类中各种题数量
// export const GET_QUESTION_NUM = "/questions/classify/getQuestionNum";//获取二级分类中可选题数量
// export const GET_ALL_SHIELD_QUESTION = "/questions/question/getAllShieldQestion";//查询当前用户已经屏蔽的题
// export const CREATE_PAPER = "/questions/question/createPaper";//创建一张试卷
// export const ERROR_QUESTION = "/questions/question/errorQuestion";//试题纠错
// export const UPDATE_SHIELD_QUESTION = "/questions/question/updateShieldQuestion";//屏蔽或取消屏蔽
// export const SUBMIT_QUESTION = "/questions/question/commitQuestion";//提交试卷
// export const UPDATE_SHARE = "/system/operation/updateShare";//分享
// export const UP_OR_DOWN_ANALYSIS = "/questions/question/upOrDownAnalysis";//踩赞答案解析
// export const SAVE_ANALYSIS = "/questions/question/saveAnalysis";//发表解析
//
//
// export const QUERYINFORMATION = "/information/information/queryInformation";//分页查询全部行业质询
//
// // 个人信息
// export const QUERY_STUDENT_RESUME = "/system/manager/querySutdentResume";//查询用户详情
// export const UPDATE_RESUME_INFO = "/system/manager/updateResumeInfo"//修改简历信息
// export const DOWNLOAD_RESUME = "/system/manager/downloadResume"//下载简历
// export const QUERY_COLLECT_BY_PAGE = "/system/operation/queryCollectByPage";//查询收藏列表
// export const QUERY_STUDENT_SIGN_IN = "/system/operation/queryStudentSingin";//查询学生签到
// export const STUDENT_OPERATION_SIGN_IN = "/system/operation/studentOperationSignin";//学生签到
// export const QUERY_ONE_QUESTION = "/questions/question/queryOneQustion";//查询一道试题
//
// export const SAVEPEPLY = "/forum/forum/saveReply";//提交评论
// //个人信息：我的笔记
// export const QUERY_ALL_NOTE_BY_PAGE = "/system/operation/queryAllNoteByPage";//查询所有笔记
// export const SAVE_NOTE = "/system/operation/saveNote";//保存笔记
// export const DEL_NOTE = "/system/operation/delNote";//删除笔记
//
// export const QUERY_POST_NUM = "/system/manager/queryPostNum";//删除笔记
//
// export const QUERY_FRIENDS_BY_PAGE = "/system/manager/queryFriendsByPage";//查询好友列表
//
// export const QUERY_KNOWLEDGE = "/questions/classify/queryKnowledge"//查询知识点
//
//
//
