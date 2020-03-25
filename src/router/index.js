import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Login = () => import("../views/login/Login")
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
const ProfessionManage = () => import("../views/home/content/fAdmin/ProfessionManage")

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
const MyProfile = () => import("../views/home/content/common/MyProfile")
const Welcome = () => import("../views/home/content/common/Welcome")

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
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      // 命题教师路由
      {
        path: '/s_teacher',
        component: Content,
        children: [
          {
            path: 's_questions_store',
            component: QuestionsStore
          },
          {
            path: 's_my_topic',
            component: STopic
          },
          {
            path: 's_my_exam_papers',
            component: MyExamPapers
          },
          {
            path: 's_my_questions',
            component: MyQuestions
          },
          {
            path: 's_upload_question',
            component: QuestionUpload
          },
          {
            path: 's_my_profile',
            component: MyProfile
          },
          {
            path: 's_message',
            component: Message
          },
          {
            path: 's_compose',
            component: SCompose
          },
        ]
      },

      // 审题教师路由
      {
        path: '/r_teacher',
        component: Content,
        children: [
          { // 待审核试题
            path: 'n_r_questions',
            component: NRQuestionsList
          },
          {
            path: 'r_my_profile',
            component: MyProfile
          },
          {
            path: 'r_message',
            component: Message
          }
        ]
      },

      // 校级管理员路由
      {
        path: '/s_admin',
        component: Content,
        children: [
          {
            path: 'f_admin_list',
            component: FAdminsList,
          },
          {
            path: 's_admin_authority_manage',
            component: AuthorityManage,
          },
          {
            path: 'school_list',
            component: FacultyList,
          },
          {
            path: 's_admin_profile',
            component: MyProfile,
          },
          {
            path: 's_admin_message',
            component: Message,
          },
        ]
      },

      // 院级管理员路由
      {
        path: '/f_admin',
        component: Content,
        children: [
          {
            path: 'teacher_list',
            component: TeachersList,
          },
          {
            path: 'f_profession_manage',
            component: ProfessionManage,
          },
          {
            path: 's_admin_profile',
            component: MyProfile,
          },
          {
            path: 's_admin_message',
            component: Message,
          },
        ]
      },

      // 超级管理员路由
      {
        path: '/sp_admin',
        component: Content,
        children: [
          {
            path: 'sp_user_list',
            component: UserList,
          },
          {
            path: 'sp_school_list',
            component: SchoolList,
          },
          {
            path: 'sp_user_type_list',
            component: UserTypeList,
          },
          {
            path: 'sp_admin_profile',
            component: MyProfile,
          },
          {
            path: 'sp_admin_message',
            component: Message,
          },
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
