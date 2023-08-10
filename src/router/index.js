import {
  createRouter,
  createWebHistory
} from "vue-router";

import Home from '@/pages/Home.vue'


// 管理相关
import Admin from '@/pages/admin/Index.vue'
import AdminShare from '@/pages/admin/page/share/Index.vue'
import AdminShareCateIndex from '@/pages/admin/page/share_cate/Index.vue'
import AdminShareCateList from '@/pages/admin/page/share_cate/pages/List.vue'
import AdminShareCateAdd from '@/pages/admin/page/share_cate/pages/Add.vue'
import AdminShareCateEdit from '@/pages/admin/page/share_cate/pages/Edit.vue'
import AdminUser from '@/pages/admin/page/user/Index.vue'
import AdminAsk from '@/pages/admin/page/ask/Index.vue'
import AdminAskList from '@/pages/admin/page/ask/pages/AskList.vue'
import AdminAnswerList from '@/pages/admin/page/ask/pages/AnswerList.vue'
import AdminLost from '@/pages/admin/page/lost/Index.vue'
import AdminFindList from '@/pages/admin/page/lost/pages/FindList.vue'
import AdminLostList from '@/pages/admin/page/lost/pages/LostList.vue'
import AdminBook from '@/pages/admin/page/book/Index.vue'


// 账号相关
import Register from '@/pages/account/pages/Register.vue'
import Login from '@/pages/account/pages/Login.vue'
import InitAccount from '@/pages/account/pages/InitAccount.vue'

// 用户中心
import UserCenterLayout from '@/pages/user_center/Index.vue'
import UserCenterProfile from '@/pages/user_center/pages/Profile.vue'
import UserCenterMyShare from '@/pages/user_center/pages/MyShare.vue'
import UserCenterEditInfo from '@/pages/user_center/pages/EditInfo.vue'
import UserCenterEditShare from '@/pages/user_center/pages/EditShare.vue'
import UserCenterCreateShare from '@/pages/user_center/pages/CreateShare.vue'
import UserCenterCreateBook from '@/pages/user_center/pages/CreateBook.vue'
import UserCenterMyBook from '@/pages/user_center/pages/MyBook.vue'
import UserCenterEditBook from '@/pages/user_center/pages/EditBook.vue'
import UserCenterCreateLost from '@/pages/user_center/pages/CreateLost.vue'
import UserCenterMyLost from '@/pages/user_center/pages/MyLost.vue'
import UserCenterEditLost from '@/pages/user_center/pages/EditLost.vue'
import UserCenterCreateAsk from '@/pages/user_center/pages/CreateAsk.vue'
import UserCenterMyAsk from '@/pages/user_center/pages/MyAsk.vue'
import UserCenterEditAsk from '@/pages/user_center/pages/EditAsk.vue'
import UserCenterMyAnswer from '@/pages/user_center/pages/MyAnswer.vue'

// 用户
import UserIndex from '@/pages/user/Index.vue'
import UserShare from '@/pages/user/pages/Share.vue'
import UserAsk from '@/pages/user/pages/Ask.vue'
import UserAnswer from '@/pages/user/pages/Answer.vue'
import UserLost from '@/pages/user/pages/Lost.vue'
import UserBook from '@/pages/user/pages/Book.vue'

// 问答相关
import Ask from '@/pages/ask/Index.vue'
import AskList from '@/pages/ask/pages/List.vue'
import AskContent from '@/pages/ask/pages/Content.vue'

// 失物招领相关
import Lost from '@/pages/lost/Index.vue'
import LostList from '@/pages/lost/pages/List.vue'
import LostAllList from '@/pages/lost/pages/List/AllList.vue'
import LostFindList from '@/pages/lost/pages/List/FindList.vue'
import LostLostList from "@/pages/lost/pages/List/LostList.vue"
import LostContent from '@/pages/lost/pages/Content.vue'

// 推荐相关
import Book from '@/pages/book/Index.vue'
import BookList from '@/pages/book/pages/List.vue'
import BookContent from '@/pages/book/pages/Content.vue'
import BookCreate from '@/pages/book/pages/Create.vue'
import BookEdit from '@/pages/book/pages/Edit.vue'

// 分享相关
import Share from '@/pages/share/Index.vue'
import ShareList from '@/pages/share/pages/List.vue'
import ShareCreate from '@/pages/share/pages/Create.vue'
import ShareContent from '@/pages/share/pages/Content.vue'

// 系统页面
import PermissionDenied from '@/pages/system/PermissionDenied.vue'
import NotFound from '@/pages/system/NotFound.vue'
import TokenInvalid from '@/pages/system/TokenInvalid.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
      path: '',
      redirect: '/home'
    }, {
      path: '/admin',
      component: Admin,
      children: [{
        path: 'share',
        component: AdminShare
      }, {
        path: 'share_cate',
        component: AdminShareCateIndex,
        children: [{
          path: '',
          component: AdminShareCateList
        }, {
          path: 'add',
          component: AdminShareCateAdd
        }, {
          path: 'edit/:id',
          component: AdminShareCateEdit,
          props: true
        }]
      }, {
        path: 'user',
        component: AdminUser
      },{
        path:'ask',
        component: AdminAsk,
        children: [
          {
            path: '',
            component: AdminAskList
          },
          {
            path: 'answer',
            component: AdminAnswerList
          }
        ]
      },{
        path: 'lost',
        component: AdminLost,
        children: [
          {
            path: '',
            component: AdminFindList
          },
          {
            path:'lost',
            component: AdminLostList
          }
        ]
      },
        {
          path: 'book',
          component: AdminBook
        }]
    },
    {
      path: '/home',
      /*component: Home,*/
      redirect: '/share'
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/init',
      component: InitAccount
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/share',
      component: Share,
      children: [{
        path: '',
        component: ShareList
      }, {
        path: 'create',
        component: ShareCreate
      }, {
        path: ':id',
        component: ShareContent,
        props: true
      }]
    },
    {
      path: '/ask',
      component: Ask,
      children: [{
        path: '',
        component: AskList
      }, {
        path: ':id',
        component: AskContent,
        props: true
      }]
    },
    {
      path: '/lost',
      component: Lost,
      children: [{
        path: '',
        redirect: '/list'
      }, {
        path: '/list',
        component: LostList,
        children: [{
          path: '',
          redirect: '/lost/list/all'
        }, {
          path: '/lost/list/all',
          component: LostAllList
        }, {
          path: '/lost/list/find',
          component: LostFindList
        }, {
          path: '/lost/list/lost',
          component: LostLostList
        }]
      }, {
        path: 'detail/:id',
        component: LostContent,
        props: true
      }]
    },
    {
      path: '/book',
      component: Book,
      children: [{
        path: '',
        component: BookList
      }, {
        path: ':id',
        component: BookContent,
        props: true
      }, {
        path: 'create',
        component: BookCreate
      }, {
        path: 'edit/:id',
        component: BookEdit,
        props: true
      }]
    },
    {
      path: '/user_center',
      component: UserCenterLayout,
      children: [{
          path: '',
          redirect: '/user_center/profile'
        },
        {
          path: 'profile',
          component: UserCenterProfile
        },
        {
          path: 'share',
          component: UserCenterMyShare
        },
        {
          path: 'editinfo',
          component: UserCenterEditInfo
        },
        {
          path: 'editshare/:id',
          component: UserCenterEditShare,
          props: true
        },
        {
          path: 'createshare',
          component: UserCenterCreateShare
        },
        {
          path: 'createbook',
          component: UserCenterCreateBook
        },
        {
          path: 'book',
          component: UserCenterMyBook
        },
        {
          path: 'editbook/:id',
          component: UserCenterEditBook,
          props: true
        },
        {
          path: 'createlost',
          component: UserCenterCreateLost
        },
        {
          path: 'lost',
          component: UserCenterMyLost
        },
        {
          path: 'editlost/:id',
          component: UserCenterEditLost,
          props: true
        },
        {
          path: 'createask',
          component: UserCenterCreateAsk
        },
        {
          path: 'ask',
          component: UserCenterMyAsk
        },
        {
          path: 'editask/:id',
          component: UserCenterEditAsk,
          props: true
        },
        {
          path: 'answer',
          component: UserCenterMyAnswer
        }
      ]
    },
    {
      path: '/user/:id',
      component: UserIndex,
      props: true,
      children: [{
        path: 'share',
        component: UserShare,
        props: true
      }, {
        path: 'ask',
        component: UserAsk,
        props: true
      }, {
        path: 'answer',
        component: UserAnswer,
        props: true
      }, {
        path: 'lost',
        component: UserLost,
        props: true
      }, {
        path: 'book',
        component: UserBook,
        props: true
      }, ],
    },
    {
      path: '/permission_denied',
      component: PermissionDenied
    }, {
      path: '/not_found',
      component: NotFound
    }, {
      path: '/token_invalid',
      component: TokenInvalid
    }
  ],
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path.includes('user_center') || to.path.includes('user') || to.path.includes('admin')) {
    const token = localStorage.getItem('token')
    token ? next() : next('/permission_denied')
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})

export default router