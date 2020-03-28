import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login'

// 路由懒加载
const Home = () => import("../views/home/Home")
const Content = () => import("../views/home/content/Content")

// 超级管理员页面
const UserList = () => import("../views/home/content/spAdmin/UserList")
const SchoolList = () => import("../views/home/content/spAdmin/SchoolList")
const UserTypeList = () => import("../views/home/content/spAdmin/UserTypeList")

// 校级管理员页面
const FAdminsList = () => import("../views/home/content/sAdmin/FAdminsList")
const SExamManage = () => import("../views/home/content/sAdmin/SExamManage")
const AuthorityManage = () => import("../views/home/content/sAdmin/AuthorityManage")
const FacultyList = () => import("../views/home/content/sAdmin/FacultyList")

// 院级管理员的页面
const TeachersList = () => import("../views/home/content/fAdmin/TeachersList")
const FExamManage = () => import("../views/home/content/fAdmin/FExamManage")
const MajorManage = () => import("../views/home/content/fAdmin/MajorManage")
const SubjectManage = () => import("../views/home/content/fAdmin/SubjectManage")

// 审核教师的页面
const NRQuestionsList = () => import("../views/home/content/reviewTeacher/NRQuestionsList")

// 命题教师的页面
const SCompose = () => import("../views/home/content/setTeacher/SCompose")
const QuestionUpload = () => import("../views/home/content/setTeacher/QuestionUpload")
const STopic = () => import("../views/home/content/setTeacher/STopic")
const MyExamPapers = () => import("../views/home/content/setTeacher/MyExamPapers")
const QuestionsStore = () => import("../views/home/content/setTeacher/QuestionsStore")

// 共有的页面
const MyQuestions = () => import("../views/home/content/common/MyQuestions")
const Message = () => import("../views/home/content/common/Message")
const SendMessage = () => import("../views/home/content/common/SendMessage")
const MyProfile = () => import("../views/home/content/common/MyProfile")
const Welcome = () => import("../views/home/content/common/Welcome")
const ChangePassword = () => import("../views/home/content/common/ChangePassword")


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        redirect: 'welcome'
      },
      {
        path: 'welcome',
        component: Welcome
      },
      // 命题教师路由
      {
        path: 's_teacher',
        component: Content,
        children: [
          {
            path: '',
            redirect: 'questions_store'
          },
          {
            path: 'questions_store',
            component: QuestionsStore
          },
          {
            path: 'my_topic',
            component: STopic
          },
          {
            path: 'my_exam_papers',
            component: MyExamPapers
          },
          {
            path: 'my_questions',
            component: MyQuestions
          },
          {
            path: 'upload_question',
            component: QuestionUpload
          },
          {
            path: 'my_profile',
            component: MyProfile
          },
          {
            path: 'change_password',
            component: ChangePassword,
          },
          {
            path: 'message',
            component: Message
          },
          {
            path: 'compose',
            component: SCompose
          },
        ]
      },

      // 审题教师路由
      {
        path: 'r_teacher',
        component: Content,
        children: [
          { // 待审核试题
            path: '',
            redirect: 'n_r_questions'
          },
          { // 待审核试题
            path: 'n_r_questions',
            component: NRQuestionsList
          },
          {
            path: 'my_profile',
            component: MyProfile
          },
          {
            path: 'change_password',
            component: ChangePassword,
          },
          {
            path: 'message',
            component: Message
          }
        ]
      },

      // 校级管理员路由
      {
        path: 's_admin',
        component: Content,
        children: [
          {
            path: '',
            redirect: 'f_admin_list',
          },
          {
            path: 'f_admin_list',
            component: FAdminsList,
          },
          {
            path: 'faculty_list',
            component: FacultyList,
          },
          {
            path: 'my_profile',
            component: MyProfile,
          },
          {
            path: 'change_password',
            component: ChangePassword,
          },
          {
            path: 'message',
            component: Message,
          },
          {
            path: 'send_message',
            component: SendMessage
          }
        ]
      },

      // 院级管理员路由
      {
        path: 'f_admin',
        component: Content,
        children: [
          {
            path: '',
            redirect: 'teacher_list'
          },
          {
            path: 'teacher_list',
            component: TeachersList
          },
          {
            path: 'major_manage',
            component: MajorManage
          },
          {
            path: 'subject_manage',
            component: SubjectManage
          },
          {
            path: 'my_profile',
            component: MyProfile
          },
          {
            path: 'change_password',
            component: ChangePassword,
          },
          {
            path: 'message',
            component: Message,
          },
        ]
      },

      // 超级管理员路由
      {
        path: 'sp_admin',
        component: Content,
        children: [
          {
            path: '',
            redirect: 'user_list'
          },
          {
            path: 'user_list',
            component: UserList,
          },
          {
            path: 'school_list',
            component: SchoolList,
          },
          {
            path: 'user_type_list',
            component: UserTypeList,
          },
          {
            path: 'my_profile',
            component: MyProfile,
          },
          {
            path: 'change_password',
            component: ChangePassword,
          },
          {
            path: 'message',
            component: Message,
          },
          {
            path: 'send_message',
            component: SendMessage
          }
        ]
      },
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 挂载导航守卫
router.beforeEach((to, from, next) => {
  if(to.path === '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem("token")
  if(!tokenStr) return next("/login")
  next()
})

export default router
